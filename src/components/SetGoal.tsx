import {
  useContractWrite,
  usePrepareContractWrite,
  useContractRead,
} from "wagmi";
import { utils, BigNumber } from "ethers";
import CCContractAbi from "../artifacts/contracts/abis/ChristmasClub";
import { useState, useEffect } from "react";
import useDebounce from "../hooks/useDebounce";

type GoalProps = {
  goal: number;
  setGoal: (n: number) => void;
};
const SetGoal = ({ goal, setGoal }: GoalProps) => {
  const [saverGoalAmountForDisplay, setSaverGoalAmountForDisplay] =
    useState<string>("");
  const debouncedGoal = useDebounce(goal, 500);
  const [goalMsg, setGoalMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const { data: saverGoal } = useContractRead({
    address: process.env.NEXT_PUBLIC_CC_CONTRACT_ADDRESS,
    abi: CCContractAbi.abi,
    functionName: "getSaverGoal",
    watch: true,
  });
  //show 6 digit USDC as a USD / EUR 2 digit currency, without using ethers
  useEffect(() => {
    if (!saverGoal) return;
    console.log("useEffect ran. saverGoal is: ", saverGoal);
    setSaverGoalAmountForDisplay(
      (parseFloat(saverGoal.toString()) / 1000000).toFixed(2).toString()
    );
  }, [saverGoal, debouncedGoal]);

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
    onError(error) {
      console.log(JSON.stringify(error));

      if (
        error.message.indexOf(
          "Your goal must be greater than amount already deposited"
        ) > 0
      ) {
        setErrorMsg("Your goal must be greater than amount already deposited");
      } else {
        setErrorMsg(error.message);
      }
    },
    onSuccess() {
      setErrorMsg("");
    },
  });

  const {
    data: setGoalData,
    write,
    isLoading: isLoadingSetGoal,
    isSuccess,
  } = useContractWrite(config);

  // const { isSuccess } = useWaitForTransaction({
  //   hash: setGoalData?.hash,
  //   onSuccess: () => setGoal(0),
  // });

  return (
    <div
      data-aos="fade-left"
      data-aos-delay="100"
      className="flex flex-col gap-2 max-w-4xl"
    >
      <div>Current goal: {saverGoalAmountForDisplay}</div>
      <form
        className="flex flex-col gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          try {
            if (goal == 0) {
              setErrorMsg("The new goal cannot be zero");
              return;
            }
            if (saverGoal.div(1000000).eq(BigNumber.from(goal))) {
              setErrorMsg("The new goal cannot be the same");
              return;
            }
            write?.();
          } catch (e) {
            setGoalMsg("Invalid number");
          }
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
        <button disabled={isLoadingSetGoal} className="button">
          {isLoadingSetGoal ? "Loading..." : "Set my goal"}
        </button>
        {goalMsg && (
          <div className=" bg-orange-600 text-white rounded p-2">{goalMsg}</div>
        )}
        {isSuccess && (
          <div className=" bg-green-600 text-white rounded p-2">
            You have successfully set your goal!
          </div>
        )}
        {errorMsg && (
          <div className=" bg-red-600 text-white rounded max-w-4xl p-2">
            {errorMsg}
          </div>
        )}
      </form>
    </div>
  );
};

export default SetGoal;
