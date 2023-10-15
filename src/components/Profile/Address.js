import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLOR, ICON } from '../../constants/Theme';
import FastImage from 'react-native-fast-image';
import { appStyle } from '../../constants/AppStyle';

const Address = (props) => {
    // const {title, text, icon, onPress, dulieu } = props;
    const { dulieu, onPress } = props;

    // Trích xuất thông tin từ dulieu
    const { type, nickName, address } = dulieu || {};
    console.log(dulieu);
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.container}>
                <View style={styles.content}>
                    {/* <FastImage style={[appStyle.iconBig, { alignSelf: 'center' }]}
                        source={icon} /> */}
                    <FastImage
                        style={[appStyle.iconBig, { alignSelf: 'center' }]}
                        source={type === 'Nhà riêng' ? ICON.Home : ICON.Company}
                    />
                    <View style={{ marginLeft: 16 }}>
                        <Text style={[appStyle.text16, { fontWeight: '600' }]}>{nickName}</Text>
                        <Text style={[appStyle.text14]}>{address}</Text>
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
        width: 340,
        height: 50,
        alignSelf: 'center',
        borderBottomColor: '#efefef',
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
})