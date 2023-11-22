import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {COLOR, ICON} from '../../constants/Theme';
import {Code} from 'native-base';
import {appStyle, windowHeight, windowWidth} from '../../constants/AppStyle';

const ItemCancleTrip = props => {
  const {data} = props;
 const isImageUrlValid = /^https?:\/\/.*\.(png|jpg)$/i.test(
   data.Car.imageThumbnail,
 );
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
            style={appStyle.icon}
            resizeMode={'stretch'}
            source={ICON.cancelWhite}
            tintColor={COLOR.red}
          />
          <Text style={[appStyle.text14, {marginLeft: 5}]}>Đã hủy</Text>
        </View>
        <Text style={[appStyle.text14Bold]}>{data.createdAt.slice(0, 10)}</Text>
      </View>
      <TouchableOpacity style={styles.container}>
        <View style={[{ width: windowWidth*0.37}]}>
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
            //justifyContent: 'space-between',
            //backgroundColor:'blue'
          }}>
          <View style={{flexDirection: 'row'}}>
            <FastImage
              style={styles.logoMap}
              resizeMode={'stretch'}
              source={require('../../assets/image/logoMap.png')}
            />
            <Text style={[appStyle.text10, {marginLeft: 5}]}>
              {data.Car.isDelivery ? 'Tự lái' : ''}
            </Text>
          </View>
          <Text style={[appStyle.text165]}>{data.Car.name}</Text>
          <Text
            style={{width: 160, color: 'black', fontSize:16, fontWeight: '500'}}>
            <Text style={{fontWeight:'400'}}>Người thuê: </Text>
            {data.User.name}
          </Text>
          <Text
            style={{
              // color: COLOR.borderColor,
              fontSize:16, fontWeight: '500',
              color:'black',
              marginTop: 10,
            }}>
            <Text style={{fontWeight:'400'}}>SĐT: </Text>
            {data.User.phone}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ItemCancleTrip;

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
    width: '100%',
    height: 120,
    //alignSelf: 'flex-start',
    //marginLeft: -20,
    borderRadius: 5,
    // backgroundColor:'blue'
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
