import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {appStyle} from '../../../../../constants/AppStyle';
import ItemTrip from '../../../../../components/Support/ItemTrip';
import ItemCancleTrip from '../../../../../components/Support/ItemCancleTrip';

import { FlatList } from 'native-base';

const CancleTrip = () => {
  return (
    <View style={{flex: 1, padding: 10}}>
      <FlatList
        style={appStyle.main}
        data={DATA}
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