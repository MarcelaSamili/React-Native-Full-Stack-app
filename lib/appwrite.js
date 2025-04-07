import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
} from 'react-native-appwrite';

export const appwriteConfig = {
  endpoint: 'https://cloud.appwrite.io/v1',
  platform: 'com.marcela.aoraapp',
  projectId: '67def58c0016c42fad8c',
  databaseId: '67defce4001d84d3aeee',
  userCollectionId: '67defd15000e2577f835',
  videoCollectionId: '67defd42001b31e381a5',
  storageId: '67defeac00212f79f9b0',
};

const {
  endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  videoCollectionId,
  storageId,
} = appwriteConfig;

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

    if (!newAccount) {
      console.error('Você já possui uma conta, clique em entrar.');
    }

    const avatarsUrl = avatars.getInitials(username) || 'default-avatar.png';

    /**-------------------------------*/
    try {
      const session = await account.get().catch(() => null); // Obtém sessão ativa
      console.log(
        `Há uma conta ativa: Usuário ${session.username} ID: ${session.$id}`
      );
      if (!session) {
        await signIn(email, password);
      }

      console.log('Sessão ativa detectada:', session);
    } catch (error) {
      console.warn(
        'Nenhuma sessão ativa encontrada, prosseguindo com o login.'
      );
    }

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

export const signIn = async (email, password) => {
  try {
    // Obtém sessão ativa antes de tentar logar.
    const session = await account.get().catch(() => null);

    //se não tiver uma ativa ele cria uma.
    if (!session) {
      await account.createEmailPasswordSession(email, password);
    }
    //Apresenta a sessão que esta ativa no console.
    console.log(session);

    return session;
  } catch (error) {
    console.error(
      'Erro ao criar sessão. Ou tem uma sessão ativa ou o usuário não existe.',
      error.message || error
    );
    throw error; // Apenas relança o erro original, sem criar um novo objeto
  }
};

export const getCurrentUser = async () => {
  try {
    //obtem a sessão ativa
    const currentLoguedUser = await account.get().catch(() => null);
    console.log(`Há uma conta ativa: Usuário ID: ${currentLoguedUser.$id}`);
    if (!currentLoguedUser) {
      console.warn('Nenhum usuário logado.');
    }
    //Se tiver uma ativa consultamos o usuário no banco de dados.
    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal('accountId', currentLoguedUser.$id)]
    );

    if (!currentUser) {
      console.warn(
        'Os dados desse usuário não existe no banco de dados. Usuário inativo.'
      );
    }
    //Caso não haja nenhuma sessão ative ele retorna 0 pois precisamos de somente um usuário ativo.
    return currentUser.documents[0];
  } catch (error) {
    console.error(error);
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(databaseId, videoCollectionId);
    //console.log('Posts', posts);
    return posts.documents;
  } catch (error) {
    console.error('getAllPost function error:', error);
  }
};

export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(databaseId, videoCollectionId, [
      Query.orderDesc('$createdAt', Query.limit(7)),
    ]);
    //console.log('Posts', posts);
    return posts.documents;
  } catch (error) {
    console.error('getLatestPost function error:', error);
  }
};

export const searchPosts = async queryValue => {
  try {
    const searchPostsData = await databases.listDocuments(
      databaseId,
      videoCollectionId,
      [Query.search('title', queryValue)]
    );
    //console.log('queryValue', queryValue);
    return searchPostsData.documents;
  } catch (error) {
    console.error('getLatestPost function error:', error);
    return [];
  }
};

export const getUserPosts = async userId => {
  try {
    const searchPostsData = await databases.listDocuments(
      databaseId,
      videoCollectionId,
      [Query.search('creator', userId)]
    );
    //console.log('userId',userId);
    return searchPostsData.documents;
  } catch (error) {
    console.error('getUserPosts function error:', error);
    return [];
  }
};
