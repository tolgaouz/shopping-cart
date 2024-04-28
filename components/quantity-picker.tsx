import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import React from "react";
import { Button } from "./ui/button";

const QuantityPicker: React.FC<{
  stock: number;
  onQuantityChange: (quantity: number) => void;
}> = ({ stock, onQuantityChange }) => {
  const [quantity, setQuantity] = React.useState(1);

  const increment = () => {
    if (quantity < stock) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      onQuantityChange(newQuantity);
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange(newQuantity);
    }
  };

  return (
    <View className="flex-row items-center justify-between mt-2.5">
      <Button onPress={decrement} className="w-6" variant="outline">
        <Text className="text-black text-lg font-inter">-</Text>
      </Button>
      <Text className="mx-5 text-sm">{quantity}</Text>
      <Button
        onPress={increment}
        className="w-6 flex justify-center items-center"
        variant="outline"
      >
        <Text className="text-black text-lg font-inter">+</Text>
      </Button>
    </View>
  );
};

export default QuantityPicker;
