import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { appStyle } from '../constants/AppStyle';
import { COLOR } from '../constants/Theme';
import FastImage from 'react-native-fast-image';

const ButtonSelected = (props) => {
    const {data} = props;
    const {onPress, icon, iconWidth, iconHeight, text, isSelected} = data;
    let iconSource = require('../assets/icon/ic_plane.png');    
    if (icon) {
        iconSource = icon;
      }

    return (
        <View>
            <TouchableOpacity
                style={[styles.button, 
                   {backgroundColor: isSelected ? COLOR.blueHeader : 'transparent'}
                ]}
                onPress={onPress}>
                <FastImage source={iconSource} resizeMode='stretch' style={[appStyle.iconMedium, {marginRight: 5 }]} />
                <Text style={appStyle.text14}>{text}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ButtonSelected

const styles = StyleSheet.create({
    button:{
        width: 'auto',
        padding: 8,
        marginHorizontal: 5,
        borderColor: COLOR.borderColor,
        borderWidth: 0.7,
        borderRadius: 20,
        flexDirection: 'row'
    }
})