import React from "react";
import { Stack } from "expo-router";

const PublicLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerTitle: "Shopping Cart",
        headerBackVisible: true,
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: "600",
          fontFamily: "Inter_400Regular",
          color: "black",
        },
        headerTintColor: "black",
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name="login"
        options={{
          headerTitle: "Login",
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="register"
        options={{
          headerTitle: "Create Account",
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="reset"
        options={{
          headerTitle: "Reset Password",
        }}
      ></Stack.Screen>
    </Stack>
  );
};

export default PublicLayout;
