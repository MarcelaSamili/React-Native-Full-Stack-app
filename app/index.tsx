import { Link } from 'expo-router';
import { StatusBar, Text, View } from 'react-native';

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-black ">
      <Text className="text-xl text-white font-pbold">Aora</Text>
      <StatusBar barStyle="dark-content" />
      <Link href="/home" className="text-blue-200">
        Go to home
      </Link>
    </View>
  );
}
