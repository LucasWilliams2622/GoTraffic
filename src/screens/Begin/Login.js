import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppInput from '../../components/AppInput';
import {appStyle} from '../../constants/AppStyle';
import AppButton from '../../components/AppButton';
import {COLOR} from '../../constants/Theme';
import FastImage from 'react-native-fast-image';
import {Center} from 'native-base';

const Login = () => {
  return (
    <SafeAreaView style={appStyle.main}>
      <FastImage
        source={require('../../assets/image/logo_go_traffic.png')}
        style={styles.image}
      />
      <Text style={styles.text1}>Đăng nhập</Text>
      <View style={styles.viewItem}>
        <Text style={styles.text2}>Số điện thoại</Text>
        <AppInput placeholder={'Nhập số điện thoại của bạn'} />
      </View>
      <View style={styles.viewItem}>
        <Text style={styles.text2}>Mật khẩu</Text>
        <AppInput placeholder={'Nhập mật khảu'} isPassword />
      </View>
      <Text style={styles.text3}>Quên mật khẩu</Text>
      <View style={styles.view1}></View>
      <View style={styles.itemLoginSocial}>
        <TouchableOpacity style={styles.button}>
          <FastImage
            style={styles.logo}
            source={require('../../assets/image/logo-gg.png')}
          />
          <Text style={styles.text5}>Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <FastImage
            style={styles.logo}
            source={require('../../assets/image/logo-fb.png')}
          />
          <Text style={styles.text5}>Facebook</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.text4}>
        Bạn chưa là thành viên?
        <Text style={{fontWeight: 'bold'}}> Hãy đăng ký</Text>
      </Text>
      <AppButton title="Đăng nhập" color={COLOR.secondary} fontSize={18} />
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  text1: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  image: {
    width: 114.17,
    height: 130,
    alignSelf: 'center',
  },
  logo: {
    width: 30,
    height: 30,
    alignSelf: 'center',
  },
  text2: {
    fontSize: 16,
    color: 'black',
    marginBottom: 6,
  },
  text3: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text4: {
    fontSize: 16,
    color: 'black',
    marginBottom: 6,
    textAlign: 'center',
  },
  text5: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    fontWeight:'bold',
    marginLeft:5
  },
  view1: {
    height: 1,
    width: '100%',
    backgroundColor: COLOR.borderColor,
    marginBottom: 16,
  },
  viewItem: {
    marginBottom: 16,
  },
  button: {
    width: 180,
    height: 45,
    borderColor: COLOR.borderColor,
    borderWidth: 1,
    borderRadius: 10,
    textAlign: 'center',
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center',

  },
  itemLoginSocial: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
