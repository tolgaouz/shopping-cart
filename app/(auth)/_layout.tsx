import React, { useMemo, useState } from "react";
import { Stack } from "expo-router";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { Pressable, View, Text } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import { Feather } from "@expo/vector-icons";
import { useCartStore } from "../../store/cart.store";

export const LogoutButton = () => {
  const { signOut } = useAuth();

  const doLogout = () => {
    signOut();
  };

  return (
    <Pressable onPress={doLogout}>
      <Ionicons name="log-out-outline" size={24} color={"black"} />
    </Pressable>
  );
};

const TabsPage = () => {
  const { isSignedIn } = useAuth();

  return (
    <Stack
      screenOptions={{
        header(props) {
          const [lastItemsCount, setLastItemsCount] = useState(
            useCartStore.getState().items.length
          );
          const itemsCount = useCartStore((state) => state.items.length);

          const hasNewItems = useMemo(
            () => lastItemsCount !== itemsCount,
            [lastItemsCount, itemsCount]
          );

          return (
            <View className="relative h-12 mt-6 flex flex-row items-center justify-center border-b border-neutral-200">
              {props.back && (
                <Pressable
                  className="absolute my-auto left-4"
                  onPress={props.navigation.goBack}
                >
                  <MaterialIcons
                    name="arrow-back-ios"
                    size={20}
                    color="black"
                  />
                </Pressable>
              )}

              <Text className="text-base font-inter tracking-widest">
                {props.options.headerTitle.toString()}
              </Text>

              {props.route.name !== "cart" && (
                <View className="absolute my-auto right-4 flex flex-row space-x-2 items-center">
                  <View className="flex-1">
                    <LogoutButton />
                  </View>
                  <View className="flex-1">
                    <Pressable
                      onPress={() => {
                        props.navigation.navigate("cart");
                        // Reset notification bubble
                        setLastItemsCount(itemsCount);
                      }}
                    >
                      <Feather name="shopping-cart" size={20} color="black" />
                    </Pressable>
                  </View>
                </View>
              )}
            </View>
          );
        },
      }}
    >
      <Stack.Screen
        name="home"
        options={{
          headerTitle: "Home",
        }}
        redirect={!isSignedIn}
      />
      <Stack.Screen
        name="cart"
        options={{
          headerTitle: "Cart",
        }}
        redirect={!isSignedIn}
      />
    </Stack>
  );
};

export default TabsPage;
