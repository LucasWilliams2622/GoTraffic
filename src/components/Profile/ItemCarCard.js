import { StyleSheet, Text, View, TouchableOpacity, Pressable } from 'react-native';
import React, { useContext, useMemo, useState } from 'react';
import FastImage from 'react-native-fast-image';
import { COLOR, ICON } from '../../constants/Theme';
import { appStyle, windowHeight, windowWidth } from '../../constants/AppStyle';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import ShieldIcon from '../../assets/icon/ic_shield_verified';
import SuitcaseIcon from '../../assets/icon/ic_suitcase';;
import AxiosInstance from '../../constants/AxiosInstance';
import { AppContext } from '../../utils/AppContext';

const ItemCarCard = (props) => {
    const { id, name, image, locationCar, gear, isDelivery,
        price,
        rating,
        numberOfBooked } = props;

    const [isFavorite, setIsFavorite] = useState(true);
    const { setIsLogin, infoUser, idUser } = useContext(AppContext);


    const removeFavorite = async () => {
        try {
            const response = await AxiosInstance().delete(`/favorite-car/api/delete?idUser=${idUser}&idCar=${id}`);
            console.log(response, "Xe đã bị xóa khỏi danh sách yêu thích");
            setIsFavorite(!isFavorite);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <View style={{
            width: windowWidth * 0.8,
            height: windowHeight * 0.4,
            borderRadius: 20,
            borderWidth: 2,
            borderColor: '#ddd',
            marginTop: 10,
            alignSelf: 'center',
            padding: 10,
        }}>
            <FastImage resizeMode='stretch' source={{ uri: image }} style={styles.image} />
            <TouchableOpacity style={styles.pressable}
                onPress={() => removeFavorite()}
            >
                <Icon
                    name="heart"
                    color={isFavorite ? COLOR.fifth : COLOR.white}
                    size={20}
                    solid={isFavorite}
                />
            </TouchableOpacity>

            <View style={styles.row}>
                <View style={styles.typeView}>
                    <Text style={appStyle.text12}>{gear}</Text>
                </View>
                {isDelivery && (
                    <View style={styles.benefitView}>
                        <Text style={appStyle.text12}>Giao xe tận nơi</Text>
                    </View>
                )}
            </View>

            <View style={{ flexDirection: 'row' }}>
                <Text style={[appStyle.text16Bold, styles.title, {}]}>
                    {name}
                </Text>
                <ShieldIcon style={{ marginLeft: 5 }} color={COLOR.fifth} />
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Icon name="location-dot" color={COLOR.borderColor} size={15} />
                <Text style={styles.locationText}>{locationCar}</Text>
            </View>
            <View style={styles.separator} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: windowWidth * 0.4 }}>
                    <Icon name="star" color={COLOR.third} size={12} solid />
                    <Text style={[styles.ratingText, { marginLeft: 5 }]}>
                        0.0
                    </Text>
                    <Text
                        style={[styles.dot, { marginLeft: 5, marginRight: 5 }]}>
                        ·
                    </Text>
                    <SuitcaseIcon color={COLOR.fifth} />
                    <Text style={[styles.ratingText, { marginLeft: 5 }]}>
                        {numberOfBooked} chuyến
                    </Text>
                </View>

                <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ color: COLOR.fifth, fontSize: 18 }}>{price}</Text>
                        <Text style={{ color: COLOR.borderColor, fontSize: 12 }}>/ngày</Text>
                    </View>
                    <Text style={{ color: COLOR.borderColor, fontSize: 12, marginTop: 5 }}>
                        Giá tổng{' '}
                        <Text style={{ fontWeight: 'bold' }}>872K</Text>
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default ItemCarCard

const styles = StyleSheet.create({
    image: {
        height: '50%',
        borderRadius: 15,
    },
    pressable: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 10,
        position: 'absolute',
        borderRadius: 50,
        top: 20,
        right: 20,
    },
    row: {
        alignItems: 'center',
        marginTop: 10,
    },
    typeView: {
        backgroundColor: COLOR.sixth,
        padding: 8,
        alignSelf: 'flex-start',
        borderRadius: 15,
        marginRight: 10,
    },
    locationRow: {
        alignItems: 'center',
        marginTop: 5,
    },
    locationText: {
        color: COLOR.borderColor,
        marginLeft: 10,
    },
    separator: {
        height: 0.5,
        backgroundColor: COLOR.borderColor,
        opacity: 0.3,
        width: '100%',
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
})