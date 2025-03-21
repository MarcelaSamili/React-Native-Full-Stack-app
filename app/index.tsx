import CustomButton from '@/components/CustomButton';
import { images } from '@/constants';
import { Image, ScrollView, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect, router } from 'expo-router';

export default function Index() {
  return (
    <SafeAreaView className="h-full bg-black ">
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className="w-full justify-center items-center min-h-[85vh] px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode="contain"
          />

          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Descubra inumeras possibilidades com{' '}
              <Text className="text-secondary-200">Aora</Text>
            </Text>
            <Image
              source={images.path}
              className="w-[90px] h-[15px] absolute -bottom-2 -right-1"
            ></Image>
          </View>
          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
            Onde a criatividade se encontra com a inovação: Enbarque nesta
            jornada sem limites com Aora!{' '}
          </Text>
          <CustomButton
            title="Continue with Email"
            handlePress={() => {
              router.push('/sign-in');
            }}
            containerStyles="w-full mt-7 "
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" barStyle="light-content" />
    </SafeAreaView>
  );
}
