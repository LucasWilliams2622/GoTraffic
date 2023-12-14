import {StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {appStyle} from '../../../../constants/AppStyle';
import ItemHistoryMoney from '../../../../components/Profile/ItemHistoryMoney';
import AppHeader from '../../../../components/AppHeader';
import {FlatList} from 'native-base';
import AxiosInstance from '../../../../constants/AxiosInstance';
import {useIsFocused} from '@react-navigation/native';
import {AppContext} from '../../../../utils/AppContext';

const HistoryMoney = () => {
  const [data, setData] = useState([]);
  const isFocused = useIsFocused();
  const {setIsLogin, infoUser, idUser} = useContext(AppContext);
  const getHistoryMoney = async () => {
    try {
      const response = await AxiosInstance().get(
        '/request/api/list-request-by-user?idUser=' + idUser,
      );
      if (response) {
        setData(response);
        console.log(response);
      } else {
        console.log('NETWORK ERROR');
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getHistoryMoney();
  }, [isFocused]);
  return (
    <SafeAreaView style={appStyle.container}>
      <AppHeader title="Lịch sử giao dịch" />
      <FlatList
        style={{marginBottom: 100}}
        data={data}
        renderItem={({item}) => <ItemHistoryMoney data={item} />}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default HistoryMoney;

const styles = StyleSheet.create({});
