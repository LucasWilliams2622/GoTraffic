import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { appStyle, windowHeight } from '../../../constants/AppStyle'
import { COLOR, ICON } from '../../../constants/Theme'
import FastImage from 'react-native-fast-image'
import AppProfile from '../../../components/AppProfile'
import { AppContext } from '../../../utils/AppContext'

const Profile = (props) => {
  const { navigation, route } = props;
  const defaultName = "Bảo";
  const [name, setName] = useState(route.params?.newName || defaultName);
  const { setIsLogin } = useContext(AppContext)
  useEffect(() => {
    if (route.params?.newName) {
      setName(route.params.newName);
    }
  }, [route.params?.newName]);

  const updateNewName = (newName) => {
    navigation.setParams({ newName });
  }
  return (
    <SafeAreaView style={[appStyle.container, { backgroundColor: COLOR.gray }]}>
      <ScrollView
        style={{ flex: 1, width: '100%', height: '80%', marginBottom: windowHeight * 0.1 }}
        showsVerticalScrollIndicator={false}>
        <View style={styles.headBg}>
          <View style={[appStyle.boxCenter, { marginTop: windowHeight * 0.12 }]}>
            <FastImage source={require('../../../assets/image/guide/img_friend.png')} style={[appStyle.avatar]}></FastImage>
            <Text style={[appStyle.text24Bold, { textAlign: 'center', marginTop: 12 }]}>{name}</Text>
          </View>
        </View>

        <View style={[styles.viewGroup, { marginTop: windowHeight * 0.18 }]}>
          <AppProfile
            icon={ICON.Profile}
            text="Tài khoản của tôi"
            onPress={() =>
              navigation.navigate('Account', updateNewName(name))} />

          <AppProfile
            icon={ICON.Heart}
            text="Xe yêu thích"
            onPress={() => navigation.navigate('FavouriteCar')} />
          <AppProfile
            icon={ICON.Address}
            text="Địa chỉ của tôi"
            onPress={() => navigation.navigate('MyAddress')} />

          <AppProfile
            icon={ICON.Wallet}
            text="Thẻ của tôi"
            borderBottomWidth={0}
            onPress={() => navigation.navigate('MyCard')} />
        </View>

        <View style={[styles.viewGroup, { marginTop: 35 }]}>
          <AppProfile
            icon={ICON.Share}
            text="Giới thiệu bạn bè"
            onPress={() => navigation.navigate('ShareWithFriend')} />

          <AppProfile
            icon={ICON.Gift}
            text="Quà tặng"
            borderBottomWidth={0}
            onPress={() => navigation.navigate('MyPromotion')} />
        </View>

        <View style={[styles.viewGroup, { marginTop: 35 }]}>
          <AppProfile
            icon={ICON.Key}
            text="Đổi mật khẩu"
            onPress={() => navigation.navigate('ChangePassword')} />

          <AppProfile
            icon={ICON.Delete}
            text="Yêu cầu xóa tài khoản"
            borderBottomWidth={0}
            onPress={() => navigation.navigate('Policy')} />
        </View>

        <TouchableOpacity onPress={() => { setIsLogin(false) }}>
          <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 20 }}>
            <FastImage source={ICON.Exit} style={[appStyle.iconBig]} />
            <Text style={[appStyle.text20, { color: COLOR.exit, marginLeft: 10, fontWeight: '500' }]}>Đăng xuất</Text>
          </View>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView >
  )
}

export default Profile

const styles = StyleSheet.create({
  headBg: {
    backgroundColor: COLOR.bgHeader,
    width: '100%',
    height: windowHeight * 0.15,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },

  viewGroup: {
    marginHorizontal: 15,
    height: 'auto',
    width: 'auto',
    borderRadius: 10,
    borderWidth: 2,
    paddingHorizontal: 10,
    borderColor: COLOR.background,
    backgroundColor: COLOR.background
  }
})