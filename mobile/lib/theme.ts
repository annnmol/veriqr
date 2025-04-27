/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 */

import useSystemStore from "@mobile/store/slices/system";
import { Appearance } from "react-native";
//custom imports

type IThemeScheme = "light" | "dark";

const currentValue = useSystemStore.getState().colorScheme;

console.log(`🚀 ~ currentValue:`, currentValue);


const systemColorScheme = Appearance.getColorScheme() ?? "light";

// export const colorScheme: IThemeScheme =
//   currentValue === "system" ? systemColorScheme : currentValue;

export const colorScheme: IThemeScheme = systemColorScheme ?? "light";

const productPrimaryColor = "#128C7E";
const productPrimaryLightColor = "#EAF9E0";

const primaryLight = productPrimaryLightColor;
const primary = productPrimaryColor;

const tintColorLight = productPrimaryColor;
const tintColorDark = "#fff";

export const lightBackground = "#F8F9FA";
export const darkBackground = "#151718";
export const lightText = "#11181C";
export const darkText = "#ECEDEE";

const green = "#25d366";
const red = "#dc3545";
const yellow = "#FCC70B";

const cardLight = "#fff";
const cardDark = "#121212";

const iconLight = "#687076";
const iconDark = "#9BA1A6";

const greyLight = `rgba(0,0,0,0.05)`;
const greyDark = `rgba(255,255,255,0.05)`;

export const colors = {
  light: {
    text: lightText,
    background: lightBackground,
    card: cardLight,
    tint: tintColorLight,
    icon: iconLight,
    tabIconDefault: iconLight,
    tabIconSelected: tintColorLight,
    primaryLight: primaryLight,
    primary: primary,
    onPrimary: "#ffffff",
    red: red,
    green: green,
    yellow: yellow,
    blue: "#007AFF",
    white: "#ffffff",
    black: "#11181C",
    grey: greyLight,
    border: greyLight,
  },
  dark: {
    text: darkText,
    background: darkBackground,
    card: cardDark,
    tint: tintColorDark,
    icon: iconDark,
    tabIconDefault: iconDark,
    tabIconSelected: tintColorDark,
    primaryLight: primaryLight,
    primary: primary,
    onPrimary: "#ffffff",
    red: red,
    green: green,
    yellow: yellow,
    blue: "#007AFF",
    white: "#ffffff",
    black: "#11181C",
    grey: greyDark,
    border: greyDark,
  },
};

export type ThemeKeys = keyof typeof colors.light & keyof typeof colors.dark;

export const theme = colors[colorScheme];

export const isDarkTheme = () => colorScheme === "dark";
