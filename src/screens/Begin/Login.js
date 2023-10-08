import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppInput from '../../components/AppInput';
import {appStyle} from '../../constants/AppStyle';
import AppButton from '../../components/AppButton';
import {COLOR} from '../../constants/Theme';
import FastImage from 'react-native-fast-image';
import {Center} from 'native-base';
import {BottomSheet} from 'react-native-btr';
import OTPInputView from '@twotalltotems/react-native-otp-input';

const Login = props => {
  const {navigation} = props;
  const goRegister = () => {
    navigation.navigate('Register');
  };
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);
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
  return (
    <SafeAreaView style={appStyle.main}>
      <View style={{flex: 3}}>
        <FastImage
          source={require('../../assets/image/logo_go_traffic.png')}
          style={styles.image}
        />
        <Text style={styles.text1}>Đăng nhập</Text>
        <View style={styles.viewItem}>
          <Text style={styles.text2}>Số điện thoại</Text>
          <AppInput placeholder={'Nhập số điện thoại của bạn'} />
        </View>
        <View style={styles.viewItem}>
          <Text style={styles.text2}>Mật khẩu</Text>
          <AppInput placeholder={'Nhập mật khảu'} isPassword />
        </View>
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
      </View>
      <View style={{marginBottom: 50}}>
        <AppButton title="Đăng nhập" color={COLOR.secondary} fontSize={18} />
      </View>

      {/*Bottom Sheet 1*/}
      <BottomSheet
        visible={visible}
        //setting the visibility state of the bottom shee
        onBackButtonPress={toggleBottomNavigationView}
        //Toggling the visibility state on the click of the back botton
        onBackdropPress={toggleBottomNavigationView}
        //Toggling the visibility state on the clicking out side of the sheet
      >
        {/*Bottom Sheet inner View*/}
        <View style={styles.bottomNavigationView}>
          <View style={{flex: 1}}>
            <Text style={styles.text1InBottomSheet}>Quên mật khẩu</Text>
            <Text style={styles.text2InBottomSheet}>
              Nhập email của bạn để thực hiện quá trình xác minh, chúng tôi sẽ
              gửi mã xác thực vào email.
            </Text>
            <AppInput placeholder={'Email'} />
          </View>
          <AppButton
            title="Tiếp tục"
            color={COLOR.secondary}
            fontSize={18}
            onPress={() => {
              setVisible(false);
              toggleBottomNavigationView2();
            }}
          />
        </View>
      </BottomSheet>

      {/*Bottom Sheet 2*/}
      <BottomSheet
        visible={visible2}
        //setting the visibility state of the bottom shee
        onBackButtonPress={toggleBottomNavigationView}
        //Toggling the visibility state on the click of the back botton
        onBackdropPress={toggleBottomNavigationView}
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
      <BottomSheet
        visible={visible3}
        //setting the visibility state of the bottom shee
        onBackButtonPress={toggleBottomNavigationView}
        //Toggling the visibility state on the click of the back botton
        onBackdropPress={toggleBottomNavigationView}
        //Toggling the visibility state on the clicking out side of the sheet
      >
        {/*Bottom Sheet inner View*/}
        <View style={styles.bottomNavigationView2}>
          <View>
            <Text style={styles.text1InBottomSheet}>Đặt lại mật khẩu</Text>
            <Text style={styles.text2InBottomSheet}>
              Đặt lại mật khẩu mới để tiến hành đăng nhập vào tài khoản nhé!
            </Text>
            <View style={{marginBottom: 20}}>
              <AppInput placeholder={'Mật khẩu'} isPassword />
            </View>
            <View style={{marginBottom: 20}}>
              <AppInput placeholder={'Xác nhận lại mật khẩu'} isPassword />
            </View>

            <AppButton
              title="Tiếp tục"
              color={COLOR.secondary}
              fontSize={18}
              onPress={() => {
                setVisible3(false);
              }}
            />
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
    marginBottom: 6,
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
    height: 1,
    width: '100%',
    backgroundColor: COLOR.borderColor2,
    marginBottom: 16,
  },
  viewItem: {
    marginBottom: 16,
  },
  button: {
    width: 180,
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
    height: 250,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bottomNavigationView2: {
    backgroundColor: '#fff',
    width: '100%',
    height: 300,
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
});
