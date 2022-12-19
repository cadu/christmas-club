import { useAccount, useBalance, useContractRead } from "wagmi";
import CCContractAbi from "../artifacts/contracts/abis/ChristmasClub";
import { utils } from "ethers";

const SaverBalance = () => {
  const { address: saverAddress } = useAccount();

  const { data, isError, isLoading, error } = useBalance({
    token: `0x${process.env.NEXT_PUBLIC_CC_TOKEN_CONTRACT_ADDRESS_NO0X}`,
    address: saverAddress,
    watch: true,
  });

  const { data: ccBalanceData } = useContractRead({
    address: process.env.NEXT_PUBLIC_CC_CONTRACT_ADDRESS,
    abi: CCContractAbi.abi,
    functionName: "getSaverAmount",
    watch: true,
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
        <div>Your USDC Balance: {data?.formatted}</div>
        {ccBalanceData && (
          <div>
            Your Deposit Balance:{" "}
            {utils.formatUnits(ccBalanceData?.toString(), 6)}
          </div>
        )}
      </div>
    </>
  );
};

export default SaverBalance;
