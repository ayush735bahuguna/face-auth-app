import React from "react";
import { TouchableOpacity, Text, View } from "react-native";

const Button = ({ title, icon, onPress = () => {}, style }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className={`h-[55px] w-full bg-blue-600 mb-[30px] flex justify-center items-center flex-row ${
        !style && "rounded-md"
      }`}
      style={style}
    >
      {icon && <View style={{ padding: 10 }}>{icon}</View>}
      <Text className="text-white font-bold text-[18px]">{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
