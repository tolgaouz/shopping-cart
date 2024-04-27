import React from "react";
import { View, Text } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import Spinner from "react-native-loading-spinner-overlay";
import { useState } from "react";
import { Stack } from "expo-router";
import { PasswordInput, TextInput } from "../../components/ui/text-input";
import { Button } from "../../components/ui/button";

const Register = () => {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  // Create the user and send the verification email
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      // Create the user on Clerk
      await signUp.create({
        emailAddress,
        password,
      });

      // Send verification Email
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to verify the email address
      setPendingVerification(true);
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  // Verify the email address
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex flex-col grow items-center justify-center bg-white">
      <Stack.Screen options={{ headerBackVisible: !pendingVerification }} />
      <Spinner visible={loading} />

      {!pendingVerification && (
        <View className="flex flex-col w-full grow items-center justify-center px-8 gap-8">
          <View className="w-full space-y-8">
            <Text className="text-black font-inter-semibold text-xl text-left">
              Register to start using the Shopping Cart App!
            </Text>
            <Text className="font-inter">
              Please provide your credentials. You'll receive a verification
              code to your email.
            </Text>
          </View>
          <View className="w-full">
            <Text className="mb-4">Email</Text>
            <TextInput
              placeholder="me@tolgaoguz.dev"
              value={emailAddress}
              onChangeText={setEmailAddress}
            />
          </View>

          <View className="w-full">
            <Text className="mb-4">Password</Text>
            <PasswordInput value={password} onChangeText={setPassword} />
          </View>

          <View className="w-full">
            <Button onPress={onSignUpPress}>
              <Text className="text-white font-inter font-lg">Sign up</Text>
            </Button>
          </View>
        </View>
      )}

      {pendingVerification && (
        <>
          <View>
            <TextInput
              value={code}
              placeholder="Code..."
              onChangeText={setCode}
            />
          </View>
          <Button onPress={onPressVerify}>
            <Text>Verify Email</Text>
          </Button>
        </>
      )}
    </View>
  );
};

export default Register;
