import type { NextPage } from "next";
import Head from "next/head";
import { useAccount } from "wagmi";
import ContractTotals from "../components/ContractTotals";
import Deposit from "../components/Deposit";
import Withdraw from "../components/Withdraw";
import SaverBalance from "../components/SaverBalance";
import SetGoal from "../components/SetGoal";
import InWithdrawalPeriod from "../components/InWithdrawalPeriod";

const Home: NextPage = () => {
  const { isConnecting, isDisconnected } = useAccount();

  if (isDisconnected) return <div>Disconnected</div>;

  return (
    <>
      <main className="container mx-auto flex flex-col max-w-4xl pt-6">
        {isConnecting && <div>Connecting...</div>}
        <div className="flex justify-between">
          <ContractTotals />
          <SaverBalance />
        </div>
        <SetGoal />
        <Deposit />
        <Withdraw />
        <InWithdrawalPeriod />
      </main>
    </>
  );
};

export default Home;
