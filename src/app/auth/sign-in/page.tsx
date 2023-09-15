"use client";

import React, { ReactNode } from "react";
import {
  Authenticator,
  Theme,
  ThemeProvider,
  View,
  defaultDarkModeOverride,
  useTheme
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import Image from "next/image";

export default function Page() {
  const theme: Theme = {
    name: "pinesearch-theme",
    overrides: [defaultDarkModeOverride]
  };

  const components = {
    Header() {
      const { tokens } = useTheme();

      return (
        <div className="mx-32">
          <View textAlign="center" padding={tokens.space.large}>
            <Image width={200} height={200} alt="Pinesearch logo" src="/dummy-post.png" />
          </View>
        </div>
      );
    }
  };
  return (
    <div style={{ height: "calc(100vh - 96px)" }} className="flex justify-center items-center">
      <Authenticator components={components}>
        <ThemeProvider theme={theme} colorMode="system">
          <p>authenticate</p>
        </ThemeProvider>
      </Authenticator>
    </div>
  );
}
