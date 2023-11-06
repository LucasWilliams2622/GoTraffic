import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import {appStyle} from '../../../../../constants/AppStyle';
import ItemTrip from '../../../../../components/Support/ItemTrip';
import ItemCancleTrip from '../../../../../components/Support/ItemCancleTrip';

import { FlatList } from 'native-base';
import AxiosInstance from '../../../../../constants/AxiosInstance';

const CancleTrip = () => {
   const [data, setData] = useState('');
   const getCarByIdUser = async () => {
     try {
       const response = await AxiosInstance().get(
         '/booking/api/get-list-cancel?idOwner=1',
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
        renderItem={({item}) => <ItemCancleTrip data={item} />}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}></FlatList>
    </View>
  );
}

export default CancleTrip

const styles = StyleSheet.create({})
const DATA = [
  {
    id: 1,
    image: require('../../../../../assets/image/car.jpg'),
    time: '21/09/2023 | 20:30',
    name: 'KIA MORNING 2022',
    nameOfUser: 'Lê Văn Hậu',
    phoneOfUser: '0344112222',
  },
  {
    id: 2,
    image: require('../../../../../assets/image/car.jpg'),
    time: '21/09/2023 | 20:30',
    name: 'KIA MORNING 2022',
    nameOfUser: 'Lê Văn Hậu',
    phoneOfUser: '0344112222',
  },
];