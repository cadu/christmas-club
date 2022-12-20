import type { NextPage } from "next";
import { useAccount } from "wagmi";
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
  const { isDisconnected, isConnected } = useAccount();

  useEffect(() => {
    AOS.init();
  });

  if (isDisconnected)
    return (
      <div className="flex">
        Connect your Wallet and participate in Christmas Club
      </div>
    );

  return (
    isConnected && (
      <>
        <main className="container mx-auto flex flex-col max-w-4xl pt-6">
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
    )
  );
};

export default Home;
