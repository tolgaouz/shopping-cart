import { ActivityIndicator, View } from "react-native";
import React from "react";

const StartPage = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

export default StartPage;
