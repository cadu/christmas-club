import { BigNumber, utils, ethers, Contract } from "ethers";
import {
  useAccount,
  useBalance,
  useContract,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useProvider,
  useSigner,
  erc20ABI,
} from "wagmi";

import CCContractAbi from "../artifacts/contracts/abis/ChristmasClub";

import { useEffect, useState } from "react";

const Withdraw = () => {
  let balanceMessage = "";
  const isInWithdrawalPeriod = true; //get this from the contract for false
  let wallet: ethers.Wallet | undefined;
  const { address: userWallet } = useAccount();
  const { data: signerData } = useSigner();
  const provider = useProvider();
  const christmasClubContract = useContract({
    address: process.env.NEXT_PUBLIC_CC_CONTRACT_ADDRESS,
    abi: CCContractAbi.abi,
    signerOrProvider: signerData,
  });
  const christmasClubTokenContract = useContract({
    address: process.env.NEXT_PUBLIC_CC_TOKEN_CONTRACT_ADDRESS,
    abi: erc20ABI,
    signerOrProvider: signerData,
  });

  const [withdrawMsg, setWithdrawMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [withdrawalComplete, setWithdrawalComplete] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [withdrawnAmount, setWithdrawnAmount] = useState(0);

  const {
    data: ccBalanceData,
    isError: isCCBalanceError,
    isLoading: isCCBalanceLoading,
  } = useContractRead({
    enabled: false,
    address: process.env.NEXT_PUBLIC_CC_CONTRACT_ADDRESS,
    abi: CCContractAbi.abi,
    functionName: "getSaverAmount",
    watch: false,
    onSuccess(ccBalanceData) {
      balanceMessage += utils.formatUnits(ccBalanceData?.toString(), 6);
      console.log(`retrieved balance of ${ccBalanceData}`);
    },
    onError(err) {
      balanceMessage += err.message;
    },
  });

  const { config: withdrawConfig } = usePrepareContractWrite({
    enabled: false,
    abi: CCContractAbi.abi,
    address: process.env.NEXT_PUBLIC_CC_CONTRACT_ADDRESS,
    functionName: "withdraw",
    signer: signerData,
    onError(err) {
      console.log(JSON.stringify(err));
    },
    onSuccess(result) {
      console.log(JSON.stringify(result));
    },
  });

  const {
    write: withdraw,
    isSuccess: withdrawIsSuccess,
    isLoading: withdrawIsLoading,
    error: withdrawError,
    data: withdrawResult,
  } = useContractWrite(withdrawConfig);

  const { data, isError, isLoading, error } = useBalance({
    token: `0x${process.env.NEXT_PUBLIC_CC_TOKEN_CONTRACT_ADDRESS_NO0X}`,
    address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    watch: true,
  });
  const { data: contractBalanceData } = useContractRead({
    address: process.env.NEXT_PUBLIC_CC_CONTRACT_ADDRESS,
    abi: CCContractAbi.abi,
    functionName: "getSaverAmount",
    watch: true,
  });

  useEffect(() => {
    if (signerData && christmasClubTokenContract) {
      setErrorMsg("");
      setLoading(false);
    } else {
      setLoading(false);
      // setErrorMsg("please connect your wallet");
    }
  }, [signerData, christmasClubTokenContract]);

  if (isLoading) return <div>Fetching balance…</div>;

  if (isError)
    return (
      <>
        <div>Error fetching balance </div>
        {JSON.stringify(error)}
      </>
    );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      console.log("submitting withdraw now");

      setLoading(true);
      setErrorMsg("");
      setWithdrawMsg("");
      setWithdrawalComplete(false);

      const tokenContract = new Contract(
        process.env.NEXT_PUBLIC_CC_TOKEN_CONTRACT_ADDRESS,
        erc20ABI,
        signerData
      );
      //what amount to approve?  It's the amount saved by the user wishing to withdraw.
      /*
      const approveTx = await tokenContract.approve(
        christmasClubContract?.address,
        amount
      );
      const receipt = await approveTx.wait();
      */
      //checking initial balance
      balanceMessage = "Balances: Pre-withdraw balance: ";
      const initialBalanceAmountBN =
        await christmasClubContract.getSaverAmount();
      const preWithdrawBalance: number = parseFloat(
        ethers.utils.formatUnits(initialBalanceAmountBN, 6)
      );

      balanceMessage = `Balances: initial Balance Amount is ${preWithdrawBalance}, `;
      console.log(
        `initial Balance Amount is ${initialBalanceAmountBN.toString()}`
      );
      console.log(`Pre-withdraw balance is ${preWithdrawBalance}`);

      const withdrawTx = await christmasClubContract.withdraw();
      console.log("Withdrawal in progress");

      setWithdrawMsg(`Withdrawal in progress... Tx: ${withdrawTx.hash}`);
      await withdrawTx.wait();
      console.log("Withdrawal complete.");

      const endBalanceAmountBN = await christmasClubContract.getSaverAmount();
      console.log(`endBalance Amount is ${endBalanceAmountBN.toString()}`);
      const postWithdrawBalance: number = parseFloat(
        ethers.utils.formatUnits(endBalanceAmountBN, 6)
      );
      balanceMessage += `Post-withdrawal balance is ${postWithdrawBalance}.`;
      console.log(`post-withdraw balance is ${postWithdrawBalance}`);
      let withdrawnAmount = NaN;
      try {
        withdrawnAmount = preWithdrawBalance - postWithdrawBalance;
      } catch (err) {
        console.log(
          `Could not subtract ${postWithdrawBalance} from ${preWithdrawBalance}`
        );
      }
      setWithdrawnAmount(withdrawnAmount);
      setWithdrawMsg(`Withdrawal complete!\n
        ${balanceMessage} \n
        Amount:  ${withdrawnAmount.toString()},
        Tx: ${withdrawTx.hash}`);
      setLoading(false);
    } catch (err) {
      //get 2 required texts from ChristmasClub.sol and make a nice front end error from those.
      const inputErrString = err.toString();
      if (inputErrString.indexOf("You can't withdraw yet") > 0) {
        setErrorMsg(
          "Too early to withdraw, please wait until start of withdrawal period"
        );
      } else if (
        inputErrString.indexOf("You must have savings to withdraw") > 0
      ) {
        setErrorMsg("You must have savings to withdraw");
      } else {
        setErrorMsg(JSON.stringify(err.toString().substr(157)));
      }
      setLoading(false);
      setWithdrawalComplete(true);
    }
  };

  if (isInWithdrawalPeriod) {
    return (
      <>
        <form
          data-aos="fade-right"
          data-aos-delay="470"
          id="withdrawForm"
          onSubmit={handleSubmit}
          className="flex flex-col gap-2"
        >
          <button className="button">
            {loading ? "Loading..." : "Withdraw now"}
          </button>
          {errorMsg && (
            <div className="bg-red-600 text-white rounded p-2">{errorMsg}</div>
          )}
          {withdrawMsg && (
            <div className="bg-orange-600 text-white rounded p-2">
              {withdrawMsg}
            </div>
          )}
          {withdrawalComplete && withdrawnAmount > 0 && (
            <div>
              Congratulations! You have withdrawn {withdrawnAmount} in time for
              Christmas!
            </div>
          )}
        </form>
      </>
    );
  } else {
    if (isInWithdrawalPeriod) {
      return <div>Only X days to withdrawal period!</div>;
    }
  }
};

export default Withdraw;
