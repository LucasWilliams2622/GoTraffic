import {KeyboardAvoidingView, StyleSheet, Text, View} from 'react-native';
import {Svg, Path, Rect} from 'react-native-svg';
import React, {useState, useContext, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppInput from '../../components/AppInput';
import {appStyle, windowHeight} from '../../constants/AppStyle';
import AppButton from '../../components/AppButton';
import {COLOR, ICON} from '../../constants/Theme';
import FastImage from 'react-native-fast-image';
import {BottomSheet} from 'react-native-btr';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {AppContext} from '../../utils/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {showToastMessage} from '../../utils/utils';
import DismissKeyboard from '../../components/DismissKeyboard';
import {useNavigation} from '@react-navigation/native';
import {HStack, Heading, Spinner} from 'native-base';
const Login = props => {
  const {isLogin, setIsLogin, setInfoUser, setIdUser, idUser} =
    useContext(AppContext);
  const [phoneRegist, setphoneRegist] = useState(
    props.route.params ? props.route.params : '',
  );
  const navigation = useNavigation();

  const goRegister = () => {
    navigation.navigate('Register');
  };
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [phoneNumber, setphoneNumber] = useState('');
  const [password, setpassword] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [forgotEmail, setForgotEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const toggleBottomNavigationView = () => {
    setVisible(!visible);
  };
  const toggleBottomNavigationView2 = () => {
    setVisible2(!visible2);
  };
  const validationSchema = Yup.object().shape({
    phoneNumber: Yup.number()
      .typeError('Không phải định dạng số điện thoại')
      .positive('Số điện thoại không được có dấu trừ')
      .integer('Số điện thoại không có dấu thập phân')
      .required('Số điện thoại không được để trống'),
    password: Yup.string().required('Mật khẩu không được để trống'),
    // .min(5, 'Mật khẩu quá ngắn ít nhất phải 8 kí tự')
    // .matches(/[a-zA-Z]/, 'Mật khẩu chỉ chứa các chữ các latinh'),
    // email: Yup.string()
    //   .matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, 'Email không hợp lệ')
    //   .required('Email không được để trống'),
  });

  //API login
  const onLogin = async (phoneNumber, password) => {
    try {
      console.log(phoneNumber, password);
      const response = await axios.post(
        'http://103.57.129.166:3000/user/api/login',
        {
          phone: phoneNumber,
          password: password,
        },
      );
      // console.log('LOGIN INFO', response.status);
      if (response.status === 202) {
        showToastMessage('error', 'Tài khoản bị vô hiệu hóa');
        setIsLoading(false);
      } else if (response.status === 203) {
        showToastMessage('error', 'Tài khoản sai mật khẩu');
        setIsLoading(false);
      } else if (response.status === 204) {
        showToastMessage('error', 'Tài khoản không tồn tại');
        setIsLoading(false);
      } else {
        setIdUser(response['data'].user.id);
        setInfoUser(response['data'].user);
        saveLoginInfo(response['data'].user);
      }
    } catch (e) {
      console.log(e);
    }
  };

  //API forgotPassword
  const handleEmailChange = email => {
    setForgotEmail(email);
    const formatEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!formatEmail.test(email)) {
      setEmailError('Email không hợp lệ');
    } else {
      setEmailError('');
    }
  };
  const onForgotPassword = async () => {
    try {
      const checkEmail = await axios.post(
        'http://103.57.129.166:3000/user/api/check-email',
        {
          email: forgotEmail,
        },
      );
      if (checkEmail.status === 200) {
        const response = await axios.put(
          'http://103.57.129.166:3000/user/api/forgot-password',
          {
            email: forgotEmail,
          },
        );
        if (response.data.result) {
          showToastMessage('', 'Gửi mật khẩu mới thành công');
          setVisible(false);
        } else {
          showToastMessage('error', 'Gửi mật khẩu mới thất bại');
        }
      } else {
        showToastMessage('error', 'Email không tồn tại');
        setVisible(false);
      }
    } catch (error) {
      console.log(e);
    }
  };

  const handleForgotPassword = () => {
    if (!emailError && forgotEmail.trim() !== '') {
      onForgotPassword();
    } else {
      setEmailError('Email không được để trống');
      //showToastMessage('error', 'Vui lòng nhập một email hợp lệ');
    }
  };

  // Hàm lưu thông tin đăng nhập vào AsyncStorage
  const saveLoginInfo = async userInfo => {
    try {
      await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
      setIsLogin(true);
      showToastMessage('', 'Ðăng nhập thành công !');
      console.log('Thông tin đăng nhập đã được lưu.');
    } catch (error) {
      console.log('Lỗi khi lưu thông tin đăng nhập:', error);
    }
  };

  // Hàm kiểm tra thông tin đăng nhập đã tồn tại trong AsyncStorage hay chưa
  const checkLoginInfo = async () => {
    try {
      const userInfo = await AsyncStorage.getItem('userInfo');
      console.log('=================| Start checkLoginInfo |================');

      if (userInfo !== null) {
        const parsedUserInfo = JSON.parse(userInfo);
        setIdUser(parsedUserInfo.id);
        setInfoUser(parsedUserInfo);
        if (!isLogin) {
          setIsLogin(true);
        }
        console.log('Thông tin đăng nhập đã tồn tại:', parsedUserInfo);
      } else {
        console.log('Không tìm thấy thông tin đăng nhập.');
      }
    } catch (error) {
      console.log('Lỗi khi kiểm tra thông tin đăng nhập:', error);
    }
  };

  useEffect(() => {
    checkLoginInfo();
  }, [idUser]);

  return (
    <SafeAreaView style={appStyle.container}>
      <DismissKeyboard>
        <View style={styles.main}>
          <Svg
            style={{
              flex: 1,
              alignSelf: 'center',
              position: 'absolute',
              top: 30,
            }}
            xmlns="http://www.w3.org/2000/svg"
            width="400"
            height="266"
            viewBox="0 0 319 266"
            fill="none">
            <Rect x="48" y="140" width="19" height="16" fill="#E2F0F4" />
            <Rect x="65" y="64" width="19" height="16" fill="#E2F0F4" />
            <Rect x="128" y="39" width="19" height="16" fill="#E2F0F4" />
            <Rect x="188" y="124" width="19" height="16" fill="#E2F0F4" />
            <Rect x="300" y="175" width="19" height="16" fill="#E2F0F4" />
            <Rect x="300" y="56" width="19" height="16" fill="#E2F0F4" />
            <Rect y="179" width="19" height="16" fill="#E2F0F4" />
            <Rect y="64" width="19" height="16" fill="#E2F0F4" />
            <Rect x="54" width="19" height="16" fill="#E2F0F4" />
            <Rect x="260" y="242" width="19" height="16" fill="#E2F0F4" />
            <Rect x="29" y="250" width="19" height="16" fill="#E2F0F4" />
            <Rect x="260" y="124" width="19" height="16" fill="#E2F0F4" />
            <Rect x="227" y="16" width="19" height="16" fill="#E2F0F4" />
          </Svg>
          <View style={{marginTop: 70}}>
            <FastImage
              source={require('../../assets/image/logo_go_traffic.png')}
              style={styles.image}
            />
            <Text style={styles.text1}>Chào mừng đến với GoTraffic</Text>
            <Text style={[styles.text1, {marginBottom: 30}]}>
              Đăng nhập ngay!
            </Text>
            <Formik
              initialValues={{
                phoneNumber: phoneRegist,
                password: '',
              }}
              validationSchema={validationSchema}
              onSubmit={values => {
                setIsLoading(true);
                setTimeout(() => {
                  onLogin(values.phoneNumber, values.password);
                }, 1000);
              }}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <KeyboardAvoidingView
                  behavior="padding"
                  style={{height: '73%'}}>
                  <View style={{paddingHorizontal: 14}}>
                    <View>
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
                    </View>
                    {touched.phoneNumber && errors.phoneNumber && (
                      <Text style={styles.textError}>{errors.phoneNumber}</Text>
                    )}

                    <View>
                      <View style={styles.viewItem}>
                        <Text style={styles.text2}>Mật khẩu</Text>
                        <AppInput
                          returnKeyType={'done'}
                          placeholder={'Nhập mật khẩu'}
                          isPassword
                          secureTextEntry
                          onChangeText={handleChange('password')}
                          onBlur={handleBlur('password')}
                          value={values.password}
                        />
                      </View>
                    </View>
                    {touched.password && errors.password && (
                      <Text style={styles.textError}>{errors.password}</Text>
                    )}

                    <Text
                      style={styles.text3}
                      onPress={() => {
                        toggleBottomNavigationView();
                      }}>
                      Quên mật khẩu
                    </Text>

                    {isLoading == false ? (
                      <AppButton
                        title="Đăng nhập"
                        color={COLOR.secondary}
                        fontSize={18}
                        onPress={handleSubmit}
                      />
                    ) : (
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
                    )}

                    <View style={{marginTop: 20, alignItems: 'center'}}>
                      <Text style={appStyle.text14}>
                        Bạn chưa là thành viên?
                      </Text>
                      <Text
                        style={appStyle.text16Bold}
                        onPress={() => {
                          goRegister();
                        }}>
                        Hãy đăng ký
                      </Text>
                    </View>
                  </View>

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
                </KeyboardAvoidingView>
              )}
            </Formik>
          </View>
        </View>
      </DismissKeyboard>
      {/*Bottom Sheet FORGOT PASSWORD*/}
      <BottomSheet
        visible={visible}
        onBackButtonPress={toggleBottomNavigationView}
        onBackdropPress={toggleBottomNavigationView}>
        <View style={styles.bottomNavigationView}>
          <View style={{flex: 1, justifyContent: 'space-between'}}>
            {/* <Formik
              initialValues={{ email: '' }}
              validationSchema={validationSchema}
              onSubmit={(values) =>{
                testClick(values.email);
              }}
              // onSubmit={(values) => {
              //   // Thực hiện kiểm tra và gọi hàm testClick
                
              //     testClick(values.email);
                
              // }}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => ( */}
            <View>
              <Text style={appStyle.text16Bold}>Quên mật khẩu</Text>
              <Text
                style={[appStyle.text14, {marginBottom: 10, marginTop: 10}]}>
                Nhập email của bạn để thực hiện quá trình xác minh, chúng tôi sẽ
                gửi mật khẩu mới qua gmail của bạn.
              </Text>
              <AppInput
                placeholder={'Nhập email của tài khoản'}
                onChangeText={handleEmailChange}
                value={forgotEmail}
                // onChangeText={handleChange('email')}
                // onBlur={handleBlur('email')}
                // value={values.email}
              />
              {emailError ? (
                <Text style={[styles.textError, {marginTop: 10}]}>
                  {emailError}
                </Text>
              ) : null}

              <AppButton
                title="Tiếp tục"
                color={COLOR.secondary}
                fontSize={18}
                marginTop={30}
                onPress={handleForgotPassword}
                // onPress={() => {
                //   //setVisible(false);
                //   //onForgotPassword();
                //  testClick();

                // }}
              />
            </View>
            {/* )}
            </Formik> */}
          </View>
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  text1: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
    //marginBottom: 10,
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
    marginBottom: 50,
    textAlign: 'center',
  },
  text5: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  view1: {
    height: 0.5,
    width: '100%',
    backgroundColor: COLOR.borderColor2,
    marginBottom: 16,
  },
  viewItem: {
    marginBottom: 16,
  },
  button: {
    width: '48%',
    height: 45,
    borderColor: COLOR.borderColor2,
    borderWidth: 1,
    borderRadius: 10,
    textAlign: 'center',
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemLoginSocial: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomNavigationView: {
    backgroundColor: '#fff',
    width: '100%',
    height: windowHeight * 0.36,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  text1InBottomSheet: {
    fontSize: 18,
    color: '#023047',
    marginBottom: 10,
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
  textError: {
    color: COLOR.red,
    marginBottom: 10,
    marginTop: -10,
  },
  main: {
    flex: 1,
    backgroundColor: COLOR.main,
    // paddingHorizontal: 14,
  },
});
