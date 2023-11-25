import React, {createContext, useState, useEffect, useMemo} from 'react';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AxiosInstance from '../constants/AxiosInstance';

export const AppContext = createContext();

export const AppContextProvider = props => {
  const currentDay = moment().format('DD-MM-YYYY');
  const {children} = props;
  const [isLogin, setIsLogin] = useState(false);
  const [infoUser, setInfoUser] = useState(null);
  const [idUser, setIdUser] = useState('');
  const [appState, setAppState] = useState(0);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    getInfoUser();
    getListNotificationsByIDUser();
    return () => {};
  }, [infoUser, isLogin, appState]);

  const getInfoUser = async () => {
    try {
      const userInfoString = await AsyncStorage.getItem('userInfo');
      console.log('3333333', userInfoString);
      if (userInfoString !== null) {
        // const userInfo = JSON.parse(userInfoString);
        // setIdUser(userInfo.id);
        // setInfoUser(userInfo)
        const response = await AxiosInstance().get(
          '/user/api/get-by-id?id=' + idUser,
        );
        console.log('responseresponse', response);
        if (response.result) {
          setInfoUser(response.user);
          await AsyncStorage.setItem('userInfo', JSON.stringify(response.user));
        }
      } else {
        setIsLogin(false);
        await AsyncStorage.removeItem('userInfo');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getListNotificationsByIDUser = async () => {
    try {
      const response = await AxiosInstance().get(
        '/notification-booking/api/get-by-user?idUser=' + idUser,
      );
      if (response.result) {
        setNotificationCount(response.notifications.length);
      } else {
        console.log('NETWORK ERROR');
      }
    } catch (e) {
      console.log(e);
    }
  };
  const updateUserInfo = newInfo => {
    // Logic cập nhật thông tin user
    setInfoUser(prevUser => ({...prevUser, ...newInfo}));
  };
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
      notificationCount,
      setNotificationCount,
      updateUserInfo,
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
    notificationCount,
    setNotificationCount,
    updateUserInfo,
  ]);
  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
