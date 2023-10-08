import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image';
import { appStyle, windowWidth } from '../../constants/AppStyle';
import call from 'react-native-phone-call';

const ItemInsuranceHotline = (props) => {
  const { data } = props
  const { id, image, phone } = data;

  //=========================| CALL PHONE |==============================
  const handleCall = (phone) => {
    const phoneNumber = phone;
    const args = {
      number: phoneNumber,
      prompt: true,
    };
    call(args).catch(console.error);
  };
  
  return (
    <View style={{ width: windowWidth - 32, paddingVertical: 8, borderBottomWidth: .5, borderColor: '#e3e3e3' }}>
      <View style={appStyle.row}>
        <FastImage style={{ width: 60, height: 60, }} resizeMode={'stretch'} source={image} />
        <View style={[{ alignItems: 'flex-start', justifyContent: 'center', height: 60, flex: 1, marginLeft: 8 }]}>
          <Text style={appStyle.text12}>Hotline</Text>
          <View style={[appStyle.rowBetween, {}]}>
            <Text style={[appStyle.text18, { fontWeight: '500', color: '#60656c', marginTop: 6 }]}
            >{phone}</Text>
            <TouchableOpacity onPress={()=>{handleCall(phone)}}>
              <FastImage style={appStyle.icon} resizeMode={'stretch'} source={require('../../assets/icon/ic_phone_outline.png')} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

export default ItemInsuranceHotline

const styles = StyleSheet.create({})