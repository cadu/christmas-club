import type { NextPage } from "next";
import Head from "next/head";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";

const Explainer: NextPage = () => {
  return (
    <>
      <Head>
        <title>Christmas Club</title>
      </Head>

      <main className="container mx-auto flex flex-col max-w-4xl p-4 mt-16 md:mt-0">
        <div className="w-full max-w-md rounded-2xl bg-white">
          <h2 className="text-2xl py-6">Tell me about Christmas Club</h2>
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-gray-100 px-4 py-2 text-left text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75">
                  <span>What is Christmas Club?</span>
                  <ChevronUpIcon
                    className={`${
                      open ? "rotate-180 transform" : ""
                    } h-5 w-5 text-gray-500`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                <p>Christmas is a time of giving, but that can mean many expenses
                in a short period ... at what might not be a good time.  Instead,
                wouldn't it be great to have somewhere to save at a time and
                pace that suits you? Somewhere where your savings are held safe 
                until you need it to start your holiday season shopping?</p>
                <p>In a Christmas Club, you can set a savings goal, and save
                towards that goal until you need to start your Christmas shopping. 
                Then you get all of your savings back in one go.  No matter the 
                temptation to spend, you cannot access your savings until the 
                holiday season starts.</p>
                <p>Christmas Clubs are offered by employers - setting a defined
                amount from wages aside from early in the year until December - 
                and by retailers, to put towards goods and services they will
                have for sale in December.  Of course, in these schemes there
                are constraints: you need to trust the employer's solvency, 
                and once enrolled in a retailer's scheme you cannot shop around
                for better deals than that retailer offers.</p>
                <p>We now offer a Christmas Club on-chain!  Because your savings
                are locked on-chain, you do not have to trust anyone ... even 
                yourself!  You can save towards your goal regularly, in one go,
                or in bursts as suits your income.  No matter the temptation to
                spend during the year, you cannot until the start of December,
                when you can withdraw it all anytime in the month.</p>
                <p>The peace of mind that comes with having saved in advance for
                  this expensive time is your gift to yourself.</p>

                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
      </main>
    </>
  );
};
export default Explainer;
