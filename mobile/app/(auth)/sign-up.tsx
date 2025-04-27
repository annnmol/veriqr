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

  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");

  const { signupWithEmailPass, verifyEmailOTP } = useAuthService();

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!emailAddress || !password) {
      console.log("Email or password is empty");
      return;
    }
    signupWithEmailPass({
      emailAddress,
      password,
      firstName: fullName,
    })
      .then((res) => {
        setPendingVerification(true);
      })
      .catch((err) => {
        console.error(JSON.stringify(err, null, 2));
      })
      .finally(() => {});
  };

  // const onSignUpPress = async () => {
  //   if (!isLoaded) return;

  //   // Start sign-up process using email and password provided
  //   try {
  //    const result= await signUp.create({
  //       emailAddress,
  //       password,
  //       firstName: fullName,
  //     });

  //             if (result.status !== "complete") {
  //         console.log("Sign-up not complete", result.status, result.requiredFields, result);
  //       }

  //     // Send user an email with verification code
  //     await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

  //     // Set 'pendingVerification' to true to display second form
  //     // and capture OTP code
  //     setPendingVerification(true);
  //   } catch (err) {
  //     // See https://clerk.com/docs/custom-flows/error-handling
  //     // for more info on error handling
  //     console.error(JSON.stringify(err, null, 2));
  //   }
  // };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    verifyEmailOTP({
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
        <Text>Verify your email</Text>
        <TextInput
          value={code}
          placeholder="Enter your verification code"
          onChangeText={(code) => setCode(code)}
          style={styles.input}
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
          value={fullName}
          placeholder="Enter name"
          onChangeText={(text) => setFullName(text)}
          style={styles.input}
        />
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
        <TouchableOpacity onPress={onSignUpPress}>
          <Text>Continue</Text>
        </TouchableOpacity>
        <View style={{ display: "flex", flexDirection: "row", gap: 3 }}>
          <Text>Already have an account?</Text>
          <Link href="/(auth)/sign-in">
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
