import { BigNumber, utils } from "ethers";
import {
  useAccount,
  useBalance,
  useContract,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useSigner,
} from "wagmi";

import CCContractAbi from "../artifacts/contracts/abis/ChristmasClub";
import tokenABI from "../../utils/CCTokenABI";

import { useEffect, useState } from "react";

const Deposit = () => {
  const { address: userWallet } = useAccount();
  const { data: signerData } = useSigner();
  const christmasClubContract = useContract({
    address: process.env.NEXT_PUBLIC_CC_CONTRACT_ADDRESS,
    abi: CCContractAbi.abi,
    signerOrProvider: signerData,
  });
  const christmasClubTokenContract = useContract({
    address: process.env.NEXT_PUBLIC_CC_TOKEN_CONTRACT_ADDRESS,
    abi: tokenABI,
    signerOrProvider: signerData,
  });
  const { config: mintConfig } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_CC_TOKEN_CONTRACT_ADDRESS,
    abi: tokenABI,
    functionName: "mint",
    args: [userWallet, utils.parseEther("0.05")],
    // onError(err) {
    //   console.log(err);
    // },
  });

  const { write: mint } = useContractWrite(mintConfig);

  const [depositAmount, setDepositAmount] = useState<number>(0);
  const [depositMsg, setDepositMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const { config: depositConfig } = usePrepareContractWrite({
    enabled: false,
    abi: CCContractAbi.abi,
    address: process.env.NEXT_PUBLIC_CC_CONTRACT_ADDRESS,
    functionName: "deposit",
    args: [utils.parseEther("0.01")],
    overrides: {
      from: userWallet,
    },
    // onError(err) {
    //   setDepositMsg(err.reason);
    // },
  });

  const {
    write: deposit,
    isSuccess: depositIsSuccess,
    error: depositError,
  } = useContractWrite(depositConfig);

  const { data, isError, isLoading, error } = useBalance({
    token: process.env.NEXT_PUBLIC_CC_TOKEN_CONTRACT_ADDRESS,
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
    if (signerData) {
      setErrorMsg("");
      setLoading(false);
    } else {
      setLoading(false);
      setErrorMsg("please connect your wallet");
    }
  }, [signerData]);

  if (isLoading) return <div>Fetching balance…</div>;

  if (isError)
    return (
      <>
        <div>Error fetching balance </div>
        {JSON.stringify(error)}
      </>
    );

  interface FormElements extends HTMLFormControlsCollection {
    depositInput: HTMLInputElement;
  }
  interface DepositFormElement extends HTMLFormElement {
    readonly elements: FormElements;
  }

  const handleSubmit = async (e: React.FormEvent<DepositFormElement>) => {
    e.preventDefault();
    // setDepositAmount(parseInt(e.currentTarget.elements.depositInput.value));
    // await deposit?.();
    // console.log("deposit", depositIsSuccess);
    // console.log(depositError);
    try {
      console.log("submiting...");

      setLoading(true);
      const amount = utils.parseEther("0.01");
      await christmasClubTokenContract?.approve(
        christmasClubContract?.address,
        amount
      );
      const tx = await christmasClubContract?.deposit(amount);
      await tx?.wait();
      setDepositMsg("");
      setLoading(false);
    } catch (error) {
      setErrorMsg(JSON.stringify(error));
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <div>
          Your CCT Balance: {data?.formatted} {JSON.stringify(data)}
        </div>
        <div>Your Contract Balance: {contractBalanceData?.toString()}</div>
        <button
          onClick={() => mint?.()}
          className=" bg-green-700 text-white p-2 rounded-lg"
        >
          Mint
        </button>
      </div>
      <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-2">
        <h3>Make a deposit</h3>
        <input
          onChange={(e) => setDepositAmount(parseInt(e.target.value))}
          id="depositAmount"
          type="text"
          className="p-2 border border-emerald-800 rounded-lg"
        />
        {depositAmount}
        <div>{depositMsg}</div>
        <button
          //onClick={() => deposit?.()}
          className=" bg-green-700 text-white p-2 rounded-lg"
        >
          Deposit now
        </button>
        <div>Error?{errorMsg}</div>
      </form>
    </>
  );
};

export default Deposit;
