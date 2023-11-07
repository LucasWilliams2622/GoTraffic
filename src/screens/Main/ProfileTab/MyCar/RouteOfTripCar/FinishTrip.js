import {StyleSheet, Text, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import {appStyle} from '../../../../../constants/AppStyle';
import ItemTrip from '../../../../../components/Support/ItemTrip';
import {FlatList} from 'native-base';
import AxiosInstance from '../../../../../constants/AxiosInstance';

const FinishTrip = () => {
  const [data, setData] = useState('');
  const getCarByIdUser = async () => {
    try {
      const response = await AxiosInstance().get(
        '/booking/api/get-list-complete?idOwner=1',
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
  useEffect(() => {
    getCarByIdUser();
  }, []);
  return (
    <View style={{flex: 1, padding: 10}}>
      <FlatList
        style={appStyle.main}
        data={data}
        renderItem={({item}) => <ItemTrip data={item} />}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}></FlatList>
    </View>
  );
};

export default FinishTrip;

const styles = StyleSheet.create({});