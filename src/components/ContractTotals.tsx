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
import { useIsMounted } from "../hooks/useIsMounted";

const ContractTotals = () => {
  // Call smart contract, fetch current value

  const { address, status, isConnected } = useAccount();

  const {
    data: numberOfSavers,
    isError: isNumSaversError,
    isLoading: isNumSaversLoading,
  } = useContractRead({
    address: process.env.NEXT_PUBLIC_CC_CONTRACT_ADDRESS,
    abi: ContractAbi.abi,
    functionName: "numberOfSavers",
    watch: true
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

  const { config } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_CC_CONTRACT_ADDRESS,
    abi: ContractAbi.abi,
    functionName: "increaseSavers",
    args: [BigNumber.from(1)],
  });

  const { data: increaseSaversResult, write: writeIncrease } =
    useContractWrite(config);

  const mounted = useIsMounted();
  /*
  async function fetchContractTotals() {

    if (isConnected) {
      const contract = new ethers.Contract(process.env.NEXT_PUBLIC_CC_CONTRACT_ADDRESS, ChristmasClub.abi, provider)
      try {
        const totalAmountSaved = await contract.totalAmountSaved();
        const totalGoalAmount = await contract.totalGoalAmount();
        // = await contract.numberOfSavers();
      } catch(error) {
        console.log(error)
      }
  }
  }*/

  // useEffect(() => {
  //   if (!getXdata) return;
  //   console.log(getXdata);
  //   setNumberOfSavers(Number(getXdata));
  // }, [getXdata]);
  if (!mounted) {
    return null;
  }
  //inside the return ( ... ) it's the HTML world.  Outside of return( ... ) it's TS / javascript world.
  return (
    <div>
      <h1>Hi Cadu!</h1>

      <p>
        user wallet ${address} status ${status} <br/>
        Number of Savers {numberOfSavers?.toNumber()} &nbsp;&nbsp;
        Total Amount Saved {totalAmountSaved?.toNumber()} &nbsp;&nbsp;
        Total Goal Amount {totalGoalAmount?.toNumber()}
      </p>
      <div>{numberOfSavers?.toNumber()}</div>
      <button
        className=" bg-green-600 text-white p-1 rounded-md"
        disabled={!writeIncrease}
        onClick={() => writeIncrease?.()}
      >
        Increase
      </button>
    </div>
  );
};

export default ContractTotals;
