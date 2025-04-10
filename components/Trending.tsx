import { icons } from '@/constants';
import { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import { WebView } from 'react-native-webview';
import * as Animatable from 'react-native-animatable';

//import { Video, ResizeMode } from 'expo-av';

import { useEvent } from 'expo';
import { useVideoPlayer, VideoView } from 'expo-video';

import * as DocumentPicker from 'expo-document-picker';
import { DocumentPickerAsset } from 'expo-document-picker';
//Animações
const zoomIn = {
  from: {
    transform: [{ scale: 0.9 }],
  },
  to: {
    transform: [{ scale: 1 }],
  },
};
const zoomOut = {
  from: {
    transform: [{ scale: 1 }],
  },
  to: {
    transform: [{ scale: 0.9 }],
  },
};
Animatable.initializeRegistryWithDefinitions({
  zoomIn,
  zoomOut,
});
//-------------------------------------------

interface TrendingItemProps {
  activeItem: string;
  item: {
    $id: string;
    video: string; //video URI
    thumbnail: string;
  };
}

const TrendingItem = ({ activeItem, item }: TrendingItemProps) => {
  const [play, setPlay] = useState(false);

  const player = useVideoPlayer(item.video); //Caso o url não seja do youtube esse jeito vai dar certo.
  console.log('URL do vídeo:', item.video);


  return (
    <Animatable.View
      className="mr-5 "
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={700}
    >
     
        {play ? (
          <VideoView //Caso a url que esta recebendo NÃO for do youtube
            style={{ width: '100%', height: 200, borderRadius: 16 }}
            player={player}
            //allowsFullscreen
            //allowsPictureInPicture
          />
        ) : (
          <TouchableOpacity
            className="relative justify-center items-center "
            activeOpacity={0.7}
            onPress={() => setPlay(true)}
          >
            <ImageBackground
              source={{ uri: item.thumbnail }}
              className="w-52 h-72 rounded-3xl py-4 overflow-hidden shadow-lg shadow-black/40"
              resizeMode="cover"
            />
            <Image
              source={icons.play}
              className="h-12 w-12 absolute"
              resizeMode="contain"
            />
            */
          </TouchableOpacity>
        )}
    </Animatable.View>
  );
};

interface TrendingProps {
  posts: {
    $id: string;
    video: string;
    thumbnail: string;
  }[];
}

const Trending = ({ posts }: TrendingProps) => {
  const [activeItem, setActiveItem] = useState(posts[1]?.$id || '');

  const viewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: { item: { $id: string } }[];
  }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].item.$id);
    }
  };
  return (
    <FlatList
      data={posts}
      keyExtractor={item => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item}></TrendingItem>
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
      contentOffset={{ x: 170, y: 0 }}
      horizontal //Isso faz toda a diferença se tirar a lista fica na vertical perdendo o conceito.
    />
  );
};

export default Trending;
