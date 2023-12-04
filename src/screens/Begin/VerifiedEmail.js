import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppButton from '../../components/AppButton';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {appStyle, windowWidth} from '../../constants/AppStyle';
import {COLOR, ICON} from '../../constants/Theme';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

const VerifiedEmail = props => {
  const navigation = useNavigation();
  const {phoneNumber, nameUser, email} = props.route.params;
  console.log(phoneNumber);

  // verification code (OTP - One-Time-Passcode)
  const [code, setCode] = useState('');

  // Handle login
  async function confirmCode() {
    try {
      await confirm.confirm(code);
    } catch (error) {
      console.log('Invalid code.');
    }
  }
  const handleNext = () => {
    navigation.navigate('ConfirmPassword', {
      phoneNumber: phoneNumber,
      nameUser: nameUser,
      email: email,
    });
  };

  return (
    <SafeAreaView style={appStyle.main}>
      <View
        style={{
          flexDirection: 'row',
          width: windowWidth * 0.85,
          marginTop: 10,
          marginBottom: 10,
        }}>
        <TouchableOpacity
          style={{marginTop: 10, marginRight: 14}}
          onPress={() => navigation.goBack()}>
          <FastImage source={ICON.Back} style={appStyle.icon} />
        </TouchableOpacity>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={styles.text1}>Xác thực Email</Text>
        </View>
      </View>
      <Text style={styles.text2}>
        Bạn sẽ nhận được mã OTP vào email:{' '}
        <Text style={appStyle.text16Bold}>{email}</Text>. Hãy xác thực ngay!
      </Text>
      <Text style={styles.text3}>
        Gửi lại mã sau <Text style={{fontWeight: 'bold'}}>(56s)</Text>{' '}
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
        }}
      />
      <AppButton title="Xác thực email" onPress={handleNext} />
    </SafeAreaView>
  );
};

export default VerifiedEmail;

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
    borderColor: COLOR.black,
  },

  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
  },
});
