import "../styles/globals.css";
import type { AppType } from "next/dist/shared/lib/utils";

import Layout from "../components/Layout";
import { WagmiConfig, createClient } from "wagmi";
import { mainnet, goerli } from "wagmi/chains";
import { ConnectKitProvider, getDefaultClient } from "connectkit";

const client = createClient(
  getDefaultClient({
    appName: "Christmas Club",
    infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
    alchemyId: process.env.NEXT_PUBLIC_ALCHEMY_ID,
    chains: [mainnet, goerli],
  })
);

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ConnectKitProvider>
    </WagmiConfig>
  );
};

export default MyApp;
