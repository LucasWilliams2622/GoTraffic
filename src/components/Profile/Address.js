import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLOR, ICON } from '../../constants/Theme';
import FastImage from 'react-native-fast-image';
import { appStyle, windowWidth } from '../../constants/AppStyle';
import { useNavigation } from '@react-navigation/native';

const Address = (props) => {
    const navigation = useNavigation();
    const { dulieu } = props;
    const { street, city, address, isDefault, ward, note } = dulieu || {};
    //console.log(dulieu);

    const icons = {
        'Nhà riêng': ICON.Home,
        'Công ty': ICON.Company,
        'Khác': ICON.Other,
    };
    const handleAddressPress = () => {
        navigation.navigate('UpdateAddress', { addressInfo: dulieu });

    };
    return (
        <TouchableOpacity onPress={handleAddressPress}>
            <View style={styles.container}>
                <View style={styles.content}>
                    <FastImage
                        resizeMode='stretch'
                        style={[appStyle.iconBig, { alignSelf: 'center' }]}
                        //source={type === 'Nhà riêng' ? ICON.Home : ICON.Company}
                        source={icons[street]}
                    />
                    <View style={{ marginLeft: 16 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={[appStyle.text16, { fontWeight: '600' }]}>{note}</Text>
                            {isDefault && (
                                <View>
                                    <Text style={[appStyle.text14, { backgroundColor: COLOR.bgHeader, marginLeft: 10, borderRadius: 8, padding: 5 }]}>Mặc định</Text>
                                </View>
                            )}
                        </View>
                        <Text numberOfLines={1} style={[appStyle.text14]}>{address}</Text>
                    </View>
                </View>
                <FastImage style={appStyle.iconMedium} source={require('../../assets/icon/ic_right.png')} />
            </View>
        </TouchableOpacity>
    )
}

export default Address

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLOR.background,
        width: windowWidth * 0.9,
        height: 'auto',
        alignSelf: 'center',
        paddingVertical: 8,
        borderBottomColor: '#efefef',
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        //marginTop: 10,
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
})