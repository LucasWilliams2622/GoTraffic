import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {appStyle} from '../constants/AppStyle';
import {COLOR} from '../constants/Theme';
import FastImage from 'react-native-fast-image';

const AppHomeCar = props => {
  const {title,text, icon, onPress} = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent:'space-around',
          width: '100%',
          height: 50,
          marginBottom:10,
          marginTop:10
        }}>
        <FastImage
          style={[appStyle.icon, {marginRight: 10}]}
          source={icon}
          resizeMode="stretch"
        />
        <View style={{width:'80%'}}>
          <Text style={[appStyle.text16Bold]}>{title}</Text>
          <Text style={[appStyle.text14]}>{text}</Text>
        </View>
        <View>
          <FastImage
            style={appStyle.iconMedium}
            source={require('../assets/icon/ic_right.png')}
          />
        </View>
      </View>
      <View style={{width:'100%',height:0.5,backgroundColor:COLOR.borderColor}}>
      </View>
    </TouchableOpacity>
  );
};

export default AppHomeCar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.background,
    width: '90%',
    height: 50,
    alignSelf: 'center',
    borderBottomColor: '#efefef',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
