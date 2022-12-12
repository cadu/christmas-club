import Nav from "./Nav";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col items-stretch min-h-screen">
      <Nav />
      <main className="flex w-full max-w-4xl mx-auto grow shrink-0">
        {children}
      </main>
      <Footer className="shrink-0 mt-auto flex w-full max-w-4xl mx-auto p-3 md:p-0 my-6 md:my-12 gap-3 " />
    </div>
  );
}
