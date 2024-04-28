import {
  View,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";
import React, { useState } from "react";
import Product from "../../components/product";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native-gesture-handler";
import SearchBar from "../../components/search-bar";
import { FetchShirtsParams, useShirts } from "../../hooks/use-shirts";
import { Ionicons } from "@expo/vector-icons";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { FilterPicker } from "../../components/filter-picker";

const Home = () => {
  const [search, setSearch] = useState("");
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [filters, setShoeFilters] = useState<
    Omit<FetchShirtsParams, "page" | "limit">
  >({});
  const { data, isFetching, fetchNextPage } = useShirts({
    search,
    ...filters,
  });

  const renderFooter = () => {
    return isFetching ? (
      <View style={{ marginTop: 10, alignItems: "center" }}>
        <ActivityIndicator size="large" color="#1f1f1f" />
      </View>
    ) : (
      <View className="flex grow mt-12 flex-col space-y-8 px-4 items-center justify-center text-center">
        <Ionicons name="shirt-outline" size={36} color="black" />
        <Text className="text-lg font-inter">There are no shirts to show</Text>
        <Text className="text-base font-bold font-inter">
          Try changing your filters or your search query.
        </Text>
      </View>
    );
  };

  return (
    <BottomSheetModalProvider>
      <SafeAreaView className="flex grow bg-white px-6">
        <View className="flex flex-row space-x-4 items-center">
          <SearchBar text={search} onChangeText={setSearch} />
          <FilterPicker
            onClose={() => setFiltersVisible(false)}
            onApply={(filters) => {
              setShoeFilters(() => {
                const { minPrice, maxPrice } = filters;
                return {
                  minPrice: minPrice ? Number(minPrice) * 100 : undefined,
                  maxPrice: maxPrice ? Number(maxPrice) * 100 : undefined,
                };
              });
            }}
          />
        </View>

        <View className="-mx-6 bg-neutral-50 px-6 mt-4">
          <FlatList
            contentContainerStyle={{}}
            data={(data?.pages ?? []).flatMap((page) => page.shirts)}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => (
              <View
                className={`flex basis-1/2 py-2 ${
                  index % 2 === 0 ? "pr-2" : "pl-2"
                }`}
              >
                <Product
                  title={item.title}
                  id={item.id}
                  imageUrl={item.image}
                  price={item.price}
                  stock={item.stock}
                />
              </View>
            )}
            numColumns={2}
            initialNumToRender={10}
            horizontal={false}
            onEndReachedThreshold={0.5}
            onEndReached={() => {
              fetchNextPage();
            }}
            ListFooterComponent={renderFooter}
          />
        </View>
      </SafeAreaView>
    </BottomSheetModalProvider>
  );
};

export const styles = StyleSheet.create({
  filterButton: {
    backgroundColor: "white",
    borderRadius: 50, // Adjusted for a more universally rounded appearance
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    marginLeft: 10,
  },
});

export default Home;
