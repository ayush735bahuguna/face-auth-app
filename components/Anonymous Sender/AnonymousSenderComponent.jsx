import {
  View,
  Text,
  ScrollView,
  Keyboard,
  ToastAndroid,
  StatusBar,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Button } from "@ui-kitten/components";
import UserDetailsSvg from "../../assets/svgs/user_details.svg";
import { Image } from "expo-image";
import ImagePickerComponent from "../ImagePickerComponent";
import axios from "axios";
import { useAuth } from "../../Context/AuthContextProvider";
import GetCurrentLocationComponent from "../GetCurrentLocationComponent";

const AnonymousSenderComponent = () => {
  const { currentUser } = useAuth();
  const [LocationText, setLocationText] = useState(null);
  const [Pincode, setPincode] = useState(null);
  const [image, setImage] = useState(null);
  const { width } = useWindowDimensions();
  const [isLocationLoading, setisLocationLoading] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const SubmitHandler = async () => {
    Keyboard.dismiss();
    setisLoading(true);

    let isValidate = false;
    if (image) {
      isValidate = true;
    }
    if (isValidate) {
      if (LocationText || Pincode) {
        let localUri = image?.assets[0].uri;
        let type = image?.assets[0].mimeType;
        let filename = image?.assets[0].fileName;
        try {
          let formData = new FormData();
          formData.append("location", LocationText);
          formData.append("pincode", Pincode);
          formData.append("image", { uri: localUri, name: filename, type });

          const { data } = await axios.post(
            `https://face-recognition-application-api-module.onrender.com/face-app/public/send/image`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${currentUser?.token}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );
          console.log(data);
          ToastAndroid.show("Image Successfully submitted", ToastAndroid.SHORT);
          setImage(null);
        } catch (error) {
          console.log(error);
        }
      } else {
        ToastAndroid.show(
          "Please click on get Current location button to get location",
          ToastAndroid.SHORT
        );
      }
    } else {
      ToastAndroid.show("Please select a Image first", ToastAndroid.SHORT);
    }
    setisLoading(false);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="h-full p-2 px-4 bg-white dark:bg-black"
      style={{ paddingTop: StatusBar.currentHeight }}
    >
      <View className="my-3">
        <Text className="text-black dark:text-slate-100 text-[40px] font-bold">
          Grievance
        </Text>
        <Text className="text-gray-400 text-[18px] mb-[10px]">
          Send details of anything
        </Text>
      </View>

      <Image
        source={UserDetailsSvg}
        style={{ width: width - 35, height: 300 }}
        className="scale-[2.1] mb-5"
        contentFit="scale-down"
      />

      <View className="py-5 pb-14">
        <ImagePickerComponent image={image} setImage={setImage} />

        <View className="flex items-center justify-center px-2 flex-col w-full mb-4 ">
          <View className="my-4">
            {isLocationLoading ? (
              <Text className="dark:text-white">Loading...</Text>
            ) : (
              <Text className="text-center dark:text-white">
                {LocationText ? LocationText : "No data available right now"}
              </Text>
            )}
          </View>
          <GetCurrentLocationComponent
            LocationText={LocationText}
            setLocationText={setLocationText}
            text={`Get current location`}
            setisLocationLoading={setisLocationLoading}
            setPincode={setPincode}
          />
        </View>

        <Button
          onPress={SubmitHandler}
          appearance="filled"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </Button>
      </View>
    </ScrollView>
  );
};

export default AnonymousSenderComponent;
