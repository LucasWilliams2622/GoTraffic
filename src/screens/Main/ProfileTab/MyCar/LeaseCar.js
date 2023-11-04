import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import { appStyle, windowHeight, windowWidth } from '../../../../constants/AppStyle'
import { ICON } from '../../../../constants/Theme'
import Header from '../../../../components/Header'
import FastImage from 'react-native-fast-image'

const LeaseCar = (props) => {
  const { navigation } = props;
  return (
    <SafeAreaView style={appStyle.container}>
      <Header
        text="Hợp đồng mẫu"
        icon={ICON.Back}
        onPress={() => navigation.navigate('SampleContract')}
      />
      <ScrollView style={{ flex: 1, width: windowWidth, height: windowHeight * 0.8 }}>
        <View style={{ width: '100%', height: windowHeight * 0.9, padding: 10, alignItems: 'center'}}>
          <FastImage source={require('../../../../assets/image/img_lease1.png')} style={{ width: '100%', height: '90%' }} />
        </View>
        <View style={{ width: '100%', height: windowHeight * 0.9, padding: 10, alignItems: 'center'}}>
          <FastImage source={require('../../../../assets/image/img_lease1.png')} style={{ width: '100%', height: '90%' }} />
        </View>
      </ScrollView>

    </SafeAreaView>
  )
}

export default LeaseCar

const styles = StyleSheet.create({})