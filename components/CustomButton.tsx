import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

interface CustonButtonProps {
  title: string;
  handlePress: () => void;
  containerStyles?: string;
  isLoading?: boolean;
  textStyles?: string;
}

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  isLoading,
  textStyles,
}: CustonButtonProps) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={` bg-secondary rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${
        isLoading ? 'opacity-50' : ''
      }`}
      disabled={isLoading}
    >
      <Text className={`font-psemibold text-lg text-white ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
