import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import Button from "../ui/Button";
import { AntDesign } from "@expo/vector-icons";
import { useAuth } from "../../Context/AuthContextProvider";

WebBrowser.maybeCompleteAuthSession();

const GoogleAuthButton = ({ title }) => {
  const { setcurrentUser, setisUserloggedIn } = useAuth();

  const [request, response, promtAsyn] = Google.useAuthRequest({
    androidClientId:
      "23290486586-289jci5d7ju8fnqhp8btnn708h5pfr5q.apps.googleusercontent.com",
    webClientId:
      "23290486586-c03qe0cv7qle4phhr6mn2uqa4s84dpn8.apps.googleusercontent.com",
  });

  useEffect(() => {
    GoogleSignHandler();
  }, [response]);

  const GoogleSignHandler = async () => {
    const user = await AsyncStorage.getItem("@user");
    if (user) {
      setcurrentUser(JSON.parse(user));
      setisUserloggedIn(true);
    } else {
      if (response?.type === "success") {
        await GetUserInfo(response.authentication.accessToken);
      }
    }
  };

  const GetUserInfo = async (token) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setcurrentUser(user);

      setisUserloggedIn(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button
      style={{ backgroundColor: "black", borderRadius: 55 }}
      icon={<AntDesign name="google" size={24} color="white" />}
      title={title}
      onPress={() => promtAsyn()}
    />
  );
};

export default GoogleAuthButton;
