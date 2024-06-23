import {
  View,
  ScrollView,
  Keyboard,
  ToastAndroid,
  useWindowDimensions,
  Text,
} from "react-native";
import React from "react";

import { Button, Input } from "@ui-kitten/components";
import HomeSVG from "../../../assets/svgs/homeSVG.svg";
import { useAuth } from "../../../Context/AuthContextProvider";
import ImagePickerComponent from "../../../components/ImagePickerComponent";
import { Image } from "expo-image";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = () => {
  const { currentUser } = useAuth();
  const [image, setImage] = React.useState(null);
  const [isloading, setisloading] = React.useState(false);
  const { width } = useWindowDimensions();
  const [inputs, setInputs] = React.useState({
    guardian: "",
    PhoneNo: "",
  });

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const SubmitHandler = async () => {
    Keyboard.dismiss();
    const address = await AsyncStorage.getItem("@location");
    const pincode = await AsyncStorage.getItem("@Pincode");

    setisloading(true);
    let isValidate = true;

    if (!inputs.guardian || image === null) {
      isValidate = false;
      ToastAndroid.show("Fill all details", ToastAndroid.SHORT);
    }

    if (!address || !pincode) {
      isValidate = false;
      ToastAndroid.show("Unable to get Address or Pincode", ToastAndroid.SHORT);
    }
    if (!inputs?.PhoneNo || inputs?.PhoneNo?.length < 10) {
      isValidate = false;
      ToastAndroid.show("Provide a valid phone no", ToastAndroid.SHORT);
    }

    if (isValidate) {
      if (image) {
        let localUri = image?.assets[0].uri;
        let type = image?.assets[0].mimeType;
        let filename = image?.assets[0].fileName;

        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${currentUser?.token}`);

        const formdata = new FormData();
        formdata.append("location", address);
        formdata.append("image", { uri: localUri, name: filename, type });
        formdata.append("guardian", inputs.guardian);
        formdata.append("mobile", inputs.PhoneNo);
        formdata.append("pincode", pincode);

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: formdata,
        };

        await fetch(
          `https://face-recognition-application-api-module.onrender.com/face-app/user/image`,
          requestOptions
        )
          .then((response) => response.text())
          .then((result) => {
            ToastAndroid.show("Image uploaded", ToastAndroid.SHORT);
            setImage(null);
            setInputs({
              guardian: "",
              PhoneNo: "",
            });
          })
          .catch((err) => {
            console.log(err, "err");
            ToastAndroid.show("Error uploading image", ToastAndroid.SHORT);
          });
      }
    }
    setisloading(false);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="h-full p-2 pb-0 bg-white dark:bg-black"
    >
      <Text className=" text-4xl font-semibold py-3 px-3 z-10 dark:text-white">
        Home
      </Text>
      <Image
        source={HomeSVG}
        style={{ width: width - 20, height: 300 }}
        className="scale-[2.1]"
        contentFit="scale-down"
      />

      <View>
        <Input
          style={{ marginBottom: 10 }}
          placeholder="Guardian name"
          size="large"
          value={inputs.guardian}
          onChangeText={(text) => handleOnchange(text, "guardian")}
        />
        <Input
          style={{ marginBottom: 10 }}
          placeholder="Phone no..."
          size="large"
          keyboardType="numeric"
          value={inputs.PhoneNo}
          onChangeText={(text) => handleOnchange(text, "PhoneNo")}
        />
      </View>

      <ImagePickerComponent image={image} setImage={setImage} />

      {image && (
        <Button onPress={SubmitHandler} disabled={isloading}>
          {!isloading ? "Send" : "Uploading..."}
        </Button>
      )}

      <View className="p-5"></View>
    </ScrollView>
  );
};

export default Home;
