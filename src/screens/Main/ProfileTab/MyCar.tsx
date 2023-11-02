import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { appStyle } from '../../../constants/AppStyle'
import Header from '../../../components/Header'
import { ICON } from '../../../constants/Theme'

const MyCar = (props) => {
  const {navigation} = props;
  return (
    <SafeAreaView style={appStyle.container}>
      <Header
        icon={ICON.Back}
        text="Xe của tôi"
        onPress={() => navigation.navigate('Profile')}
      />
      <View style={{ padding: 15, width: '100%', height:'100%' }}>

      </View>

    </SafeAreaView>
  )
}

export default MyCar

const styles = StyleSheet.create({})