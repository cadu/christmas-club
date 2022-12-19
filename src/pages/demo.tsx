import type { NextPage } from "next";
import MintSavingsToken from "../components/MintSavingsToken";
import SaverBalance from "../components/SaverBalance";

const Demo: NextPage = () => {
  return (
    <main className="container mx-auto flex flex-col max-w-4xl pt-6">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h2>Welcome to the demo page.</h2>
          <MintSavingsToken />
        </div>
        <SaverBalance />
      </div>
    </main>
  );
};

export default Demo;
