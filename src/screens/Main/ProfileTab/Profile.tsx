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
      <View style={styles.headBg}>
        <View style={[appStyle.boxCenter, { marginTop: windowHeight * 0.12 }]}>
          <FastImage source={require('../../../assets/image/guide/img_friend.png')} style={[appStyle.avatar]}></FastImage>
          <Text style={[appStyle.text24Bold, { textAlign: 'center', marginTop: 12 }]}>{name}</Text>
        </View>
      </View>
      
      <View style={{
        marginTop: windowHeight * 0.12,
        width: '100%',
        height: windowHeight * 0.6,
        paddingHorizontal: 15
      }}>
        <ScrollView
          style={{ flex: 1, width: '100%', height: '100%' }}
          showsVerticalScrollIndicator={false}>
          <View style={styles.viewGroup}>
            <AppProfile
              icon={ICON.Profile}
              text="Tài khoản của tôi"
              onPress={() =>
                navigation.navigate('Account', updateNewName(name))}/>

            <AppProfile
              icon={ICON.Heart}
              text="Xe yêu thích"
              onPress={() => navigation.navigate('FavouriteCar')} />

            <AppProfile
              icon={ICON.Trip}
              text="Xe của tôi"
              onPress={() => navigation.navigate('MyCar')} />

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

          <View style={[styles.viewGroup, { marginTop: 16 }]}>
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
              borderBottomWidth={0}
              onPress={() => navigation.navigate('ChangePassword')} />
          </View>

          <TouchableOpacity>
            <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 20 }}>
              <FastImage source={ICON.Exit} style={[appStyle.iconBig]} />
              <Text style={[appStyle.text20, { color: COLOR.exit, marginLeft: 10, fontWeight: '500' }]}>Đăng xuất</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
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
    flex: 1,
    width: 'auto',
    height: 'auto',
    marginTop: 36,
    borderRadius: 10,
    borderWidth: 2,
    paddingHorizontal: 10,
    borderColor: '#efefef',
  }
})