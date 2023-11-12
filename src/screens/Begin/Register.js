import {
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {appStyle} from '../../constants/AppStyle';
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

const Register = props => {
  const {navigation} = props;
  const goBack = () => {
    navigation.goBack('Login');
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Vui lòng nhập email hợp lệ ')
      .max(255)
      .required('Email không được để trống'),
    name: Yup.string().required('Tên không được để trống'),
    phoneNumber: Yup.number()
      .typeError('Không phải định dạng số điện thoại')
      .positive('Số điện thoại không được có dấu trừ')
      .integer('Số điện thoại không có dấu thập phân')
      .required('Số điện thoại không được để trống'),
    password: Yup.string()
      .required('Mật khẩu không được để trống')
      .min(8, 'Mật khẩu quá ngắn ít nhất phải 8 kí tự')
      .matches(/[a-zA-Z]/, 'Mật khẩu chỉ chứa các chữ các latinh'),
    rePassword: Yup.string()
      .required('Mật khẩu không được để trống')
      .min(8, 'Mật khẩu quá ngắn ít nhất phải 8 kí tự')
      .matches(/[a-zA-Z]/, 'Mật khẩu chỉ chứa các chữ các latinh'),
  });
  const [phoneNumber, setphoneNumber] = useState('');
  const [password, setpassword] = useState('');
  const [nameUser, setnameUser] = useState('');
  const [email, setemail] = useState('');

  //API REGISTER
  const onRegister = async () => {
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
      } else {
        showToastMessage(
          '',
          'Đăng kí thất bại',
          ICON.cancelWhite,
        );
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <SafeAreaView style={appStyle.container}>
      <Formik
        initialValues={{
          name: '',
          phoneNumber: '',
          email: '',
          password: '',
          rePassword: '',
        }}
        validationSchema={validationSchema}
        onSubmit={values => {
          console.log(values);
          setnameUser(values.name);
          setphoneNumber(values.phoneNumber);
          setemail(values.email);
          setpassword(values.password);
          if (values.password === values.rePassword) {
            onRegister();
          } else {
            showToastMessage('', 'Mật khẩu không khớp', ICON.cancelWhite);
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
          <View style={[appStyle.main, {justifyContent: 'space-evenly'}]}>
            <KeyboardAvoidingView behavior="padding">
              <TouchableOpacity onPress={goBack}>
                <FastImage
                  source={require('../../assets/icon/ic_left.png')}
                  style={{
                    position: 'absolute',
                    left: 5,
                    top: 5,
                    width: 30,
                    height: 30,
                  }}
                />
              </TouchableOpacity>
              <FastImage
                source={require('../../assets/image/logo_go_traffic.png')}
                style={styles.image}
              />
              <Text style={styles.text1}>Đăng kí</Text>
              <View style={styles.view1}></View>

              <View style={styles.viewItem}>
                <Text style={styles.text2}>Tên hiện thị</Text>
                <AppInput
                  returnKeyType={'next'}
                  placeholder={'Nhập tên của bạn'}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                />
              </View>
              {touched.name && errors.name && (
                <Text style={styles.textError}>{errors.name}</Text>
              )}

              <View style={styles.viewItem}>
                <Text style={styles.text2}>Số điện thoại</Text>
                <AppInput
                  keyboardType={'phone-pad'}
                  returnKeyType={'next'}
                  placeholder={'Nhập số điện thoại của bạn'}
                  onChangeText={handleChange('phoneNumber')}
                  onBlur={handleBlur('phoneNumber')}
                  value={values.phoneNumber}
                />
              </View>

              {touched.phoneNumber && errors.phoneNumber && (
                <Text style={styles.textError}>{errors.phoneNumber}</Text>
              )}
              <View style={styles.viewItem}>
                <Text style={styles.text2}>Email</Text>
                <AppInput
                  returnKeyType={'next'}
                  placeholder={'Nhập email cua ban'}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
              </View>

              {touched.email && errors.email && (
                <Text style={styles.textError}>{errors.email}</Text>
              )}

              <View style={styles.viewItem}>
                <Text style={styles.text2}>Mật khẩu</Text>
                <AppInput
                  returnKeyType={'next'}
                  placeholder={'Nhập mật khảu'}
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
                  placeholder={'Xác nhận lại mật khẩu'}
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
                marginBottom={20}
              />
            </KeyboardAvoidingView>
          </View>
        )}
      </Formik>
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
  textError: {
    color: COLOR.red,
    marginBottom: 10,
    marginTop: -10,
  },
});
