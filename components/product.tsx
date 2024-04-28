import React from "react";
import { View, Text, Image } from "react-native";
import { useCartStore } from "../store/cart.store";
import Toast from "react-native-root-toast";
import { Button } from "./ui/button";

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
    <View className="flex flex-col border border-neutral-200 items-center w-full justify-center space-y-2 py-4 px-2.5 bg-white h-fit rounded-lg">
      <Image
        source={{ uri: imageUrl }}
        className="w-32 h-32 object-contain rounded-md"
      />
      <View className="flex flex-col items-start text-start w-full justify-center mt-2 space-y-2">
        <Text className="text-neutral-900 text-base">{title}</Text>
        <Text className="text-orange-600 text-sm">
          ₺{(price / 100).toFixed(2)}
        </Text>
        <Text className="text-neutral-500 text-sm">Stock: {stock}</Text>
      </View>

      {isInCart ? (
        <Text className="text-green-600 text-sm">In Cart</Text>
      ) : (
        <Button
          variant="outline"
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
          className="h-8"
        >
          <Text>Add to Cart</Text>
        </Button>
      )}
    </View>
  );
};

export default Product;
