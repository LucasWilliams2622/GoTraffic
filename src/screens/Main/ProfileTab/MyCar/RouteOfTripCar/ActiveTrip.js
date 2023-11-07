import {StyleSheet, Text, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import {appStyle} from '../../../../../constants/AppStyle';
import ItemActiveTrip from '../../../../../components/Support/ItemActiveTrip';
import {FlatList} from 'native-base';
import AxiosInstance from '../../../../../constants/AxiosInstance';

const ActiveTrip = () => {
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
   useEffect(() => {
     getCarByIdUser();
   }, []);
  return (
    <View style={{flex: 1, padding: 10}}>
      <FlatList
        style={appStyle.main}
        data={data}
        renderItem={({item}) => <ItemActiveTrip data={item} />}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}></FlatList>
    </View>
  );
};

export default ActiveTrip;

const styles = StyleSheet.create({});
