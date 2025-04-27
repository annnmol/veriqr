import useAuthService from "@mobile/components/auth/useAuthService";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Screen = () => {
  const router = useRouter();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");

  const {signupWithSMS, verifySMSOTP } =
    useAuthService();

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!phoneNumber) {
      console.log("Phone number is empty");
      return;
    }
    signupWithSMS({
      phoneNumber: "+91" + phoneNumber,
    })
      .then((res) => {
        setPendingVerification(true);
      })
      .catch((err) => {
        console.error(JSON.stringify(err, null, 2));
      })
      .finally(() => {});
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    verifySMSOTP({
      code,
    })
      .then((res) => {
        console.log(`🚀 ~ onVerifyPress ~ res:`, res);
        router.replace("/(protected)/home");
      })
      .catch((err) => {
        console.error(JSON.stringify(err, null, 2));
      })
      .finally(() => {});
  };

  if (pendingVerification) {
    return (
      <>
        <Text>Verify your Phone</Text>
        <TextInput
          value={code}
          placeholder="Enter your verification code"
          onChangeText={(code) => setCode(code)}
          style={styles.input}
          autoComplete="sms-otp" // android
          textContentType="oneTimeCode" // ios
          keyboardType="number-pad"
        />
        <TouchableOpacity onPress={onVerifyPress}>
          <Text>Verify</Text>
        </TouchableOpacity>
      </>
    );
  }
  return (
    <View style={styles.container}>
      <>
        <Text>Sign up</Text>
        <TextInput
          autoCapitalize="none"
          value={phoneNumber}
          placeholder="Enter Mobile"
          onChangeText={(text) => setPhoneNumber(text)}
          style={styles.input}
          keyboardType="number-pad"
        />
        <TouchableOpacity onPress={onSignUpPress}>
          <Text>Continue</Text>
        </TouchableOpacity>
        <View style={{ display: "flex", flexDirection: "row", gap: 3 }}>
          <Text>Already have an account?</Text>
          <Link href="/(auth)/sign-in-mobile">
            <Text>Sign in</Text>
          </Link>
        </View>
      </>
    </View>
  );
};

export default Screen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f3f3",
    // justifyContent: "center",
    // alignItems: "center",
    marginTop: 200,
    paddingHorizontal: 20,
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});
