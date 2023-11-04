import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {FlatList} from 'native-base';
import {SafeAreaView} from 'react-native-safe-area-context';
import {appStyle} from '../../../../constants/AppStyle';
import {COLOR, ICON} from '../../../../constants/Theme';
import FastImage from 'react-native-fast-image';
import ItemListCar from '../../../../components/Support/ItemListCar';
import ItemTrip from '../../../../components/Support/ItemTrip';

const ExhibitOfCar = props => {
  const {navigation} = props;
  const goBack = () => {
    navigation.goBack('HomeCar');
  };
  return (
    <SafeAreaView style={appStyle.container}>
      <View style={styles.viewTitle}>
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
        <Text style={styles.title}>Giấy tờ & Bảo hiểm</Text>
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
      </View>
      <View style={appStyle.main}>
        <Text style={[appStyle.text18Bold, {marginTop: 20}]}>
          Giấy tờ của xe
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
          }}>
          <View style={styles.upLoadImage}>
            <Text style={{textAlign: 'center'}}>
              Vui lòng chụp mặt trước của giấy tờ xe
            </Text>
            <FastImage
              style={{width: 30, height: 30, marginTop: 10}}
              source={ICON.Picture}
            />
          </View>
          <View style={styles.upLoadImage}>
            <Text style={{textAlign: 'center'}}>
              Vui lòng chụp mặt sau của giấy tờ xe
            </Text>
            <FastImage
              style={{width: 30, height: 30, marginTop: 10}}
              source={ICON.Picture}
            />
          </View>
        </View>
        <Text style={[appStyle.text18Bold, {marginTop: 20}]}>
          Bảo hiểm của xe
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
          }}>
          <View style={styles.upLoadImage}>
            <Text style={{textAlign: 'center'}}>
              Vui lòng chụp mặt trước của bảo hiểm
            </Text>
            <FastImage
              style={{width: 30, height: 30, marginTop: 10}}
              source={ICON.Picture}
            />
          </View>
          <View style={styles.upLoadImage}>
            <Text style={{textAlign: 'center'}}>
              Vui lòng chụp mặt sau của bảo hiểm
            </Text>
            <FastImage
              style={{width: 30, height: 30, marginTop: 10}}
              source={ICON.Picture}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.btn}>
          <Text
            style={[
              appStyle.text16Bold,
              {color: COLOR.white, textAlign: 'center'},
            ]}>
            CẬP NHẬT
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ExhibitOfCar;

const styles = StyleSheet.create({
  viewTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  upLoadImage: {
    height: 120,
    width: 174,
    borderWidth: 0.5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  btn: {
    backgroundColor: COLOR.primary,
    height: 50,
    borderRadius: 10,
    alignContent: 'center',
    justifyContent: 'center',
    marginBottom: 70,
    marginTop: 50,
  },
});
const DATA = [
  {
    id: 1,
    image: require('../../../../assets/image/car.jpg'),
    time: '21/09/2023 | 20:30',
    name: 'KIA MORNING 2022',
    timeStart: '21h00,17/10/2023',
    timeEnd: '21h00,18/10/2023',
    price: '1.600.666đ',
  },
  {
    id: 2,
    image: require('../../../../assets/image/car.jpg'),
    time: '21/09/2023 | 20:30',
    name: 'KIA MORNING 2022',
    timeStart: '21h00,17/10/2023',
    timeEnd: '21h00,18/10/2023',
    price: '1.600.666đ',
  },
];
