import useAuthSession from "@mobile/components/auth/useAuthSession";
import { Redirect, Stack } from "expo-router";

export default function AuthLayout() {
  const {isSignedIn, isLoaded } = useAuthSession();

  if (!isLoaded) return null;

  if (isSignedIn) {
    return <Redirect href={"/(protected)/home"} />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName="sign-in" />
  );
}
