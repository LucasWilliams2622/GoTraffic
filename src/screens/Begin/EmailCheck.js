import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {appStyle, windowHeight, windowWidth} from '../../constants/AppStyle';
import {Svg, Path, Rect} from 'react-native-svg';
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
import DismissKeyboard from '../../components/DismissKeyboard';

const EmailCheck = props => {
  const {phoneNumber, nameUser, password} = props.route.params;
  console.log(phoneNumber, nameUser, password);
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

  const [showBottom, setShowBottom] = useState(true);
  useEffect(() => {
    // Thêm listener cho sự kiện bàn phím mở và đóng
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        console.log('Keyboard is open');
        setShowBottom(false);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        console.log('Keyboard is closed');
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
    <SafeAreaView style={appStyle.container}>
      <DismissKeyboard>
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
            <View style={[styles.main]}>
              <KeyboardAvoidingView behavior="padding" style={{height: '100%'}}>
                <TouchableOpacity
                  style={{marginVertical: 20, marginLeft: 8}}
                  onPress={() => navigation.goBack()}>
                  <FastImage source={ICON.Back} style={appStyle.iconBig} />
                </TouchableOpacity>

                <View style={{paddingHorizontal: 14}}>
                  <Text style={[appStyle.text24Bold, {color: COLOR.fifth}]}>
                    Xác thực email để bảo vệ tài khoản của bạn
                  </Text>
                  <View style={styles.viewItem}>
                    {/* <Text style={styles.text2}>Email</Text> */}
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
                  {/* <View>
                <Text
                  style={[appStyle.text14, { marginTop: 20, lineHeight: 16 }]}>
                  Bạn có thể bỏ qua bước xác thực email và sau này có thể vào
                  mục cá nhân để xác thực sau! Còn nếu bạn muốn xác thực email
                  ngay vui lòng bấm{' '}
                  <Text
                    onPress={() => {
                      setCheckEnable(true);
                    }}
                    style={[
                      appStyle.text14Bold,
                      { color: COLOR.fifth, lineHeight: 20 },
                    ]}>
                    Gửi mã ngay
                  </Text>
                </Text>
              </View> */}
                  {/* {checkEnable == true ? (
                  <OTPInputView
                    style={{ width: '80%', height: 200, alignSelf: 'center' }}
                    pinCount={4}
                    autoFocusOnLoad
                    codeInputFieldStyle={styles.underlineStyleBase}
                    codeInputHighlightStyle={styles.underlineStyleHighLighted}
                    onCodeFilled={code => {
                      console.log(`Code is ${code}, you are good to go!`);
                    }}
                  />
                ) : null} */}

                  <AppButton
                    title="Nhận mã"
                    color={COLOR.secondary}
                    fontSize={16}
                    onPress={handleSubmit}
                    marginTop={5}
                  />
                  <View style={styles.inputCode}>
                    <TextInput
                      placeholder="Nhập mã"
                      style={styles.code}></TextInput>
                    <TouchableOpacity style={styles.btnCode}>
                      <Text
                        style={[
                          appStyle.text165,
                          {alignSelf: 'center', color: 'white'},
                        ]}>
                        Xác nhận
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {showBottom && (
                  <Svg
                    style={{
                      flex: 1,
                      position: 'absolute',
                      bottom: 0,
                      zIndex: -1,
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="420"
                    height="186"
                    viewBox="0 0 393 186"
                    fill="none">
                    <Path
                      d="M35.5544 0L-15 98.7526V186H450V68.0722L396.442 20.134L307.347 68.0722L256.792 0L218.251 52.732L171.2 20.134L124.65 41.2268L35.5544 0Z"
                      fill="#90C9E6"
                    />
                    <Path
                      d="M-27.0323 44L-79 114.613V177H399V92.6753L343.945 58.3969L252.358 92.6753L200.391 44L160.772 81.7062L112.406 58.3969L64.5544 73.4794L-27.0323 44Z"
                      fill="#219EBC"
                    />
                    <Path
                      d="M54.5985 89L-27.5 157L-34 186H494V124.5L437.217 99.5L342.757 124.5L289.158 89L248.296 116.5L198.412 99.5L149.059 110.5L54.5985 89Z"
                      fill="#023047"
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
    marginTop: 30,
    marginBottom: 10,
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
  main: {
    flex: 1,
    backgroundColor: COLOR.main,
    // paddingHorizontal: 14,
  },
  inputCode: {
    width: '100%',
    height: windowHeight * 0.07,
    borderRadius: 6,
    marginTop: 15,
    borderWidth: 0.8,
    borderColor: COLOR.borderColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  code: {
    width: windowWidth * 0.5,
    height: windowHeight * 0.06,
    fontSize: 16,
  },
  btnCode: {
    width: windowWidth * 0.22,
    height: windowHeight * 0.05,
    justifyContent: 'center',
    backgroundColor: COLOR.fifth,
    borderRadius: 8,
  },
});
