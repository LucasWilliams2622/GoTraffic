import {StyleSheet, Text, ToastAndroid, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {appStyle} from '../../../../../constants/AppStyle';
import ItemActiveTrip from '../../../../../components/Support/ItemActiveTrip';
import {FlatList} from 'native-base';
import AxiosInstance from '../../../../../constants/AxiosInstance';
import {useIsFocused} from '@react-navigation/native';

const ActiveTrip = () => {
  const isFocused = useIsFocused();
  const [data, setData] = useState('');
  const getCarByIdUser = async () => {
    try {
      const response = await AxiosInstance().get(
        '/booking/api/get-list-processing?idOwner=1',
      );
      if (response.result) {
        setData(response.booking);
      } else {
        console.log('Failed to get car complete');
      }
    } catch (error) {
      console.log('=========>', error);
    }
  };
  const completeBooking = async (id) => {
    try {
      const response = await AxiosInstance().post(
        '/booking/api/complete?id=' + id,
      );
      if (response.result) {
        ToastAndroid.show('Đã nhận được xe thành công', ToastAndroid.SHORT);
        getCarByIdUser();
      } else {
        ToastAndroid.show('Đã nhận được xe thất bại', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log('=========>', error);
    }
  };
  useEffect(() => {
    getCarByIdUser();
  }, [isFocused]);
  return (
    <View style={{flex: 1, padding: 10}}>
      <FlatList
        style={[appStyle.main, {marginBottom: 70}]}
        data={data}
        renderItem={({item}) => <ItemActiveTrip data={item} handleCompelete={completeBooking}/>}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}></FlatList>
    </View>
  );
};

export default ActiveTrip;

const styles = StyleSheet.create({});
