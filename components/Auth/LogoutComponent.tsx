import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { Button, Card, Modal } from "@ui-kitten/components";
import { useAuth } from "../../Context/AuthContextProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";

export const LogoutComponent = (): React.ReactElement => {
  const { setcurrentUser, setisUserloggedIn } = useAuth();
  const { width } = useWindowDimensions();
  const [visible, setVisible] = React.useState(false);
  const { colorScheme } = useColorScheme();

  return (
    <View>
      <Pressable
        onPress={() => setVisible(true)}
        className="flex flex-col gap-1 items-center"
      >
        <MaterialCommunityIcons
          name="exit-to-app"
          size={24}
          color={colorScheme === "light" ? "black" : "white"}
        />
        <Text className="dark:text-white">Log out</Text>
      </Pressable>

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
              Are you Sure to Logout?
            </Text>
            <Text className="text-gray-600 my-3 dark:text-white">
              This action cannot be undone. This will remove your account and
              you have to sign in again to use your account.
            </Text>
          </View>
          <View className="flex flex-row justify-end items-end gap-3">
            <Button onPress={() => setVisible(false)}>Cancel</Button>
            <Button
              style={{ marginVertical: 1 }}
              status="danger"
              onPress={() => {
                AsyncStorage.removeItem("@user");
                setVisible(false);
                setcurrentUser(null);
                setisUserloggedIn(false);
              }}
            >
              Confirm
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
