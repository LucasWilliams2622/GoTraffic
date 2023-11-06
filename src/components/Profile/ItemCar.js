import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image';
import { COLOR, ICON } from '../../constants/Theme';
import { appStyle, windowHeight, windowWidth } from '../../constants/AppStyle';
import { useNavigation } from '@react-navigation/native';


const ItemCar = (props) => {
    const navigation = useNavigation();

    //const { data } = props;
    //const { selectedModel, selectedBrand, selectedYear, price} = data;
    const { data } = props;
    // console.log(data);

    const goDetail = () => {
        navigation.navigate('DetailInListCar');
    };

    return (
      <TouchableOpacity style={styles.container} onPress={goDetail}>
        <View style={styles.carContainer}>
          <FastImage source={ICON.MasterCard} style={styles.carImage} />
          <View style={styles.statusContainer}>
            <Text style={styles.statusText}>Chờ duyệt</Text>
          </View>
          <View style={styles.detailsContainer}>
            <Text style={appStyle.text16Bold}>{data.name}</Text>
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
              <Text style={styles.priceText}> {data.price}K</Text>
            </View>
            <View style={styles.locationContainer}>
              <FastImage source={ICON.Location} style={appStyle.iconMedium} />
              <Text style={styles.locationText}>
                {data.locationCar} {data.city}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
}

export default ItemCar

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 25,
    },
    carContainer: {
        width: '90%',
        height: 'auto',
        backgroundColor: COLOR.background,
        borderRadius: 10,
        borderWidth: 0.4,
        flexDirection: 'row',
        padding: 10,
    },
    carImage: {
        width: windowWidth * 0.35,
        height: '90%',
        alignSelf: 'center'
    },
    statusContainer: {
        position: 'absolute',
        backgroundColor: 'rgba(65, 207, 242, 0.8)',
        borderRadius: 8,
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
        alignItems: 'center',
    },
    locationText: {
        marginLeft: 3,
        flexWrap: 'wrap',
        flex: 1,
        fontSize: 12,
    },
});

