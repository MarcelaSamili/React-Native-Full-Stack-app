import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { icons } from '@/constants';

interface FormFieldProps {
  title: string;
  value: string;
  placeholder?: string;
  handleChangeText: (text: string) => void;
  otherStyles?: string;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
}

const SearchInput = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  keyboardType = 'default',
  ...props
}: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className="flex-row border-2 px-4 w-full h-16 bg-slate-800 rounded-2xl focus:border-secondary items-center space-x-4">
      <TextInput
        className="flex-1 text-white font-psemibold text-base"
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#7b7b8b"
        onChangeText={handleChangeText}
        secureTextEntry={title === 'Password' && !showPassword}
      />
      <TouchableOpacity>
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
