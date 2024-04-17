import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SearchBar = ({
  text,
  onChangeText,
}: {
  text: string;
  onChangeText: (text: string) => void;
}) => {
  return (
    <View style={styles.container}>
      <Ionicons name="ios-search" size={20} color="black" />
      <TextInput
        placeholder="Search..."
        style={styles.input}
        value={text}
        onChange={(e) => {
          onChangeText(e.nativeEvent.text);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
    padding: 10,
    overflow: "hidden",
  },
  input: {
    marginLeft: 10,
    flex: 1,
  },
});

export default SearchBar;
