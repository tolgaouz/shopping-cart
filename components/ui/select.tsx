import React, { ComponentProps } from "react";
import { Dropdown } from "react-native-element-dropdown";
import type { DropdownProps } from "react-native-element-dropdown/lib/typescript/components/Dropdown/model";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const Select = <T extends { label: string; value: string }>({
  data,
  selected,
  onSelect,
  iconName,
  ...restProps
}: Omit<DropdownProps<T>, "labelField" | "valueField" | "onChange"> & {
  data: T[];
  selected: string;
  onSelect: (value: string) => void;
  iconName: ComponentProps<typeof Ionicons>["name"];
}) => {
  return (
    <Dropdown
      style={[styles.dropdown]}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={data}
      search
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={"Select item"}
      searchPlaceholder="Search..."
      value={selected}
      onChange={(item) => {
        onSelect(item.value);
      }}
      renderLeftIcon={() => (
        <Ionicons
          name={iconName}
          size={16}
          color="black"
          style={{ marginRight: 8 }}
        />
      )}
      {...restProps}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
  },
  dropdown: {
    height: "auto",
    width: "100%",
    flex: 1,
    flexGrow: 1,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
