import { Keyboard, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Svg, Path, Rect } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import { appStyle, windowWidth } from '../../constants/AppStyle';
import AppInput from '../../components/AppInput';
import AppButton from '../../components/AppButton';
import { COLOR, ICON } from '../../constants/Theme';
import FastImage from 'react-native-fast-image';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { KeyboardAvoidingView } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { showToastMessage } from '../../utils/utils';
import { MotiView, MotiText } from 'moti';
import axios from 'axios';
import DismissKeyboard from '../../components/DismissKeyboard';

const Register = props => {
  const navigation = useNavigation();
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Tên không được để trống'),
    phoneNumber: Yup.string()
      .matches(/^\d{10}$/, 'Số điện thoại phải là 10 chữ số')
      .required('Số điện thoại không được để trống'),
    // .typeError('Không phải định dạng số điện thoại')
    // .positive('Số điện thoại không được có dấu trừ')
    // .integer('Số điện thoại không có dấu thập phân')
    // .required('Số điện thoại không được để trống'),
    password: Yup.string()
      .matches(
        /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]{8,}$/,
        'Mật khẩu phải có ít nhất 8 kí tự, bao gồm số và chữ',
      )
      .required('Mật khẩu không được để trống'),
    rePassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp')
      .required('Mật khẩu không được để trống'),
  });

  const handleNext = async values => {
    try {
      const phone = values.phoneNumber;
      const response = await axios.post(
        `http://103.57.129.166:3000/user/api/check-phone?phone=${values.phoneNumber}`,
      );
      const result = response.data.result;
      if (result) {
        showToastMessage('error', 'Số điện thoại đã tồn tại');
      } else {
        if (values.password === values.rePassword) {
          // console.log({
          //   phone: values.phoneNumber,
          //   name: values.name,
          //   password: values.password
          // });
          navigation.navigate('EmailCheck', {
            phone: values.phoneNumber,
            name: values.name,
            password: values.password,
          });
        } else {
          showToastMessage('error', 'Mật khẩu không khớp');
        }
      }
    } catch (error) {
      console.error('Error checking phone existence:', error);
      showToastMessage('error', 'Đã có lỗi xảy ra');
    }
  };

  // const [code, setCode] = useState('');

  // // Handle login
  // async function confirmCode() {
  //   try {
  //     await confirm.confirm(code);
  //   } catch (error) {
  //     console.log('Invalid code.');
  //   }
  // }

  const [showBottom, setShowBottom] = useState(true);
  useEffect(() => {
    // Thêm listener cho sự kiện bàn phím mở và đóng
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        // console.log('Keyboard is open');
        setShowBottom(false);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        // console.log('Keyboard is closed');
        setShowBottom(true);
      },
    );

    // Clear listener khi component unmount
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <SafeAreaView style={[appStyle.container]}>
      <DismissKeyboard>
        <Formik
          initialValues={{
            name: '',
            phoneNumber: '',
            password: '',
            rePassword: '',
          }}
          validationSchema={validationSchema}
          onSubmit={async values => {
            try {
              await handleNext(values);
            } catch (error) {
              console.error('Error during registration:', error);
              showToastMessage('error', 'Đã có lỗi xảy ra');
            }
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View
              style={[
                appStyle.main,
                { flex: 1, backgroundColor: '#023047', paddingHorizontal: 0 },
              ]}>
              <Svg
                style={{
                  flex: 1,
                  alignSelf: 'center',
                  position: 'absolute',
                  top: 30,
                }}
                xmlns="http://www.w3.org/2000/svg"
                width="319"
                height="195"
                viewBox="0 0 319 195"
                fill="none">
                <Rect x="68" y="56" width="19" height="16" fill="#175071" />
                <Rect x="54" y="151" width="19" height="16" fill="#175071" />
                <Rect x="151" y="56" width="19" height="16" fill="#175071" />
                <Rect x="237" y="72" width="19" height="16" fill="#175071" />
                <Rect x="300" y="175" width="19" height="16" fill="#175071" />
                <Rect x="300" y="56" width="19" height="16" fill="#175071" />
                <Rect y="179" width="19" height="16" fill="#175071" />
                <Rect x="10" y="87" width="19" height="16" fill="#175071" />
                <Rect x="54" width="19" height="16" fill="#175071" />
                <Rect x="260" y="124" width="19" height="16" fill="#175071" />
                <Rect x="227" y="16" width="19" height="16" fill="#175071" />
              </Svg>
              <KeyboardAvoidingView
                behavior="padding"
                style={{ height: '100%', marginTop: 20 }}>
                <View style={{ paddingHorizontal: 14 }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: windowWidth * 0.85,
                      marginBottom: 20,
                    }}>
                    <TouchableOpacity
                      style={{ marginTop: 10, marginRight: 14 }}
                      onPress={() => navigation.goBack()}>
                      <FastImage
                        source={ICON.Back}
                        tintColor={COLOR.white}
                        style={appStyle.icon}
                      />
                    </TouchableOpacity>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                      <FastImage
                        source={require('../../assets/image/logo_go_traffic.png')}
                        style={styles.image}
                        tintColor={COLOR.white}
                      />
                      {/* <Text style={styles.text1}>Đăng ký</Text> */}
                    </View>
                  </View>

                  <View style={{ marginTop: 30 }}>
                    <View style={styles.viewItem}>
                      {/* <Text style={styles.text2}>Tên hiện thị</Text> */}
                      <AppInput
                        returnKeyType={'next'}
                        textColor={COLOR.white}
                        backgroundColor={'#023047'}
                        borderColor={COLOR.white}
                        placeholderTextColor={COLOR.white}
                        placeholder={'Nhập tên hiển thị'}
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
                        value={values.name}
                      />
                    </View>
                    {touched.name && errors.name && (
                      <Text style={styles.textError}>{errors.name}</Text>
                    )}

                    <View style={styles.viewItem}>
                      <AppInput
                        keyboardType={'phone-pad'}
                        returnKeyType={'next'}
                        textColor={COLOR.white}
                        backgroundColor={'#023047'}
                        borderColor={COLOR.white}
                        placeholderTextColor={COLOR.white}
                        placeholder={'Nhập số điện thoại'}
                        onChangeText={handleChange('phoneNumber')}
                        onBlur={handleBlur('phoneNumber')}
                        value={values.phoneNumber}
                      />
                    </View>
                    {touched.phoneNumber && errors.phoneNumber && (
                      <Text style={styles.textError}>{errors.phoneNumber}</Text>
                    )}

                    <View style={styles.viewItem}>
                      <AppInput
                        returnKeyType={'done'}
                        placeholder={'Mật khẩu'}
                        textColor={COLOR.white}
                        backgroundColor={'#023047'}
                        borderColor={COLOR.white}
                        placeholderTextColor={COLOR.white}
                        isPassword
                        secureTextEntry
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        iconColor={'white'}
                      />
                    </View>
                    {touched.password && errors.password && (
                      <Text style={styles.textError}>{errors.password}</Text>
                    )}
                    <View style={styles.viewItem}>
                      <AppInput
                        returnKeyType={'done'}
                        placeholder={'Xác nhận mật khẩu'}
                        textColor={COLOR.white}
                        backgroundColor={'#023047'}
                        borderColor={COLOR.white}
                        placeholderTextColor={COLOR.white}
                        isPassword
                        secureTextEntry
                        onChangeText={handleChange('rePassword')}
                        onBlur={handleBlur('rePassword')}
                        value={values.rePassword}
                        iconColor={'white'}
                      />
                    </View>
                    {touched.rePassword && errors.rePassword && (
                      <Text style={styles.textError}>{errors.rePassword}</Text>
                    )}
                    <AppButton
                      title="Tiếp theo"
                      color={COLOR.secondary}
                      fontSize={18}
                      onPress={handleSubmit}
                      marginTop={20}
                    />
                  </View>
                </View>
                {showBottom && (
                  <Svg
                    style={{ position: 'absolute', bottom: 20, flex: 1 }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="420"
                    height="186"
                    viewBox="0 0 393 186"
                    fill="none">
                    <Path
                      d="M21.2939 0L-31 98.7526V186H450V68.0722L394.6 20.134L302.438 68.0722L250.144 0L210.277 52.732L161.607 20.134L113.455 41.2268L21.2939 0Z"
                      fill="#219EBC"
                    />
                    <Path
                      d="M-27.0323 44L-79 114.613V177H399V92.6753L343.945 58.3969L252.358 92.6753L200.391 44L160.772 81.7062L112.406 58.3969L64.5544 73.4794L-27.0323 44Z"
                      fill="#90C9E6"
                    />
                    <Path
                      d="M50.5 91L-31.5 141V188H464.5V126.5L411 101.5L322 126.5L271.5 91L233 118.5L186 101.5L139.5 112.5L50.5 91Z"
                      fill="white"
                    />
                  </Svg>
                )}
              </KeyboardAvoidingView>
            </View>
          )}
        </Formik>
      </DismissKeyboard>
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
    marginTop: 20,
  },
  text2: {
    fontSize: 16,
    color: 'white',
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
  textError: {
    color: COLOR.redOrange,
    marginBottom: 10,
    marginTop: -10,
    fontWeight: '500',
  },
});
