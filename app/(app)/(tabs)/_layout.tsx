import React from "react";
import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import { StatusBar } from "expo-status-bar";

const TabsLayout = () => {
  const { colorScheme } = useColorScheme();
  return (
    <>
      <StatusBar
        style={colorScheme !== "light" ? "light" : "dark"}
        translucent={false}
        backgroundColor={colorScheme === "light" ? "white" : "black"}
      />
      <Tabs
        screenOptions={({ route }) => ({
          tabBarStyle: {
            backgroundColor: colorScheme === "light" ? "white" : "black",
            height: 60,
            borderColor: colorScheme === "light" ? "white" : "black",
          },
          tabBarHideOnKeyboard: true,
          tabBarActiveTintColor: colorScheme === "light" ? "black" : "white",
          tabBarIcon: ({ focused, size }) => {
            let iconName:
              | "home-variant"
              | "home-variant-outline"
              | "account-circle-outline"
              | "account-circle";
            if (route.name === "Home") {
              iconName = focused ? "home-variant" : "home-variant-outline";
            } else if (route.name === "Profile") {
              iconName = focused ? "account-circle" : "account-circle-outline";
            }
            return (
              <MaterialCommunityIcons
                name={iconName}
                size={size + 5}
                color={colorScheme === "light" ? "black" : "white"}
              />
            );
          },
        })}
      >
        <Tabs.Screen name="Home" options={{ headerShown: false }} />
        <Tabs.Screen name="Profile" options={{ headerShown: false }} />
      </Tabs>
    </>
  );
};

export default TabsLayout;
