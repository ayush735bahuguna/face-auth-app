import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { useColorScheme } from "nativewind";
import { StatusBar } from "expo-status-bar";
import { Text, TouchableOpacity, View } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { FontAwesome } from "@expo/vector-icons";

const Tabslayout = () => {
  const { colorScheme } = useColorScheme();
  const [isAuthenticate, setisAuthenticate] = useState(false);
  useEffect(() => {
    LocalAuth();
  }, []);

  const LocalAuth = async () => {
    const Auth = await LocalAuthentication.authenticateAsync();
    setisAuthenticate(Auth.success);
  };
  return (
    <>
      <StatusBar
        style={colorScheme !== "light" ? "light" : "dark"}
        translucent={false}
        backgroundColor={colorScheme === "light" ? "white" : "black"}
      />
      {isAuthenticate ? (
        <Stack
          screenOptions={{
            headerTintColor: colorScheme === "light" ? "black" : "white",
            headerTitleStyle: {
              color: colorScheme === "light" ? "black" : "white",
            },
            headerStyle: {
              backgroundColor: colorScheme === "light" ? "white" : "black",
            },
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="History" options={{}} />
          <Stack.Screen name="Info" />
          <Stack.Screen
            name="EditCurrentLocation"
            options={{
              headerTitle: "Current Location",
            }}
          />
          <Stack.Screen name="ProfileEdit" />
          <Stack.Screen
            name="AnonymousSender"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Notifications" />
        </Stack>
      ) : (
        <View className="flex-1 justify-between items-center">
          <View className="flex justify-center items-center mt-20">
            <FontAwesome name="lock" size={24} color="black" />
            <Text className="text-slate-500">App is locked</Text>
          </View>
          <TouchableOpacity
            className="py-3 px-6 rounded-xl bg-teal-100 text-center my-4"
            onPress={LocalAuth}
          >
            <Text>Unlock app</Text>
          </TouchableOpacity>
          <View></View>
        </View>
      )}
    </>
  );
};

export default Tabslayout;
