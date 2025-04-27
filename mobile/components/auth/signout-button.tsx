import { useRouter } from "expo-router";
import { Text, TouchableOpacity } from "react-native";
import useAuthService from "./useAuthService";

const SignOutButton = () => {
  const { logout } = useAuthService();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await logout();
      router.replace("/(auth)/sign-in");
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <TouchableOpacity onPress={handleSignOut}>
      <Text>Sign out</Text>
    </TouchableOpacity>
  );
};

export default SignOutButton;
