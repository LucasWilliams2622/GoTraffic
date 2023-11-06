import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {COLOR} from '../../constants/Theme';
import {Code} from 'native-base';
import {appStyle} from '../../constants/AppStyle';
import { useNavigation } from '@react-navigation/native';

const ItemTrip = props => {
  const navigation = useNavigation();
  const {data} = props;
  const {image, name, time, timeStart, timeEnd, price, id} = data;
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10,
        }}>
        <View style={{flexDirection: 'row'}}>
          <FastImage
            style={{width: 20, height: 20}}
            resizeMode={'stretch'}
            source={require('../../assets/icon/ic_warning.png')}
          />
          <Text style={[appStyle.text14, {marginLeft: 5}]}>Hoàn thành</Text>
        </View>
        <Text style={[appStyle.text14Bold]}>{time}</Text>
      </View>
      <TouchableOpacity onPress={()=> navigation.navigate('RatingTrip')} style={styles.container}>
        <View style={[{alignSelf: 'flex-start'}]}>
          <FastImage
            style={styles.image}
            resizeMode={'stretch'}
            source={image}
          />
        </View>
        <View
          style={{
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row'}}>
            <FastImage
              style={styles.logoMap}
              resizeMode={'stretch'}
              source={require('../../assets/image/logoMap.png')}
            />
            <Text style={[appStyle.text10, {marginLeft: 5}]}>Tự lái</Text>
          </View>
          <View style={styles.line}></View>
          <Text style={[appStyle.text16Bold]}>{name}</Text>
          <Text style={[appStyle.text12, {marginTop: 5}]}>
            📅 Bắt đầu: {timeStart}
          </Text>
          <Text style={[appStyle.text12, {marginTop: 5}]}>
            📅 Kết thúc: {timeEnd}{' '}
          </Text>
          <Text style={{color: '#219EBC', fontWeight: '700', fontSize: 16,marginTop:10}}>
            <Text style={{color: COLOR.black}}>Tổng giá tiền : </Text>
            {price}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ItemTrip;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
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
  line: {
    width: '100%',
    height: 1,
    color: COLOR.borderColor2,
  },
});
