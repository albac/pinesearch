"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export default function AuthButtons() {
  const { isAuth } = useAuth();
  return isAuth ? <SignOutButton /> : <SignInButton />;
}

function SignInButton() {
  return (
    <Link className="text-white" href="/auth/sign-in">
      <div className="rounded-full bg-fig-primary px-5 py-2 text-white sm:mt-0 font-medium">
        <button>Sign in / Sign up</button>
      </div>
    </Link>
  );
}

function SignOutButton() {
  const { onLogout } = useAuth();
  return (
    <div
      onClick={onLogout}
      className="mt-2 rounded-full bg-fig-primary px-5 py-2 text-white sm:mt-0 font-medium"
    >
      <button>Logout</button>
    </div>
  );
}
