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
      <div className="social ml-auto gap-3 flex">
        <Link href="https://twitter.com">
          <a className="flex items-center">
            <AiOutlineTwitter />{" "}
            <span className="hidden md:block">Twitter</span>
          </a>
        </Link>
        <Link href="https://instagram.com">
          <a className="flex items-center">
            <AiOutlineInstagram />{" "}
            <span className="hidden md:block">Instagram</span>
          </a>
        </Link>
        <Link href="https://medium.com">
          <a className="flex items-center">
            <AiOutlineMedium />
            <span className="hidden md:block">Medium</span>
          </a>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
