import { View, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import EmptyState from '@/components/EmptyState';
import { getCurrentUser, getUserPosts, singOut } from '@/lib/appwrite';
import { useAppwrite } from '@/lib/useAppwrite';
import VideoCard from '@/components/VideoCard';

import { useGlobalContext } from '@/context/globalProvider';
import { icons } from '@/constants';
import InfoBox from '@/components/InfoBox';
import { useCallback } from 'react';
import { router } from 'expo-router';

const Profine = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();

  const getUserPostsCallback = useCallback(() => {
    return getUserPosts(user.$id);
  }, [user.$id]);

  const { data: searchUserPostsData, refetch } = useAppwrite({
    fn: getUserPostsCallback,
  });

  const logout = async () => {
    await singOut();
    setUser(null);
    setIsLoggedIn(false);

    router.replace('/(auth)/sign-in');
  };

  console.log('Id do usuário:', user.$id);
  return (
    <SafeAreaView className="bg-primary h-full ">
      <FlatList
        data={searchUserPostsData || []}
        keyExtractor={item => item.$id}
        renderItem={({ item }: { item: any }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="w-full justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              className="w-full items-end mb-10"
              onPress={logout}
            >
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-6 h-6"
              />
            </TouchableOpacity>

            <View className="w-16 h-16 border border-secndary rounded-lg justify-center">
              <Image
                source={{ uri: user?.avatar }}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View>

            <InfoBox
              title={user?.username}
              containerStyle="mt-5"
              titleStyles="text-lg"
            />

            <View className="mt-5 flex-row">
              <InfoBox
                title={searchUserPostsData.length || 0}
                subtitle="posts"
                containerStyle="mr-10"
                titleStyles="text-xl"
              />
              <InfoBox
                title="1.2k"
                subtitle="Followers"
                titleStyles="text-xl"
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="Nenhum video encontrado."
            subtitle="Seja o primeiro a fazer um upload de um video."
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Profine;
