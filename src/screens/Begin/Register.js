import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {appStyle} from '../../constants/AppStyle';
import AppInput from '../../components/AppInput';
import AppButton from '../../components/AppButton';
import {COLOR} from '../../constants/Theme';
import FastImage from 'react-native-fast-image';

const Register = () => {
  return (
    <SafeAreaView style={appStyle.main}>
      <View style={{flex:1}}>
        <FastImage
          source={require('../../assets/image/logo_go_traffic.png')}
          style={styles.image}
        />
        <Text style={styles.text1}>Đăng kí</Text>
        <View style={styles.view1}></View>

        <View style={styles.viewItem}>
          <Text style={styles.text2}>Tên hiển thị</Text>
          <AppInput placeholder={'Nhập tên hiển thị'} />
        </View>
        <View style={styles.viewItem}>
          <Text style={styles.text2}>Số điện thoại</Text>
          <AppInput placeholder={'Nhập số điện thoại '} />
        </View>
        <View style={styles.viewItem}>
          <Text style={styles.text2}>Mật khẩu</Text>
          <AppInput placeholder={'Nhập mật khảu'} isPassword />
        </View>
        <View style={styles.viewItem}>
          <Text style={styles.text2}>Xác nhận lại mật khẩu</Text>
          <AppInput placeholder={'Nhập mật khảu'} isPassword />
        </View>
      </View>
      <View style={{marginBottom: 50}}>
        <AppButton title="Đăng ki" color={COLOR.secondary} fontSize={18} />
      </View>
    </SafeAreaView>
  );
};

export default Register;

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
  text2: {
    fontSize: 16,
    color: 'black',
    marginBottom: 6,
  },
  text3: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
  },
  view1: {
    height: 3,
    width: '100%',
    color: 'black',
  },
  viewItem: {
    marginBottom: 16,
  },
});
