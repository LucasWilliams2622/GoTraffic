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
import AxiosInstance from '../../constants/AxiosInstance';
import {showToastMessage} from '../../utils/utils';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

const EmailCheck = props => {
  const {phoneNumber, nameUser} = props.route.params;
  const navigation = useNavigation();
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Vui lòng nhập email hợp lệ ')
      .max(255)
      .required('Email không được để trống'),
  });
  return (
    <SafeAreaView style={appStyle.container}>
      <Formik
        initialValues={{
          email: '',
        }}
        validationSchema={validationSchema}
        onSubmit={values => {
          console.log(values);
          navigation.navigate('VerifiedEmail', {
            phoneNumber: phoneNumber,
            nameUser: nameUser,
            email: values.email,
          });
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

              <View style={styles.viewItem}>
                <Text style={styles.text2}>Email</Text>
                <AppInput
                  returnKeyType={'next'}
                  placeholder={'Nhập email của bạn'}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
              </View>

              {touched.email && errors.email && (
                <Text style={styles.textError}>{errors.email}</Text>
              )}
              <AppButton
                title="Tiếp theo"
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

export default EmailCheck;

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
