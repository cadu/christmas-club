import type { NextPage } from "next";
import Head from "next/head";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";

const FAQ: NextPage = () => {
  return (
    <>
      <Head>
        <title>Christmas Club</title>
      </Head>

      <main className="container mx-auto flex flex-col max-w-4xl p-4 mt-16 md:mt-0">
        <div className="w-full max-w-md rounded-2xl bg-white">
          <h2 className="text-2xl py-6">FAQ</h2>
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-gray-100 px-4 py-2 text-left text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75">
                  <span>How can I withdraw my investment?</span>
                  <ChevronUpIcon
                    className={`${
                      open ? "rotate-180 transform" : ""
                    } h-5 w-5 text-gray-500`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                  You can withdraw your investment after the completion. Check
                  details in &lsquo;My Investments&rsquo; page.
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <Disclosure as="div" className="mt-2">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-gray-100 px-4 py-2 text-left text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75">
                  <span>
                    Can I invest in more than one project at the same time?
                  </span>
                  <ChevronUpIcon
                    className={`${
                      open ? "rotate-180 transform" : ""
                    } h-5 w-5 text-gray-500`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                  Yes. You can invest in all active projects.
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <Disclosure as="div" className="mt-2">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-gray-100 px-4 py-2 text-left text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75">
                  <span>How can I follow the restoring process?</span>
                  <ChevronUpIcon
                    className={`${
                      open ? "rotate-180 transform" : ""
                    } h-5 w-5 text-gray-500`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                  You can check the restoring process going to My investments
                  page.
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
      </main>
    </>
  );
};
export default FAQ;
