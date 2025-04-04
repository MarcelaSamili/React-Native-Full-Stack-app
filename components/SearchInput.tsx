import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { icons } from '@/constants';
import { router, usePathname } from 'expo-router';

/*interface FormFieldProps {
  title: string;
  value: string;
  placeholder?: string;
  handleChangeText: (text: string) => void;
  otherStyles?: string;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
}*/

const SearchInput = ({
  placeholder,
  initialQuery,
}: {
  placeholder: string;
  initialQuery: string;
}) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || '');
  return (
    <View className="flex-row border-2 px-4 w-full h-16 bg-slate-800 rounded-2xl focus:border-secondary items-center space-x-4">
      <TextInput
        className="flex-1 text-white font-psemibold text-base"
        value={query}
        placeholder={placeholder}
        placeholderTextColor="#CDCDE0"
        onChangeText={e => setQuery(e)}
      />
      <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert(
              'Missing query',
              'Please input something to search results across databases.'
            );
          }

          if (pathname.startsWith('/search')) {
            router.setParams({ query });
          } else {
            router.push(`/search/${query}`);
          }
        }}
      >
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
