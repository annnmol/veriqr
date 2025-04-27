import useAuthSession from "@mobile/components/auth/useAuthSession";
import { Redirect, Stack } from "expo-router";

export default function ProtectedLayout() {
  const {isSignedIn, isLoaded, currentSession, currentUser } = useAuthSession();
  console.log("user", JSON.stringify(currentUser, null, 2));
  console.log("session", JSON.stringify(currentSession, null, 2));

  if (!isLoaded) return null;

  if (!isSignedIn) {
    return <Redirect href={"/(auth)/sign-in-mobile"} />;
  }

  return (
    <Stack
      screenOptions={{ headerShown: true, animation: "none" }}
      initialRouteName="home"
    />
  );
}
