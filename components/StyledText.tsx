import { Text, TextProps } from "react-native";

export function MonoText(props: TextProps) {
  return <Text {...props} className={`font-mono ${props.className}`} />;
}
