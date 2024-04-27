import React, { useState } from "react";
import { TextInputProps, TextInput as RNTextInput, View } from "react-native";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

export const TextInput = (props: React.PropsWithChildren<TextInputProps>) => {
  return (
    <RNTextInput
      placeholder="Email"
      className="flex items-center w-full justify-center font-inter bg-neutral-100 h-12 text-black border-none rounded-md px-3"
      {...props}
    />
  );
};

export const PasswordInput = ({
  value,
  onChangeText,
  ...restProps
}: React.PropsWithChildren<ViewProps> &
  Pick<TextInputProps, "onChangeText" | "value">) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View
      className="flex items-center p-0 w-full justify-center font-inter bg-neutral-100 h-12 text-black border-none rounded-md px-3"
      {...restProps}
    >
      <RNTextInput
        placeholder="Password"
        secureTextEntry={!showPassword}
        autoCapitalize="none"
        className="grow m-0 w-full"
        value={value}
        onChangeText={(text) => {
          onChangeText(text);
        }}
      />
      <View className="absolute right-3 top-3">
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? "eye" : "eye-off"}
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
