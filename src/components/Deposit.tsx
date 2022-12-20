import { utils } from "ethers";
import {
  useContract,
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useSigner,
  erc20ABI,
} from "wagmi";

import CCContractAbi from "../artifacts/contracts/abis/ChristmasClub";

import { useEffect, useState } from "react";
import Link from "next/link";

interface FormElements extends HTMLFormControlsCollection {
  depositInput: HTMLInputElement;
}
interface DepositFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

type DepositProps = {
  saverUSDCBalance: string;
};

const Deposit = ({ saverUSDCBalance }: DepositProps) => {
  const baseRevertError = "reverted with reason string ";
  const baseRvertRegex = new RegExp(baseRevertError);
  const { address: userWallet } = useAccount();
  const { data: signerData } = useSigner();

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

  const [depositAmount, setDepositAmount] = useState<string>("");
  const [saverAmountForDisplay, setSaverAmountForDisplay] =
    useState<string>("");
  const [depositMsg, setDepositMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const { data: saverAmount } = useContractRead({
    address: process.env.NEXT_PUBLIC_CC_CONTRACT_ADDRESS,
    abi: CCContractAbi.abi,
    functionName: "getSaverAmount",
    watch: true,
  });
  //show 6 digit USDC as a USD / EUR 2 digit currency, without using ethers
  useEffect(() => {
    if (!saverAmount) return;
    console.log("useEffect ran. saverAmount is: ", saverAmount);
    setSaverAmountForDisplay(
      (parseFloat(saverAmount.toString()) / 1000000).toFixed(2).toString()
    );
  }, [saverAmount]);

  const { config: depositConfig } = usePrepareContractWrite({
    enabled: false,
    abi: CCContractAbi.abi,
    address: process.env.NEXT_PUBLIC_CC_CONTRACT_ADDRESS,
    functionName: "deposit",
    args: [utils.parseEther("0.01")],
    onError(err) {
      console.log(JSON.stringify(err));
    },
  });

  const {
    data: despositData,
    write: deposit,
    isSuccess: depositIsSuccess,
    error: depositError,
  } = useContractWrite(depositConfig);

  useEffect(() => {
    if (signerData && christmasClubTokenContract) {
      setErrorMsg("");
      setLoading(false);
    } else {
      setLoading(false);
      setErrorMsg("please connect your wallet");
    }
  }, [signerData, christmasClubTokenContract]);

  const handleSubmit = async (e: React.FormEvent<DepositFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      setDepositMsg("");
      setErrorMsg("");
      console.log(saverUSDCBalance);

      if (!Number.parseFloat(depositAmount)) {
        setErrorMsg("Invalid number to deposit");
        return;
      }
      if (
        Number.parseFloat(saverUSDCBalance) < Number.parseFloat(depositAmount)
      ) {
        setErrorMsg("Your balance of USDC is too low to deposit this much");
        return;
      }

      const amount = utils.parseUnits(depositAmount, 6);

      await christmasClubTokenContract.approve(
        christmasClubContract.address,
        amount
      );

      const tx = await christmasClubContract.deposit(amount);
      setDepositMsg(`Deposit in progress... Tx: ${tx.hash}`);
      await tx.wait();
      setSuccessMsg(`Deposit completed! Tx: ${tx.hash}`);
    } catch (error) {
      console.log(JSON.stringify(error));

      if (error.reason) {
        if (
          error.reason.indexOf(
            "Your balance of USDC is too low to deposit this much"
          ) > 0
        ) {
          setErrorMsg("Your balance of USDC is too low to deposit this much");
        } else if (
          error.reason.indexOf(
            "Too late to make another deposit this year - you can withdraw now"
          ) > 0
        ) {
          setErrorMsg("Too late to make another deposit this year :(");
        } else {
          setDepositMsg(error.reason);
        }
      } else {
        setDepositMsg(JSON.stringify(error));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        data-aos="fade-right"
        data-aos-delay="300"
        className="flex flex-col gap-2"
      >
        <div>Current Savings: {saverAmountForDisplay}</div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            onChange={(e) => setDepositAmount(e.target.value)}
            id="depositAmount"
            type="text"
            className="rounded border focus:outline-none focus:border-green-800 border-gray-400 p-2"
          />
          <button className="button">
            {loading ? "Loading..." : "Deposit now"}
          </button>
          {depositMsg && (
            <div className=" bg-blue-600 text-white rounded p-2">
              {depositMsg}
            </div>
          )}
          {successMsg && (
            <div className=" bg-green-600 text-white rounded p-2">
              {successMsg}
            </div>
          )}
          {errorMsg && (
            <div className=" bg-red-600 text-white rounded p-2">{errorMsg}</div>
          )}
        </form>
      </div>
    </>
  );
};

export default Deposit;
