import type { NextPage } from "next";
import Head from "next/head";
import { useAccount } from "wagmi";
import ContractTotals from "../components/ContractTotals";
import Deposit from "../components/Deposit";
import Withdraw from "../components/Withdraw";
import SaverBalance from "../components/SaverBalance";
import SetGoal from "../components/SetGoal";
import Player from "../components/Player";
import ChristmasTree from "../components/ChristmasTree";
import Hero from "../components/Hero";
import AOS from "aos";
import "aos/dist/aos.css";

const Home: NextPage = () => {
  AOS.init();
  const { isConnecting, isDisconnected } = useAccount();

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
        {isConnecting && <div>Connecting...</div>}

        <ContractTotals />
        <SaverBalance />
        <SetGoal />
        <Deposit />
        <Withdraw />
        <SetGoal />
      </main>
    </>
  );
};

export default Home;
