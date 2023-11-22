import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {COLOR, ICON} from '../../constants/Theme';
import {Code} from 'native-base';
import {appStyle, windowWidth} from '../../constants/AppStyle';
import AxiosInstance from '../../constants/AxiosInstance';

const ItemActiveTrip = props => {
  const {data, handleCompelete} = props;
  const isImageUrlValid = /^https?:\/\/.*\.(png|jpg)$/i.test(
    data.Car.imageThumbnail,
  );
  const confirmComplete = () => {
    handleCompelete(data.id);
  };
  return (
    <View style={{marginTop:5}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 8,
        }}>
        <View style={{flexDirection: 'row'}}>
          <FastImage
            style={{width: 20, height: 20}}
            resizeMode={'stretch'}
            source={ICON.TripFocus}
            tintColor={COLOR.fifth}
            //source={require('../../assets/icon/ic_warning.png')}
          />
          <Text style={[appStyle.text14, {marginLeft: 5}]}>
            Đang trong chuyến
          </Text>
        </View>
        <Text style={[appStyle.text14Bold]}>{data.createdAt.slice(0, 10)}</Text>
      </View>
      <TouchableOpacity style={styles.container}>
        <View style={[{alignSelf: 'center'}]}>
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
            <Text style={[appStyle.text12, {marginLeft: 5}]}>
              {' '}
              {data.Car.isDelivery ? 'Tự lái' : ''}
            </Text>
          </View>
          <Text style={[appStyle.text165]}>{data.Car.name}</Text>
          <Text
            style={ {width: 160,fontWeight: '500',color:'black', fontSize: 16}}>
            <Text style={{fontWeight:'400'}}>Người thuê: </Text>
            {data.User.name}
          </Text>
          <Text
            style={{
              //color: '#219EBC',
              fontWeight: '700',
              fontSize: 16,
              color:'black',
            }}>
            <Text style={{fontWeight:'400'}}>SĐT: </Text>
            {data.User.phone}
          </Text>
          <Text style={[appStyle.text12, {marginTop: 3}]}>
            📅 Bắt đầu: {data.timeFrom?.slice(0, 10)}
          </Text>
          <View
            style={{
              flexDirection: 'row',
        
              marginTop: 12,
            }}>
            <FastImage
              source={ICON.Done}
              style={appStyle.icon}
              tintColor={COLOR.green}
            />
            <TouchableOpacity onPress={() => confirmComplete()}>
              <Text
                style={[
                  appStyle.text145,
                  {color: COLOR.green, fontStyle: 'italic', marginLeft: 5},
                ]}>
                Đã nhận được xe
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ItemActiveTrip;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    //backgroundColor:'blue',
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
    width: windowWidth*0.37,
    height: 120,
    // alignSelf: 'center',
    // marginLeft: -20,
    justifyContent:'flex-start',
    borderRadius: 8,
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
