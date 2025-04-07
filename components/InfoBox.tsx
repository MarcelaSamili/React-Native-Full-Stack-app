import { View, Text } from 'react-native';
import React from 'react';

interface infoboxProps {
  title?: any;
  containerStyle?: string;
  titleStyles?: string;
  subtitle?: string;
}

const InfoBox = ({
  title,
  containerStyle,
  titleStyles,
  subtitle,
}: infoboxProps) => {
  return (
    <View className={containerStyle}>
      <Text className={`text-white text-center font-psemibold${titleStyles}`}>
        {title}
      </Text>
      <Text className="text-sm text-gray-100 font-pregular">{subtitle}</Text>
    </View>
  );
};

export default InfoBox;
