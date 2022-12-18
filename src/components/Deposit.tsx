import { utils } from "ethers";
import {
  useContract,
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useSigner,
  erc20ABI,
} from "wagmi";

import CCContractAbi from "../artifacts/contracts/abis/ChristmasClub";

import { useEffect, useState } from "react";

interface FormElements extends HTMLFormControlsCollection {
  depositInput: HTMLInputElement;
}
interface DepositFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

const Deposit = () => {
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
  const [depositMsg, setDepositMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const { config: depositConfig } = usePrepareContractWrite({
    enabled: false,
    abi: CCContractAbi.abi,
    address: process.env.NEXT_PUBLIC_CC_CONTRACT_ADDRESS,
    functionName: "deposit",
    signer: signerData,
    args: [utils.parseEther("0.01")],
    onError(err) {
      console.log(JSON.stringify(err));
    },
  });

  const {
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

      const amount = utils.parseUnits(depositAmount, 6);

      // const tokenContract = new Contract(
      //   process.env.NEXT_PUBLIC_CC_TOKEN_CONTRACT_ADDRESS,
      //   erc20ABI,
      //   signerData
      // );
      await christmasClubTokenContract.approve(
        christmasClubContract.address,
        amount
      );

      const tx = await christmasClubContract.deposit(amount);
      setDepositMsg(`Deposit in progress... Tx: ${tx.hash}`);
      await tx.wait();
      setDepositMsg(`Deposit in completed! Tx: ${tx.hash}`);
    } catch (error) {
      console.log(JSON.stringify(error));

      if (error.reason) {
        setDepositMsg(error.reason);
      } else {
        setDepositMsg(JSON.stringify(error));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        {loading && (
          <div className="rounded p-2 bg-teal-800 text-white">Loading...</div>
        )}
      </div>
      <fieldset
        data-aos="fade-up"
        data-aos-delay="300"
        className="border p-2 rounded "
      >
        <legend className="p-2 font-bold">Make a deposit</legend>
        <div className="flex flex-col gap-2 max-w-4xl">
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            {depositMsg && (
              <div className=" bg-orange-600 text-white rounded p-2">
                {depositMsg}
              </div>
            )}
            <input
              onChange={(e) => setDepositAmount(e.target.value)}
              id="depositAmount"
              type="text"
              className="p-2 border border-emerald-800 rounded-lg"
            />

            <button className="button">Deposit now</button>
            <div>{errorMsg}</div>
          </form>
        </div>
      </fieldset>
    </>
  );
};

export default Deposit;
