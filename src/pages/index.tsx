import type { NextPage } from "next";
import { useAccount } from "wagmi";
import ContractTotals from "../components/ContractTotals";
import Deposit from "../components/Deposit";
import Withdraw from "../components/Withdraw";
import SaverBalance from "../components/SaverBalance";
import SetGoal from "../components/SetGoal";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { useState } from "react";

const Home: NextPage = () => {
  const { isDisconnected, isConnected } = useAccount();
  const [saverUSDCBalance, setSaverUSDCBalance] = useState("");
  const [contractBalance, setContractBalance] = useState("");
  const [goal, setGoal] = useState(0);
  //const [numDepositsMsg, setNumDepositsMsg] = useState("");

  //check what to demo 
  const ShowNumDeposits = () => {
    let depositsMsgFragments = "";
    let monthsUntilWithdrawalStart = 6; //assume in June for Demo
    const currentMonth = new Date().getMonth();
    if (currentMonth != 11) {
      //if it is not use correct nubmer of months
      monthsUntilWithdrawalStart = (11 - currentMonth);
    } else {
      depositsMsgFragments = "Demo for December as if June:";
    }
    if (isConnected) {
      if (goal > 0) {
        let contractBalanceAsNum: number = 0.0;
        try {
          contractBalanceAsNum = parseFloat(contractBalance);
        } catch(err) {
          console.log("could not parse saver current contract balance");
        }
        if (parseFloat(contractBalance) >= goal) {
          depositsMsgFragments += "You do not need to make any more deposits to reach your current goal!"
        } else {
          const remainingAmount: number  = (goal - parseFloat(contractBalance));
          const avgDepositPerMonth = (remainingAmount / monthsUntilWithdrawalStart).toFixed(2);
          depositsMsgFragments += `You can reach your goal by depositing extra ${avgDepositPerMonth} for ${monthsUntilWithdrawalStart} months`;
        }
        //setNumDepositsMsg(depositsMsgFragments);
      } else {
        //setNumDepositsMsg("");
        depositsMsgFragments = "";
      }
    }
    const numDepositsMsg = depositsMsgFragments;
    return ( <>{numDepositsMsg}</> );
  }

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
            <SaverBalance
              contractBalance={contractBalance}
              setContractBalance={setContractBalance}
              setSaverUSDCBalance={setSaverUSDCBalance}
              saverUSDCBalance={saverUSDCBalance}
            />
          </div>
          <div className="flex flex-col gap-12 pt-12">
            <div className="grid grid-cols-2  gap-6 justify-evenly items-center">
              <label htmlFor="setGoal" data-aos="fade-left">
                Set your goal for Christmas Club
              </label>
              <div className="flex flex-col">
                <SetGoal
                  contractBalance={contractBalance}
                  goal={goal}
                  setGoal={setGoal}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6 items-center">
              <Deposit saverUSDCBalance={saverUSDCBalance} />
              <label
                htmlFor="depositAmount"
                data-aos="fade-right"
                data-aos-delay="310"
                className=""
              >
                Start saving today and keep track of your progress...
              </label>
              <ShowNumDeposits />
            </div>
            <div className="grid grid-cols-2 gap-6 justify-evenly items-center">
              <div data-aos="fade-right" data-aos-delay="450">
                ...withdraw your savings and enjoy the festivities!
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
