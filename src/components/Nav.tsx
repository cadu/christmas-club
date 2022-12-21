import { useState } from "react";
import Link from "next/link";
import { ConnectKitButton } from "connectkit";
import { useAccount } from "wagmi";
import PopoverAbout from "./PopoverAbout";

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
      <nav className="md:flex justify-between w-full max-w-4xl items-center mx-auto p-6 lg:px-0 shrink-0">
        <Link href="/">
          <a className="text-2xl font-bold">Christmas Club</a>
        </Link>
        <PopoverAbout />
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
