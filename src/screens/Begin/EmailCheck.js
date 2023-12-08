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
import OTPInputView from '@twotalltotems/react-native-otp-input';

const EmailCheck = props => {
  const {phoneNumber, nameUser, password} = props.route.params;
  console.log(phoneNumber,nameUser,password);
  const navigation = useNavigation();
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Vui lòng nhập email hợp lệ ')
      .max(255)
      .required('Email không được để trống'),
  });
  const [checkEnable, setCheckEnable] = useState(false);
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
          email: '',
        }}
        validationSchema={validationSchema}
        onSubmit={values => {
          console.log(values);
          onRegister(nameUser, phoneNumber, values.email, password);
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
              <View>
                <Text
                  style={[appStyle.text14, {marginTop: 20, lineHeight: 16}]}>
                  Bạn có thể bỏ qua bước xác thực email và sau này có thể vào
                  mục cá nhân để xác thực sau! Còn nếu bạn muốn xác thực email
                  ngay vui lòng bấm{' '}
                  <Text
                    onPress={() => {
                      setCheckEnable(true);
                    }}
                    style={[
                      appStyle.text14Bold,
                      {color: COLOR.fifth, lineHeight: 20},
                    ]}>
                    Gửi mã ngay
                  </Text>
                </Text>
              </View>
              {checkEnable == true ? (
                <OTPInputView
                  style={{width: '80%', height: 200, alignSelf: 'center'}}
                  pinCount={4}
                  // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                  // onCodeChanged = {code => { this.setState({code})}}
                  autoFocusOnLoad
                  codeInputFieldStyle={styles.underlineStyleBase}
                  codeInputHighlightStyle={styles.underlineStyleHighLighted}
                  onCodeFilled={code => {
                    console.log(`Code is ${code}, you are good to go!`);
                  }}
                />
              ) : null}
              <AppButton
                title="Đăng ký"
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
  borderStyleBase: {
    width: 40,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },
  underlineStyleBase: {
    borderColor: COLOR.black,
  },

  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
  },
});
