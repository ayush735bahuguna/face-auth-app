import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  useWindowDimensions,
  ToastAndroid,
  StatusBar,
} from "react-native";
import { Image } from "expo-image";
import Button from "../components/ui/Button";
import Input from "../components/ui/input";
import Loader from "../components/ui/loader";
import { router } from "expo-router";
import LoginSVG from "../assets/svgs/Login.svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../Context/AuthContextProvider";

const Login = () => {
  const { setcurrentUser, setisUserloggedIn } = useAuth();
  const [inputs, setInputs] = React.useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const { width } = useWindowDimensions();

  const authhandler = async () => {
    if (!inputs.email) {
      handleError("Please input email", "email");
      return;
    }
    if (!inputs.password) {
      handleError("Please input password", "password");
      return;
    }

    setLoading(true);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      email: inputs?.email,
      password: inputs?.password,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    await fetch(
      `https://face-recognition-application-api-module.onrender.com/face-app/auth/signin`,
      requestOptions
    )
      .then((response) => response.text())
      .then(async (result) => {
        try {
          const data = JSON.parse(result);
          ToastAndroid?.show(`${data?.payload?.message}`, ToastAndroid.SHORT);

          await AsyncStorage.setItem(
            "@user",
            // JSON.stringify(data?.payload?.user)
            JSON.stringify(data)
          );
          setcurrentUser(data);
          setisUserloggedIn(true);
        } catch (error) {
          ToastAndroid?.show(result, ToastAndroid.SHORT);
        }
      })
      .catch((error) => {
        ToastAndroid?.show(`${error}`, ToastAndroid.BOTTOM);
        console.error(error);
      });
    setLoading(false);
  };

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  return (
    <>
      <Loader visible={loading} />
      <SafeAreaView
        className="bg-white h-full"
        style={{ paddingTop: StatusBar.currentHeight }}
      >
        <ScrollView>
          <Text
            onPress={() => {
              router.push("/AnonymousSender");
            }}
            className="underline text-right px-[40px] pt-[20px] z-10"
          >
            Skip
          </Text>

          <View className="pt-5 px-[20px]">
            <Text className="text-black text-[40px] font-bold">Log In</Text>
            <Text className="text-gray-400 text-[18px] my-[10px]">
              Enter Your Details to Login
            </Text>

            <Image
              source={LoginSVG}
              style={{ width: width - 40, height: 300 }}
              className="scale-[2.1]"
              contentFit="scale-down"
            />

            <View className="my-[20px]">
              <Input
                onChangeText={(text) => handleOnchange(text, "email")}
                onFocus={() => handleError(null, "email")}
                iconName="email-outline"
                label="Email"
                placeholder="Enter your email address"
                error={errors.email}
              />
              <Input
                onChangeText={(text) => handleOnchange(text, "password")}
                onFocus={() => handleError(null, "password")}
                iconName="lock-outline"
                label="Password"
                placeholder="Enter your password"
                error={errors.password}
                password
              />
              <Button title="Log In" onPress={authhandler} />

              <Text
                onPress={() => router.push("/RegisterPage")}
                className="text-black font-bold text-center text-[16px] underline"
              >
                Don't have account ?Register
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Login;
