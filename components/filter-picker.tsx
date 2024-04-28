import React, { useCallback, useMemo, useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput } from "./ui/text-input";
import { Button } from "./ui/button";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";
import { useShirtFilterValues } from "../hooks/use-shirts";
import { Dropdown } from "react-native-element-dropdown";
import { Select } from "./ui/select";

export interface FilterInputs {
  minPrice?: string;
  maxPrice?: string;
  color?: string;
  material?: string;
}

export const FilterPicker = ({
  onClose,
  onApply,
}: {
  onClose: () => void;
  onApply: (filters: FilterInputs) => void;
}) => {
  const { data: filtersData, isLoading } = useShirtFilterValues();
  const [filters, setFilters] = useState<{
    minPrice?: string;
    maxPrice?: string;
    material?: string;
    color?: string;
  }>({});
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ["50%", "90%"], []);

  // callbacks
  const openModal = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const closeModal = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  // renders
  return (
    <View className="ml-2">
      <TouchableOpacity
        className="h-8 w-8 rounded-full border border-neutral-300 flex items-center justify-center"
        onPress={openModal}
      >
        <Ionicons name="filter-outline" size={16} color="black" />
      </TouchableOpacity>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <BottomSheetView
          style={{
            flexGrow: 1,
            paddingTop: 16,
            paddingBottom: 16,
            paddingHorizontal: 16,
          }}
        >
          <View className="flex flex-col flex-1 space-y-6">
            <View className="flex flex-row space-x-4">
              <View className="w-full flex flex-col flex-1">
                <Text className="mb-2">Min. Price</Text>
                <TextInput
                  placeholder="Min Price"
                  value={filters?.minPrice}
                  inputMode="numeric"
                  onChangeText={(minPrice) =>
                    setFilters((p) => ({
                      ...p,
                      minPrice: minPrice ? minPrice : undefined,
                    }))
                  }
                  keyboardType="numeric"
                />
              </View>
              <View className="w-full flex flex-col flex-1">
                <Text className="mb-2">Min. Price</Text>
                <TextInput
                  placeholder="Max Price"
                  value={filters.maxPrice}
                  inputMode="numeric"
                  onChangeText={(maxPrice) =>
                    setFilters((p) => ({
                      ...p,
                      maxPrice: maxPrice ? maxPrice : undefined,
                    }))
                  }
                  keyboardType="numeric"
                />
              </View>
            </View>
            <View className="flex flex-row h-20">
              <View className="flex flex-col flex-1">
                <Text className="mb-2">Material</Text>
                <Select
                  data={
                    filtersData?.materials.map((m) => ({
                      label: m,
                      value: m,
                    })) ?? []
                  }
                  selected={filters.material}
                  onSelect={(value) =>
                    setFilters((p) => ({
                      ...p,
                      material: !p.material ? value : undefined,
                    }))
                  }
                  iconName="shirt-outline"
                />
              </View>
            </View>
            <View className="flex flex-row h-20">
              <View className="flex flex-col flex-1">
                <Text className="mb-2">Color</Text>
                <Select
                  data={
                    filtersData?.colors.map((m) => ({
                      label: m,
                      value: m,
                    })) ?? []
                  }
                  selected={filters.color}
                  onSelect={(value) =>
                    setFilters((p) => ({
                      ...p,
                      color: !p.color ? value : undefined,
                    }))
                  }
                  iconName="color-palette"
                  maxHeight={200}
                />
              </View>
            </View>
          </View>
          <View className="flex flex-row justify-between space-x-4">
            <Button
              onPress={() => {
                setFilters({});
                onApply({});
                closeModal();
              }}
              variant="outline"
              className="flex-1"
            >
              <Text>Reset</Text>
            </Button>
            <Button variant="outline" className="flex-1" onPress={closeModal}>
              <Text>Close</Text>
            </Button>
            <Button
              className="flex-1"
              onPress={() => {
                onClose();
                onApply(filters);
                closeModal();
              }}
            >
              <Text className="text-white">Apply</Text>
            </Button>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
};
