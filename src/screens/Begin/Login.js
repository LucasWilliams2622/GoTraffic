import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppInput from '../../components/AppInput';
import {appStyle, windowHeight} from '../../constants/AppStyle';
import AppButton from '../../components/AppButton';
import {COLOR, ICON} from '../../constants/Theme';
import FastImage from 'react-native-fast-image';
import {Center} from 'native-base';
import {BottomSheet} from 'react-native-btr';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import * as Yup from 'yup';
import {Formik, useFormik} from 'formik';
import {AppContext} from '../../utils/AppContext';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import AxiosInstance from '../../constants/AxiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import {showToastMessage} from '../../utils/utils';

const Login = props => {
  console.log('TestLogin');
  const {isLogin, setIsLogin, setInfoUser, setIdUser, idUser} =
    useContext(AppContext);
  const {navigation} = props;

  const goRegister = () => {
    navigation.navigate('Register');
  };
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [phoneNumber, setphoneNumber] = useState('');
  const [password, setpassword] = useState('');
  const [email, setEmail] = useState('');

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
  });

  //API login
  const onLogin = async () => {
    try {
      console.log(phoneNumber, password);
      const response = await axios.post(
        'http://103.57.129.166:3000/user/api/login',
        {
          phone: phoneNumber,
          password: password,
        },
      );
      console.log(response['data']);
      if (response.data.result) {
        setIdUser(response['data'].user.id);
        setInfoUser(response['data'].user);
        saveLoginInfo(response['data'].user);
        setIsLogin(true);
        // Toast.show({
        //   type: 'success',
        //   text1: 'Ðăng nhập thành công !',
        //   visibilityTime: 2000,
        //   autoHide: true,
        //   topOffset: 30,
        //   bottomOffset: 40,
        // });

        showToastMessage('', 'Ðăng nhập thành công !');
      } else {
        showToastMessage(
          '',
          'Tên đăng nhập hoặc mật khẩu không đúng',
          ICON.cancelWhite,
        );
      }
    } catch (e) {
      showToastMessage(
        '',
        'Tên đăng nhập hoặc mật khẩu không đúng',
        ICON.cancelWhite,
      );
      console.log(e);
    }
  };

  //API forgotPassword
  const onForgotPassword = async () => {
    try {
      console.log(email);
      const response = await axios.put(
        'http://103.57.129.166:3000/user/api/forgot-password',
        {
          email: email,
        },
      );
      console.log(response.data);
      if (response.data.result) {
        showToastMessage('', 'Gửi mật khẩu mới thành công');
      } else {
        showToastMessage('', 'Gửi mật khẩu mới thất bại', ICON.cancelWhite);
      }
    } catch (e) {
      console.log(e);
    }
  };
  // Hàm lưu thông tin đăng nhập vào AsyncStorage
  const saveLoginInfo = async userInfo => {
    try {
      console.log('userInfo', userInfo.avatar);
      await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
      console.log('Thông tin đăng nhập đã được lưu.');
    } catch (error) {
      console.log('Lỗi khi lưu thông tin đăng nhập:', error);
    }
  };

  // Hàm kiểm tra thông tin đăng nhập đã tồn tại trong AsyncStorage hay chưa
  const checkLoginInfo = async () => {
    try {
      const userInfo = await AsyncStorage.getItem('userInfo');
      console.log('Start checkLoginInfo');

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
    console.log('checkLoginInfo');
    checkLoginInfo();
  }, [idUser]);

  return (
    <SafeAreaView style={appStyle.container}>
      <View style={[appStyle.main, {justifyContent: 'space-evenly'}]}>
        <View style={{marginTop: -100}}>
          <FastImage
            source={require('../../assets/image/logo_go_traffic.png')}
            style={styles.image}
          />
          <Text style={styles.text1}>Đăng nhập</Text>

          <Formik
            initialValues={{phoneNumber: '', password: ''}}
            validationSchema={validationSchema}
            onSubmit={values => {
              console.log(values.phoneNumber);
              console.log(values.password);
              setphoneNumber(values.phoneNumber);
              setpassword(values.password);
              onLogin();
            }}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View>
                <KeyboardAvoidingView behavior="padding">
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
                        placeholder={'Nhập mật khảu'}
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
                    <Text
                      style={{fontWeight: 'bold'}}
                      onPress={() => {
                        goRegister();
                      }}>
                      {' '}
                      Hãy đăng ký
                    </Text>
                  </Text>
                  <AppButton
                    title="Đăng nhập"
                    color={COLOR.secondary}
                    fontSize={18}
                    onPress={handleSubmit}
                  />
                </KeyboardAvoidingView>
              </View>
            )}
          </Formik>
        </View>
      </View>

      {/*Bottom Sheet FORGOT PASSWORD*/}
      <BottomSheet
        visible={visible}
        onBackButtonPress={toggleBottomNavigationView}
        onBackdropPress={toggleBottomNavigationView}>
        <View style={styles.bottomNavigationView}>
          <View style={{flex: 1, justifyContent: 'space-between'}}>
            <View>
              <Text style={appStyle.text16Bold}>Quên mật khẩu</Text>
              <Text
                style={[appStyle.text14, {marginBottom: 10, marginTop: 10}]}>
                Nhập email của bạn để thực hiện quá trình xác minh, chúng tôi sẽ
                gửi mật khẩu mới qua gmail của bạn.
              </Text>
              <AppInput
                placeholder={'Nhập email của tài khoản'}
                onChangeText={email => [setEmail(email)]}
                value={email}
              />
            </View>
          </View>
          <AppButton
            title="Tiếp tục"
            color={COLOR.secondary}
            fontSize={18}
            onPress={() => {
              setVisible(false);
              onForgotPassword();
            }}
          />
        </View>
      </BottomSheet>
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
});
