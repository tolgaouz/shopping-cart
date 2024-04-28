import React, { useEffect, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { ICartItem, useCartStore } from "../../store/cart.store";
import QuantityPicker from "../../components/quantity-picker";
import Swipeable from "react-native-gesture-handler/Swipeable";
import {
  useNotifyCheckoutSuccess,
  usePaymentSheetDetails,
} from "../../hooks/use-checkout";
import { useStripe } from "@stripe/stripe-react-native";
import { Button } from "../../components/ui/button";

const Cart = () => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const { items, removeItem, changeQuantity } = useCartStore();

  const {
    data: paymentSheetDetails,
    mutateAsync: fetchPaymentSheetDetails,
    error,
  } = usePaymentSheetDetails();

  const { mutateAsync: notifyCheckoutSuccess } = useNotifyCheckoutSuccess();

  // Handle error
  useEffect(() => {
    // SHow alert
    if (error) {
      Alert.alert("Error", error.message);
    }
  }, [error]);

  useEffect(() => {
    if (paymentSheetDetails) {
      const { customer, ephemeralKey, paymentIntent } = paymentSheetDetails;
      console.log(customer, ephemeralKey, paymentIntent);
      initPaymentSheet({
        merchantDisplayName: "Shopping Cart, Inc.",
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        returnURL: "https://tolgaoguz.dev",
      })
        .then(() => {
          return presentPaymentSheet();
        })
        .then(() => {
          useCartStore.getState().clearCart();
          return notifyCheckoutSuccess({
            products: items.map((item) => ({
              id: item.id,
              quantity: item.quantity,
            })),
          });
        });
    }
  }, [paymentSheetDetails]);

  const RightActions = ({ progress, dragX, onPress }) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.deleteBox}>
          <Text style={styles.deleteText}>Remove</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item }: { item: ICartItem }) => (
    <Swipeable
      renderRightActions={(progress, dragX) => (
        <RightActions
          progress={progress}
          dragX={dragX}
          onPress={() => removeItem(item.id)}
        />
      )}
    >
      <View className="flex flex-row items-center bg-white px-4 py-2">
        <Image
          source={{ uri: item.imageUrl }}
          className="w-20 object-contain rounded-md h-20 mr-3"
        />
        <View className="flex-1 flex-col justify-center space-y-2">
          <Text>{item.title}</Text>
          <Text className="text-orange-600">
            ₺{(item.price / 100).toFixed(2)}
          </Text>
        </View>
        <QuantityPicker
          stock={item.stock}
          onQuantityChange={(quantity) => changeQuantity(item.id, quantity)}
        />
      </View>
    </Swipeable>
  );

  const totalPrice = useMemo(
    () => items.reduce((total, item) => total + item.price * item.quantity, 0),
    [items]
  );

  return (
    <View className="flex-1 justify-between">
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
      <View className="flex flex-col space-y-4 bg-white p-4 rounded-t-md">
        <View>
          <Text>
            Total Price:{" "}
            <Text className="text-orange-600">
              ₺{(totalPrice / 100).toFixed(2)}
            </Text>
          </Text>
        </View>
        <Button
          className="bg-green-600"
          onPress={() => {
            fetchPaymentSheetDetails({
              products: items.map((item) => ({
                id: item.id,
                quantity: item.quantity,
              })),
            });
          }}
        >
          <Text className="text-white text-base">Checkout</Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  productImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  productTitle: {
    flex: 1,
  },
  deleteBox: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: "100%",
  },
  deleteText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Cart;
