import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import React from "react";

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
    <View style={styles.quantityPicker}>
      <TouchableOpacity onPress={decrement} style={styles.quantityButton}>
        <Text style={styles.quantityButtonText}>-</Text>
      </TouchableOpacity>
      <Text style={styles.quantityText}>{quantity}</Text>
      <TouchableOpacity onPress={increment} style={styles.quantityButton}>
        <Text style={styles.quantityButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  quantityPicker: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  quantityButton: {
    backgroundColor: "#007bff",
    padding: 5,
    borderRadius: 5,
  },
  quantityButtonText: {
    color: "#fff",
    fontSize: 20,
  },
  quantityText: {
    marginHorizontal: 20,
    fontSize: 16,
  },
});

export default QuantityPicker;
