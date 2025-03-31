import { useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import * as Animatable from 'react-native-animatable';

const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1,
  },
};
const zoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
};

interface TrendingItemProps {
  activeItem: any;
  item: any;
}

const TrendingItem = ({ activeItem, item }: TrendingItemProps) => {
  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
    ></Animatable.View>
  );
};

const Trending = ({ posts }: any) => {
  const [activeItem, setActiveItem] = useState(posts[0]);
  return (
    <FlatList
      data={posts}
      keyExtractor={post => post.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item}></TrendingItem>
      )}
      horizontal
    />
  );
};

export default Trending;
