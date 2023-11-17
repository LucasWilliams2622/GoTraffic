import { Clipboard, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { appStyle, windowHeight, windowWidth } from '../../../constants/AppStyle'
import Header from '../../../components/Header'
import { COLOR, ICON } from '../../../constants/Theme'
import FastImage from 'react-native-fast-image'
import AppHeader from '../../../components/AppHeader'

const ShareWithFriend = (props) => {
  const { navigation } = props;

  const handleCopyCode = () => {
    const referralCode = 'ATXmk09GH';
    Clipboard.setString(referralCode);

    // Kiểm tra copy thành công hay không
    Clipboard.getString().then((copiedText) => {
      if (copiedText === referralCode) {
        console.log(`Bạn đã copy đoạn mã: ${copiedText} thành công.`);
      } else {
        console.log('Copy không thành công.');
      }
    });
  };

  return (
    <SafeAreaView style={appStyle.container}>
          <AppHeader
            title='Giới thiệu bạn mới'
            backgroundColor={COLOR.blueHeader2}
          />

      <View style={{ flex: 1 }}>
        <FastImage
          source={require('../../../assets/image/guide/img_friends.png')}
          style={styles.vImg}
        />

        <View style={styles.vTop} />

        <View style={styles.vMid}>
          <Text style={styles.title}>Chia sẻ mã giới thiệu</Text>
          <Text style={styles.link}>Tìm hiểu chi tiết chương trình</Text>

          <View style={styles.codeContainer}>
            <Text style={[appStyle.text16Bold, { color: COLOR.background }]}>ATXmk09GH</Text>
            <TouchableOpacity onPress={() => handleCopyCode()}>
              <FastImage source={ICON.Copy} style={[appStyle.iconMedium]} />
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10, alignItems: 'center' }}>
            <Text style={appStyle.text14}>Chia sẻ</Text>
            <FastImage source={ICON.Send} style={[appStyle.iconMedium, { marginLeft: 5 }]} />
          </View>
        </View>
      </View>

    </SafeAreaView>
  )
}

export default ShareWithFriend

const styles = StyleSheet.create({
  vTop: {
    position: 'absolute',
    backgroundColor: COLOR.blueHeader2,
    width: '100%',
    height: windowHeight * 0.32,
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  vImg: {
    resizeMode: 'cover',
    width: windowWidth,
    marginTop: 10,
    marginLeft: 10,
    height: windowHeight * 0.3,
    zIndex: 1
  },
  vMid: {
    flex: 1,
    backgroundColor: COLOR.background,
    width: windowWidth * 0.8,
    height: windowHeight * 0.2,
    flex: 1,
    position: 'absolute',
    zIndex: 2,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: windowHeight * 0.24,
    shadowColor: COLOR.black,
    shadowRadius: 4.65,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
    padding: 15
  },

  codeContainer: {
    width: '100%',
    height: windowHeight * 0.05,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginTop: 20,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.17,
    shadowRadius: 2.54,
    elevation: 3,
    backgroundColor: COLOR.primary,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },

  title: {
    ...appStyle.text18Bold,
    fontWeight: '500',
  },
  link: {
    ...appStyle.text14,
    textDecorationLine: 'underline',
  },
  imageBackground: {
    width: windowWidth,
    height: windowHeight * 0.3,
  }
})