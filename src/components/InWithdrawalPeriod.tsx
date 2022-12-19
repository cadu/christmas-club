import React, { useEffect, useState } from "react";
import ContractAbi from "../artifacts/contracts/abis/ChristmasClub";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";

const InWithdrawalPeriod = () => {
  // Call smart contract, fetch current value

  const { address, status, isConnected } = useAccount();
  const [isInWithdrawPeriod, setIsInWithdrawPeriod] = useState(false);
  const [demoErrorMsg, setDemoErrorMsg] = useState("");

  const {
    data: inWithdrawPeriod,
    isError: isInWithdrawPeriodError,
    isLoading: isInWithdrawPeriodLoading,
  } = useContractRead({
    enabled: true,
    address: process.env.NEXT_PUBLIC_CC_CONTRACT_ADDRESS,
    abi: ContractAbi.abi,
    functionName: "isInWithdrawPeriod",
    watch: true,
    onSuccess() {
      setIsInWithdrawPeriod(inWithdrawPeriod);
    },
  });

  //demo withrawal period off
  const { config: configDemoNotWithdrawPeriod } = usePrepareContractWrite({
    enabled: true,
    address: process.env.NEXT_PUBLIC_CC_CONTRACT_ADDRESS,
    abi: ContractAbi.abi,
    functionName: "overrideWithdrawForDemo",
    args: [false],
    onError(err) {
      console.log(JSON.stringify(err));
      setDemoErrorMsg(err.toString());
    },
    onSuccess(result) {
      console.log(JSON.stringify(result));
      setIsInWithdrawPeriod(false);
    },
  });

  const {
    data: notInWithdrawPeriodData,
    write: writeDemoNotInWithdrawalPeriod,
  } = useContractWrite(configDemoNotWithdrawPeriod);

  //demo withrawal period on
  const { config: configDemoInWithdrawPeriod } = usePrepareContractWrite({
    enabled: true,
    address: process.env.NEXT_PUBLIC_CC_CONTRACT_ADDRESS,
    abi: ContractAbi.abi,
    functionName: "overrideWithdrawForDemo",
    args: [true],
    onError(err) {
      console.log(JSON.stringify(err));
      setDemoErrorMsg(err.toString());
    },
    onSuccess(result) {
      console.log(JSON.stringify(result));
      setIsInWithdrawPeriod(true);
    },
  });

  const { data: inWithdrawPeriodData, write: writeDemoInWithdrawalPeriod } =
    useContractWrite(configDemoInWithdrawPeriod);

  return (
    <div>
      {isInWithdrawPeriod && (
        <p>
          It&apos;s Christmas season! You can withdraw your savings for holiday
          season shopping!
        </p>
      )}
      {!isInWithdrawPeriod && (
        <p>
          It&apos;s still some time away until next Christmas - that means
          it&apos;s a good time to save for holiday expenses!
        </p>
      )}
      <div>Owner: Temporarily alter state for demo (max 5 minutes)</div>
      Override the December withdrawal period. Demo the savings period
      (deposits, no withdrawals), or the withdrawal period (withdrawals, no
      deposits).
      <div className="flex gap-2 pt-6">
        <button
          className="disabled:bg-green-300 bg-green-600 text-white p-1 rounded-md"
          disabled={isInWithdrawPeriod}
          onClick={() => writeDemoInWithdrawalPeriod?.()}
        >
          Demo Withdrawal Period
        </button>
        <button
          className="disabled:bg-red-300 bg-red-600 text-white p-1 rounded-md"
          disabled={!isInWithdrawPeriod}
          onClick={() => writeDemoNotInWithdrawalPeriod?.()}
        >
          Demo Savings Period
        </button>
      </div>
      <div>{demoErrorMsg}</div>
    </div>
  );
};

export default InWithdrawalPeriod;
