import { View, Text, ScrollView, Image } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '@/constants';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { Link } from 'expo-router';

const SignUP = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [isSubmittin, setIsSubmittin] = useState(false);

  const submit = () => {};
  return (
    <SafeAreaView className="bg-black h-full">
      <ScrollView>
        <View className="w-full justify-center h-full min-h-[84vh] px-4 my-6 ">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
            Criar conta Aora
          </Text>

          <FormField
            title="Username"
            value={form.username}
            handleChangeText={e => setForm({ ...form, username: e })}
            otherStyles="mt-10"
          />

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={e => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Senha"
            value={form.password}
            handleChangeText={e => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />
          <CustomButton
            title="Entrar"
            handlePress={submit}
            containerStyles="m-7"
            isLoading={isSubmittin}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Crie sua conta agora.
            </Text>

            <Link
              href={'/sign-in'}
              className="text-lg font-psemibold text-secondary"
            >
              Entrar
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUP;
