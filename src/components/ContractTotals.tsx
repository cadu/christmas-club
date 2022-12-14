import React, { useEffect, useState } from "react";
import { ethers } from "hardhat";
import ChristmasClub from '../artifacts/contracts/ChristmasClub.sol/ChristmasClub.json';
import { useAccount, useContractRead } from 'wagmi';
import { useIsMounted } from "../hooks/useIsMounted";

const ContractTotals = (props) => {
  
  const [numberOfSavers, setNumberOfSavers] = useState(0);
  // Call smart contract, fetch current value 
  
  const { address, status, isConnected} = useAccount();
 
 
  const { data, isError, isLoading } = useContractRead({
    address: process.env.NEXT_PUBLIC_CC_CONTRACT_ADDRESS,
    abi: ChristmasClub.abi,
    functionName: 'getX',
  });

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


  useEffect(() => {
    if (!data) return;
    console.log(data);
    //setNumberOfSavers(data);
  });
 //inside the return ( ... ) it's the HTML world.  Outside of return( ... ) it's TS / javascript world. 
  return (
    <div>
    <h1>Hi Cadu!</h1> 
    { mounted && (
          `Savers:  user wallet ${address} status ${status} Total Amount Saved {}  Total Goal {}`)
    }
    
    </div>
  );
};

export default ContractTotals;
