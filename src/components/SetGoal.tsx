import {
  useContractWrite,
  usePrepareContractWrite,
  useSigner,
  useWaitForTransaction,
  useContractRead,
} from "wagmi";
import { utils, BigNumber } from "ethers";
import CCContractAbi from "../artifacts/contracts/abis/ChristmasClub";
import { useState, useEffect } from "react";
import Link from "next/link";
import useDebounce from "../hooks/useDebounce";

const SetGoal = () => {
  const [goal, setGoal] = useState<number>(0);
  const [saverGoalAmountForDisplay, setSaverGoalAmountForDisplay] = useState<string>("");
  const debouncedGoal = useDebounce(goal, 500);
  const [goalMsg, setGoalMsg] = useState("");

  const { data: saverGoal } = useContractRead({
    address: process.env.NEXT_PUBLIC_CC_CONTRACT_ADDRESS,
    abi: CCContractAbi.abi,
    functionName: "getSaverGoal",
    watch: true,
  });
  //show 6 digit USDC as a USD / EUR 2 digit currency, without using ethers
  useEffect(() => {
    console.log('useEffect ran. saverGoal is: ', saverGoal);
    setSaverGoalAmountForDisplay((
      (
        parseFloat(saverGoal.toString()) / 1000000
      ).toFixed(2)).toString()
    )
  }, [saverGoal]);

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_CC_CONTRACT_ADDRESS,
    abi: CCContractAbi.abi,
    functionName: "setGoal",
    args: [utils.parseUnits(debouncedGoal.toString(), 6)],
    enabled: Boolean(debouncedGoal),
    // onSuccess(data) {
    //   alert("foi");
    // },
    // onError(err) {
    //   if (err.reason) {
    //     setGoalMsg(err.reason);
    //   } else {
    //     setGoalMsg(JSON.stringify(err));
    //   }
    // },
  });
  
  const {
    data: setGoalData,
    write,
    error: setGoalError,
    isError: setGoalIsError,
    isLoading: isLoadingSetGoal,
  } = useContractWrite(config);

  const { isSuccess } = useWaitForTransaction({
    hash: setGoalData?.hash,
    onSuccess: () => setGoal(0),
  });

  return (
    <div
      data-aos="fade-left"
      data-aos-delay="100"
      className="flex flex-col gap-2 max-w-4xl"
    >
      <div>
        Current goal:{" "} {saverGoalAmountForDisplay}
      </div>
      <form
        className="flex flex-col gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          write?.();
        }}
      >
        <input
          // disabled={saverGoal.gt(0)}
          onChange={(e) => {
            if (parseFloat(e.target.value)) {
              setGoal(parseFloat(e.target.value));
            } else {
              setGoal(0);
            }
          }}
          value={goal}
          type="text"
          id="setGoal"
          className="rounded border focus:outline-none focus:border-green-800 border-gray-400 p-2"
        />
        <button disabled={!write || isLoadingSetGoal} className="button">
          {isLoadingSetGoal ? "Setting your goal..." : "Set my goal"}
        </button>
        {goalMsg && (
          <div className=" bg-orange-600 text-white rounded p-2">{goalMsg}</div>
        )}
        {isSuccess && (
          <div className=" bg-green-600 text-white rounded p-2">
            You have successfully set your goal!
            <div>
              Check the tx on{" "}
              <Link
                className="border-b-2 border-green-800"
                href={`https://etherscan.io/tx/${setGoalData?.hash}`}
              >
                Etherscan
              </Link>
            </div>
          </div>
        )}
        {setGoalIsError && (
          <div className=" bg-red-600 text-white rounded max-w-4xl p-2">
            Error: {setGoalError?.message}
          </div>
        )}
      </form>
    </div>
  );
};

export default SetGoal;
