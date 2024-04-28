import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import clsx from "clsx";

const SearchBar = ({
  text,
  onChangeText,
  className,
}: {
  text: string;
  onChangeText: (text: string) => void;
  className?: string;
}) => {
  return (
    <View
      className={clsx(
        "flex flex-1 flex-row items-center p-2.5 rounded-md bg-neutral-100",
        className
      )}
    >
      <Ionicons name="ios-search" size={20} color="black" />
      <TextInput
        placeholder="Search..."
        className="w-full ml-4"
        value={text}
        onChange={(e) => {
          onChangeText(e.nativeEvent.text);
        }}
      />
    </View>
  );
};

export default SearchBar;
