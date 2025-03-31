import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { icons } from '@/constants';

interface VideoCardProps {
  video: {
    title?: string;
    thumbnail: string;
    video?: string;
    users: {
      username?: string;
      avatar?: string;
    };
  };
}
const VideoCard = ({
  video: {
    title,
    thumbnail,
    video,
    users: { username = 'Anônimo', avatar = '' },
  },
}: VideoCardProps) => {
  const [play, setPlay] = useState(false);
  return (
    <View className="flex-col items-center px-4 pb-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] justify-center items-center p-0.5">
            <Image
              source={{
                uri: avatar,
              }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>
          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="text-white font-psemibold text-sm"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {username}
            </Text>
          </View>
        </View>
        <View className="pt-2">
          <Image
            source={icons.menu}
            className="w-5 h-5"
            resizeMode="contain"
          ></Image>
        </View>
      </View>

      {play ? (
        <Text className="text-white">Playing...</Text>
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="w-full h-60 rounded-xl mt-3 relative justify-center items-center "
        >
          <Image
            source={{ uri: thumbnail }}
            className=" h-full w-full rounded-xl mt-3 bg-white"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
