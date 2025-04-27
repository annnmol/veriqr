import { AxiosError } from "axios";
import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { Dimensions, Platform, StatusBar, StyleSheet } from "react-native";

const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");

export const constants = {
  spacingLXX: 32,
  spacingLX: 24,
  spacingL: 20,
  spacing: 16,
  spacingM: 12,
  spacing10: 10,
  spacing6: 6,
  spacingS: 8,
  spacingSX: 4,
  spacingSXX: 2,
  statusBarHeight: Platform.OS === "ios" ? 20 : StatusBar.currentHeight,
  deviceWidth,
  deviceHeight,
  borderRadius: 8,
  borderWidth: StyleSheet.hairlineWidth,
};

export const blurhash = "LCI}-S^wEMNF58t7x[t8.m?bnOaf";

export function widthPercentage(p: number): number {
  return (deviceWidth * p) / 100;
}

export function heightPercentage(p: number): number {
  return (deviceHeight * p) / 100;
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): T & { cancel: () => void } {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const debounced = function (
    this: ThisParameterType<T>,
    ...args: Parameters<T>
  ) {
    const context = this;

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  } as T & { cancel: () => void };

  debounced.cancel = function () {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  return debounced;
}

export function formatUrlParams(
  params: Record<string, string>,
  keysToEncode: string[] = []
) {
  return Object.keys(params)
    .filter((key) => params[key]) // Filter out keys with undefined values
    .map((key) => {
      const value = keysToEncode.includes(key)
        ? encodeURIComponent(params[key])
        : params[key];
      return `${key}=${value}`;
    })
    .join("&");
}

export function getCountryFlag(shortCode: string) {
  // return `https://flagcdn.com/${shortCode}.svg`;
  return `https://flagcdn.com/w320/${shortCode}.png`;
}

export async function externalLink(url: string) {
  try {
    const result = await WebBrowser.openBrowserAsync(url);
    if (result.type === "locked") {
      // Fallback to Linking if the browser could not be opened
      await Linking.openURL(url);
      // console.warn("In-app browser is locked, trying to open in external browser...");
    } else {
      // console.warn("Browser opened successfully:", result);
    }
  } catch (error) {
    console.error("Failed to open in-app-browser:", error);
  }
}

export function formatJson(obj: Record<string, any>) {
  return JSON.stringify(obj, null, 3) ?? obj;
}

export function handleError(
  obj: Record<string, any> | string | Error | AxiosError | any
) {
  console.warn(
    `🚀 ~ file: helpers.tsx:59 ~ handleError ~ err:`,
    JSON.stringify(obj?.response?.data ?? {}, null, 3) ?? obj
  );
}

export function formatString(template: string, replacements: string[]): string {
  return template.replace(/{(\d+)}/g, (match, number) => {
    return replacements[number] !== undefined ? replacements[number] : match;
  });
}

// Function to get the first two characters in capital format
export function getInitials(str: string = "Unknown"): string {
  // Split the string by spaces
  const words = str.trim().split(/\s+/);

  // If there are multiple words, take the first character of each word
  if (words.length > 1) {
    return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
  }

  // If there is only one word, take the first two characters
  return str.substring(0, 2).toUpperCase();
}

export function formatedTime(timestamp: string): string {
  /**
   * Formats a given timestamp like WhatsApp-style: "hh:mm AM/PM" for today, "Yesterday" for yesterday, or "dd/MM/yy" otherwise.
   * @param {string} timestamp - The date string (e.g., "Fri, 06 Sep 2024 10:25:38 GMT").
   * @returns {string} - Formatted time: "hh:mm AM/PM", "Yesterday", or "dd/MM/yy".
   */
  const date = new Date(timestamp);
  const now = new Date();

  // Check if the date is invalid
  if (isNaN(date.getTime())) {
    return ""; // Return empty string for invalid dates
  }

  // Helper to format time as "hh:mm AM/PM"
  const formatTime = (date: Date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert 24-hour format to 12-hour format
    const minutesString = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${minutesString} ${ampm}`;
  };

  // Check if it's today
  const isSameDay =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  if (isSameDay) {
    return formatTime(date); // Return "hh:mm AM/PM" for today
  }

  // Check if it's yesterday
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  const isYesterday =
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear();

  if (isYesterday) {
    return "Yesterday"; // Return "Yesterday" if the date is yesterday
  }

  // Otherwise, return "dd/MM/yy" format
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed
  const year = date.getFullYear().toString().slice(2); // Get last two digits of the year

  return `${day}/${month}/${year}`; // Return "dd/MM/yy" format
}

export function onBackPress() {
  router?.back();
}

export const capitalize = (str: string): string => {
  /**
   * Capitalizes the first letter of a given string.
   * @param str - The string to capitalize.
   * @returns The capitalized string.
   */
  if (!str) return str;
  return str?.charAt(0)?.toUpperCase() + str?.slice(1);
};

export const getBorderStyle = () =>
  Platform.OS === "ios" ? "solid" : "dashed";


export const isEmptyObject = (obj: object | any) => {
  if (!obj) {
    return true;
  } else {
    return Object.keys(obj)?.length === 0;
  }
};
