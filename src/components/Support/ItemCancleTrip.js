import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import FastImage from 'react-native-fast-image';
import {COLOR, ICON} from '../../constants/Theme';
import {Code} from 'native-base';
import {appStyle, windowHeight, windowWidth} from '../../constants/AppStyle';
import Moment from 'moment';
import {formatPrice, squareImageSize} from '../../utils/utils';

const ItemCancleTrip = props => {
  const {data} = props;
  const isImageUrlValid = /^https?:\/\/.*\.(png|jpg)$/i.test(
    data.Car.imageThumbnail,
  );
  const [openDetail, setOpenDetail] = useState(false);
  const checkStatus = () => {
    if (data.status == 5) {
      navigation.navigate('RatingTrip', {id: data.id});
    } else {
      // console.log('id Car:' + data.idCar);
      setOpenDetail(!openDetail);
    }
  };
  return (
    <TouchableOpacity onPress={() => checkStatus()}>
      {openDetail == false ? (
        <View style={styles.container}>
          <View style={[{justifyContent: 'center'}]}>
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
          </View>
          <View style={[styles.statusContainer, {backgroundColor: COLOR.red}]}>
            <Text style={styles.statusText}>Đã hủy</Text>
          </View>
          <View
            style={{
              justifyContent: 'space-between',
              marginLeft: 10,
            }}>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={[appStyle.text16Bold, {width: '60%'}]}
                numberOfLines={1}>
                {data.Car.name}
              </Text>
              <View style={{flexDirection: 'row', margin: 5}}>
                <FastImage
                  style={appStyle.iconSmall}
                  source={ICON.SteeringWheel}
                  tintColor={COLOR.primary}
                />
                <Text style={[appStyle.text10, {marginLeft: 5, marginTop: -2}]}>
                  {data.Car.isDelivery ? 'Tự lái' : 'Xe có tài'}
                </Text>
              </View>
            </View>

            <Text style={[appStyle.text12, {marginTop: 5}]}>
              Bắt đầu:{' '}
              <Text style={{fontWeight: '500'}}>
                {Moment(data.timeFrom).format('HH:mm, DD/MM/YYYY ')}
              </Text>
            </Text>
            <Text style={[appStyle.text12, {marginTop: 5}]}>
              Kết thúc:{' '}
              <Text style={{fontWeight: '500'}}>
                {Moment(data.timeTo).format('HH:mm, DD/MM/YYYY ')}
              </Text>
            </Text>
            <View
              style={{
                height: 1,
                width: '80%',
                backgroundColor: COLOR.borderColor2,
                marginBottom: 5,
                marginTop: 10,
              }}
            />
            <Text style={[appStyle.text12, {marginTop: 5}]}>
              Người thuê:{' '}
              <Text style={appStyle.text12Bold}>{data.User.name}</Text>
            </Text>
            <Text style={[appStyle.text12, {marginTop: 5}]}>
              Số điện thoại:
              <Text style={[appStyle.text12, {fontWeight: 500}]}>
                {' '}
                {data.User.phone}
              </Text>
            </Text>
          </View>
        </View>
      ) : (
        <View style={styles.containerDetail}>
          {!isImageUrlValid ? (
            <FastImage
              style={styles.imageDetail}
              resizeMode="stretch"
              source={require('../../assets/image/bgCar.jpg')}
            />
          ) : (
            <FastImage
              style={styles.imageDetail}
              resizeMode={'stretch'}
              source={{uri: data.Car.imageThumbnail}}
            />
          )}
          <View style={[styles.statusContainer, {backgroundColor: COLOR.red}]}>
            <Text style={styles.statusText}>Đã hủy</Text>
          </View>
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
            <View>
              <Text style={[appStyle.text12, {marginTop: 5}]}>
                Bắt đầu:{' '}
                <Text style={{fontWeight: '500'}}>
                  {Moment(data.timeFrom).format('HH:mm, DD/MM/YYYY ')}
                </Text>
              </Text>
              <Text style={[appStyle.text12, {marginTop: 5}]}>
                Kết thúc:{' '}
                <Text style={{fontWeight: '500'}}>
                  {Moment(data.timeTo).format('HH:mm, DD/MM/YYYY ')}
                </Text>
              </Text>
              <Text style={[appStyle.text12, {marginTop: 5}]}>
                Loại thuê: <Text style={{fontWeight: 500}}>Tự lái</Text>
              </Text>
            </View>
            <View
              style={{
                height: '100%',
                width: 1,
                backgroundColor: COLOR.borderColor,
              }}
            />
            <View>
              <Text style={[appStyle.text12, {marginTop: 5}]}>
                Người thuê:{' '}
                <Text style={{fontWeight: '500'}}>{data.User.name}</Text>
              </Text>
              <Text style={[appStyle.text12, {marginTop: 5}]}>
                SĐT: <Text style={{fontWeight: '500'}}>{data.User.phone}</Text>
              </Text>
              <Text style={[appStyle.text12, {marginTop: 5}]}>
                Loại nhận: <Text style={{fontWeight: 500}}>Tự tới lấy</Text>
              </Text>
            </View>
          </View>

          <Text style={[appStyle.text14, {marginTop: 10}]}>
            Lý do hủy: Đã tìm được xe phù hợp hơn
          </Text>
          <Text
            style={{
              color: COLOR.primary,
              fontWeight: '500',
              fontSize: 16,
              marginTop: 10,
            }}>
            <Text style={{color: COLOR.black}}>Tổng giá tiền : </Text>
            {formatPrice(data.totalMoney)}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default ItemCancleTrip;

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
