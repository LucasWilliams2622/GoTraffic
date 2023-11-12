import { KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect, useContext, useRoute } from 'react'
import { appStyle } from '../../../../constants/AppStyle'
import Header from '../../../../components/Header'
import { COLOR, ICON } from '../../../../constants/Theme'
import ButtonSelected from '../../../../components/ButtonSelected'
import AppInput from '../../../../components/AppInput'
import SwitchToggle from "react-native-switch-toggle";
import AppButton from '../../../../components/AppButton'
import AppDropdown from '../../../../components/AppDropdown'
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AxiosInstance from '../../../../constants/AxiosInstance'
import { AppContext } from '../../../../utils/AppContext'
import { useNavigation } from '@react-navigation/native'

const UpdateAddress = (props) => {

  return (
    <SafeAreaView style={[appStyle.container]}>
      <Header
        icon={ICON.Back}
        text="Chi tiết địa chỉ"
        onPress={() => navigation.navigate('MyAddress')}
      />
      <KeyboardAwareScrollView behavior='padding'>
        <View style={{ width: '100%', padding: 15 }}>
          <Text style={[appStyle.text18, { fontWeight: '600' }]}>Loại địa chỉ</Text>
          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <ButtonSelected
              text="Nhà riêng"
              icon={ICON.Home}
              isSelected={isSelected === 'Nhà riêng'}
              onPress={() => handleButtonPress('Nhà riêng')}
            />
            <ButtonSelected
              text="Công ty"
              icon={ICON.Company}
              isSelected={isSelected === 'Công ty'}
              onPress={() => handleButtonPress('Công ty')}
            />
            <ButtonSelected
              text="Khác"
              icon={ICON.Other}
              isSelected={isSelected === 'Khác'}
              onPress={() => handleButtonPress('Khác')}
            />
          </View>


          <View>
            <Text style={[appStyle.text18, { fontWeight: '500', marginTop: 10 }]}>Tên gợi nhớ</Text>
            <AppInput
              placeholder="Nhập tên cho địa chỉ"
              placeholderStyle={{ fontSize: 14 }}
              value={nickName}
              onChangeText={(text) => setNickName(text)}
            />
          </View>

          <View>
            <Text style={[appStyle.text18, { fontWeight: '500', marginTop: 10 }]}>Tỉnh/Thành phố</Text>
            <AppDropdown
              placeholderStyle={{ fontSize: 14 }}
              fontSize={16}
              labelField="name"
              valueField="name"
              placeholder="Tỉnh/Thành phố"
              data={provinces}
              value={selectedProvince?.name}
              onChange={(val) => {
                setSelectedProvince(val);
                setSelectedDistrict(null);
                setSelectedWard(null);
              }}
            />
          </View>

          <View>
            <Text style={[appStyle.text18, { fontWeight: '500', marginTop: 10 }]}>Quận Huyện</Text>
            <AppDropdown
              placeholderStyle={{ fontSize: 14 }}
              fontSize={16}
              labelField="name"
              valueField="name"
              placeholder="Quận Huyện"
              data={districts}
              value={selectedDistrict?.name}
              onChange={(val) => {
                setSelectedDistrict(val);
                setSelectedWard(null);
              }}
            />
          </View>

          <View>
            <Text style={[appStyle.text18, { fontWeight: '500', marginTop: 10 }]}>Phường Xã</Text>
            <AppDropdown
              labelField="name"
              valueField="name"
              placeholder="Phường Xã"
              data={wards}
              value={selectedWard?.name}
              onChange={(val) => {
                setSelectedWard(val);
              }}
            />
          </View>

          <View>
            <Text style={[appStyle.text18, { fontWeight: '500', marginTop: 10 }]}>Địa chỉ</Text>
            <AppInput
              placeholder="Nhập tên cho địa chỉ"
              placeholderStyle={{ fontSize: 14 }}
              value={address}
              onChangeText={(text) => setAddress(text)}
            />
          </View>

          <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-between' }}>
            <Text style={[appStyle.text14, { fontWeight: '500' }]}>Đặt làm địa chỉ mặc định</Text>
            <SwitchToggle
              switchOn={onSwitch}
              onPress={handleSwitchToggle}
              circleColorOff={COLOR.background}
              circleColorOn={COLOR.background}
              backgroundColorOn={COLOR.primary}
              backgroundColorOff='#C4C4C4'
              containerStyle={{
                width: 42,
                height: 24,
                borderRadius: 25,
                padding: 2,
              }}
              circleStyle={{
                width: 21,
                height: 20,
                borderRadius: 20,
              }}
            />
            {/* <Switch switchOn={onSwitch} onPress={handleSwitchToggle}/> */}
          </View>

          <AppButton
            title="Lưu"
            marginTop={60}
            onPress={() => newAddress()}
          />

        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

export default UpdateAddress

const styles = StyleSheet.create({})