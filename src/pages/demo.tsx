import type { NextPage } from "next";
import MintSavingsToken from "../components/MintSavingsToken";
import SaverBalance from "../components/SaverBalance";
import InWithdrawalPeriod from "../components/InWithdrawalPeriod";

const Demo: NextPage = () => {
  return (
    <main className="container mx-auto flex flex-col max-w-4xl pt-6">
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <h2 className="font-bold text-2xl pb-6">Welcome to the demo page.</h2>
          <p>Don't have USDC? We got you covered!</p>
          <p className="pb-6">Click the button bellow and get $ 100 :)</p>
          <MintSavingsToken />
        </div>
        <SaverBalance />
      </div>
      <InWithdrawalPeriod />
    </main>
  );
};

export default Demo;
