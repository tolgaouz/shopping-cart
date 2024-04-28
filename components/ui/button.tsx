import React from "react";
import { Pressable, PressableProps } from "react-native";
import clsx from "clsx";

export const Button = ({
  variant = "default",
  children,
  className,
  ...props
}: React.PropsWithChildren<PressableProps> & {
  variant?: "default" | "outline";
}) => {
  return (
    <Pressable
      className={clsx(
        "h-12 flex items-center justify-center w-full rounded-md",
        variant === "default"
          ? "bg-indigo-600 text-white"
          : "bg-white border border-neutral-600",
        className
      )}
      {...props}
    >
      {children}
    </Pressable>
  );
};
