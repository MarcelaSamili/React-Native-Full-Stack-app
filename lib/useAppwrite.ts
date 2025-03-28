import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { Models } from 'react-native-appwrite';

interface useAppwriteProps {
  fn: () => Promise<Models.Document[] | undefined>;
}

export const useAppwrite = ({ fn }: useAppwriteProps) => {
  const [data, setData] = useState<Models.Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await fn();

      setData(response ?? []);
    } catch (error) {
      Alert.alert('Erro ao carregar os posts');
      console.error('Erro: em useEffect, na home', error);
    } finally {
      setIsLoading(false);
    }
  };

  // essa função vai ser chamada uma vez quando o usuário entrar
  useEffect(() => {
    fetchData();
  }, [fn]);

  const refetch = () => fetchData(); //Assim ela vai ser chamada também, em qualquer lugar que quizermos chama-la na aplicação.

  return { data, isLoading, refetch };
};
