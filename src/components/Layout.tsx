import Nav from "./Nav";
import Footer from "./Footer";
import { ReactNode } from "react";
import Head from "next/head";
import { Toaster } from "react-hot-toast";

export default function Layout(props: { children: ReactNode }) {
  return (
    <>
      <Head>
        <title>Christmas Club</title>
      </Head>
      <div>
        <Toaster />
      </div>
      <div className="flex flex-col items-stretch min-h-screen">
        <Nav />
        <main className="flex w-full max-w-4xl mx-auto grow shrink-0">
          {props.children}
        </main>
        <Footer className="shrink-0 mt-auto items-end flex w-full max-w-4xl mx-auto p-3 md:p-0 my-6 md:my-12 gap-3 " />
      </div>
    </>
  );
}
