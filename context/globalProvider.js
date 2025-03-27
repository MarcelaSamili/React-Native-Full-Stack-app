import { createContext, useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { getCurrentUser } from '@/lib/appwrite';

/*Aqui, createContext() cria um novo contexto chamado GlobalContext. 
Esse contexto pode armazenar valores globais que podem ser acessados 
por vários componentes na aplicação.*/
const GlobalContext = createContext();

//Aqui é definido um hook personalizado chamado useGlobalContext,
//que facilita o uso do contexto nos componentes.
export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then(res => {
        if (res) {
          setIsLoggedIn(true);
          setUser(res);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      })
      .catch(error => {
        console.error('Algo errado no useEffect em globalProvider.js', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        isLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
