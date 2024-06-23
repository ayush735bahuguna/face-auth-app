import React, { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContextProvider";
import { ScrollView, Text, View } from "react-native";
import EventSource from "react-native-sse";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const eventSource = new EventSource(
      `https://face-recognition-application-api-module.onrender.com/notifications/${currentUser?.payload.user.email}`
    );

    eventSource.onmessage = function (event) {
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        event.data,
      ]);
    };

    eventSource.onerror = function () {
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [currentUser]);
  return (
    <ScrollView className="min-h-full bg-white">
      {notifications.length === 0 ? (
        <View className="flex justify-center items-center my-20">
          <Text>No new Notifications</Text>
        </View>
      ) : (
        <View>
          {notifications.map((notification, index) => (
            <Text key={index}>{notification}</Text>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default Notifications;
