import { View, Text, FlatList } from 'react-native';
import React from 'react';

const Trending = ({ posts }: any) => {
  return (
    <FlatList
      data={posts}
      keyExtractor={post => post.$id}
      renderItem={({ item: post }) => (
        <Text className="text-3xl text-white">{post.id}</Text>
      )}
      horizontal
    />
  );
};

export default Trending;
