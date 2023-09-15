import Link from "next/link";
import Image from "next/image";
import AuthButtons from "./AuthButtons";

export default async function Navbar() {
  return (
    <header className="w-full shadow-sm z-10 relative bg-white">
      <nav className="mx-auto w-11/12 max-w-[1400px] justify-between py-7 sm:flex">
        <Link
          href="/"
          className="text-center text-2xl font-bold flex items-center justify-center gap-2"
        >
          <Image src="/PinesearchLogo.png" width={171} height={36} alt="logo" />
        </Link>
        <div className="mt-5 flex flex-col items-center text-center sm:mt-0 sm:flex-row sm:space-x-4">
          <Link href="/how-it-work">How does it work?</Link>
          <AuthButtons />
        </div>
      </nav>
    </header>
  );
}
