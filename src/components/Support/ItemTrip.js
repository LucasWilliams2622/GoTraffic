import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {COLOR} from '../../constants/Theme';
import {Code} from 'native-base';
import {appStyle} from '../../constants/AppStyle';
import numeral from 'numeral';
import {useNavigation} from '@react-navigation/native';

const ItemTrip = props => {
  const navigation = useNavigation();
  const {data} = props;

  const {image, name, time, timeStart, timeEnd, price, id} = data;
  const goDetail = () => {
    //console.log('ID', data.id);
    navigation.navigate('RatingTrip', {id: data.id});
  };
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
          <Text style={[appStyle.text14, {marginLeft: 5}]}>
            {data.status == 1
              ? 'Đang chờ xác nhận'
              : data.status == 2
              ? 'Đã xác nhận'
              : data.status == 3
              ? 'Đang giao xe'
              : data.status == 4
              ? 'Đã nhận xe'
              : data.status == 5
              ? 'Hoàn thành'
              : data.status == 6
              ? 'Bị từ chối'
              : data.status == 7
              ? 'Đã hủy'
              : data.status == 8
              ? 'Chủ xe hủy chuyến'
              : 'Đang chờ xác nhận'}
          </Text>
        </View>
        <Text style={[appStyle.text14Bold]}>{data.updatedAt.slice(0, 10)}</Text>
      </View>
      <TouchableOpacity onPress={() => goDetail()} style={styles.container}>
        <View style={[{alignSelf: 'flex-start'}]}>
          <FastImage
            style={styles.image}
            resizeMode={'stretch'}
            source={{uri:image}}
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
            <Text style={[appStyle.text10, {marginLeft: 5}]}>
              {data.isDelivery ? 'Tự lái' : ''}
            </Text>
          </View>
          <View style={styles.line}></View>
          <Text style={[appStyle.text16Bold]}>{data.name}</Text>
          <Text style={[appStyle.text12, {marginTop: 5}]}>
            📅 Bắt đầu: {data.createdAt.slice(0, 10)}
          </Text>
          <Text style={[appStyle.text12, {marginTop: 5}]}>
            📅 Kết thúc: {data.updatedAt.slice(0, 10)}{' '}
          </Text>
          <Text
            style={{
              color: '#219EBC',
              fontWeight: '700',
              fontSize: 16,
              marginTop: 10,
            }}>
            <Text style={{color: COLOR.black}}>Tổng giá tiền : </Text>
            {numeral(data.price).format('0,0')}
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
