"use client";

import { Authenticator } from "@aws-amplify/ui-react";
import awsconfig from "@/aws-exports";
import { Amplify, AuthModeStrategyType } from "aws-amplify";

Amplify.configure({
  ...awsconfig,
  ssr: true,
  DataStore: {
    authModeStrategyType: AuthModeStrategyType.MULTI_AUTH
  }
});

interface Props {
  children: React.ReactNode;
}
export default function AuthenticatorProvider({ children }: Props) {
  return <Authenticator.Provider>{children}</Authenticator.Provider>;
}
