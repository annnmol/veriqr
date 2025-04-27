import SignOutButton from "@mobile/components/auth/signout-button";
import useAuthSession from "@mobile/components/auth/useAuthSession";
import AppButton from "@mobile/components/ui/button";
import AppText from "@mobile/components/ui/text";
import NetworkService from "@mobile/services/api/network-service";
import { getSessionToken } from "@mobile/services/axios-interceptors";
import { useGitHubUser } from "@mobile/store/cache/use-github-user";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import AppTextInput from "@mobile/components/ui/text-input";
import useSystemStore from "@mobile/store/slices/system";
import { useShallow } from "zustand/react/shallow";
const Screen = () => {
  const { currentSession, currentUser } = useAuthSession();

  // console.log(`🚀 ~ Screen ~ currentUser:`, currentUser);
  const[name,setName] =useState("")
  // const {data}=useGitHubUser(
  //   "annnmol"
  // );

  const colorScheme = useSystemStore(useShallow((state) => state.colorScheme));

  console.log(`🚀 ~ Screen ~ colorScheme:`, colorScheme);

  const setColorScheme = useSystemStore(
    useShallow((state) => state.setColorScheme)
  );

  const handleToggleTheme = useCallback(() => {
    // showHaptics();

    setColorScheme("system");

    // setTimeout(() => {
    //   reloadAppAsync();
    // }, 500);
  }, []);

  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <SignOutButton />
      <AppText>asdasd</AppText>
      <Ionicons name="checkmark-circle" size={56} color="green" />
      <AppText themeKey="primary" variant="heading">Text</AppText>
      <AppText themeKey="icon" variant="subtitle">text</AppText>
      <AppButton rounded> Button</AppButton>
      <AppButton variant="primary" rounded={false} onPress={handleToggleTheme}> Button</AppButton>
      <AppTextInput name="name" value={name} placeholder="placeholder" label={"label"} onChange={(e)=>setName(e?.nativeEvent?.text)}/>
      {/* <AppTextInput name="email" value="withoud" onChangeText={(t)=>console.log(t)}  /> */}
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
    gap: 10,
    // marginTop: 200,
    paddingHorizontal: 20,
  },
});
