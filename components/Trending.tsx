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

import * as Animatable from 'react-native-animatable';

import { useVideoPlayer, VideoView } from 'expo-video';

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

/*interface TrendingItemProps {
  activeItem: any;
  item: any;
}*/

interface TrendingItemProps {
  activeItem: string;
  item: {
    $id: string;
    video: string;
    thumbnail: string;
  };
}

const TrendingItem = ({ activeItem, item }: TrendingItemProps) => {
  const [play, setPlay] = useState(false);
  const player = useVideoPlayer(item.video);

  useEffect(() => {
    const subscription = player.addListener('timeupdate', event => {
      if (event.currentTime >= player.duration) {
        setPlay(false);
      }
    });

    return () => {
      subscription.remove();
    };
  }, [player]);

  return (
    <Animatable.View
      className="mr-5 "
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <VideoView
          player={player}
          className="w-52 h-72 rounded-3xl mt-3 bg-white/35"
          contentFit="contain"
          allowsFullscreen
          allowsPictureInPicture
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
