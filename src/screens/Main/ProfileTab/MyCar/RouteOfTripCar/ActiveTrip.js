import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {appStyle} from '../../../../../constants/AppStyle';
import ItemActiveTrip from '../../../../../components/Support/ItemActiveTrip';
import {FlatList} from 'native-base';

const ActiveTrip = () => {
  return (
    <View style={{flex: 1, padding: 10}}>
      <FlatList
        style={appStyle.main}
        data={DATA}
        renderItem={({item}) => <ItemActiveTrip data={item} />}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}></FlatList>
    </View>
  );
};

export default ActiveTrip;

const styles = StyleSheet.create({});
const DATA = [
  {
    id: 1,
    image: require('../../../../../assets/image/car.jpg'),
    time: '21/09/2023 | 20:30',
    name: 'KIA MORNING 2022',
    timeStart: '21h00,17/10/2023',
    nameOfUser: 'Lê Văn Hậu',
    phoneOfUser: '0344112222',
  }
];
