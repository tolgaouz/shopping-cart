import React from "react";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { RootSiblingParent } from "react-native-root-siblings";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../lib/query-client";

const CLERK_PUBLISHABLE_KEY =
  "pk_test_bWVycnktcHl0aG9uLTE1LmNsZXJrLmFjY291bnRzLmRldiQ";

const InitialLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    const inTabsGroup = segments[0] === "(auth)";

    if (isSignedIn && !inTabsGroup) {
      router.replace("/home");
    } else if (!isSignedIn) {
      router.replace("/login");
    }
  }, [isSignedIn]);

  return <Slot />;
};

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

const RootLayout = () => {
  return (
    <RootSiblingParent>
      <ClerkProvider
        publishableKey={CLERK_PUBLISHABLE_KEY}
        tokenCache={tokenCache}
      >
        <QueryClientProvider client={queryClient}>
          <InitialLayout />
        </QueryClientProvider>
      </ClerkProvider>
    </RootSiblingParent>
  );
};

export default RootLayout;
