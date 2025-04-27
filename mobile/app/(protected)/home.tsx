import SignOutButton from "@mobile/components/auth/signout-button";
import useAuthSession from "@mobile/components/auth/useAuthSession";
import NetworkService from "@mobile/services/api/network-service";
import { getSessionToken } from "@mobile/services/axios-interceptors";
import { useGitHubUser } from "@mobile/store/cache/use-github-user";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

const Screen = () => {
  const { currentSession, currentUser } = useAuthSession();

  console.log(`🚀 ~ Screen ~ currentUser:`, currentUser);

  // const {data}=useGitHubUser(
  //   "annnmol"
  // );

  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <SignOutButton />
    </View>
  );
};

export default Screen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f3f3",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginTop: 200,
    paddingHorizontal: 20,
  },
});
