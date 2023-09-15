"use client";

import { useAuthenticator } from "@aws-amplify/ui-react";
import { Auth } from "aws-amplify";

export const useAuth = () => {
  const { authStatus } = useAuthenticator((context) => [context.user]);
  const isAuth = authStatus === "authenticated";

  const onLogout = () => {
    if (!isAuth) return;
    Auth.signOut();
  };

  return { isAuth, onLogout };
};
