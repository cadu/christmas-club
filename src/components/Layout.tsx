import Nav from "./Nav";
import Footer from "./Footer";
import { ReactNode } from "react";
import Hero from "./Hero";
import Head from "next/head";
import pattern from "../../public/pattern.svg";
import { Toaster } from "react-hot-toast";

export default function Layout(props: { children: ReactNode }) {
  return (
    <>
      <Head>
        <title>Christmas Club</title>
      </Head>

      <div className="flex flex-col bg-[url('../../public/pattern.svg')] bg-cover bg-center bg-opacity-10 items-stretch min-h-screen bg-slate-200">
        {/* <Hero /> */}
        <Nav />
        <main className="flex w-full max-w-4xl mx-auto grow shrink-0  rounded-lg ">
          {props.children}
        </main>
        <Footer className="shrink-0 mt-auto items-end flex w-full max-w-4xl mx-auto p-3 md:p-0 my-6 md:my-12 gap-3 " />
      </div>
    </>
  );
}
