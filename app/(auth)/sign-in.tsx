import { View, Text, ScrollView, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '@/constants';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { Link, router } from 'expo-router';
import { getCurrentUser, signIn } from '@/lib/appwrite';
import { useGlobalContext } from '@/context/globalProvider';

const SignIn = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert('Error, Por favor, preencha todos os campos.');
      return;
    }

    setIsSubmitting(true);

    try {
      await signIn(form.email, form.password);

      const result = await getCurrentUser();

      setUser(result);
      setIsLoggedIn(true);

      router.replace('/home');
    } catch (error) {
      Alert.alert('Email ou senha inválidos.');
      throw new Error();
    } finally {
      setIsSubmitting(false);
    }
  };
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
            Login Aora
          </Text>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={e => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={e => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />
          <CustomButton
            title="Entrar"
            handlePress={submit}
            containerStyles="m-7"
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Não tem uma conta ?
            </Text>

            <Link
              href={'/sign-up'}
              className="text-lg font-psemibold text-secondary"
            >
              Criar conta
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
