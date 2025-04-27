import { forwardRef, memo } from "react";
import { SafeAreaView, type ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

//custom imports
import { useThemeColor } from "@mobile/components/hooks/useThemeColor";
import { ThemeKeys } from "@mobile/lib/theme";

type AppSafeAreaViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  themeKey?: ThemeKeys;
};

 const AppSafeAreaView = memo(forwardRef<SafeAreaView, AppSafeAreaViewProps>(
  (
    { style, lightColor, darkColor, themeKey = "background", ...otherProps },
    ref
  ) => {
    const backgroundColor = useThemeColor(
      { light: lightColor, dark: darkColor },
      themeKey
    );

    const insets = useSafeAreaInsets();

    const paddingTop = insets.top ?? 0;

    return (
      <SafeAreaView
        ref={ref}
        style={[{ backgroundColor, paddingTop }, style]}
        {...otherProps}
      />
    );
  }
 ));

 export default AppSafeAreaView;
