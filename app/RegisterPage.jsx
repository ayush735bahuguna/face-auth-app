import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  ScrollView,
  useWindowDimensions,
  ToastAndroid,
  StatusBar,
} from "react-native";

import Button from "../components/ui/Button";
import Input from "../components/ui/input";
import Loader from "../components/ui/loader";
import { router } from "expo-router";
import { useAuth } from "../Context/AuthContextProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SignUpSVG from "../assets/svgs/SignUp.svg";
import { Image } from "expo-image";
import GetCurrentLocationComponent from "../components/GetCurrentLocationComponent";

const RegisterPage = () => {
  const { setcurrentUser, setisUserloggedIn } = useAuth();
  const [inputs, setInputs] = React.useState({
    email: "",
    password: "",
    name: "",
  });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [isLocationLoading, setisLocationLoading] = React.useState(false);
  const [LocationText, setLocationText] = React.useState(null);
  const [Pincode, setPincode] = React.useState(null);
  const { width } = useWindowDimensions();

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.email) {
      handleError("Please input email", "email");
      isValid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError("Please input a valid email", "email");
      isValid = false;
    }

    if (!inputs.password) {
      handleError("Please input password", "password");
      isValid = false;
    } else if (inputs.password.length < 5) {
      handleError("Min password length of 5", "password");
      isValid = false;
    }

    if (!inputs.name) {
      handleError("Please input name", "name");
      isValid = false;
      return;
    }
    if (!LocationText || !Pincode) {
      ToastAndroid.show("Please select a location", ToastAndroid.SHORT);
      isValid = false;
      return;
    }

    if (isValid) {
      register();
    }
  };

  const register = async () => {
    setLoading(true);

    const formdata = new FormData();
    formdata.append(
      "user",
      `{"email":"${inputs.email}","password":"${inputs.password}","name":"${inputs.name}","location":"${LocationText}","pincode":"${Pincode}"}`
    );

    await fetch(
      `https://face-recognition-application-api-module.onrender.com/face-app/auth/signup`,
      {
        method: "POST",
        body: formdata,
      }
    )
      .then((response) => response.text())
      .then(async (result) => {
        const data = JSON.parse(result);

        if (data?.payload?.status === "success") {
          await AsyncStorage.setItem("@user", JSON.stringify(data));
          setcurrentUser(data);
          setisUserloggedIn(true);
          ToastAndroid.show(data.payload?.message, ToastAndroid.SHORT);
        } else {
          ToastAndroid.show(`${data.payload?.message}`, ToastAndroid.SHORT);
        }
      })
      .catch((error) => {
        ToastAndroid.show(`${error}`, ToastAndroid.SHORT);
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
        <ScrollView contentContainerStyle={{ paddingHorizontal: 20 }}>
          <Text
            onPress={() => {
              router.push("/AnonymousSender");
            }}
            className="underline text-right pr-[20px] pt-[20px] z-10"
          >
            Skip
          </Text>
          <Text className="text-black text-[40px] font-bold pt-5">
            Register
          </Text>
          <Text className="text-gray-400 text-[18px] my-[10px]">
            Enter Your Details to Register
          </Text>

          <Image
            source={SignUpSVG}
            style={{ width: width - 40, height: 300 }}
            className="scale-[1.9]"
            contentFit="scale-down"
          />

          <View className="my-[20px]">
            <Input
              onChangeText={(text) => handleOnchange(text, "name")}
              onFocus={() => handleError(null, "name")}
              iconName="account-outline"
              label="Full Name"
              placeholder="Enter your full name"
              error={errors.name}
            />
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

            <View className="flex items-center justify-center px-2 flex-col w-full mb-4 ">
              <View className="my-4">
                {isLocationLoading ? (
                  <Text className="dark:text-white">Loading...</Text>
                ) : (
                  <Text className="text-center dark:text-white">
                    {LocationText
                      ? LocationText
                      : "No data available right now"}
                  </Text>
                )}
              </View>
              <GetCurrentLocationComponent
                LocationText={LocationText}
                setLocationText={setLocationText}
                text={`Get current location`}
                setisLocationLoading={setisLocationLoading}
                Pincode={Pincode}
                setPincode={setPincode}
              />
            </View>

            <Button title="Register" onPress={validate} />
            <Text
              onPress={() => router.push("/LoginPage")}
              className="text-black font-bold text-center text-[16px] underline"
            >
              Already have account ?Login
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default RegisterPage;
