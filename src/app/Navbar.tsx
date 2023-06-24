import { SignInButton, SignOutButton, SignUpButton, currentUser } from "@clerk/nextjs";
import Link from "next/link";
import StarLogoIcon from "../../public/icons/StarLogoIcon";

export default async function Navbar() {
  const user = await currentUser();

  return (
    <header className="w-full shadow-sm z-10 relative bg-white">
      <nav className="mx-auto w-11/12 max-w-[1400px] justify-between py-7 sm:flex">
        <Link
          href="/"
          className="text-center text-2xl font-bold flex items-center justify-center gap-2"
        >
          <StarLogoIcon />
          <span>PineSearch</span>
        </Link>
        <div className="mt-5 flex flex-col items-center text-center sm:mt-0 sm:flex-row sm:space-x-4">
          <button>How does it work?</button>
          {!user ? (
            <>
              <div className="mt-2 sm:mt-0">
                <SignInButton>Log in</SignInButton>
              </div>
              <div className="mt-2 rounded-full bg-fig-primary px-5 py-2 text-white sm:mt-0 font-medium">
                <SignUpButton />
              </div>
            </>
          ) : (
            <div className="mt-2 rounded-full bg-fig-primary px-5 py-2 text-white sm:mt-0 font-medium">
              <SignOutButton />
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
