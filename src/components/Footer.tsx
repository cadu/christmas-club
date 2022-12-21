import Link from "next/link";

const Footer = (props: { className: string }) => {
  return (
    <footer className={props.className}>
      <Link href="https://christmas-club.vercel.app/">
        <a>Christmas Club</a>
      </Link>
    </footer>
  );
};

export default Footer;
