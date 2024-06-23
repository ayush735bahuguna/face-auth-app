import { View, Text, useWindowDimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { Image } from "expo-image";
import mapSVG from "../../assets/svgs/map.svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GetCurrentLocationComponent from "../../components/GetCurrentLocationComponent";

const EditCurrentLocation = () => {
  const { width } = useWindowDimensions();
  const [LocationText, setLocationText] = useState(null);
  const [Pincode, setPincode] = useState(null);
  const [isLocationLoading, setisLocationLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const Address = await AsyncStorage.getItem("@location");
      Address && setLocationText(Address);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await AsyncStorage.setItem("@Pincode", Pincode);
    })();
  }, [Pincode]);

  return (
    <View className="flex-1 h-full bg-white dark:bg-black">
      <Image
        source={mapSVG}
        style={{ width: width, height: 300 }}
        className="scale-[2.1] my-5"
        contentFit="scale-down"
      />

      <View>
        {isLocationLoading ? (
          <Text className="text-center px-3 dark:text-white">Loading...</Text>
        ) : (
          <>
            {LocationText ? (
              <>
                <Text className="text-center px-3 my-3 text-[15px] dark:text-white">
                  {LocationText}
                </Text>
              </>
            ) : (
              <Text className="text-center px-3 dark:text-white">
                No location data
              </Text>
            )}
          </>
        )}
      </View>

      <View className="absolute bottom-10 flex items-center justify-center w-full">
        <GetCurrentLocationComponent
          LocationText={LocationText}
          setLocationText={setLocationText}
          text={`Update current location`}
          setisLocationLoading={setisLocationLoading}
          setPincode={setPincode}
        />
      </View>
    </View>
  );
};

export default EditCurrentLocation;
