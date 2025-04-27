import useAuthService from "@mobile/components/auth/useAuthService";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Screen = () => {
  const router = useRouter();
  const { signInWithEmailPass } = useAuthService();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!emailAddress || !password) {
      console.log("Email or password is empty");
      return;
    }
    signInWithEmailPass({
      email: emailAddress,
      password,
    })
      .then((res) => {
        router.replace("/(protected)/home");
      })
      .catch((err) => {
        console.error(JSON.stringify(err, null, 2));
      })
      .finally(() => {});
  };
  return (
    <View style={styles.container}>
      <Text>Sign in</Text>
      <TextInput
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Enter email"
        onChangeText={(text) => setEmailAddress(text)}
        style={styles.input}
      />
      <TextInput
        value={password}
        placeholder="Enter password"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
        style={styles.input}
      />
      <TouchableOpacity onPress={onSignInPress}>
        <Text>Continue</Text>
      </TouchableOpacity>
      <View style={{ display: "flex", flexDirection: "row", gap: 3 }}>
        <Text>Don't have an account?</Text>
        <Link href="/sign-up">
          <Text>Sign up</Text>
        </Link>
      </View>
    </View>
  );
};

export default Screen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f3f3",
    marginTop: 200,
    paddingHorizontal: 20,
    gap: 10,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});
