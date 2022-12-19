import type { NextPage } from "next";
import { useAccount, useNetwork } from "wagmi";
import ContractTotals from "../components/ContractTotals";
import Deposit from "../components/Deposit";
import Withdraw from "../components/Withdraw";
import SaverBalance from "../components/SaverBalance";
import SetGoal from "../components/SetGoal";
import AOS from "aos";
import "aos/dist/aos.css";
import toast from "react-hot-toast";
import { useEffect } from "react";

const Home: NextPage = () => {
  AOS.init();
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

  return (
    <>
      <main className="container mx-auto flex flex-col max-w-4xl pt-6">
        {isConnecting && <div>Connecting...</div>}

        <div className="flex justify-between">
          <ContractTotals />
          <SaverBalance />
        </div>
        <div className="flex flex-col gap-12 pt-12">
          <div className="flex flex-row  justify-evenly items-center">
            <label htmlFor="setGoal" data-aos="fade-left">
              Set your goal for Christmas Club
            </label>
            <SetGoal />
          </div>
          <div className="flex flex-row justify-evenly items-center">
            <Deposit />
            <label
              htmlFor="depositAmount"
              data-aos="fade-right"
              data-aos-delay="310"
              className=""
            >
              Start saving today and keep track of your progress...
            </label>
          </div>
          <div className="flex justify-evenly items-center">
            <div data-aos="fade-right" data-aos-delay="450">
              ...withdraw your savings and enjoy the festives!
            </div>
            <Withdraw />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
