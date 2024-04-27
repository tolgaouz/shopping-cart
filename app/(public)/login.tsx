import { useSignIn } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import React, { useState } from "react";
import { View, Pressable, Text } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { PasswordInput, TextInput } from "../../components/ui/text-input";
import { Button } from "../../components/ui/button";

const Login = () => {
  const { signIn, setActive, isLoaded } = useSignIn();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);
    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex grow flex-col items-start justify-center px-8 pr-16 bg-white gap-8">
      <Spinner visible={loading} />
      <Text className="text-black text-xl font-inter-semibold text-left">
        Welcome to Shopping Cart App
      </Text>
      <Text>Please provide your credentials to login.</Text>

      <View className="w-full">
        <Text className="mb-4">Email</Text>
        <TextInput
          placeholder="me@tolgaoguz.dev"
          value={emailAddress}
          onChangeText={setEmailAddress}
          autoCapitalize="none"
        />
      </View>

      <View className="w-full">
        <Text className="mb-4">Password</Text>
        <PasswordInput value={password} onChangeText={setPassword} />
      </View>

      <View className="w-full">
        <Button onPress={onSignInPress}>
          <Text className="text-white font-inter text-base">Login</Text>
        </Button>
      </View>

      <Link href="/reset" asChild>
        <Pressable>
          <Text>Forgot password?</Text>
        </Pressable>
      </Link>
      <Link href="/register" asChild>
        <Pressable>
          <Text>Create Account</Text>
        </Pressable>
      </Link>
    </View>
  );
};

export default Login;
