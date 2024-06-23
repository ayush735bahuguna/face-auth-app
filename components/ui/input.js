import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Input = ({
  label,
  iconName,
  error,
  password,
  onFocus = () => {},
  ...props
}) => {
  const [hidePassword, setHidePassword] = React.useState(password);
  const [isFocused, setIsFocused] = React.useState(false);
  return (
    <View className="mb-[20px]">
      <Text className="my-[5px] text-[14px] text-gray-500">{label}</Text>
      <View
        className={`h-[55px] bg-[#F3F4FB] flex flex-row px-[15px] items-center`}
        style={{
          borderWidth: 0.5,
          borderColor: error ? "red" : isFocused ? "#7978B5" : "#F3F4FB",
        }}
      >
        <Icon
          name={iconName}
          className="text-[#7978B5] text-[22px] mr-[10px]"
        />
        <TextInput
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={hidePassword}
          className="text-[#7978B5] flex-1"
          placeholderTextColor={"#7978B5"}
          {...props}
        />
        {password && (
          <Icon
            onPress={() => setHidePassword(!hidePassword)}
            name={hidePassword ? "eye-outline" : "eye-off-outline"}
            style={{ color: "#7978B5", fontSize: 22 }}
          />
        )}
      </View>
      {error && (
        <Text className="mt-[7px] text-red-500 text-[12px]">{error}</Text>
      )}
    </View>
  );
};

export default Input;
