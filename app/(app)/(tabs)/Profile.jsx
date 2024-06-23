import {
  Text,
  ScrollView,
  View,
  Pressable,
  TouchableOpacity,
  StatusBar,
  Switch,
} from "react-native";
import { useAuth } from "../../../Context/AuthContextProvider";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign, Feather } from "@expo/vector-icons";
import { LogoutComponent } from "../../../components/Auth/LogoutComponent";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
const Settings = () => {
  const { currentUser } = useAuth();
  const { colorScheme, toggleColorScheme } = useColorScheme();
  return (
    <ScrollView
      className="p-2 bg-white h-full dark:bg-black "
      style={{ paddingTop: 20 }}
    >
      <Text className=" text-4xl font-semibold py-3 px-3 z-10 dark:text-white">
        Profile
      </Text>

      <View className="w-full bg-black dark:bg-slate-800/70 rounded-xl p-4 flex flex-row h-[150px] items-center relative">
        <Image
          source={
            "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
          }
          className="w-[80px] h-[80px] rounded-full"
        />
        <View className="pl-4">
          <Text className="text-white text-2xl">
            {currentUser?.payload.user.name || "User"}{" "}
            <Text className="text-[10px] text-white underline">
              {" "}
              {currentUser?.payload.user.role}
            </Text>
          </Text>
          <Text className="text-slate-300 text-[12px]">
            {currentUser?.payload.user.email}
          </Text>
          <Pressable className="my-3">
            <Text className="text-white underline">Edit profile</Text>
          </Pressable>
        </View>
      </View>

      <View className="flex items-center justify-around my-7 mb-2 flex-row">
        <Pressable
          onPress={() => {
            router.push("/ProfileEdit");
          }}
          className="flex flex-col gap-1 items-center"
        >
          <Feather
            name="edit-3"
            size={24}
            color={colorScheme === "light" ? "black" : "white"}
          />
          <Text className="dark:text-white">Edit</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            router.push("/Info");
          }}
          className="flex flex-col gap-1 items-center"
        >
          <MaterialCommunityIcons
            name="information-outline"
            size={24}
            color={colorScheme === "light" ? "black" : "white"}
          />
          <Text className="dark:text-white">Info</Text>
        </Pressable>
        <LogoutComponent />
      </View>

      <View className="my-7">
        <TouchableOpacity
          className="h-[60px] flex items-center justify-between flex-row px-4 border-slate-200 mb-1"
          onPress={() => {
            router.push("/(app)/AnonymousSender");
          }}
        >
          <View className="flex gap-3 items-center flex-row">
            <MaterialCommunityIcons
              name="account-convert-outline"
              size={24}
              color={colorScheme === "light" ? "black" : "white"}
            />
            <Text className="dark:text-white">Anonymous Sender</Text>
          </View>
          <AntDesign
            name="arrowright"
            size={24}
            color={colorScheme === "light" ? "black" : "white"}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            router.push("/Notifications");
          }}
          className="h-[60px] flex items-center justify-between flex-row px-4 border-slate-200 mb-1"
        >
          <View className="flex gap-3 items-center flex-row">
            <MaterialCommunityIcons
              name="bell"
              size={24}
              color={colorScheme === "light" ? "black" : "white"}
            />
            <Text className="dark:text-white">Notifications</Text>
          </View>
          <AntDesign
            name="arrowright"
            size={24}
            color={colorScheme === "light" ? "black" : "white"}
          />
        </TouchableOpacity>

        <TouchableOpacity
          className="h-[60px] flex items-center justify-between flex-row px-4 border-slate-200 mb-1"
          onPress={() => {
            router.push("/EditCurrentLocation");
          }}
        >
          <View className="flex gap-3 items-center flex-row">
            <MaterialIcons
              name="location-pin"
              size={24}
              color={colorScheme === "light" ? "black" : "white"}
            />
            <Text className="dark:text-white">Current location</Text>
          </View>
          <AntDesign
            name="arrowright"
            size={24}
            color={colorScheme === "light" ? "black" : "white"}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            router.push("/History");
          }}
          className="h-[60px] flex items-center justify-between flex-row px-4 border-slate-200 mb-1"
        >
          <View className="flex gap-3 items-center flex-row">
            <MaterialCommunityIcons
              name="history"
              size={24}
              color={colorScheme === "light" ? "black" : "white"}
            />
            <Text className="dark:text-white">History</Text>
          </View>
          <AntDesign
            name="arrowright"
            size={24}
            color={colorScheme === "light" ? "black" : "white"}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={toggleColorScheme}
          className="h-[60px] flex items-center justify-between flex-row px-4 mb-1"
        >
          <View className="flex flex-row gap-3">
            <MaterialCommunityIcons
              name="theme-light-dark"
              size={24}
              color={colorScheme === "light" ? "black" : "white"}
            />
            <Text className="dark:text-white ">
              Appereance :{colorScheme === "dark" ? " Light" : " Dark"}
            </Text>
          </View>

          <Switch
            onValueChange={toggleColorScheme}
            value={colorScheme === "dark"}
            className="w-[100px]"
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Settings;
