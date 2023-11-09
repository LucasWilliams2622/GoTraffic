import React, {createContext, useState, useEffect, useMemo} from 'react';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AxiosInstance from '../constants/AxiosInstance';

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
  }, [isLogin, appState]);

  const getInfoUser = async () => {
    try {
      const userInfoString = await AsyncStorage.getItem('userInfo');
      if (userInfoString !== null) {
        // const userInfo = JSON.parse(userInfoString);
        // setIdUser(userInfo.id);
        // setInfoUser(userInfo)
      }

      const response = await AxiosInstance().get(
        '/user/api/get-by-id?id=' + idUser,
        {},
      );
      if (response.result) {
        setInfoUser(response.user);
        await AsyncStorage.setItem('userInfo', JSON.stringify(response.user));
        // console.log(response.user);
      }
    } catch (error) {
      console.log('error');

      console.log(error);
    }
  };

  const currentDay = moment().format('DD-MM-YYYY');

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
