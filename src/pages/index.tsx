import type { NextPage } from "next";
import Head from "next/head";
import { useAccount } from "wagmi";
import ContractTotals from "../components/ContractTotals";
import Deposit from "../components/Deposit";
import { useIsMounted } from "../hooks/useIsMounted";
import SaverBalance from "../components/SaverBalance";
import SetGoal from "../components/SetGoal";

const Home: NextPage = () => {
  const { isConnecting, isDisconnected } = useAccount();

  //call this last, only after everything else is called
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

        <ContractTotals />
        <SaverBalance />
        <Deposit />
        <SetGoal />
      </main>
    </>
  );
};

export default Home;
