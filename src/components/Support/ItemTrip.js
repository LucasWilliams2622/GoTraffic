import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import FastImage from 'react-native-fast-image';
import {COLOR, ICON} from '../../constants/Theme';
import {Code} from 'native-base';
import {appStyle} from '../../constants/AppStyle';
import numeral from 'numeral';
import {useNavigation} from '@react-navigation/native';
import CarDetail from '../../screens/Main/HomeTab/CarDetail';
import {SafeAreaView} from 'react-native-safe-area-context';
import Modal from 'react-native-modal';
import {formatPrice} from '../../utils/utils';
import Moment from 'moment';

const ItemTrip = props => {
  const navigation = useNavigation();
  const {data, handleCancle} = props;
  const [openDetail, setOpenDetail] = useState(false);
  const checkStatus = () => {
    if (data.status == 5) {
      navigation.navigate('RatingTrip', {id: data.id});
    } else {
      // console.log('id Car:' + data.idCar);
      setOpenDetail(!openDetail);
    }
  };

  const isImageUrlValid = /^https?:\/\/.*\.(png|jpg)$/i.test(
    data.Car.imageThumbnail,
  );
  return (
    <SafeAreaView>
      <TouchableOpacity onPress={() => checkStatus()}>
        {openDetail == false ? (
          <View style={styles.container}>
            <View style={[{justifyContent: 'center'}]}>
              {!isImageUrlValid ? (
                <FastImage
                  style={styles.image}
                  resizeMode="stretch"
                  source={require('../../assets/image/NoTrip.png')}
                />
              ) : (
                <FastImage
                  style={styles.image}
                  resizeMode={'stretch'}
                  source={{uri: data.Car.imageThumbnail}}
                />
              )}
            </View>
            {data.status == 1 ? (
              <View style={styles.statusContainer}>
                <Text style={styles.statusText}>Chờ xác nhận</Text>
              </View>
            ) : data.status == 2 ? (
              <View
                style={[
                  styles.statusContainer,
                  {backgroundColor: COLOR.lightGreen},
                ]}>
                <Text style={styles.statusText}>Đã xác nhận</Text>
              </View>
            ) : data.status == 3 ? (
              <View
                style={[
                  styles.statusContainer,
                  {backgroundColor: COLOR.primary},
                ]}>
                <Text style={styles.statusText}>Đang giao xe</Text>
              </View>
            ) : data.status == 4 ? (
              <View
                style={[
                  styles.statusContainer,
                  {backgroundColor: COLOR.primary},
                ]}>
                <Text style={styles.statusText}>Đã nhận xe</Text>
              </View>
            ) : data.status == 5 ? (
              <View
                style={[
                  styles.statusContainer,
                  {backgroundColor: COLOR.lightGreen},
                ]}>
                <Text style={styles.statusText}>Hoàn thành</Text>
              </View>
            ) : data.status == 6 ? (
              <View
                style={[styles.statusContainer, {backgroundColor: COLOR.red}]}>
                <Text style={styles.statusText}>Bị từ chối</Text>
              </View>
            ) : data.status == 7 ? (
              <View
                style={[styles.statusContainer, {backgroundColor: COLOR.red}]}>
                <Text style={styles.statusText}>Đã hủy</Text>
              </View>
            ) : data.status == 8 ? (
              <View
                style={[styles.statusContainer, {backgroundColor: COLOR.red}]}>
                <Text style={styles.statusText}>Chủ xe hủy</Text>
              </View>
            ) : null}
            <View
              style={{
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row'}}>
                <View style={{flexDirection: 'row'}}>
                  <FastImage
                    style={styles.logoMap}
                    resizeMode={'stretch'}
                    source={ICON.SteeringWheel}
                    tintColor={COLOR.primary}
                  />
                  <Text style={[appStyle.text10, {marginLeft: 5}]}>
                    {data.Car.isDelivery ? 'Tự lái' : ''}
                  </Text>
                </View>
              </View>
              <Text style={[appStyle.text16Bold]}>{data.Car.name}</Text>

              <Text style={[appStyle.text12, {marginTop: 5}]}>
                Bắt đầu: {Moment(data.createdAtd).format('HH:mm, DD/MM/YYYY ')}
              </Text>
              <Text style={[appStyle.text12, {marginTop: 5}]}>
                Kết thúc: {Moment(data.updatedAt).format('HH:mm, DD/MM/YYYY ')}
              </Text>
              <Text style={[appStyle.text12, {marginTop: 5}]}>
                Loại nhận: Giao xe tận nơi
              </Text>
              <Text
                style={{
                  color: '#219EBC',
                  fontWeight: '700',
                  fontSize: 16,
                  marginTop: 10,
                }}>
                <Text style={{color: COLOR.black}}>Tổng giá tiền : </Text>
                {formatPrice(data.totalMoney)}
              </Text>
            </View>
          </View>
        ) : (
          <View style={styles.containerDetail}>
            {!isImageUrlValid ? (
              <FastImage
                style={styles.imageDetail}
                resizeMode="stretch"
                source={require('../../assets/image/NoTrip.png')}
              />
            ) : (
              <FastImage
                style={styles.imageDetail}
                resizeMode={'stretch'}
                source={{uri: data.Car.imageThumbnail}}
              />
            )}
            {data.status == 1 ? (
              <View style={styles.statusContainer}>
                <Text style={styles.statusText}>Chờ xác nhận</Text>
              </View>
            ) : data.status == 2 ? (
              <View
                style={[
                  styles.statusContainer,
                  {backgroundColor: COLOR.lightGreen},
                ]}>
                <Text style={styles.statusText}>Đã xác nhận</Text>
              </View>
            ) : data.status == 3 ? (
              <View
                style={[
                  styles.statusContainer,
                  {backgroundColor: COLOR.primary},
                ]}>
                <Text style={styles.statusText}>Đang giao xe</Text>
              </View>
            ) : data.status == 4 ? (
              <View
                style={[
                  styles.statusContainer,
                  {backgroundColor: COLOR.primary},
                ]}>
                <Text style={styles.statusText}>Đã nhận xe</Text>
              </View>
            ) : data.status == 5 ? (
              <View
                style={[
                  styles.statusContainer,
                  {backgroundColor: COLOR.lightGreen},
                ]}>
                <Text style={styles.statusText}>Hoàn thành</Text>
              </View>
            ) : data.status == 6 ? (
              <View
                style={[styles.statusContainer, {backgroundColor: COLOR.red}]}>
                <Text style={styles.statusText}>Bị từ chối</Text>
              </View>
            ) : data.status == 7 ? (
              <View
                style={[styles.statusContainer, {backgroundColor: COLOR.red}]}>
                <Text style={styles.statusText}>Đã hủy</Text>
              </View>
            ) : data.status == 8 ? (
              <View
                style={[styles.statusContainer, {backgroundColor: COLOR.red}]}>
                <Text style={styles.statusText}>Chủ xe hủy</Text>
              </View>
            ) : null}
            <View
              style={{
                backgroundColor: '#3d3d3d',
                justifyContent: 'center',
                height: 25,
              }}>
              <Text
                style={[
                  appStyle.text16Bold,
                  {color: COLOR.white, textAlign: 'center'},
                ]}>
                {data.Car.name}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <View style={styles.tripContainer}>
                <FastImage source={ICON.Star} style={appStyle.iconSmall} />
                <Text style={appStyle.text14}> 5.0 </Text>
                <Text style={appStyle.text14}>5 chuyến</Text>
              </View>
              <View style={styles.tripContainer}>
                <Text
                  style={{
                    color: '#219EBC',
                    fontSize: 14,
                  }}>
                  <Text style={{color: COLOR.black}}>Tổng giá tiền : </Text>
                  {formatPrice(data.totalMoney)}
                </Text>
              </View>
            </View>
            <Text style={[appStyle.text145, {marginTop: 10}]}>
              Thời gian thuê
            </Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View>
                <Text style={[appStyle.text14]}>Nhận xe</Text>
                <Text style={appStyle.text14Bold}>
                  {Moment(data.createdAtd).format('HH:mm, DD/MM/YYYY ')}
                </Text>
              </View>
              <View>
                <Text style={[appStyle.text14]}>Trả xe</Text>
                <Text style={appStyle.text14Bold}>
                  {Moment(data.updatedAt).format('HH:mm, DD/MM/YYYY ')}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                height: 80,
                backgroundColor: COLOR.gray,
                justifyContent: 'space-evenly',
                alignItems: 'center',
                alignContent: 'center',
                marginTop: 10,
                borderRadius: 10,
              }}>
              <FastImage
                style={{width: 50, height: 50}}
                resizeMode={'stretch'}
                source={require('../../assets/image/logo-fb.png')}
              />
              <View style={{width: '60%'}}>
                <Text style={appStyle.text14Bold}>TÀI MẬP</Text>
                <View style={styles.tripContainer}>
                  <FastImage source={ICON.Star} style={appStyle.iconSmall} />
                  <Text style={appStyle.text14}> 5.0 </Text>
                  <Text style={appStyle.text14}>5 chuyến</Text>
                </View>
                <Text style={appStyle.text145}>034441221</Text>
              </View>
              <FastImage
                style={{width: 30, height: 30}}
                resizeMode={'stretch'}
                source={ICON.Phone}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <View>
                <Text style={appStyle.text14}>Loại nhận: Giao xe tận nơi</Text>
                <Text style={appStyle.text14}>Loại thuê: Xe có tài xế</Text>
              </View>
              {data.status == 1 ? (
                <TouchableOpacity
                  onPress={() => {
                    handleCancle(data.id);
                  }}
                  style={{
                    backgroundColor: 'red',
                    width: 140,
                    height: 40,
                    borderRadius: 50,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={[
                      appStyle.text14Bold,
                      {color: 'white', textAlign: 'center'},
                    ]}>
                    Hủy chuyến
                  </Text>
                </TouchableOpacity>
              ) : data.status == 2 ? (
                <TouchableOpacity
                  style={{
                    backgroundColor: COLOR.primary,
                    width: 140,
                    height: 40,
                    borderRadius: 50,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={[
                      appStyle.text14Bold,
                      {color: 'white', textAlign: 'center'},
                    ]}>
                    Trả xe
                  </Text>
                </TouchableOpacity>
              ) : data.status == 3 ? (
                <TouchableOpacity
                  style={{
                    backgroundColor: COLOR.lightGreen,
                    width: 140,
                    height: 40,
                    borderRadius: 50,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={[
                      appStyle.text14Bold,
                      {color: 'white', textAlign: 'center'},
                    ]}>
                    Đánh giá
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ItemTrip;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginHorizontal: 4,
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
    borderWidth: 0.1,
  },
  containerDetail: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
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
    padding: 10,
  },
  image: {
    width: 110,
    height: 100,
    alignSelf: 'center',
    marginLeft: -20,
    borderRadius: 10,
  },
  imageDetail: {
    width: '100%',
    height: 182,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
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
  statusContainer: {
    position: 'absolute',
    backgroundColor: 'rgba(65, 207, 242, 0.8)',
    borderTopLeftRadius: 14,
    borderBottomRightRadius: 14,
    padding: 5,
    justifyContent: 'center',
    left: 0,
    top: 0,
  },
  statusText: {
    color: 'white',
    fontWeight: 'bold',
  },
  tripContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 36,
    height: 36,
    alignSelf: 'flex-start',
  },
});
