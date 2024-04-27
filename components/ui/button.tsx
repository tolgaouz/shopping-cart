import React from "react";
import { Pressable, PressableProps } from "react-native";

export const Button = (props: React.PropsWithChildren<PressableProps>) => {
  return (
    <Pressable
      className="bg-indigo-600 h-12 text-white flex items-center justify-center w-full rounded-md"
      {...props}
    >
      {props.children}
    </Pressable>
  );
};
