import {StyleSheet, Text, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import {appStyle} from '../../../../../constants/AppStyle';
import ItemConfirmTrip from '../../../../../components/Support/ItemConfirmTrip';
import {FlatList} from 'native-base';
import AxiosInstance from '../../../../../constants/AxiosInstance';
import {useIsFocused} from '@react-navigation/native';
import Swipelist from 'react-native-swipeable-list-view';
const ConfirmTrip = () => {
  const isFocused = useIsFocused();

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
  }, [isFocused]);
  return (
    <View style={{flex: 1, padding: 10}}>
      <FlatList
        style={[appStyle.main,{marginBottom:70}]}
        data={data}
        renderItem={({item}) => <ItemConfirmTrip data={item} />}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}></FlatList>
    </View>
  );
};

export default ConfirmTrip;

const styles = StyleSheet.create({});
