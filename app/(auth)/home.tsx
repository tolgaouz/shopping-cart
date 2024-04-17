import {
  View,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import Product from "../../components/product";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native-gesture-handler";
import SearchBar from "../../components/search-bar";
import { FetchShoesParams, useShoes } from "../../hooks/use-shoes";
import FilterModal from "../../components/filter-picker";
import { Ionicons } from "@expo/vector-icons";

const Home = () => {
  const [search, setSearch] = useState("");
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [filters, setShoeFilters] = useState<
    Omit<FetchShoesParams, "page" | "limit">
  >({});
  const { data, isFetching, fetchNextPage } = useShoes({
    search,
    ...filters,
  });

  const renderFooter = () => {
    return isFetching ? (
      <View style={{ marginTop: 10, alignItems: "center" }}>
        <ActivityIndicator size="large" color="#1f1f1f" />
      </View>
    ) : null;
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: 8,
      }}
    >
      <View style={styles.filterContainer}>
        <SearchBar text={search} onChangeText={setSearch} />
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setFiltersVisible(true)}
        >
          <Ionicons name="filter" size={20} color="black" />
        </TouchableOpacity>
      </View>
      <FlatList
        contentContainerStyle={{ alignItems: "center" }}
        data={(data?.pages ?? []).flatMap((page) => page.shoes)}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Product
            title={item.title}
            id={item.id}
            imageUrl={item.image}
            price={item.price}
            stock={item.stock}
          />
        )}
        initialNumToRender={10}
        numColumns={2}
        horizontal={false}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          fetchNextPage();
        }}
        ListFooterComponent={renderFooter}
      />
      <FilterModal
        visible={filtersVisible}
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
    </SafeAreaView>
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
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default Home;
