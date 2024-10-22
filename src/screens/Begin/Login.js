import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppInput from '../../components/AppInput';
import {appStyle, windowHeight} from '../../constants/AppStyle';
import AppButton from '../../components/AppButton';
import {COLOR} from '../../constants/Theme';
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
import auth from '@react-native-firebase/auth';
import AxiosInstance from '../../constants/AxiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = props => {
  useEffect(() => {
    checkLoginInfo();

    GoogleSignin.configure({
      webClientId:
        '225655748998-h8s6r3m379t1kpijmk7pfhbgut94l2rm.apps.googleusercontent.com',
    });
  }, [idUser]);

  const signInGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {idToken} = await GoogleSignin.signIn();
      console.log(idToken);
      const googleCredentials = auth.GoogleAuthProvider.credential(idToken);
      auth().signInWithCredential(googleCredentials);
      return userInfo;
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log('idToken1');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log('idToken2');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log('idToken3');
      } else {
        // some other error happened
      }
    }
  };
  const { isLogin, setIsLogin, setInfoUser, setIdUser, idUser } = useContext(AppContext);
  const {navigation} = props;
  const goRegister = () => {
    navigation.navigate('Register');
  };
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);
  const [phoneNumber, setphoneNumber] = useState('');
  const [password, setpassword] = useState('');

  const toggleBottomNavigationView = () => {
    //Toggling the visibility state of the bottom sheet
    setVisible(!visible);
  };
  const toggleBottomNavigationView2 = () => {
    //Toggling the visibility state of the bottom sheet
    setVisible2(!visible2);
  };
  const toggleBottomNavigationView3 = () => {
    //Toggling the visibility state of the bottom sheet
    setVisible3(!visible3);
  };
  const validationSchema = Yup.object().shape({
    rePassword: Yup.string()
      .required('Mật khẩu không được để trống')
      .min(8, 'Mật khẩu quá ngắn ít nhất phải 8 kí tự')
      .matches(/[a-zA-Z]/, 'Mật khẩu chỉ chứa các chữ các latinh'),
    phoneNumber: Yup.number()
      .typeError('Không phải định dạng số điện thoại')
      .positive('Số điện thoại không được có dấu trừ')
      .integer('Số điện thoại không có dấu thập phân')
      .required('Số điện thoại không được để trống'),
    password: Yup.string()
      .required('Mật khẩu không được để trống')
      .min(8, 'Mật khẩu quá ngắn ít nhất phải 8 kí tự')
      .matches(/[a-zA-Z]/, 'Mật khẩu chỉ chứa các chữ các latinh'),
    passwordInBottomSheet: Yup.string()
      .required('Mật khẩu không được để trống')
      .min(8, 'Mật khẩu quá ngắn ít nhất phải 8 kí tự')
      .matches(/[a-zA-Z]/, 'Mật khẩu chỉ chứa các chữ các latinh'),
  });

  const formik = useFormik({
    initialValues: {
      phoneNumber: '',
      password: '',
      rePassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      // Xử lý logic khi submit form
      console.log(values);
    },
  });
  //API login
  const onLogin = async () => {
    try {
      console.log(phoneNumber, password);
      const response = await AxiosInstance().post('/user/api/login', {
        phone: phoneNumber,
        password: password,
      });
      console.log(response);
      if (response.result) {
        setIdUser(response.user.id);
        setInfoUser(response.user);
        saveLoginInfo(response.user); 
        setIsLogin(true);
        ToastAndroid.show('Ðăng nhập thành công', ToastAndroid.SHORT);
      } else {
        ToastAndroid.show('Đăng nhập thất bại', ToastAndroid.SHORT);
      }
    } catch (e) {
      console.log(e);
    }
  };

  // Hàm lưu thông tin đăng nhập vào AsyncStorage
  const saveLoginInfo = async (userInfo) => {
    try {
      console.log("userInfo", userInfo.avatar);
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
      if (userInfo !== null) {
        const parsedUserInfo = JSON.parse(userInfo);
        setIdUser(parsedUserInfo._id);
        setInfoUser(parsedUserInfo);
        setIsLogin(true);
        console.log('Thông tin đăng nhập đã tồn tại:', parsedUserInfo);
      } else {
        console.log('Không tìm thấy thông tin đăng nhập.');
      }
    } catch (error) {
      console.log('Lỗi khi kiểm tra thông tin đăng nhập:', error);
    }
  };

  

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
              console.log(values);
              setIsLogin(true);
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
                        // onChangeText={handleChange('phoneNumber')}
                        // onBlur={handleBlur('phoneNumber')}
                        // value={values.phoneNumber}
                        onChangeText={phoneNumber => [
                          setphoneNumber(phoneNumber),
                        ]}
                        value={phoneNumber}
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
                        // onChangeText={handleChange('password')}
                        // onBlur={handleBlur('password')}
                        // value={values.password}
                        onChangeText={password => [setpassword(password)]}
                        value={password}
                      />
                    </View>
                  </View>
                  {touched.password && errors.password && (
                    <Text style={styles.textError}>{errors.password}</Text>
                  )}
                  <Text
                    style={styles.text3}
                    onPress={() => {
                      toggleBottomNavigationView3();
                    }}>
                    Quên mật khẩu
                  </Text>
                  <View style={styles.view1}></View>
                  <View style={styles.itemLoginSocial}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => {
                        signInGoogle();
                      }}>
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
                </KeyboardAvoidingView>
                <AppButton
                  title="Đăng nhập"
                  color={COLOR.secondary}
                  fontSize={18}
                  onPress={() => {
                    onLogin();
                  }}
                />
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
        {/*Bottom Sheet inner View*/}
        <View style={styles.bottomNavigationView}>
          <View style={{flex: 1}}>
            <View>
              <Text style={styles.text1InBottomSheet}>Quên mật khẩu</Text>
              <Text style={styles.text2InBottomSheet}>
                Nhập sdt của bạn để thực hiện quá trình xác minh, chúng tôi sẽ
                gửi mã xác thực vào sdt.
              </Text>
              <AppInput
                keyboardType={'phone-pad'}
                returnKeyType={'done'}
                placeholder={'Nhập số điện thoại của bạn'}
                onChangeText={formik.handleChange('phoneNumber')}
                onBlur={formik.handleBlur('phoneNumber')}
                value={formik.values.phoneNumber}
              />
            </View>
            {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
              <Text style={styles.textErrorInBottomSheet}>
                {formik.errors.phoneNumber}
              </Text>
            ) : null}
          </View>
          <AppButton
            title="Tiếp tục"
            color={COLOR.secondary}
            fontSize={18}
            onPress={formik.handleSubmit}
            // onPress={handleSubmit => {
            //   //handleSubmit;
            //   //setVisible(false);
            //   //toggleBottomNavigationView2();
            // }}
          />
        </View>
      </BottomSheet>

      {/*Bottom Sheet 2*/}
      <BottomSheet
        visible={visible2}
        //setting the visibility state of the bottom shee
        onBackButtonPress={toggleBottomNavigationView2}
        //Toggling the visibility state on the click of the back botton
        onBackdropPress={toggleBottomNavigationView2}
        //Toggling the visibility state on the clicking out side of the sheet
      >
        {/*Bottom Sheet inner View*/}
        <View style={styles.bottomNavigationView}>
          <View>
            <Text style={styles.text1InBottomSheet}>Nhập mã</Text>
            <Text style={styles.text2InBottomSheet}>
              Nhập mã bạn nhận được qua email.
            </Text>
            <OTPInputView
              style={{width: '80%', height: 100, alignSelf: 'center'}}
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
            <AppButton
              title="Tiếp tục"
              color={COLOR.secondary}
              fontSize={18}
              onPress={() => {
                setVisible2(false);
                toggleBottomNavigationView3();
              }}
            />
          </View>
        </View>
      </BottomSheet>

      {/*Bottom Sheet 3*/}

      {/*Bottom Sheet inner View*/}
      <Formik
        initialValues={{passwordInBottomSheet: '', rePassword: ''}}
        validationSchema={validationSchema}
        onSubmit={values => {
          console.log({values});
          setVisible3(false);
        }}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <BottomSheet
            visible={visible3}
            //setting the visibility state of the bottom shee
            onBackButtonPress={toggleBottomNavigationView3}
            //Toggling the visibility state on the click of the back botton
            onBackdropPress={toggleBottomNavigationView3}
            //Toggling the visibility state on the clicking out side of the sheet
          >
            <View style={styles.bottomNavigationView2}>
              <View>
                <Text style={styles.text1InBottomSheet}>Đặt lại mật khẩu</Text>
                <Text style={styles.text2InBottomSheet}>
                  Đặt lại mật khẩu mới để tiến hành đăng nhập vào tài khoản nhé!
                </Text>
                <View style={{marginBottom: 20}}>
                  <AppInput
                    returnKeyType={'done'}
                    placeholder={'Nhập mật khảu'}
                    isPassword
                    secureTextEntry
                    onChangeText={handleChange('passwordInBottomSheet')}
                    onBlur={handleBlur('passwordInBottomSheet')}
                    value={values.passwordInBottomSheet}
                  />
                </View>
                {touched.passwordInBottomSheet &&
                  errors.passwordInBottomSheet && (
                    <Text style={styles.textError}>
                      {errors.passwordInBottomSheet}
                    </Text>
                  )}
                <View style={{marginBottom: 20}}>
                  <AppInput
                    returnKeyType={'done'}
                    placeholder={'Xác nhận lại mật khảu'}
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
              </View>
              <AppButton
                title="Tiếp tục"
                color={COLOR.secondary}
                fontSize={18}
                onPress={handleSubmit}
              />
            </View>
          </BottomSheet>
        )}
      </Formik>
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
    height: windowHeight * 0.35,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bottomNavigationView2: {
    backgroundColor: '#fff',
    width: '100%',
    height: windowHeight * 0.45,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  text1InBottomSheet: {
    fontSize: 18,
    color: '#023047',
    marginBottom: 10,
  },
  text2InBottomSheet: {
    fontSize: 13,
    color: COLOR.black,
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
  textErrorInBottomSheet: {
    color: COLOR.red,
    marginTop: 10,
  },
});
