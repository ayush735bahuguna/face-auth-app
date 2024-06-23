import React, { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";
// import * as Updates from "expo-updates";

export default function index() {
  // async function onFetchUpdateAsync() {
  //   try {
  //     const update = await Updates.checkForUpdateAsync();

  //     if (update.isAvailable) {
  //       await Updates.fetchUpdateAsync();
  //       await Updates.reloadAsync();
  //     }
  //   } catch (error) {
  //     alert(`Error fetching latest Expo update: ${error}`);
  //   }
  // }

  // useEffect(() => {
  //   onFetchUpdateAsync();
  // }, []);

  return (
    <View className="flex flex-1 justify-center items-center h-full w-full">
      <Text className="my-10 text-xl">Please wait...</Text>
      <ActivityIndicator size="large" />
    </View>
  );
}
