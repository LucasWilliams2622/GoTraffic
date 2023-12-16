import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import FastImage from 'react-native-fast-image';
import {COLOR, ICON} from '../../constants/Theme';
import {Code} from 'native-base';
import {appStyle, windowHeight} from '../../constants/AppStyle';
import AxiosInstance from '../../constants/AxiosInstance';
import {SafeAreaView} from 'react-native-safe-area-context';
import Moment from 'moment';
import {formatPrice, squareImageSize} from '../../utils/utils';
import AppButton from '../AppButton';
import {color} from 'react-native-elements/dist/helpers';
const ItemConfirmTrip = props => {
  const {data, handleDelete, handleConfirm} = props;
  const isImageUrlValid = /^https?:\/\/.*\.(png|jpg)$/i.test(
    data.Car.imageThumbnail,
  );
  const [openDetail, setOpenDetail] = useState(false);
  const checkStatus = () => {
    setOpenDetail(!openDetail);
  };
  return (
    <>
      {openDetail == false ? (
        <TouchableOpacity
          onPress={() => checkStatus()}
          style={[styles.container, {}]}>
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

          <View style={[styles.statusContainer, {backgroundColor: '#FFB703'}]}>
            <Text style={styles.statusText}>Chờ duyệt</Text>
          </View>

          <View
            style={{
              justifyContent: 'space-between',
              marginLeft: 10,
              flex: 1,
            }}>
            <View style={appStyle.rowBetween}>
              <Text style={[appStyle.text16Bold, {width:'65%'}]} numberOfLines={1}>
                {data.Car.name}
              </Text>
              <View style={appStyle.rowCenter}>
                <FastImage
                  style={appStyle.iconSmall}
                  source={ICON.SteeringWheel}
                  tintColor={COLOR.primary}
                />
                <Text style={[appStyle.text10, {marginLeft: 4, }]}>
                  {data.Car.isDelivery ? 'Tự lái' : 'Xe có tài'}
                </Text>
              </View>
            </View>

            <Text style={[appStyle.text12, {}]}>
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
            <Text
              style={{
                color: COLOR.primary,
                fontSize: 14,
                marginTop: 5,
                fontWeight: 'bold',
              }}>
              <Text style={{color: COLOR.black, fontWeight: '400'}}>
                Tổng tiền :{' '}
              </Text>
              {formatPrice(data.totalMoney)}
            </Text>

            <View style={[appStyle.rowBetween, {}]}>
              <AppButton
                title="Từ chối"
                backgroundColor="white"
                borderColor={COLOR.red}
                width="48%"
                textColor={COLOR.red}
                noShadow
                fontSize={12}
                paddingVertical={6}
                borderWidth={1.5}
                onPress={() => handleDelete(data.id)}
              />
              <AppButton
                title="Đồng ý"
                backgroundColor="white"
                borderColor={COLOR.green}
                fontSize={12}
                paddingVertical={6}
                width="48%"
                noShadow
                borderWidth={1.5}
                textColor={COLOR.green}
                onPress={() => handleConfirm(data.id)}
              />
            </View>
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
          <View style={[styles.statusContainer, {backgroundColor: '#FFB703'}]}>
            <Text style={styles.statusText}>Chờ duyệt</Text>
          </View>

          <View style={[appStyle.rowCenter, {marginTop: 8}]}>
            <View
              style={{
                width: '50%',
                borderRightWidth: 0.5,
                borderColor: '#787878',
              }}>
              <Text style={[appStyle.text12, {}]}>
                Bắt đầu:{' '}
                <Text style={{fontWeight: '500'}}>
                  {Moment(data.timeFrom).format('HH:mm, DD/MM/YYYY ')}
                </Text>
              </Text>
              <Text style={[appStyle.text12, {marginTop: 4}]}>
                Kết thúc:{' '}
                <Text style={{fontWeight: '500'}}>
                  {Moment(data.timeTo).format('HH:mm, DD/MM/YYYY ')}
                </Text>
              </Text>
              <Text style={[appStyle.text12, {marginTop: 4}]}>
                Loại thuê: <Text style={{fontWeight: 500}}>Tự lái</Text>
              </Text>
            </View>

            <View style={{paddingLeft: 12}}>
              <Text style={[appStyle.text12, {}]}>
                Người thuê:{' '}
                <Text style={{fontWeight: '500'}}>{data.User.name}</Text>
              </Text>
              <Text style={[appStyle.text12, {marginTop: 4}]}>
                SĐT: <Text style={{fontWeight: '500'}}>{data.User.phone}</Text>
              </Text>
              <Text style={[appStyle.text12, {marginTop: 4}]}>
                Loại nhận: <Text style={{fontWeight: 500}}>Tự tới lấy</Text>
              </Text>
            </View>
          </View>

          <Text style={[appStyle.text12, {paddingVertical: 10}]}>
            Vị trí xe:
            <Text style={{fontWeight: '500'}}> {data.Car.locationCar}</Text>
          </Text>
          <Text
            style={{
              fontWeight: '500',
              fontSize: 16,
              color: COLOR.black,
            }}>
            Tổng tiền:
            <Text style={{color: COLOR.primary, fontWeight: '600'}}>
              {' '}
              {formatPrice(data.totalMoney)}
            </Text>
          </Text>
          <View style={[appStyle.rowBetween, {paddingVertical: 12}]}>
            <AppButton
              title="Từ chối"
              backgroundColor="white"
              borderColor={COLOR.red}
              width="48%"
              textColor={COLOR.red}
              noShadow
              fontSize={16}
              paddingVertical={10}
              borderWidth={1.5}
              onPress={() => handleDelete(data.id)}
            />
            <AppButton
              paddingVertical={10}
              title="Đồng ý"
              backgroundColor="white"
              borderColor={COLOR.green}
              fontSize={16}
              width="48%"
              noShadow
              borderWidth={1.5}
              textColor={COLOR.green}
              onPress={() => handleConfirm(data.id)}
            />
          </View>
        </TouchableOpacity>
      )}
    </>
  );
};

export default ItemConfirmTrip;

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
    marginBottom: 14,
    marginTop: 3,
    padding: 10,
    borderWidth: 1,
    borderColor: '#CFCFCF',
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
    paddingLeft: 10,
    justifyContent: 'center',
    left: 0,
    top: 0,
    opacity: 0.9,
    width: 90,
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
