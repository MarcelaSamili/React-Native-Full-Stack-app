import { View, Text, FlatList } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import SearchInput from '@/components/SearchInput';

import EmptyState from '@/components/EmptyState';
import { searchPosts } from '@/lib/appwrite';
import { useAppwrite } from '@/lib/useAppwrite';
import VideoCard from '@/components/VideoCard';
import { useLocalSearchParams } from 'expo-router';

const Search = () => {
  const query = useLocalSearchParams();
  const { data: searchPostsData } = useAppwrite({
    fn: () => searchPosts(query),
  });

  console.log('query:', query);

  /* useEffect(() => {
    refetch();
  }, [query]);*/

  return (
    <SafeAreaView className="bg-primary h-full ">
      <FlatList
        data={searchPostsData || []}
        keyExtractor={item => item.$id}
        renderItem={({ item }: { item: any }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Procure os resutados para
                </Text>

                <Text className="text-2xl font-psemibold text-white">
                  {query?.value ?? 'Nenhuma consulta'}
                </Text>
                <SearchInput
                  placeholder="Search for a video topic"
                  initialQuery={String(query)}
                />
              </View>
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

export default Search;
