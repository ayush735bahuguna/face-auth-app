import React from "react";
import { View, Text, Pressable, useWindowDimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

import * as ImagePicker from "expo-image-picker";

import { Image } from "expo-image";
import { Viberate } from "../lib/Viberate";
import { useColorScheme } from "nativewind";

export default function ImagePickerComponent({ image, setImage }) {
  const { colorScheme } = useColorScheme();
  const { width } = useWindowDimensions();
  const takePhoto = async () => {
    Viberate();
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: "Images",
      aspect: [1, 1],
      allowsEditing: true,
    });
    if (!result.canceled) {
      setImage(result);
    }
  };

  const pickImage = async () => {
    Viberate();
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "Images",
      aspect: [1, 1],
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result);
    }
  };
  return (
    <>
      {image ? (
        <View className="relative rounded-md">
          <Pressable
            className={
              "bg-stone-200 p-1 rounded-full absolute top-2 right-2 z-20"
            }
            onPress={() => {
              Viberate();
              setImage(null);
            }}
          >
            <Ionicons name="close-sharp" size={30} color="black" />
          </Pressable>
          <Image
            className="rounded-md mb-5 w-full"
            source={{ uri: image?.assets[0].uri }}
            style={{ aspectRatio: "4/4" }}
          />
        </View>
      ) : (
        <View className="flex flex-row justify-between items-center my-2">
          <Pressable
            className="flex flex-col items-center justify-center border-2  py-10 rounded-lg mx-1 border-indigo-200 bg-sky-50/50 dark:bg-slate-800 dark:border-slate-600 dark:text-white"
            onPress={takePhoto}
            style={{ width: width / 2 - 24 }}
          >
            <Entypo
              name="camera"
              size={24}
              color={colorScheme === "light" ? "black" : "white"}
            />
            <Text className="dark:text-white">Take photo</Text>
          </Pressable>
          <Pressable
            className="flex flex-col items-center justify-center border-2  py-10 rounded-lg mx-1 border-indigo-200 bg-sky-50/50 dark:bg-slate-800 dark:border-slate-600 dark:text-white"
            onPress={pickImage}
            style={{ width: width / 2 - 24 }}
          >
            <Entypo
              name="images"
              size={24}
              color={colorScheme === "light" ? "black" : "white"}
            />
            <Text className="dark:text-white">Select photo</Text>
          </Pressable>
        </View>
      )}
    </>
  );
}
