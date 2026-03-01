import { tva } from "@gluestack-ui/utils";
import { Text, TextProps } from "react-native";

const baseClassName = tva({
  base: "text-foreground font-mono",
});

export function MonoText({ className, ...props }: TextProps) {
  return <Text {...props} className={baseClassName({ className })} />;
}
