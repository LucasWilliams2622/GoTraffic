import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { appStyle } from '../../constants/AppStyle';
import { COLOR } from '../../constants/Theme';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';

const ItemOption = (props) => {
    const navigation = useNavigation();
    const {data}= props;
    const { icon, iconWidth, iconHeight, text } = data;
    const defaultIcon = require('../../assets/icon/ic_plane.png');
    return (
            <TouchableOpacity onPress={()=> navigation.navigate('Home')}
                style={styles.button}>
                <FastImage
                    source={icon ? icon : defaultIcon}
                    style={[appStyle.iconMedium]} />
                <Text style={[appStyle.text14, {marginLeft: 5}]}>{text}</Text>
            </TouchableOpacity>
    )
}

export default ItemOption

const styles = StyleSheet.create({
    button: {
        width: 'auto',
        padding: 8,
        marginHorizontal: 5,
        borderColor: COLOR.borderColor,
        borderWidth: 0.7,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
        
    }
})