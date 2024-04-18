import React, { useEffect } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useCartStore } from "../../store/cart.store";
import QuantityPicker from "../../components/quantity-picker";
import Swipeable from "react-native-gesture-handler/Swipeable";
import {
  useNotifyCheckoutSuccess,
  usePaymentSheetDetails,
} from "../../hooks/use-checkout";
import { useStripe } from "@stripe/stripe-react-native";

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

  const renderItem = ({ item }) => (
    <Swipeable
      renderRightActions={(progress, dragX) => (
        <RightActions
          progress={progress}
          dragX={dragX}
          onPress={() => removeItem(item.id)}
        />
      )}
    >
      <View style={styles.listItem}>
        <Image source={{ uri: item.imageUrl }} style={styles.productImage} />
        <Text style={styles.productTitle}>{item.title}</Text>
        <QuantityPicker
          stock={item.stock}
          onQuantityChange={(quantity) => changeQuantity(item.id, quantity)}
        />
      </View>
    </Swipeable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
      <Button
        title="Checkout"
        onPress={() => {
          fetchPaymentSheetDetails({
            products: items.map((item) => ({
              id: item.id,
              quantity: item.quantity,
            })),
          });
        }}
        color="#6c47ff"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
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
