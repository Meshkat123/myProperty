// Icon component with MaterialIcons fallback and FontAwesome support for tabs.

import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SymbolWeight } from "expo-symbols";
import { ComponentProps } from "react";
import { OpaqueColorValue, type StyleProp, type TextStyle } from "react-native";

type IconMapping = Record<string, ComponentProps<typeof MaterialIcons>["name"]>;

/**
 * SF Symbols to Material Icons mappings.
 */
const MAPPING: IconMapping = {
  "house.fill": "home",
  "paperplane.fill": "send",
  "chevron.left.forwardslash.chevron.right": "code",
  "chevron.right": "chevron-right",
};

/**
 * SF Symbols to FontAwesome5 mappings (solid style icons).
 */
const FONTAWESOME_MAPPING: Record<string, keyof typeof FontAwesome5.glyphMap> =
  {
    "house.fill": "home",
    "building.2.fill": "building",
    "person.fill": "user",
  };

type IconType = "sf" | "fontawesome";

export function IconSymbol({
  name,
  type = "sf" as IconType,
  size = 24,
  color,
  style,
  weight,
}: {
  name: string;
  type?: IconType;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  if (type === "fontawesome") {
    const faName = FONTAWESOME_MAPPING[name];
    return (
      <FontAwesome5 color={color} size={size} name={faName} style={style} />
    );
  }
  const miName = MAPPING[name];
  return (
    <MaterialIcons color={color} size={size} name={miName} style={style} />
  );
}
