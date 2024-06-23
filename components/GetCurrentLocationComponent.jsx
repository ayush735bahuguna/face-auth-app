import { Text, ToastAndroid, TouchableOpacity } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import * as Location from "expo-location";

const GetCurrentLocationComponent = ({
  setLocationText,
  text,
  setisLocationLoading,
  setPincode,
}) => {
  const getAddressFromCoordinates = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=2ac0c68fa62b453297009ff2983409fa`
      );
      const data = await response.json();

      if (data.results.length > 0) {
        return data.results[0];
      } else {
        throw new Error("Failed to get address from OpenCage API");
      }
    } catch (error) {
      console.error("Error fetching address from OpenCage API:", error);
      return null;
    }
  };

  const getLocation = async () => {
    setisLocationLoading(true);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        ToastAndroid.show(
          "Permission to access location was denied",
          ToastAndroid.SHORT
        );
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      let { latitude, longitude } = location.coords;

      let geocodedAddress = await getAddressFromCoordinates(
        latitude,
        longitude
      );

      if (geocodedAddress) {
        setPincode && setPincode(geocodedAddress?.components?.postcode);
        setLocationText(geocodedAddress?.formatted);
      } else {
        ToastAndroid.show(
          "No address found for these coordinates",
          ToastAndroid.SHORT
        );
      }
    } catch (error) {
      console.error(error);
      ToastAndroid.show("Error getting location", ToastAndroid.SHORT);
    }
    setisLocationLoading(false);
  };

  return (
    <TouchableOpacity onPress={getLocation}>
      <Text className=" bg-teal-50 dark:bg-slate-700 dark:text-white p-3 px-6 rounded-lg">
        <Entypo name="location-pin" size={15} /> &nbsp; {text}
      </Text>
    </TouchableOpacity>
  );
};

export default GetCurrentLocationComponent;
