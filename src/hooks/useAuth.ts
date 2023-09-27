"use client";

import { useAuthenticator } from "@aws-amplify/ui-react";
import { Auth } from "aws-amplify";

export const useAuth = () => {
  const { authStatus, user } = useAuthenticator((context) => [context.user]);
  const isAuth = authStatus === "authenticated";

  const onLogout = () => {
    if (!isAuth) return;
    Auth.signOut();
  };

  const getUser = () => {
    if (!isAuth) return;

    return user;
  };

  return { isAuth, onLogout, getUser };
};
