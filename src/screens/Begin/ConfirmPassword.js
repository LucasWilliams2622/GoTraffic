import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {appStyle, windowWidth} from '../../constants/AppStyle';
import AppInput from '../../components/AppInput';
import AppButton from '../../components/AppButton';
import {COLOR, ICON} from '../../constants/Theme';
import FastImage from 'react-native-fast-image';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {KeyboardAvoidingView} from 'native-base';

import {showToastMessage} from '../../utils/utils';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

const ConfirmPassword = props => {
  const {phoneNumber, nameUser, email} = props.route.params;
  const navigation = useNavigation();
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required('Mật khẩu không được để trống')
      .min(6, 'Mật khẩu quá ngắn ít nhất phải 6 kí tự'),
    rePassword: Yup.string()
      .required('Mật khẩu không được để trống')
      .min(6, 'Mật khẩu quá ngắn ít nhất phải 6 kí tự'),
  });
  //API REGISTER
  const onRegister = async (nameUser, phoneNumber, email, password) => {
    try {
      const response = await axios.post(
        'http://103.57.129.166:3000/user/api/register',
        {
          email: email,
          phone: phoneNumber.toString(),
          password: password,
          name: nameUser,
        },
      );
      console.log(response.data);
      if (response.data.result) {
        showToastMessage('', 'Đăng kí thành công');
        navigation.navigate('Login');
      } else {
        showToastMessage('error', 'Đăng kí thất bại');
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <SafeAreaView style={appStyle.container}>
      <Formik
        initialValues={{
          password: '',
          rePassword: '',
        }}
        validationSchema={validationSchema}
        onSubmit={values => {
          console.log(values);
          if (values.password === values.rePassword) {
            onRegister(nameUser, phoneNumber, email, values.password);
          } else {
            showToastMessage('error', 'Mật khẩu không khớp');
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
          <View style={[appStyle.main, {}]}>
            <KeyboardAvoidingView behavior="padding">
              <View
                style={{
                  flexDirection: 'row',
                  width: windowWidth * 0.85,
                  marginBottom: 20,
                }}>
                <TouchableOpacity
                  style={{marginTop: 10, marginRight: 14}}
                  onPress={() => navigation.goBack()}>
                  <FastImage source={ICON.Back} style={appStyle.icon} />
                </TouchableOpacity>
                <View style={{flex: 1, alignItems: 'center'}}>
                  <FastImage
                    source={require('../../assets/image/logo_go_traffic.png')}
                    style={styles.image}
                  />
                  <Text style={styles.text1}>Đăng ký</Text>
                </View>
              </View>

              {touched.email && errors.email && (
                <Text style={styles.textError}>{errors.email}</Text>
              )}

              <View style={styles.viewItem}>
                <Text style={styles.text2}>Mật khẩu</Text>
                <AppInput
                  returnKeyType={'next'}
                  placeholder={'Nhập mật khẩu'}
                  isPassword
                  secureTextEntry
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                />
              </View>
              {touched.password && errors.password && (
                <Text style={styles.textError}>{errors.password}</Text>
              )}
              <View style={styles.viewItem}>
                <Text style={styles.text2}>Xác nhận lại mật khẩu</Text>
                <AppInput
                  returnKeyType={'done'}
                  placeholder={'Xác nhận mật khẩu'}
                  isPassword
                  secureTextEntry
                  onChangeText={handleChange('rePassword')}
                  onBlur={handleBlur('rePassword')}
                  value={values.rePassword}
                />
              </View>
              {touched.rePassword && errors.rePassword && (
                <Text style={styles.textError}>{errors.rePassword}</Text>
              )}
              <AppButton
                title="Đăng kí"
                color={COLOR.secondary}
                fontSize={18}
                onPress={handleSubmit}
                marginTop={20}
              />
            </KeyboardAvoidingView>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default ConfirmPassword;

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
    marginTop: 10,
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
  textError: {
    color: COLOR.red,
    marginBottom: 10,
    marginTop: -10,
  },
});
