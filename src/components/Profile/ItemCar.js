import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {COLOR, ICON} from '../../constants/Theme';
import {appStyle, windowHeight, windowWidth} from '../../constants/AppStyle';
import {useNavigation} from '@react-navigation/native';
import {formatPrice} from '../../utils/utils';

const ItemCar = props => {
  const navigation = useNavigation();

  //const { data } = props;
  //const { selectedModel, selectedBrand, selectedYear, price} = data;
  const {data} = props;
  // console.log(data);

  const goDetail = () => {
    //console.log('ID', data.id);
    navigation.navigate('DetailInListCar', {
      id: data.id,
      price: data.price,
      status: data.status,
    });
  };
  const isImageUrlValid = /^https?:\/\/.*\.(png|jpg)$/i.test(
    data.imageThumbnail,
  );

  return (
    <TouchableOpacity style={styles.container} onPress={goDetail}>
      <View style={styles.carContainer}>
        {!isImageUrlValid ? (
          <FastImage
            style={styles.carImage}
            resizeMode="stretch"
            source={require('../../assets/image/bgCar.jpg')}
          />
        ) : (
          <FastImage
            style={styles.carImage}
            resizeMode={'stretch'}
            source={{uri: data.imageThumbnail}}
          />
        )}
        {data.status == 1 ? (
          <View style={styles.statusContainer}>
            <Text style={styles.statusText}>Chờ duyệt</Text>
          </View>
        ) : data.status == 2 ? (
          <View
            style={[
              styles.statusContainer,
              {backgroundColor: COLOR.lightGreen},
            ]}>
            <Text style={styles.statusText}>Đã duyệt</Text>
          </View>
        ) : data.status == 3 ? (
          <View style={[styles.statusContainer, {backgroundColor: COLOR.red}]}>
            <Text style={styles.statusText}>Từ chối duyệt</Text>
          </View>
        ) : null}
        <View style={styles.detailsContainer}>
          <Text style={appStyle.text14Bold}>{data.name}</Text>
          <View style={styles.tripContainer}>
            <FastImage source={ICON.Star} style={appStyle.iconSmall} />
            <FastImage source={ICON.Star} style={appStyle.iconSmall} />
            <FastImage source={ICON.Star} style={appStyle.iconSmall} />
            <FastImage source={ICON.Star} style={appStyle.iconSmall} />
            <FastImage source={ICON.Star} style={appStyle.iconSmall} />
            <Text style={styles.tripText}>0 chuyến</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.priceLabel}>Giá tự lái: </Text>
            <Text style={styles.priceText}>{formatPrice(data.price)}</Text>
          </View>
          <View style={styles.locationContainer}>
            <FastImage source={ICON.Location} style={appStyle.iconMedium} />
            <Text style={styles.locationText}>
              {data.locationCar} 
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ItemCar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 25,
  },
  carContainer: {
    width: '90%',
    height: 'auto',
    backgroundColor: '#f6f6f6',
    borderColor: COLOR.borderColor,

    borderRadius: 10,
    flexDirection: 'row',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  carImage: {
    width: 110,
    height: 100,
    alignSelf: 'center',
    borderRadius: 20,
  },
  statusContainer: {
    position: 'absolute',
    backgroundColor: 'rgba(65, 207, 242, 0.8)',
    borderTopLeftRadius: 14,
    borderBottomRightRadius: 14,
    padding: 5,
    justifyContent: 'center',
  },
  statusText: {
    color: 'white',
    fontWeight: 'bold',
  },
  detailsContainer: {
    marginLeft: 16,
  },
  carName: {
    flexWrap: 'wrap',
    width: windowWidth * 0.45,
    //flex: 1,
    fontSize: 17,
    fontWeight: 'bold',
  },
  tripContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  tripText: {
    marginLeft: 6,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 3,
  },
  priceLabel: {
    fontSize: 14,
  },
  priceText: {
    fontSize: 14,
    color: COLOR.primary,
    fontWeight: 'bold',
  },
  locationContainer: {
    flexDirection: 'row',
    width: 200,
    marginTop: 5,
  },
  locationText: {
    marginLeft: 3,
    flexWrap: 'wrap',
    flex: 1,
    fontSize: 12,
    marginTop: -5,
  },
});
