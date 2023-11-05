import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import { appStyle, windowHeight, windowWidth } from '../../../../../constants/AppStyle'
import { COLOR, ICON } from '../../../../../constants/Theme'
import Header from '../../../../../components/Header'
import FastImage from 'react-native-fast-image'

import Pdf from 'react-native-pdf'

const LeaseCar = (props) => {
  const { navigation } = props;

  return (
    <SafeAreaView style={appStyle.container}>
      <Header
        text="Hợp đồng mẫu"
        icon={ICON.Back}
        onPress={() => navigation.navigate('SampleContract')}
      />
      <View style={{flex:1, justifyContent:'flex-start', alignItems:'center'}}>
        <Pdf source={{uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf', cache: true}}
            trustAllCerts={false }
            spacing={30}
            onPageChanged={(page, totalPages)=> console.log(`${totalPages}`)}
            style={{flex:1 , width: windowWidth, backgroundColor:COLOR.gray}}
        >
        </Pdf>
      </View>

    </SafeAreaView>
  )
}

export default LeaseCar

const styles = StyleSheet.create({})