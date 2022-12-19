import type { NextPage } from "next";
import { useAccount, useNetwork } from "wagmi";
import ContractTotals from "../components/ContractTotals";
import Deposit from "../components/Deposit";
import Withdraw from "../components/Withdraw";
import SaverBalance from "../components/SaverBalance";
import SetGoal from "../components/SetGoal";
import toast from "react-hot-toast";
import { useEffect } from "react";

const Home: NextPage = () => {
  const { isConnecting, isDisconnected } = useAccount();
  const { chain } = useNetwork();

  useEffect(() => {
    {
      if (!chain) return;
      if (chain.id !== 31337) {
        toast.error("You're not on localhost!");
      }
    }
  }, [chain]);

  if (isDisconnected) return <div>Disconnected</div>;
  // console.log(chain.id);

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
      </main>
    </>
  );
};

export default Home;
