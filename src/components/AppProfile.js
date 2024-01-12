import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { appStyle } from '../constants/AppStyle';
import { COLOR } from '../constants/Theme';
import FastImage from 'react-native-fast-image';

const AppProfile = (props) => {
  const { text, icon, onPress, borderBottomWidth, tintColor } = props;
  const iconTintColor = tintColor ? tintColor : 'black';
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', height: 55 }}>
        <FastImage style={[appStyle.icon, { marginRight: 10 }]}
          source={icon}
          tintColor={iconTintColor}
          resizeMode='stretch' />
        <View style={[styles.container, {
          borderBottomWidth: borderBottomWidth == null ? 2 : borderBottomWidth
        }]}>
          <Text style={[appStyle.text500]}>{text}</Text>
          <FastImage style={appStyle.iconMedium} source={require('../assets/icon/ic_right.png')} />
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default AppProfile

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.background,
    width: '88%',
    height: 50,
    alignSelf: 'center',
    borderBottomColor: '#efefef',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 10
  },
})