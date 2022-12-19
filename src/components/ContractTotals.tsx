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

  //inside the return ( ... ) it's the HTML world.  Outside of return( ... ) it's TS / javascript world.
  return (
    <div>
      <p>
        Number of Savers {numberOfSavers?.toNumber()} &nbsp;&nbsp; Total Amount
        Saved {totalAmountSaved?.toNumber()} &nbsp;&nbsp; Total Goal Amount{" "}
        {totalGoalAmount?.toNumber()}
      </p>
    </div>
  );
};

export default ContractTotals;
