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
  let isInWithdrawalPeriod = true; //get this from the contract for false
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
  const [errorMsg, setErrorMsg] = useState("");

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
    }
  });

  const {
    write: withdraw,
    isSuccess: withdrawIsSuccess,
    isLoading: withdrawIsLoading,
    error: withdrawError,
    data: withdrawResult
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
      setErrorMsg("please connect your wallet");
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

      const tokenContract = new Contract(
        process.env.NEXT_PUBLIC_CC_TOKEN_CONTRACT_ADDRESS,
        erc20ABI,
        signerData
      );/*
      const approveTx = await tokenContract.approve(
        christmasClubContract?.address,
        amount
      );
      const receipt = await approveTx.wait();
      */
      const tx = await christmasClubContract.withdraw();
      await tx.wait();
      setWithdrawMsg("");
      setLoading(false);
    } catch (error) {
      setErrorMsg(JSON.stringify(error));
      setLoading(false);
    }
  };

  if (isInWithdrawalPeriod) {
  return (
    <>
      <form id="withdrawForm" onSubmit={handleSubmit} className="flex flex-col gap-2">
        <h3>Withdraw</h3>
        <button className=" bg-green-700 text-white p-2 rounded-lg"
        >
          Withdraw now
        </button>
        <div>Error?{errorMsg}</div>
      </form>
    </>
  );
  } else {
    if (isInWithdrawalPeriod) {
      return (
        <div>X days to withdrawal period!</div>
      );
    }
  }
};

export default Withdraw;
