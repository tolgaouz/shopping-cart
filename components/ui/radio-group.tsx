import React, { useMemo, useState } from "react";
import RadioGroup, { RadioButtonProps } from "react-native-radio-buttons-group";

export function RadioButtonGroup({
  data,
  onChange,
  selectedId,
  ...restProps
}: Omit<
  React.ComponentProps<typeof RadioGroup>,
  "radioButtons" | "onPress" | "selectedId"
> & {
  data: RadioButtonProps[];
  onChange: (value: string) => void;
  selectedId: string | undefined;
}) {
  return (
    <RadioGroup
      radioButtons={data}
      onPress={onChange}
      selectedId={selectedId}
      {...restProps}
    />
  );
}
