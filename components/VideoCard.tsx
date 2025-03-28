import { View, Text } from 'react-native';
import React from 'react';

interface VideoCardProps {
  video: {
    title?: string;
    thumbnail?: string;
    videoUrl?: string;
    creator: {
      username: string;
      avatar: string;
    };
  };
}

const VideoCard = ({
  video: {
    title,
    thumbnail,
    videoUrl,
    creator: { username, avatar },
  },
}: VideoCardProps) => {
  return (
    <View className="flex-col items-center px-4 pb-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1"></View>
      </View>

      <Text className="text-2xl text-white">{title}</Text>
    </View>
  );
};

export default VideoCard;
