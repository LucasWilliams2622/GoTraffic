import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image';
import { ICON } from '../../constants/Theme';
import { appStyle, windowHeight, windowWidth } from '../../constants/AppStyle';


const ItemCar = (props) => {
    const { name, status, trip, selfDrivePrice, location } = props;
    return (
        <View style={styles.container}>
            <View style={styles.carContainer}>
                <FastImage source={ICON.MasterCard} style={styles.carImage} />
                <View style={styles.statusContainer}>
                    <Text style={styles.statusText}>{status}</Text>
                </View>
                <View style={styles.detailsContainer}>
                    <Text style={styles.carName}>{name}</Text>
                    <View style={styles.tripContainer}>
                        <FastImage source={ICON.Star} style={appStyle.iconMedium} />
                        <FastImage source={ICON.Star} style={appStyle.iconMedium} />
                        <FastImage source={ICON.Star} style={appStyle.iconMedium} />
                        <FastImage source={ICON.Star} style={appStyle.iconMedium} />
                        <FastImage source={ICON.Star} style={appStyle.iconMedium} />
                        <Text style={styles.tripText}>{trip} chuyến</Text>
                    </View>
                    <View style={styles.priceContainer}>
                        <Text style={styles.priceLabel}>Giá tự lái: </Text>
                        <Text style={styles.priceText}>{selfDrivePrice}</Text>
                    </View>
                    <View style={styles.locationContainer}>
                        <FastImage source={ICON.Location} style={appStyle.iconBig} />
                        <Text style={styles.locationText}>{location}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default ItemCar

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 25,
    },
    carContainer: {
        width: '85%',
        height: windowHeight*0.15,
        borderWidth: 0.5,
        borderRadius: 10,
        flexDirection: 'row',
        padding: 8,
    },
    carImage: {
        width: windowWidth*0.35,
        height: '100%',
    },
    statusContainer: {
        position: 'absolute',
        backgroundColor: 'rgba(65, 207, 242, 0.8)',
        borderRadius: 8,
        padding: 5,
        alignItems: 'center',
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
        width:windowWidth*0.45,
        //flex: 1,
        fontSize: 18,
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
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    
    locationText: {
        marginLeft: 3,
        flexWrap: 'wrap',
        flex: 1,
        fontSize: 14,
    },
});

