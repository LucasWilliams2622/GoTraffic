import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { appStyle } from '../../../constants/AppStyle'
import { COLOR, ICON } from '../../../constants/Theme'
import FastImage from 'react-native-fast-image'
import AppProfile from '../../../components/AppProfile'

const Profile = (props) => {
  const { navigation } = props;
  return (
    <SafeAreaView style={appStyle.container}>
      <ScrollView
        vertical={true}
        showsHorizontalScrollIndicator={false}>
        <View style={styles.headBg}>
          <FastImage source={require('../../../assets/image/guide/img_book.jpg')} style={[appStyle.avatar,{marginTop: 66}]}></FastImage>
        </View>
        <ScrollView
          style={{ marginTop: 60 }}
          vertical={true}
          showsHorizontalScrollIndicator={false}>
          <AppProfile
            icon={ICON.Profile}
            text="Tài khoản của tôi"
            onPress={() => navigation.navigate('Account')} />
          <AppProfile
            icon={ICON.Heart}
            text="Xe yêu thích"
            onPress={() => navigation.navigate('FavouriteCar')} />
          <AppProfile
            icon={ICON.Trip}
            text="Xe của tôi"
            onPress={() => navigation.navigate('MyCar')} />
          <AppProfile
            icon={ICON.Location}
            text="Địa chỉ của tôi"
            onPress={() => navigation.navigate('MyAddress')} />
          <AppProfile
            icon={ICON.Share}
            text="Giới thiệu bạn bè"
            onPress={() => navigation.navigate('ShareWithFriend')} />
          <AppProfile
            icon={ICON.Policy}
            text="Chính sách bảo mật"
            onPress={() => navigation.navigate('Policy')} />
          <AppProfile
            icon={ICON.Key}
            text="Đổi mật khẩu"
            onPress={() => navigation.navigate('ChangePassword')} />
          <TouchableOpacity>
            <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 20 }}>
              <FastImage source={ICON.Exit} style={[appStyle.iconBig]}>
              </FastImage>
              <Text style={[appStyle.text18, {color: COLOR.exit, left: 10}]}>Đăng xuất</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({
  headBg: {
    backgroundColor: COLOR.lightBlue,
    width: '100%',
    height: 134,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  }
})