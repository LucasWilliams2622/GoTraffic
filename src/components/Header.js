import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLOR } from '../constants/Theme';
import FastImage from 'react-native-fast-image';
import { appStyle } from '../constants/AppStyle';

const Header = (props) => {
    const { text, icon, onPress, marginLeft } = props;
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={onPress}>
                <FastImage
                    source={icon}
                    style={[appStyle.iconBig]}
                />
            </TouchableOpacity>
            <Text style={[appStyle.text20,{
                marginLeft: marginLeft == null ? 70 : marginLeft
            }]}>{text}</Text>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 50,
        backgroundColor: COLOR.background,
        flexDirection: 'row',
        //alignItems: 'center',
        paddingHorizontal: 0,
        justifyContent: 'flex-start'
    },
})