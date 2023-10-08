import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { appStyle } from '../constants/AppStyle';
import { COLOR } from '../constants/Theme';
import FastImage from 'react-native-fast-image';

const AppProfile = (props) => {
  const { text, icon, onPress } = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.content}>
          <FastImage style={appStyle.iconBig} source={icon} resizeMode='stretch' />
          <Text style={[appStyle.text16, { marginLeft: 16 }]}>{text}</Text>
        </View>
        <FastImage style={appStyle.iconMedium} source={require('../assets/icon/ic_right.png')} />
      </View>
    </TouchableOpacity>
  )
}

export default AppProfile

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.background,
    width: '100%',
    height: 50,
    alignSelf: 'center',
    borderBottomColor: '#efefef',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
})