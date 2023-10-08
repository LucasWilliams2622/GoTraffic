import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { appStyle, windowHeight } from '../../../constants/AppStyle'
import { COLOR, ICON } from '../../../constants/Theme'
import FastImage from 'react-native-fast-image'
import AppProfile from '../../../components/AppProfile'

const Profile = (props) => {
  const { navigation, route } = props;
  const defaultName = "Bảo";
  const [name, setName] = useState(route.params?.newName || defaultName);

  useEffect(() => {
    if (route.params?.newName) {
      setName(route.params.newName);
    }
  }, [route.params?.newName]);

  const updateNewName = (newName) => {
    navigation.setParams({ newName });
  }
  return (
    <SafeAreaView style={appStyle.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}>
        <View style={styles.headBg}>
          <View style={[appStyle.boxCenter, { marginTop: windowHeight * 0.12 }]}>
            <FastImage source={require('../../../assets/image/guide/img_book.jpg')} style={[appStyle.avatar]}></FastImage>
            <Text style={[appStyle.text24, { textAlign: 'center', marginTop: 12 }]}>{name}</Text>
          </View>
        </View>

        <ScrollView
          style={{ flex: 1, marginTop: windowHeight * 0.12,paddingHorizontal:16 }}
          showsHorizontalScrollIndicator={false}>
          <AppProfile
            icon={ICON.Profile}
            text="Tài khoản của tôi"
            onPress={() =>
              navigation.navigate('Account', updateNewName(name))
            } />
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
              <Text style={[appStyle.text18, { color: COLOR.exit, left: 10 }]}>Đăng xuất</Text>
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
    backgroundColor: COLOR.blueHeader,
    width: '100%',
    height: windowHeight * 0.15,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  }
})