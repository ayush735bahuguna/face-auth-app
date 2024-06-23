import React, { useEffect, useState } from "react";
import { Slot, router, useSegments } from "expo-router";
import AuthContextProvider, { useAuth } from "../Context/AuthContextProvider";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import { NativeWindStyleSheet, useColorScheme } from "nativewind";
import { StatusBar } from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";

NativeWindStyleSheet.setOutput({
  default: "native",
});

const MainLayout = () => {
  const { isUserloggedIn } = useAuth();
  const segments = useSegments();

  useEffect(() => {
    if (isUserloggedIn === undefined) return;
    const inApp = segments[0] === "(app)";

    if (isUserloggedIn && !inApp) {
      router.replace("/(app)/(tabs)/Home");
    } else if (!isUserloggedIn) {
      router.replace("/LoginPage");
    }
  }, [isUserloggedIn]);

  return <Slot />;
};

const ThemeProviderComponent = ({ children }) => {
  const { colorScheme } = useColorScheme();
  useEffect(() => {
    colorScheme !== "light"
      ? NavigationBar.setBackgroundColorAsync("black")
      : NavigationBar.setBackgroundColorAsync("white");
  }, [colorScheme]);
  return (
    <>
      <ApplicationProvider {...eva} theme={eva[colorScheme]}>
        <StatusBar
          style={colorScheme !== "light" ? "light" : "dark"}
          translucent={false}
          backgroundColor={colorScheme === "light" ? "white" : "black"}
        />
        {children}
      </ApplicationProvider>
    </>
  );
};

const RootLayout = () => {
  return (
    <AuthContextProvider>
      <ThemeProviderComponent>
        <MainLayout />
      </ThemeProviderComponent>
    </AuthContextProvider>
  );
};

export default RootLayout;
