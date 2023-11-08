import {StyleSheet, Text, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import {appStyle} from '../../../../../constants/AppStyle';
import ItemConfirmTrip from '../../../../../components/Support/ItemConfirmTrip';
import {FlatList} from 'native-base';
import AxiosInstance from '../../../../../constants/AxiosInstance';

const ConfirmTrip = () => {
  const [data, setData] = useState('');

  const getCarByIdUser = async () => {
    try {
      const response = await AxiosInstance().get(
        '/booking/api/get-list-pending?idOwner=1',
      );
      if (response.result) {
        //console.log(response.booking[0].Car.address);
        console.log(response.booking);
        setData(response.booking);
      } else {
        console.log('Failed to get car pending');
      }
    } catch (error) {
      console.log('=========>', error);
    }
  };

  useEffect(() => {
    getCarByIdUser();
  }, []);
  return (
    <View style={{flex: 1, padding: 10}}>
      <FlatList
        style={appStyle.main}
        data={data}
        renderItem={({item}) => <ItemConfirmTrip data={item} />}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}></FlatList>
    </View>
  );
};

export default ConfirmTrip;

const styles = StyleSheet.create({});
