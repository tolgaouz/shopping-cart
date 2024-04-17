import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useCartStore } from "../store/cart.store";
import Toast from "react-native-root-toast";

export interface Product {
  id: string;
  imageUrl: string;
  price: number;
  stock: number;
  title: string;
}

const Product: React.FC<Product> = ({ id, imageUrl, price, stock, title }) => {
  const addItem = useCartStore((state) => state.addItem);
  const items = useCartStore((state) => state.items);

  const isInCart = items.some((item) => item.id === id);

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.price}>${(price / 100).toFixed(2)}</Text>
      <Text style={styles.stock}>Stock: {stock}</Text>

      {isInCart ? (
        <Text style={styles.inCartText}>In Cart</Text>
      ) : (
        <TouchableOpacity
          onPress={() => {
            addItem({
              id,
              imageUrl,
              title,
              price,
              stock,
            });
            // Add a Toast on screen.
            Toast.show("Product added to your cart.", {
              duration: Toast.durations.SHORT,
            });
          }}
          style={styles.addToCartButton}
        >
          <Text style={styles.addToCartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inCartText: {
    color: "green",
  },
  addToCartButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
  },
  addToCartButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  container: {
    padding: 10,
    width: "48%",
    margin: 4,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  stock: {
    fontSize: 14,
    color: "#666",
  },
});

export default Product;
