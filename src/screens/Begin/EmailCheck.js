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
import {KeyboardAvoidingView} from 'native-base';
import {showToastMessage} from '../../utils/utils';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import DismissKeyboard from '../../components/DismissKeyboard';
import {HStack, Heading, Spinner} from 'native-base';

const EmailCheck = props => {
  const {name, password, phone} = props.route.params;
  const navigation = useNavigation();
  const [emailError, setEmailError] = useState('');
  const [forgotEmail, setForgotEmail] = useState('');
  const [verifyCode, setVerifyCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  //API VERIFIED EMAIL
  const handleEmailChange = email => {
    setForgotEmail(email);
    const formatEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!formatEmail.test(email)) {
      setEmailError('Email không hợp lệ');
    } else {
      setEmailError('');
    }
  };
  const handleVerifyEmail = async () => {
    try {
      const checkEmail = await axios.post(
        'http://103.57.129.166:3000/user/api/check-email?email=' + forgotEmail,
      );
      if (checkEmail.data.result) {
        showToastMessage('error', 'Email đã tồn tại');
        setIsLoading(false);
      } else {
        onRegister(name, phone, forgotEmail, password);
      }
    } catch (error) {
      console.log(e);
    }
  };
  const handleEmailCheck = () => {
    if (!emailError && forgotEmail.trim() !== '') {
      setIsLoading(true);
      setTimeout(() => {
        handleVerifyEmail();
      }, 1000);
    } else {
      setEmailError('Email không được để trống');
      setIsLoading(false);
    }
  };

  //API VERIFIED CODE
  const handleVerifyCode = async () => {
    try {
      if (verifyCode.length == 0) {
        showToastMessage('error', 'Vui lòng nhập mã xác thực');
      } else {
        const response = await axios.post(
          'http://103.57.129.166:3000/user/api/verify-email',
          {
            email: forgotEmail,
            verifyCode: verifyCode,
          },
        );
        if (response.data.result) {
          // showToastMessage('', 'Xác thực thành công');
          showToastMessage('', 'Đăng kí thành công');
          navigation.navigate('Login', {phoneRegist: phone});
        } else {
          showToastMessage('error', 'Mã xác thực không chính xác');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  //API REGISTER
  const onRegister = async (name, phone, forgotEmail, password) => {
    try {
      const response = await axios.post(
        'http://103.57.129.166:3000/user/api/register',
        {
          name: name,
          phone: phone,
          email: forgotEmail,
          password: password,
        },
      );
      if (response.data.result) {
        const responseCode = await axios.post(
          `http://103.57.129.166:3000/user/api/send-verification-code?email=${forgotEmail}`,
        );

        if (responseCode.data.result) {
          showToastMessage('', 'Đã gửi mã xác thực');
          setIsLoading(null);
        } else {
          showToastMessage('', 'Gửi mã xác thực thất bại');
        }
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
    <SafeAreaView style={appStyle.container}>
      <DismissKeyboard>
        <View style={[styles.main]}>
          <TouchableOpacity
            style={{marginVertical: 20, marginLeft: 8}}
            onPress={() => navigation.goBack()}>
            <FastImage source={ICON.Back} style={appStyle.iconBig} />
          </TouchableOpacity>

          <KeyboardAvoidingView behavior="padding">
            <View style={{paddingHorizontal: 14}}>
              <Text style={[appStyle.text24Bold, {color: COLOR.fifth}]}>
                Xác thực email để bảo vệ tài khoản của bạn
              </Text>
              <View style={styles.viewItem}>
                <AppInput
                  placeholder={'Nhập email của tài khoản'}
                  onChangeText={handleEmailChange}
                  value={forgotEmail}
                />
                {emailError ? (
                  <Text style={[styles.textError, {marginTop: 10}]}>
                    {emailError}
                  </Text>
                ) : null}
              </View>
              {isLoading == false ? (
                <AppButton
                  title="Nhận mã"
                  color={COLOR.secondary}
                  fontSize={16}
                  onPress={handleEmailCheck}
                  marginTop={5}
                />
              ) : isLoading == true ? (
                <View>
                  <HStack
                    space={2}
                    justifyContent="center"
                    style={{
                      backgroundColor: 'white',
                      padding: 20,
                      width: 'auto',
                      borderWidth: 1,
                      borderColor: COLOR.primary,
                    }}>
                    <Spinner accessibilityLabel="Loading posts" />
                    <Heading color="primary.500" fontSize="md">
                      Loading
                    </Heading>
                  </HStack>
                </View>
              ) : null}
            </View>
          </KeyboardAvoidingView>

          <View style={styles.inputCode}>
            <TextInput
              placeholder="Nhập mã"
              style={styles.code}
              onChangeText={code => setVerifyCode(code)}></TextInput>
            <TouchableOpacity
              style={styles.btnCode}
              onPress={() => handleVerifyCode()}>
              <Text
                style={[
                  appStyle.text165,
                  {alignSelf: 'center', color: 'white'},
                ]}>
                Xác nhận
              </Text>
            </TouchableOpacity>
          </View>
          {showBottom && (
            <Svg
              style={{flex: 1, position: 'absolute', bottom: 0, zIndex: -1}}
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
        </View>
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
    width: '93%',
    height: windowHeight * 0.07,
    borderRadius: 6,
    marginTop: 15,
    marginHorizontal: 14,
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
    backgroundColor: COLOR.primary,
    borderRadius: 8,
  },
});
