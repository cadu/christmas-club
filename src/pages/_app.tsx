import "../styles/globals.css";
import type { AppType } from "next/dist/shared/lib/utils";

import Layout from "../components/Layout";
import { WagmiConfig, createClient, useNetwork } from "wagmi";
import { mainnet, goerli, hardhat } from "wagmi/chains";
import { ConnectKitProvider, getDefaultClient } from "connectkit";
import CustomAvatar from "../components/CustomAvatar";
import React from "react";
import toast from "react-hot-toast";
import { useState } from "react";
import { ChainProvider } from "../hooks/useChainContext";

const client = createClient(
  getDefaultClient({
    appName: "Christmas Club",
    infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
    alchemyId: process.env.NEXT_PUBLIC_ALCHEMY_ID,
    chains: [goerli, hardhat],
  })
);

const envChainId: number = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || "");
const chainId: number = Number.isInteger(envChainId) ? envChainId : 31337;

const MyApp: AppType = ({ Component, pageProps }) => {
  const [mounted, setMounted] = useState(false);
  const [selectedChain, setSelectedChain] = useState<number>();
  const { chain } = useNetwork();
  React.useEffect(() => {
    setMounted(true);
    if (!chain) return;
    // console.log("current", chain.id, typeof chain.id, chain.id === chainId);
    setSelectedChain(chainId);
    // if (chain.id === chainId) {
    //   setSelectedChain(true);
    // } else {
    //   toast.error(
    //     "You're not on the correct chain. Please change your network"
    //   );
    //   setSelectedChain(false);
    // }
  }, [chain]);

  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider
        options={{
          customAvatar: CustomAvatar,
        }}
      >
        <ChainProvider value={selectedChain}>
          <Layout>{mounted && <Component {...pageProps} />}</Layout>
        </ChainProvider>
      </ConnectKitProvider>
    </WagmiConfig>
  );
};

export default MyApp;
