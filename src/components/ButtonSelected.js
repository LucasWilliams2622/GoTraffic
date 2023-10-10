import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { appStyle } from '../constants/AppStyle';
import { COLOR } from '../constants/Theme';
import FastImage from 'react-native-fast-image';

const ButtonSelected = (props) => {
    const {onPress, icon, iconWidth, iconHeight, text, isSelected} = props;
    return (
        <View>
            <TouchableOpacity
                style={[styles.button, 
                   {backgroundColor: isSelected ? COLOR.blueHeader : 'transparent'}
                ]}
                onPress={onPress}>
                <FastImage source={icon} resizeMode='stretch' style={[appStyle.iconMedium, {marginRight: 5 }]} />
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