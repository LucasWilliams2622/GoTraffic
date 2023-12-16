import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {AppButtonProps} from './type';
import FastImage from 'react-native-fast-image';
import {COLOR} from '../../constants/Theme';
const AppButton = ({
  containerStyle,
  titleStyle,
  title = 'Button',
  backgroundColor = COLOR.bgButton,
  textColor = 'white',
  borderColor,
  borderWidth = 1,
  width = '100%',
  onPress,
  alignSelf = 'center',
  disabled,
  fontSize = 14,
  noShadow,
  iconColor,
  icon,
  paddingVertical = 12,
  marginTop,
  iconSize = 16,
}: AppButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: backgroundColor,
          width: width,
          borderColor: borderColor == null ? COLOR.primary : borderColor,
          elevation: noShadow == null ? 3 : 0,
          alignSelf: alignSelf,
          paddingVertical: paddingVertical,
          borderWidth: borderWidth,
          marginTop: marginTop,
        },
        containerStyle,
      ]}
      disabled={disabled == null ? false : disabled}
      onPress={onPress}>
      {icon == null ? (
        <></>
      ) : (
        <FastImage
          style={{
            width: 16,
            height: 16,
            marginRight: 8,
          }}
          resizeMode="stretch"
          source={icon}
          tintColor={iconColor == null ? 'white' : iconColor}
        />
      )}
      <Text
        style={[
          styles.titleButton,
          {
            color: textColor,
            fontSize: fontSize,
          },
          titleStyle,
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLOR.bgButton,
    borderRadius: 8,
    paddingVertical: 14,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',

    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.29,
    shadowRadius: 1,
    elevation: 7,
    borderColor: '#D4D4D4',
    borderWidth: 0.5,
  },
  titleButton: {
    fontSize: 14,
    color: COLOR.titleButton,
    fontWeight: '600',
    alignSelf: 'center',
    marginLeft: 4,
  },
});
