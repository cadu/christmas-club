import Link from "next/link";

const Footer = (props: { className: string }) => {
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
