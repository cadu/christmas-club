import {
  useAccount,
  useBalance,
  useContractRead,
  usePrepareContractWrite,
  useContractWrite,
} from "wagmi";
import CCContractAbi from "../artifacts/contracts/abis/ChristmasClub";
import tokenABI from "../../utils/CCTokenABI";
import { utils } from "ethers";

const SaverBalance = () => {
  const { address: saverAddress } = useAccount();

  const { data, isError, isLoading, error } = useBalance({
    token: process.env.NEXT_PUBLIC_CC_TOKEN_CONTRACT_ADDRESS,
    address: saverAddress,
    watch: true,
  });

  const { data: ccBalanceData } = useContractRead({
    address: process.env.NEXT_PUBLIC_CC_CONTRACT_ADDRESS,
    abi: CCContractAbi.abi,
    functionName: "getSaverAmount",
    watch: true,
  });

  const { config: mintConfig } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_CC_TOKEN_CONTRACT_ADDRESS,
    abi: tokenABI,
    functionName: "mint",
    args: [saverAddress, utils.parseUnits("0.05", 6)],
    // onError(err) {
    //   console.log(err);
    // },
  });

  const { write: mint, isLoading: mintLoading } = useContractWrite(mintConfig);

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
      <div className="flex gap-2">
        <div>Your CCT Balance: {data?.formatted}</div>
        <button
          onClick={() => mint?.()}
          className=" bg-green-700 text-sm text-white py-1 px-2 rounded-lg"
        >
          {mintLoading ? "Minting..." : "Mint"}
        </button>
      </div>
      <div>
        Your Contract Balance:{" "}
        {ccBalanceData && utils.formatUnits(ccBalanceData?.toString(), 6)}
      </div>
    </>
  );
};

export default SaverBalance;
