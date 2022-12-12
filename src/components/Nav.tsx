import { useState } from "react";
import Link from "next/link";
import { ConnectKitButton } from "connectkit";
import { useAccount } from "wagmi";
import { useIsMounted } from "../hooks/useIsMounted";

interface MenuItemProps {
  link: string;
  text: string;
}

const Nav = () => {
  const { address, isConnecting, isDisconnected } = useAccount();

  const menuItems: MenuItemProps[] = [
    {
      link: "/#menu1",
      text: "Menu 1",
    },
    {
      link: "/#menu2",
      text: "Menu 2",
    },
  ];

  return (
    <>
      <nav className="md:flex hidden justify-between w-full max-w-4xl mx-auto p-6 lg:px-0 shrink-0">
        <Link href="/">
          <a>My logo</a>
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
