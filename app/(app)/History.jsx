import * as React from "react";
import {
  View,
  Text,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import axios from "axios";
import { useAuth } from "../../Context/AuthContextProvider";
import { Feather } from "@expo/vector-icons";

import { Button, Card, Modal } from "@ui-kitten/components";
import { Image } from "expo-image";
import { useColorScheme } from "nativewind";

export default function History() {
  const { currentUser } = useAuth();
  const [isLoading, setisLoading] = React.useState(false);
  const [isDeleteLoading, setDeleteLoading] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const { width } = useWindowDimensions();
  const [Data, setData] = React.useState([]);
  const [deleteImageId, setDeleteImageId] = React.useState(null);

  const fetchDATA = async () => {
    setisLoading(true);
    try {
      if (currentUser?.token) {
        const { data } = await axios.get(
          `https://face-recognition-application-api-module.onrender.com/face-app/user/images`,
          { headers: { Authorization: `Bearer ${currentUser?.token}` } }
        );
        setData(JSON.stringify(data) === "[null]" ? [] : data);
      }
    } catch (error) {
      console.log(error);
    }
    setisLoading(false);
  };

  const deleteDATA = async () => {
    try {
      if (currentUser?.token || deleteImageId) {
        setDeleteLoading(true);
        const { data } = await axios.get(
          `https://face-recognition-application-api-module.onrender.com/face-app/user/images/delete/${deleteImageId}`,
          { headers: { Authorization: `Bearer ${currentUser?.token}` } }
        );
        ToastAndroid.show(data, ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setDeleteLoading(false);
      setVisible(false);
      fetchDATA();
    }
  };

  React.useEffect(() => {
    fetchDATA();
  }, []);

  return (
    <View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        className="px-3 bg-white h-full dark:bg-black"
      >
        {isLoading ? (
          <>
            <Text className="dark:text-white my-28 text-center">
              Loading...
            </Text>
          </>
        ) : (
          <>
            {Data?.length > 0 ? (
              <>
                {Data?.map((item, index) => {
                  return (
                    <View
                      key={index}
                      className="my-1 bg-slate-100 dark:bg-slate-800 relative"
                      style={{
                        borderBottomLeftRadius: 8,
                        borderBottomEndRadius: 8,
                      }}
                    >
                      <Image
                        source={item?.imageUrl}
                        alt="Image"
                        className="w-full aspect-square"
                        style={{
                          borderTopLeftRadius: 8,
                          borderTopEndRadius: 8,
                        }}
                      />
                      <TouchableOpacity
                        onPress={() => {
                          setDeleteImageId(item?.id);
                          setVisible(true);
                        }}
                        className="absolute top-3 right-3 p-3 bg-slate-700 rounded-full"
                      >
                        <Feather name="trash-2" size={24} color="white" />
                      </TouchableOpacity>
                      <View className="flex flex-col p-2 pb-3">
                        <Text className="dark:text-white font-semibold py-2 text-xl">
                          {item?.guardian}
                        </Text>
                        <Text className="dark:text-white">{item?.mobile}</Text>
                        <Text className="dark:text-white">
                          {item?.location}
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </>
            ) : (
              <Text className="dark:text-white my-28 text-center">
                Oops! no data available right now
              </Text>
            )}
          </>
        )}
      </ScrollView>
      <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}
      >
        <View
          style={{ width: width - 20 }}
          className="bg-white dark:bg-slate-800 p-5 m-2 rounded-md min-h-[200px] flex justify-between"
        >
          <View>
            <Text className="text-2xl font-bold dark:text-white">
              Are you Sure to delete?
            </Text>
            <Text className="text-gray-600 my-3 dark:text-white">
              This action cannot be undone. This will remove this data from our
              servers.
            </Text>
          </View>
          <View className="flex flex-row justify-end items-end gap-3">
            <Button onPress={() => setVisible(false)}>Cancel</Button>
            <Button
              style={{ marginVertical: 1 }}
              status="danger"
              disabled={isDeleteLoading}
              onPress={() => {
                deleteDATA();
              }}
            >
              {isDeleteLoading ? "Deleting..." : "Confirm"}
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
