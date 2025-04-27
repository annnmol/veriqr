import useAuthSession from "@mobile/components/auth/useAuthSession";
import { Redirect } from "expo-router";

export default function RootIndex() {
  // const { isSignedIn, isLoaded, } = useAuth();
  const {isSignedIn, isLoaded } = useAuthSession();

  console.log(`🚀 ~ RootIndex ~ isSignedIn:`, isLoaded, isSignedIn);

  if (!isLoaded) return null;

  if (isSignedIn) return <Redirect href={"/(protected)/home"} />;

  return <Redirect href={"/(auth)/sign-in"} />;
}
