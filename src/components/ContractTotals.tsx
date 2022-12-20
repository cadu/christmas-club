import React, { useEffect, useState } from "react";
import { ethers } from "hardhat";
import { BigNumber } from "ethers";
import ContractAbi from "../artifacts/contracts/abis/ChristmasClub";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";

const ContractTotals = () => {
  const [amountSavedForDisplay, setAmountSavedForDisplay] =
    useState<string>("");
  const [goalAmountForDisplay, setGoalAmountForDisplay] = useState<string>("");
  const {
    data: numberOfSavers,
    isError: isNumSaversError,
    isLoading: isNumSaversLoading,
  } = useContractRead({
    address: process.env.NEXT_PUBLIC_CC_CONTRACT_ADDRESS,
    abi: ContractAbi.abi,
    functionName: "numberOfSavers",
    watch: true,
  });

  const {
    data: totalGoalAmount,
    isError: isTotalGoalError,
    isLoading: isTotalGoalLoading,
  } = useContractRead({
    address: process.env.NEXT_PUBLIC_CC_CONTRACT_ADDRESS,
    abi: ContractAbi.abi,
    functionName: "totalGoalAmount",
    watch: true,
  });

  useEffect(() => {
    if (!totalGoalAmount) return;
    console.log("useEffect ran. totalAmountSaved is: ", totalGoalAmount);
    setGoalAmountForDisplay(
      (parseFloat(totalGoalAmount.toString()) / 1000000).toFixed(2).toString()
    );
  }, [totalGoalAmount]);

  const {
    data: totalAmountSaved,
    isError: isTotalSavedError,
    isLoading: isTotalSavedLoading,
  } = useContractRead({
    address: process.env.NEXT_PUBLIC_CC_CONTRACT_ADDRESS,
    abi: ContractAbi.abi,
    functionName: "totalAmountSaved",
    watch: true,
  });

  useEffect(() => {
    if (!totalAmountSaved) return;
    console.log("useEffect ran. totalAmountSaved is: ", totalAmountSaved);
    setAmountSavedForDisplay(
      (parseFloat(totalAmountSaved.toString()) / 1000000).toFixed(2).toString()
    );
  }, [totalAmountSaved]);
  //inside the return ( ... ) it's the HTML world.  Outside of return( ... ) it's TS / javascript world.
  return (
    <div>
      <p>
        Number of Savers {numberOfSavers?.toNumber()} &nbsp;&nbsp; Total Amount
        Saved {amountSavedForDisplay}&nbsp;&nbsp; Total Goal Amount{" "}
        {goalAmountForDisplay}
      </p>
    </div>
  );
};

export default ContractTotals;
