import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLOR } from '../constants/Theme'
import FastImage from 'react-native-fast-image'
const AppButton = (props) => {
    const {
        // BUTTON
        backgroundColor, borderWidth, borderRadius, borderColor,
        paddingVertical, paddingHorizontal, width,
        marginTop,marginBottom, position,noShadow,
        // ICON
        iconWidth, iconHeight, iconColor, icon,
        // CLICK
        disabled, onPress,
        // TITLE
        textAlign, textColor, fontSize, fontStyle, title, fontWeight,
    } = props;
    return (
        <TouchableOpacity style={[styles.button, {
            backgroundColor: backgroundColor == null ? COLOR.bgButton : backgroundColor,

      borderWidth: borderWidth == null ? 1 : borderWidth,
      borderRadius: borderRadius == null ? 8 : borderRadius,
      borderColor: borderColor == null ? COLOR.borderButton : borderColor,

            paddingVertical: paddingVertical == null ? 12 : paddingVertical,
            paddingHorizontal: paddingHorizontal == null ? 14 : paddingHorizontal,
            width: width == null ? '100%' : width,
            marginTop: marginTop == null ? 0 : marginTop,
            marginBottom: marginBottom == null ? 0 : marginBottom,
            elevation: noShadow == null ? 3 : 0

    }]} disabled={disabled == null ? false : true}
      onPress={onPress}>
      {
        icon == null ? (<></>)
          : (<FastImage
            style={{
              width: iconWidth == null ? 16 : iconWidth,
              height: iconHeight == null ? 16 : iconHeight,
              marginRight: 8
            }}
            source={icon}
            tintColor={iconColor == null ? 'white' : iconColor}
          />)
      }
      <Text style={[styles.title, {
        textAlign: textAlign == null ? "center" : textAlign,
        color: textColor == null ? COLOR.titleButton : textColor,

        fontWeight: fontWeight == null ? '600' : fontWeight,
        fontSize: fontSize == null ? 14 : fontSize,
        fontStyle: fontStyle == null ? 'normal' : fontStyle,
      },
      ]}>
        {title == null ? 'Button' : title}
      </Text>
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.17,
        shadowRadius: 2.54,
        elevation: 3,
        
    },
    title: {

    }
})