import React, { useMemo, useCallback, memo, useState } from "react";
import { View, TextInput, Button, StyleSheet, Modal } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useShoeFilterValues } from "../hooks/use-shoes";

export interface FilterInputs {
  minPrice?: string;
  maxPrice?: string;
}

const FilterModal = memo(
  ({
    visible,
    onClose,
    onApply,
  }: {
    visible: boolean;
    onClose: () => void;
    onApply: (filters: FilterInputs) => void;
  }) => {
    console.log("visible", visible);
    const { data: filtersData, isLoading } = useShoeFilterValues();
    const [filters, setFilters] = useState<{
      minPrice?: string;
      maxPrice?: string;
    }>({});

    const snapPoints = useMemo(() => ["50%", "80%"], []);

    const handleClosePress = useCallback(() => {
      onClose();
    }, [onClose]);

    return (
      <Modal visible={visible} transparent={true} animationType="slide">
        <BottomSheet
          index={1}
          snapPoints={snapPoints}
          onClose={handleClosePress}
        >
          <BottomSheetView style={styles.container}>
            <TextInput
              style={styles.input}
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
            <TextInput
              style={styles.input}
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
            <View style={styles.buttonContainer}>
              <Button
                title="Reset"
                onPress={() => {
                  setFilters({});
                  onApply({});
                  onClose();
                }}
                color="#d9534f"
              />
              <Button
                title="Close"
                onPress={handleClosePress}
                color="#6c757d"
              />
              <Button
                title="Apply"
                onPress={() => {
                  onClose();
                  onApply(filters);
                }}
                color="#6c757d"
              />
            </View>
          </BottomSheetView>
        </BottomSheet>
      </Modal>
    );
  },
  (prev, next) => {
    return prev.visible === next.visible;
  }
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    zIndex: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ced4da",
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default FilterModal;
