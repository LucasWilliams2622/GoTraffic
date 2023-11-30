import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {appStyle} from '../constants/AppStyle';
import {COLOR} from '../constants/Theme';
import FastImage from 'react-native-fast-image';

const ButtonSelected = props => {
  const {onPress, icon, iconWidth, iconHeight, text, isSelected} = props;
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          borderColor: isSelected ? COLOR.secondary : COLOR.borderColor,
          borderWidth: isSelected ? 2 : 0.7,
        },
      ]}
      onPress={onPress}>
      <Text
        style={[
          appStyle.text14,
          {
            color: isSelected ? COLOR.secondary : 'black',
            fontWeight: isSelected ? 'bold' : 'normal',
          },
        ]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

// let iconSource = require('../assets/icon/ic_plane.png');
// if (icon) {
//     iconSource = icon;
//   }

export default ButtonSelected;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    height: 30,
    borderRadius: 20,
    borderWidth: 0.7,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
});
