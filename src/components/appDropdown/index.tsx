import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {appStyle, windowHeight, windowWidth} from 'src/styles/appStyle';
import {Dropdown} from 'react-native-element-dropdown';
import {AppDropdownProps} from './type';
import {fonts} from 'src/assets/fonts/fonts';

const AppDropdown = ({
  containerStyle,
  titleStyle,
  selectedTextStyle,
  inputSearchStyle,
  placeholderStyle,
  iconStyle,
  title,
  placeholder,

  backgroundColor = '#ffffff',
  borderColor = '#E4E4E4',
  borderWidth = 0.5,
  borderRadius = 8,
  width = '100%',
  height = 46,
  maxHeight,

  paddingVertical = 10,
  paddingHorizontal,
  alignSelf = 'flex-start',

  mode = 'modal',
  search = false,
  searchPlaceholder = 'Tìm kiếm',
  placeholderTextColor = '#787878',
  data,
  labelField,
  valueField,
  value,
  onChange,
  onFocus,
  onBlur,
}: AppDropdownProps) => {
  return (
    <Dropdown
      data={data}
      style={[
        styles.dropdown,
        {
          backgroundColor: backgroundColor,
          borderColor: borderColor,
          borderWidth: borderWidth,
          borderRadius: borderRadius,
          width: width,
          height: height,
          maxHeight: maxHeight,

          paddingVertical: paddingVertical,
          paddingHorizontal: paddingHorizontal,
          alignSelf: alignSelf,
        },
        containerStyle,
      ]}
      placeholderStyle={[styles.placeholderStyle, placeholderStyle]}
      selectedTextStyle={[styles.selectedTextStyle, selectedTextStyle]}
      inputSearchStyle={[styles.inputSearchStyle, inputSearchStyle]}
      mode={mode}
      iconStyle={[styles.icon, iconStyle]}
      search={search}
      searchPlaceholder={searchPlaceholder}
      containerStyle={{
        width: windowWidth,
        paddingVertical: 16,
        height: windowHeight / 2,
        marginTop: windowHeight / 2,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
      }}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      labelField={labelField}
      valueField={valueField}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
};

export default AppDropdown;

const styles = StyleSheet.create({
  dropdown: {
    fontSize: 14,
    paddingRight: 12,
    fontFamily: fonts.Medium,
  },
  placeholderStyle: {
    fontSize: 14,
    fontWeight: '400',
    paddingLeft: 12,
    fontFamily: fonts.Medium,
  },
  selectedTextStyle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#424242',
    paddingLeft: 12,
    fontFamily: fonts.Medium,
  },

  inputSearchStyle: {
    height: 40,
    borderColor: '#787878',
    marginHorizontal: 16,
    color: '#424242',
    borderRadius: 6,
    paddingHorizontal: 0,
  },
  icon: {},
});
