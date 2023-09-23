import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLOR } from '../constants/Theme'

const ButtonApp = (props) => {
    const { backgroundColor, borderWidth, borderRadius, borderColor,
        paddingVertical, paddingHorizontal, width,
        disabled, onPress,
        textAlign, textColor, fontSize, fontStyle, title
    } = props;
    return (
        <TouchableOpacity style={[styles.button, {
            backgroundColor: backgroundColor == null ? COLOR.bgButton : backgroundColor,

            borderWidth: borderWidth == null ? 1 : borderWidth,
            borderRadius: borderRadius == null ? 1 : borderRadius,
            borderColor: borderColor == null ? COLOR.borderButton : borderColor,

            paddingVertical: paddingVertical == null ? 12 : paddingVertical,
            paddingHorizontal: paddingHorizontal == null ? 14 : paddingHorizontal,
            width: width == null ? '100%' : width,

        }]} disabled={disabled == null ? false : true}
            onPress={onPress}>
            <Text style={[styles.title, {
                textAlign: textAlign == null ? "center" : textAlign,
                color: textColor == null ? COLOR.titleButton : textColor,
                
                fontWeight: fontWeight == null ? '500' : fontWeight,
                fontSize: fontSize == null ? 14 : fontSize,
                fontStyle: fontStyle == null ? 'normal' : fontStyle,

            }]}>{title == null ? "Button" : title}</Text>
        </TouchableOpacity>
    )
}

export default ButtonApp

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',

        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.17,
        shadowRadius: 2.54,
        elevation: 3
    },
    title: {

    }
})