import { useState } from "react";
import Link from "next/link";
import { ConnectKitButton } from "connectkit";
import { useAccount } from "wagmi";

interface MenuItemProps {
  link: string;
  text: string;
}

const Nav = () => {
  const { address, isConnecting, isDisconnected } = useAccount();

  const menuItems: MenuItemProps[] = [
    {
      link: "/demo",
      text: "Demo",
    },
  ];

  return (
    <>
      <nav className="md:flex hidden justify-between w-full max-w-4xl items-center mx-auto p-6 lg:px-0 shrink-0">
        <Link href="/">
          <a className="font-bold">Christmas Club</a>
        </Link>
        <Link href="/explainer">
          <a>What is Christmas Club?</a>
        </Link>
        {menuItems.map((menu) => (
          <Link key={menu.link} href={menu.link}>
            {menu.text}
          </Link>
        ))}

        <ConnectKitButton />
      </nav>
    </>
  );
};

export default Nav;
