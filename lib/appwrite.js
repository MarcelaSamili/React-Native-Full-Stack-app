import { Account, Avatars, Client, Databases, ID } from 'react-native-appwrite';

export const appwriteConfig = {
  endpoint: 'https://cloud.appwrite.io/v1',
  platform: 'com.marcela.aoraapp',
  projectId: '67def58c0016c42fad8c',
  databaseId: '67defce4001d84d3aeee',
  userCollectionId: '67defd15000e2577f835',
  videoCollectionId: '67defd42001b31e381a5',
  storageId: '67defeac00212f79f9b0',
};

const client = new Client()
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const avatars = new Avatars(client);

const databases = new Databases(client);

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw new Error('Falha ao criar a conta.');

    const avatarsUrl = avatars.getInitials(username) || 'default-avatar.png';

    /**-------------------------------*/
    /*try {
      const session = await account.get(); // Obtém sessão ativa
      console.log('Sessão ativa detectada:', session);
    } catch (error) {
      console.warn(
        'Nenhuma sessão ativa encontrada, prosseguindo com o login.'
      );
      try {*/
    await signIn(email, password);
    /*} catch (error) {
        console.warn('Usuário criado, mas login falhou:', error.message);
      }
    }*/
    /**------------------------------- */

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id || 'ERRO_ID',
        email,
        username,
        avatar: avatarsUrl,
      }
    );

    return newUser;
  } catch (error) {
    console.error('Erro ao tentar criar um novo usuário:', error);
    throw new Error('Falha ao criar usuário: ' + (error.message || error));
  }
};

export async function signIn(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (error) {
    console.log('Erro: ao criar a sessão: signIn function.');
    throw new Error(error);
  }
}
