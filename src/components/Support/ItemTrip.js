import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {COLOR} from '../../constants/Theme';
import {Code} from 'native-base';
import {appStyle} from '../../constants/AppStyle';

const ItemTrip = props => {
  const {data} = props;
  const {image, name, bienSo, time, address, price, id} = data;
  return (
    <TouchableOpacity style={styles.container}>
      <View style={[{alignSelf: 'flex-start'}]}>
        <FastImage style={styles.logo} resizeMode={'stretch'} source={image} />
      </View>
      <View
        style={{
          justifyContent: 'space-between',
        }}>
        <Text style={[appStyle.text12]}>{time}</Text>
        <Text style={[appStyle.text12, {paddingVertical: 4, fontWeight: 700}]}>
          {name}
        </Text>
        <Text
          style={[appStyle.text14Bold, {paddingVertical: 4, color: '#F26F25'}]}>
          {bienSo}
        </Text>
        <View style={{flexDirection:'row'}}>
          <FastImage
            style={styles.logoMap}
            resizeMode={'stretch'}
            source={require('../../assets/image/logoMap.png')}
          />
          <Text
            style={[appStyle.text10, {paddingVertical: 4,paddingHorizontal:4, color: '#6A6565'}]}>
            {address}
          </Text>
        </View>
      </View>
      <View style={styles.viewPrice}>
        <Text style={{color: '#219EBC', fontWeight: '700', fontSize: 16}}>
          {price}
          <Text style={{color: COLOR.black}}>/NGÀY</Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ItemTrip;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginHorizontal: 4,
    paddingVertical: 16,
    paddingHorizontal: 10,
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
    marginBottom: 20,
  },
  viewPrice: {
    marginTop: 50,
  },
  logo: {
    width: 42,
    height: 42,
    alignSelf: 'flex-start',
    marginLeft: -20,
  },
  logoMap: {
    width: 14,
    height: 15,
    marginTop: 2,
  },
});
