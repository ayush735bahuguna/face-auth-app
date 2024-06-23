import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

const Loader = ({ visible = false }) => {
  return (
    visible && (
      <View style={style.container}>
        <View style={style.loader}>
          <ActivityIndicator size="large" color={"#5D5FEE"} />
          <Text className="ml-[10px] text-[16px] text-black">Loading...</Text>
        </View>
      </View>
    )
  );
};

const style = StyleSheet.create({
  loader: {
    height: 70,
    backgroundColor: "white",
    marginHorizontal: 50,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  container: {
    position: "absolute",
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
});

export default Loader;
