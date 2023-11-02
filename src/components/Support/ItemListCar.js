import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {COLOR} from '../../constants/Theme';
import {appStyle} from '../../constants/AppStyle';
import {useNavigation} from '@react-navigation/native';

const ItemListCar = (props) => {
  const navigation = useNavigation();
  const {data} = props;
  const {image, name, price, address} = data;
  const goDetail = () => {
    navigation.navigate('DetailInListCar');
  };
  return (
    <TouchableOpacity style={styles.container} onPress={goDetail}>
      <View style={[{alignSelf: 'flex-start'}]}>
        <FastImage style={styles.image} resizeMode={'stretch'} source={image} />
      </View>
      <View
        style={{
          justifyContent: 'space-between',
          marginLeft: 20,
        }}>
        <Text style={[appStyle.text16Bold]}>{name}</Text>
        <Text style={{color: COLOR.black}}>⭐️⭐️⭐️⭐️⭐️ • 0 chuyến</Text>
        <Text
          style={{
            color: '#219EBC',
            fontWeight: '700',
            fontSize: 16,
            marginTop: 10,
          }}>
          <Text style={{color: COLOR.black}}>Giá tự lái: </Text>
          {price}
        </Text>

        <View style={{flexDirection: 'row'}}>
          <FastImage
            style={styles.logoMap}
            resizeMode={'stretch'}
            source={require('../../assets/image/logoMap.png')}
          />
          <Text style={[appStyle.text14, {marginLeft: 5, width: '70%'}]}>
            {address}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ItemListCar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 4,
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 14,
    borderColor: COLOR.borderColor,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 10,
  },
  image: {
    width: 130,
    height: 120,
    alignSelf: 'flex-start',
    marginLeft: -20,
    borderRadius: 10,
  },
  logoMap: {
    width: 14,
    height: 15,
    marginTop: 2,
  },
});
