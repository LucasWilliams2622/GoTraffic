import {Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import FastImage from 'react-native-fast-image';
import {COLOR, ICON} from '../../constants/Theme';
import {appStyle, windowHeight} from '../../constants/AppStyle';
import {useNavigation} from '@react-navigation/native';
import {formatPrice, squareImageSize} from '../../utils/utils';
import Moment from 'moment';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import AppButton from '../AppButton';

const ItemTrip = props => {
  const navigation = useNavigation();
  const {data, handleCancle, handleReceived, handleReturn} = props;
  // console.log("datadatadatadata",data);
  const [openDetail, setOpenDetail] = useState(false);
  const checkStatus = () => {
    // console.log('id Car:' + data);
    setOpenDetail(!openDetail);
  };

  const isImageUrlValid = /^https?:\/\/.*\.(png|jpg)$/i.test(
    data.Car.imageThumbnail,
  );
  return (
    <>
      {openDetail == false ? (
        <TouchableOpacity
          onPress={() => checkStatus()}
          style={styles.container}>
          {!isImageUrlValid ? (
            <FastImage
              style={styles.image}
              resizeMode="stretch"
              source={require('../../assets/image/bgCar.jpg')}
            />
          ) : (
            <FastImage
              style={styles.image}
              resizeMode={'stretch'}
              source={{uri: data.Car.imageThumbnail}}
            />
          )}

          {data.status == 1 ? (
            <View
              style={[styles.statusContainer, {backgroundColor: '#DDDC05'}]}>
              <Text style={[styles.statusText]}>Chờ xác nhận</Text>
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
              <Text style={styles.statusText}>Trong chuyến</Text>
            </View>
          ) : data.status == 5 ? (
            <View
              style={[
                styles.statusContainer,
                {backgroundColor: COLOR.primary},
              ]}>
              <Text style={styles.statusText}>Đang trả xe</Text>
            </View>
          ) : data.status == 6 ? (
            <View
              style={[
                styles.statusContainer,
                {backgroundColor: COLOR.lightGreen},
              ]}>
              <Text style={styles.statusText}>Hoàn thành</Text>
            </View>
          ) : data.status == 8 ? (
            <View
              style={[styles.statusContainer, {backgroundColor: COLOR.red}]}>
              <Text style={styles.statusText}>Đã hủy</Text>
            </View>
          ) : data.status == 9 ? (
            <View
              style={[styles.statusContainer, {backgroundColor: COLOR.red}]}>
              <Text style={styles.statusText}>Chủ xe hủy</Text>
            </View>
          ) : data.status == 10 ? (
            <View
              style={[styles.statusContainer, {backgroundColor: COLOR.red}]}>
              <Text style={styles.statusText}>Từ chối thuê</Text>
            </View>
          ) : null}
          <View
            style={{
              justifyContent: 'space-between',
              marginLeft: 10,
              flex: 1,
            }}>
            <View style={appStyle.rowBetween}>
              <Text
                style={[appStyle.text16Bold, {width: '75%'}]}
                numberOfLines={1}>
                {data.Car.name}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <FastImage
                  style={appStyle.iconSmall}
                  source={ICON.SteeringWheel}
                  tintColor={COLOR.primary}
                />
                <Text style={[appStyle.text105, {marginLeft: 5}]}>
                  {data.Car.withDriver == false ? 'Tự lái' : 'Xe có tài'}
                </Text>
              </View>
            </View>

            <Text style={[appStyle.text12, {marginTop: 4}]}>
              Bắt đầu:{' '}
              <Text style={{fontWeight: '500'}}>
                {Moment(data.timeFrom).format('HH:mm, DD/MM/YYYY ')}
              </Text>
            </Text>
            <Text style={[appStyle.text12, {}]}>
              Kết thúc:{' '}
              <Text style={{fontWeight: '500'}}>
                {Moment(data.timeTo).format('HH:mm, DD/MM/YYYY ')}
              </Text>
            </Text>
            <View
              style={{
                height: 0.5,
                width: '100%',
                marginVertical: 4,
                backgroundColor: '#787878',
              }}
            />
            <Text style={[appStyle.text12, {}]}>
              Loại nhận:{' '}
              <Text style={{fontWeight: '500'}}>
                {data.Car.isDelivery == 1 ? 'Giao xe tận nơi' : 'Tự đến lấy'}
              </Text>
            </Text>
            <Text
              style={{
                color: COLOR.primary,
                fontWeight: '600',
                fontSize: 16,
              }}>
              <Text style={{color: COLOR.black}}>Tổng tiền: </Text>
              <Text style={{fontWeight: '700'}}></Text>{' '}
              {formatPrice(data.totalMoney)}
            </Text>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => checkStatus()}
          style={styles.containerDetail}>
          {!isImageUrlValid ? (
            <FastImage
              style={styles.imageDetail}
              resizeMode="stretch"
              source={require('../../assets/image/bgCar.jpg')}>
              <View
                style={{
                  backgroundColor: 'black',
                  justifyContent: 'center',
                  paddingVertical: 6,
                  opacity: 0.8,
                }}>
                <Text
                  style={[
                    appStyle.text16Bold,
                    {color: COLOR.white, textAlign: 'center'},
                  ]}>
                  {data.Car.name}
                </Text>
              </View>
            </FastImage>
          ) : (
            <FastImage
              style={[styles.imageDetail, {justifyContent: 'flex-end'}]}
              resizeMode={'stretch'}
              source={{uri: data.Car.imageThumbnail}}>
              <View
                style={{
                  backgroundColor: 'black',
                  justifyContent: 'center',
                  paddingVertical: 6,
                  opacity: 0.8,
                }}>
                <Text
                  style={[
                    appStyle.text16Bold,
                    {color: COLOR.white, textAlign: 'center'},
                  ]}>
                  {data.Car.name}
                </Text>
              </View>
            </FastImage>
          )}
          {data.status == 1 ? (
            <View
              style={[styles.statusContainer, {backgroundColor: '#DDDC05'}]}>
              <Text style={[styles.statusText]}>Chờ xác nhận</Text>
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
              <Text style={styles.statusText}>Trong chuyến</Text>
            </View>
          ) : data.status == 5 ? (
            <View
              style={[
                styles.statusContainer,
                {backgroundColor: COLOR.primary},
              ]}>
              <Text style={styles.statusText}>Đang trả xe</Text>
            </View>
          ) : data.status == 6 ? (
            <View
              style={[
                styles.statusContainer,
                {backgroundColor: COLOR.lightGreen},
              ]}>
              <Text style={styles.statusText}>Hoàn thành</Text>
            </View>
          ) : data.status == 8 ? (
            <View
              style={[styles.statusContainer, {backgroundColor: COLOR.red}]}>
              <Text style={styles.statusText}>Đã hủy</Text>
            </View>
          ) : data.status == 9 ? (
            <View
              style={[styles.statusContainer, {backgroundColor: COLOR.red}]}>
              <Text style={styles.statusText}>Chủ xe hủy</Text>
            </View>
          ) : data.status == 10 ? (
            <View
              style={[styles.statusContainer, {backgroundColor: COLOR.red}]}>
              <Text style={styles.statusText}>Từ chối thuê</Text>
            </View>
          ) : null}

          <View style={styles.boxContentDetail}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={appStyle.rowCenter}>
                <FastImage source={ICON.Star} style={appStyle.iconSmall} />
                <Text style={appStyle.text145}> {data.Car.rating} • </Text>
                <FastImage source={ICON.Trip} style={appStyle.iconSmall} />
                <Text style={appStyle.text145}>
                  {' '}
                  {data.Car.numberOfBooked} chuyến
                </Text>
              </View>
              <View style={styles.tripContainer}>
                <Text
                  style={{
                    color: COLOR.black,
                    fontSize: 14,
                    fontWeight: '500',
                  }}>
                  Tổng tiền:
                  <Text style={{fontWeight: '700', color: COLOR.primary}}>
                    {' '}
                    {formatPrice(data.totalMoney)}{' '}
                  </Text>
                </Text>
              </View>
            </View>

            <Text
              style={[appStyle.text14Bold, {marginTop: 16, marginBottom: 2}]}>
              Thời gian thuê
            </Text>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <View style={{width: '55%'}}>
                <Text style={[appStyle.text14, {color: '#787878'}]}>
                  Nhận xe
                </Text>
                <Text style={appStyle.text145}>
                  {Moment(data.timeFrom).format('HH:mm, DD/MM/YYYY ')}
                </Text>
              </View>
              <View>
                <Text style={[appStyle.text14, {color: '#787878'}]}>
                  Trả xe
                </Text>
                <Text style={appStyle.text145}>
                  {Moment(data.timeTo).format('HH:mm, DD/MM/YYYY ')}
                </Text>
              </View>
            </View>

            <View
              style={[
                appStyle.rowBetween,
                {
                  backgroundColor: '#F0F0F0',
                  borderRadius: 8,
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  marginVertical: 12,
                },
              ]}>
              <View style={appStyle.rowCenter}>
                {data.Car.User?.avatar ? (
                  <FastImage
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 99,
                      marginRight: 8,
                    }}
                    resizeMode={'stretch'}
                    source={{uri: data.Car.User?.avatar}}
                  />
                ) : (
                  <FastImage
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 99,
                      marginRight: 8,
                    }}
                    resizeMode={'stretch'}
                    source={require('../../assets/image/logo_go_traffic.png')}
                  />
                )}

                <View style={{width: '70%'}}>
                  <Text style={appStyle.text14Bold} numberOfLines={1}>
                    {data.Car.User?.name}
                  </Text>
                  <View style={[appStyle.rowCenter, {paddingVertical: 4}]}>
                    <FastImage source={ICON.Star} style={appStyle.iconSmall} />
                    <Text style={appStyle.text12Medium}>
                      {' '}
                      {data.Car.User?.rating} •{' '}
                    </Text>
                    <FastImage source={ICON.Trip} style={appStyle.iconSmall} />
                    <Text style={appStyle.text12Medium}>
                      {' '}
                      {data.Car.User?.totalRide} chuyến
                    </Text>
                  </View>
                  <Text style={appStyle.text12Bold} numberOfLines={1}>
                    {data.Car.User?.phone}
                  </Text>
                </View>
              </View>

              <Icon
                name="phone"
                type={IconType.FontAwesome}
                size={30}
                color="green"
                onPress={() => {
                  Linking.openURL(`tel:${data.Car.User?.phone}`);
                }}
              />
            </View>
            <View style={appStyle.rowBetween}>
              <View>
                <Text style={appStyle.text12Medium}>
                  Loại nhận:{' '}
                  {data.Car.isDelivery == 1 ? 'Giao xe tận nơi' : 'Tự đến lấy'}
                </Text>
                <Text style={appStyle.text12Medium}>
                  Loại thuê:{' '}
                  {data.Car.withDriver == false ? 'Tự lái' : 'Xe có tài'}
                </Text>
              </View>
              {data.status == 1 ? (
                <AppButton
                  onPress={() => {
                    handleCancle(data.id);
                  }}
                  title="Hủy chuyến"
                  icon={ICON.closecircle}
                  backgroundColor={COLOR.red}
                  width="48%"
                  paddingVertical={10}
                  borderRadius={20}
                  borderColor={COLOR.red}
                  noShadow
                />
              ) : data.status == 3 ? (
                <AppButton
                  onPress={() => {
                    handleReceived(data.id);
                  }}
                  icon={ICON.car}
                  title="Đã nhận xe"
                  paddingVertical={10}
                  width="48%"
                  borderRadius={20}
                  noShadow
                />
              ) : data.status == 4 ? (
                <AppButton
                  onPress={() => {
                    handleReturn(data.id);
                  }}
                  title="Trả xe"
                  paddingVertical={10}
                  width="48%"
                  borderRadius={20}
                  noShadow
                />
              ) : data.status == 6 ? (
                <AppButton
                  onPress={() => {
                    navigation.navigate('RatingTrip', {
                      id: data.id,
                      name: data.Car.User.name,
                    });
                  }}
                  title="Đánh giá"
                  paddingVertical={10}
                  width="48%"
                  borderRadius={20}
                  tintColor={'white'}
                  icon={ICON.like1}
                  noShadow
                  backgroundColor={COLOR.lightGreen}
                  borderColor={COLOR.lightGreen}
                />
              ) : null}
            </View>
          </View>
        </TouchableOpacity>
      )}
    </>
  );
};

export default ItemTrip;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginHorizontal: 4,
    borderRadius: 12,
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
    padding: 10,
  },
  containerDetail: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginHorizontal: 4,
    padding: 10,
    borderRadius: 12,
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
    marginTop: 2,
  },
  boxContentDetail: {
    backgroundColor: '#FAFAFA',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  image: {
    width: squareImageSize(0.3),
    height: squareImageSize(0.3),
    alignSelf: 'center',
    borderRadius: 20,
  },
  imageDetail: {
    width: '100%',
    height: windowHeight * 0.22,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
    borderTopLeftRadius: 13,
    borderBottomRightRadius: 13,
    padding: 5,
    justifyContent: 'center',
    left: 0,
    top: 0,
    opacity: 0.9,
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
  btn: {
    width: 120,
    height: 40,
    borderRadius: 50,
    justifyContent: 'center',
    borderColor: COLOR.borderColor,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
