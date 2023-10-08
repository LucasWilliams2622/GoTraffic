import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../../components/Header'
import { appStyle } from '../../../constants/AppStyle'
import { ICON } from '../../../constants/Theme'
import FastImage from 'react-native-fast-image'
import AppButton from '../../../components/AppButton'
import AppProfile from '../../../components/AppProfile'
import Address from '../../../components/Address'

const MyAddress = (props) => {
  const { navigation } = props;
  const [address, setAddress] = useState('');
  const [hasAddress, sethasAddress] = useState(false);

  useEffect(() => {
    // Xử lý state địa chỉ
    const hasAddress = true;
    sethasAddress(hasAddress);
  }, [])
  return (
    <SafeAreaView style={[appStyle.container, { alignItems: 'center', padding: 15}]}>
      <Header
        icon={ICON.Back}
        text="Địa chỉ của tôi"
        onPress={() => navigation.navigate('Profile')}
        marginLeft={86}
      />
      {hasAddress ? (
        // Hiển thị danh sách địa chỉ
        <View>
          <Text>Danh sách địa chỉ</Text>
          <Address
            icon={ICON.Home}
            text="011 Thanh Đa"
            title="Nhà"
            onPress={() => navigation.navigate('NewAddress')}
          />
        </View>
      ) : (
        // Hiển thị hình ảnh khi không có địa chỉ
        <FastImage
        source={require('../../../assets/image/guide/img_address.png')}
          style={{width:'100%', height:'70%', alignSelf: 'center', justifyContent:'center' }}
        />
      )}
      <AppButton
        title="+ Thêm địa chỉ"
        marginTop={30}
        onPress={() => navigation.navigate('NewAddress')}
      />
    </SafeAreaView>
  )
}

export default MyAddress

const styles = StyleSheet.create({})