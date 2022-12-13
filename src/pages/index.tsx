import type { NextPage } from "next";
import Head from "next/head";
import { useAccount } from "wagmi";
import { useIsMounted } from "../hooks/useIsMounted";

const Home: NextPage = () => {
  const { isConnecting, isDisconnected } = useAccount();
  const mounted = useIsMounted();

  if (isDisconnected)
    return (
      <>
        <Head>
          <title>Christmas Club</title>
        </Head>
        <div>Disconnected</div>
      </>
    );

  return (
    <>
      <Head>
        <title>Christmas Club</title>
      </Head>

      <main className="container mx-auto flex flex-col max-w-4xl p-4">
        {mounted && isConnecting && <div>Connecting...</div>}
      </main>
    </>
  );
};

export default Home;
