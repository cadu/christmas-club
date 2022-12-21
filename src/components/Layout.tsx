import Nav from "./Nav";
import Footer from "./Footer";
import { ReactNode } from "react";
import Head from "next/head";
import pattern from "../../public/ccpattern.svg";
import { Toaster } from "react-hot-toast";

export default function Layout(props: { children: ReactNode }) {
  return (
    <>
      <Head>
        <title>Christmas Club</title>
      </Head>
      <Toaster position="top-right" />
      <div
        className="bg-cover bg-center items-stretch min-h-screen flex flex-col justify-evenly"
        style={{
          backgroundImage: `linear-gradient(rgba(152, 152, 152, 0.95), #e3e3e3), url(${pattern.src})`,
        }}
      >
        {/* <Hero /> */}
        <Nav />
        <main className="flex w-full max-w-4xl mx-auto grow shrink-0  rounded-lg px-4 md:px-0">
          {props.children}
        </main>
        <Footer
          data-aos="fade-up"
          data-aos-fa="310"
          className="shrink-0 min-h-full mt-auto items-end flex w-full max-w-4xl mx-auto p-3 md:p-0 my-6 md:my-12 gap-3 border border-t-slate-400"
        />
      </div>
    </>
  );
}
