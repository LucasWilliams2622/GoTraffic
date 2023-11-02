import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {FlatList} from 'native-base';
import {SafeAreaView} from 'react-native-safe-area-context';
import {appStyle} from '../../../../constants/AppStyle';
import {COLOR} from '../../../../constants/Theme';
import FastImage from 'react-native-fast-image';
import ItemListCar from '../../../../components/Support/ItemListCar';

const ListCar = (props) => {
  const {navigation} = props;
  const goBack = () => {
    navigation.goBack('HomeCar');
  };
  return (
    <SafeAreaView style={appStyle.container}>
      <TouchableOpacity onPress={goBack}>
        <FastImage
          source={require('../../../../assets/icon/ic_left.png')}
          style={{
            position: 'absolute',
            left: 10,
            top: 20,
            width: 20,
            height: 20,
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <FastImage
          source={require('../../../../assets/icon/ic_add.png')}
          style={{
            position: 'absolute',
            right: 10,
            top: 20,
            width: 20,
            height: 20,
          }}
        />
      </TouchableOpacity>
      <View style={styles.viewTitle}>
        <Text style={styles.title}>Danh sách xe</Text>
      </View>
      <FlatList
        style={appStyle.main}
        data={DATA}
        renderItem={({item}) => <ItemListCar data={item}/>}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}></FlatList>
    </SafeAreaView>
  );
};

export default ListCar;

const styles = StyleSheet.create({
  viewTitle: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomWidth: 0.5,
  },
  image: {
    width: '100%',
    height: '30%',
    position: 'absolute',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    color: COLOR.black,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 14,
  },
});
const DATA = [
  {
    id: 1,
    image: require('../../../../assets/image/car.jpg'),
    name: 'KIA MORNING 2022',
    price: '750K',
    address:'Huyện Tân Thành,Bà Rịa - Vũng Tàu '
  },
];