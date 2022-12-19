import { usePrepareContractWrite, useAccount, useContractWrite } from "wagmi";
import { utils } from "ethers";
import tokenABI from "../../utils/CCTokenABI";

const MintSavingsToken = () => {
  const { address: saverAddress } = useAccount();
  const { config: mintConfig } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_CC_TOKEN_CONTRACT_ADDRESS,
    abi: tokenABI,
    functionName: "mint",
    args: [saverAddress, utils.parseUnits("100", 6)],
  });

  const { write: mint, isLoading: mintLoading } = useContractWrite(mintConfig);

  return (
    <button
      onClick={() => mint?.()}
      className=" bg-green-700 text-sm text-white py-1 px-2 rounded-lg"
    >
      {mintLoading ? "Minting..." : "Mint"}
    </button>
  );
};

export default MintSavingsToken;
