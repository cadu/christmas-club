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
  // Call smart contract, fetch current value

  const { address, status, isConnected } = useAccount();

  const {
    data: numberOfSavers,
    isError,
    isLoading,
  } = useContractRead({
    address: process.env.NEXT_PUBLIC_CC_CONTRACT_ADDRESS,
    abi: ContractAbi.abi,
    functionName: "numberOfSavers",
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

  //inside the return ( ... ) it's the HTML world.  Outside of return( ... ) it's TS / javascript world.
  return (
    <div>
      <h1>Hi Cadu!</h1>

      <p>
        Savers: user wallet ${address} status ${status} Total Amount Saved {}{" "}
        Total Goal
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
