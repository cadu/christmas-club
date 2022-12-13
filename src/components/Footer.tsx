import React from "react";
import Link from "next/link";
import { AiOutlineTwitter } from "react-icons/ai";
import { AiOutlineMedium } from "react-icons/ai";
import { AiOutlineInstagram } from "react-icons/ai";

const Footer = (props) => {
  return (
    <footer className={props.className}>
      <Link href="https://example.com/#contact">
        <a target="_blank">Contact</a>
      </Link>
      <Link href="https://example.com/security">
        <a target="_blank">Security</a>
      </Link>
      <Link href="/faq">
        <a>FAQ</a>
      </Link>
    </footer>
  );
};

export default Footer;
