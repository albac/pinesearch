"use client";

import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import awsconfig from "@/aws-exports";

Amplify.configure(awsconfig);

interface Props {
  children: React.ReactNode;
}
export default function AuthenticatorProvider({ children }: Props) {
  return <Authenticator.Provider>{children}</Authenticator.Provider>;
}
