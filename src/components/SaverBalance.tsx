import { useAccount, useBalance, useContractRead } from "wagmi";
import CCContractAbi from "../artifacts/contracts/abis/ChristmasClub";
import { utils } from "ethers";
import { useEffect, useState } from "react";

type SaverBalanceProps = {
  saverUSDCBalance: string;
  setSaverUSDCBalance: (balance: string) => void;
  contractBalance: string;
  setContractBalance: (balance: string) => void;
};

const SaverBalance = ({
  saverUSDCBalance,
  setSaverUSDCBalance,
  contractBalance,
  setContractBalance,
}: SaverBalanceProps) => {
  const { address: saverAddress } = useAccount();
  const { data, isError, isLoading, error } = useBalance({
    token: `0x${process.env.NEXT_PUBLIC_CC_TOKEN_CONTRACT_ADDRESS_NO0X}`,
    address: saverAddress,
    watch: true,
    onSuccess(data) {
      try {
        setSaverUSDCBalance(
          Number(utils.formatUnits(data.value.toString(), 6)).toFixed(2)
        );
      } catch (error) {
        console.log(error);
      }
    },
  });

  const { data: ccBalanceData } = useContractRead({
    address: process.env.NEXT_PUBLIC_CC_CONTRACT_ADDRESS,
    abi: CCContractAbi.abi,
    functionName: "getSaverAmount",
    watch: true,
    onSuccess(data) {
      try {
        setContractBalance(
          Number(utils.formatUnits(data.toString(), 6)).toFixed(2)
        );
      } catch (error) {
        console.log(error);
      }
    },
  });

  if (isLoading) return <div>Fetching balance…</div>;

  if (isError)
    return (
      <>
        <div>Error fetching balance </div>
        {JSON.stringify(error)}
      </>
    );
  return (
    <>
      <div className="flex flex-col items-end justify-end gap-2 rounded-md p-3 bg-gray-100 border border-gray-800 bg-opacity-40">
        <div>Your USDC Balance: {saverUSDCBalance}</div>
        {contractBalance && <div>Your Deposit Balance: {contractBalance}</div>}
      </div>
    </>
  );
};

export default SaverBalance;
