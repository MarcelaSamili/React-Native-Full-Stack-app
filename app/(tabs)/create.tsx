import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import React, { useMemo, useRef, useState } from 'react';
import FormField from '@/components/FormField';
import WebView from 'react-native-webview';
import { icons } from '@/constants';
import CustomButton from '@/components/CustomButton';

import * as DocumentPicker from 'expo-document-picker';
import { DocumentPickerAsset } from 'expo-document-picker';
import { router } from 'expo-router';
import { createVideo } from '@/lib/appwrite';
import { useGlobalContext } from '@/context/globalProvider';

import { useVideoPlayer, VideoView } from 'expo-video';

const Create = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState<{
    title: string;
    video: DocumentPickerAsset | string; //null
    thumbnail: DocumentPickerAsset | null;
    prompt: string;
  }>({
    title: '',
    video: '', //null
    thumbnail: null,
    prompt: '',
  });

  const openPiker = async (selectType: 'image' | 'video') => {
    const result = await DocumentPicker.getDocumentAsync({
      type:
        selectType === 'image'
          ? ['image/png', 'image/jpg', 'image/jpeg']
          : ['video/mp4', 'video/gif', 'video/quicktime', 'video/x-m4v'],
    });

    if (!result.canceled && result.assets?.length) {
      const asset = result.assets[0];

      if (selectType === 'image') {
        setForm(prev => ({ ...prev, thumbnail: asset }));
      } else if (selectType === 'video') {
        setForm(prev => ({ ...prev, video: asset }));
      }
    }
  };

  const submit = async () => {
    if (!form.prompt || !form.title || !form.thumbnail || !form.video) {
      return Alert.alert('Please fill in all the fields');
    }

    setUploading(true);

    try {
      await createVideo({
        ...form,
        userId: user.$id,
      });

      Alert.alert('Success', 'Post uploaded successfully');
      router.navigate('/home');
    } catch (error: any) {
      console.error('Erro na função submit:', error);
      Alert.alert('Não foi possível submeter o formulário', error);
    } finally {
      setForm({
        title: '',
        video: '', //mudei aqui , era null
        thumbnail: null,
        prompt: '',
      });
      setUploading(false);
    }
  };

  const player = useVideoPlayer(form.video);

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">Upload Video</Text>

        <FormField
          title="Video Name"
          value={form.title}
          placeholder="Give your video a catch title"
          handleChangeText={e => setForm({ ...form, title: e })}
          otherStyles="mt-10"
        />

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Upload Video
          </Text>
        </View>

        <TouchableOpacity onPress={() => openPiker('video')}>
          {form.video ? (
            <VideoView
              player={player}
              style={{ width: '100%', height: 200, borderRadius: 16 }}
            />
          ) : (
            <View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center">
              <View className="w-14 h-14 border border-dashed border-secondary-100 justify-center items-center">
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  className="w-1/2 h-1/2"
                ></Image>
              </View>
            </View>
          )}
        </TouchableOpacity>

        <View className="mt-7 space-y-2">
          <Text className="text-2xl text-white font-psemibold">
            Thimbnail Image
          </Text>

          <TouchableOpacity onPress={() => openPiker('image')}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                resizeMode="cover"
                className="w-full h-64 rounded-2xl"
              />
            ) : (
              <View className="w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center border-2 border-black-200 space-x-2">
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  className="w-5 h-5"
                ></Image>
                <Text className="text-sm text-gray-100 font-pmedium">
                  {' '}
                  choose a file{' '}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <FormField
          title="AI Prompt"
          value={form.prompt}
          placeholder="The prompt you use to create this video"
          handleChangeText={e => setForm({ ...form, prompt: e })}
          otherStyles="mt-7"
        />
        <CustomButton
          title="submit & Publish"
          handlePress={submit}
          containerStyles="mt-7"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
