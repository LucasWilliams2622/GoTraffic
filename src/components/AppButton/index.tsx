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
  width = '100%',
  onPress,
  alignSelf = 'center',
  disabled,
  fontSize = 14,
  noShadow,
  iconColor,
  icon,
  iconSize = 16,
}: AppButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: backgroundColor,
          width: width,
          alignSelf: alignSelf,
          borderColor: borderColor == null ? '#2F6C8D' : borderColor,
          elevation: noShadow == null ? 3 : 0,
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
    alignSelf: 'center',
  },
});
