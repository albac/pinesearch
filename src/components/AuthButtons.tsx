"use client";

import Link from "next/link";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Auth } from "aws-amplify";

export default function AuthButtons() {
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);
  const isNotAuth = authStatus && authStatus !== "authenticated";

  return <>{isNotAuth ? <SignInButton /> : <SignOutButton />}</>;
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
  return (
    <div
      onClick={() => Auth.signOut()}
      className="mt-2 rounded-full bg-fig-primary px-5 py-2 text-white sm:mt-0 font-medium"
    >
      <button>Logout</button>
    </div>
  );
}
