import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { appStyle } from '../constants/AppStyle';
import { COLOR } from '../constants/Theme';
import FastImage from 'react-native-fast-image';

const ButtonSelected = (props) => {
    const { onPress, icon, iconWidth, iconHeight, text, isSelected } = props;
    return (
        <View>
            <TouchableOpacity
                style={[styles.button,
                { borderColor: isSelected ? COLOR.secondary : COLOR.borderColor,
                    borderWidth: isSelected ? 2 : 0.7
                }
                ]}
                onPress={onPress}>
                <FastImage source={icon} style={[appStyle.iconMedium, { marginRight: 5 }]} />
                <Text style={[appStyle.text14, {
                    color: isSelected ? COLOR.secondary : 'black',
                    fontWeight: isSelected ? 'bold' : 'normal'
                }]}>
                    {text}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

// let iconSource = require('../assets/icon/ic_plane.png');    
// if (icon) {
//     iconSource = icon;
//   }

export default ButtonSelected

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
        justifyContent: 'center',
    }
})