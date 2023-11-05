import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {COLOR} from '../../constants/Theme';
import {Code} from 'native-base';
import {appStyle} from '../../constants/AppStyle';

const ItemConfirmTrip = props => {
  const {data} = props;
  const {image, name, time, nameOfUser, phoneOfUser, id} = data;

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
          <Text style={[appStyle.text14, {marginLeft: 5}]}>Đang chờ duyệt</Text>
        </View>
        <Text style={[appStyle.text14Bold]}>{time}</Text>
      </View>
      <TouchableOpacity style={styles.container}>
        <View style={[{alignSelf: 'center'}]}>
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
          <Text style={[appStyle.text16Bold]}>{name}</Text>
          <Text
            style={[appStyle.text16Bold, {width: 150, color: COLOR.orange}]}
            numberOfLines={2}>
            <Text style={{color: COLOR.black}}>Tên người thuê: </Text>
            {nameOfUser}
          </Text>
          <Text
            style={{
              color: '#219EBC',
              fontWeight: '700',
              fontSize: 16,
              marginTop: 10,
            }}>
            <Text style={{color: COLOR.black}}>SĐT: </Text>
            {phoneOfUser}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
            }}>
            <TouchableOpacity >
              <Text style={[appStyle.text14, {color: COLOR.red}]}>Hủy</Text>
            </TouchableOpacity>
            <View
              style={{
                width: 1,
                height: 20,
                backgroundColor: COLOR.borderColor2,
              }}
            />
            <TouchableOpacity>
              <Text style={[appStyle.text14, {color: COLOR.green}]}>
                Đồng ý
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ItemConfirmTrip;

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
