import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppButton from '../../components/AppButton';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { appStyle } from '../../constants/AppStyle';
import { COLOR } from '../../constants/Theme';


const Verified = () => {
  return (
    <SafeAreaView style={appStyle.main}>
      <Text style={styles.text1}>Xác thực số điện thoại</Text>
      <Text style={styles.text2}>
        Bạn sẽ nhận được mã OTP vào số điện thoại này. Hãy xác thực ngay!
      </Text>
      <Text style={styles.text3}>
        Gửi lại mã sau <Text style={{fontWeight:'bold'}}>(56s)</Text>{' '}
      </Text>

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
        } }
      />
      <AppButton title={'Xác thực OTP'} />
    </SafeAreaView>
  );
};

export default Verified;

const styles = StyleSheet.create({
  text1: {
    fontSize: 24,
    fontWeight: 'bold',

    color: COLOR.black,
    marginBottom: 10,
    marginTop: 10,
  },
  text2: {
    fontSize: 18,
    color: COLOR.black,
    marginBottom: 10,
  },
  text3: {
    fontSize: 16,
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
    borderColor:COLOR.black
  },

  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
  },
});
