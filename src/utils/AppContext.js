import React, {createContext, useState, useEffect, useMemo} from 'react';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AppContext = createContext();

export const AppContextProvider = props => {
  const {children} = props;
  const [isLogin, setIsLogin] = useState(false);
  const [infoUser, setInfoUser] = useState({});
  const [idUser, setIdUser] = useState('');
  const [appState, setAppState] = useState(0);

  useEffect(() => {
    getInfoUser();

    return () => {};
  }, [isLogin]);

  const getInfoUser = async () => {
    try {
      const userInfoString = await AsyncStorage.getItem('userInfo');
      if (userInfoString !== null) {
        const userInfo = JSON.parse(userInfoString);
        setInfoUser(userInfo);
        setIdUser(userInfo._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const currentDay = moment().format('YYYY-MM-DD');

  const contextValue = useMemo(() => {
    return {
      isLogin,
      setIsLogin,
      infoUser,
      setInfoUser,
      idUser,
      setIdUser,
      currentDay,
      appState,
      setAppState,
    };
  }, [
    isLogin,
    setIsLogin,
    infoUser,
    setInfoUser,
    idUser,
    setIdUser,
    currentDay,
    appState,
    setAppState,
  ]);
  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
