import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Alert,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {
  appStyle,
  windowHeight,
  windowWidth,
} from '../../../../constants/AppStyle';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import {COLOR} from '../../../../constants/Theme';
import AppHeader from '../../../../components/AppHeader';
import {WebView} from 'react-native-webview';
import AppInput from '../../../../components/AppInput';
import AppButton from '../../../../components/AppButton';
import AxiosInstance from '../../../../constants/AxiosInstance';
import axios from 'axios';
import QRCode from 'react-native-qrcode-svg';
import { AppContext } from '../../../../utils/AppContext';
import { showToastMessage } from '../../../../utils/utils';

const Recharge = () => {
  const navigation = useNavigation();
  const [amount, setAmount] = useState(1100);
  const [blockInput, setBlockInput] = useState(true)
  const [checkoutUrl, setCheckoutUrl] = useState('');
  const {idUser} = useContext(AppContext)
  const [currentUrl, setCurrentUrl] = useState('');

  const handleNavigationStateChange = navState => {
    // Lấy đường dẫn hiện tại từ trạng thái dẫn hướng
    const url = navState.url;
    setCurrentUrl(url);
    console.log('Đã chuyển đến trang có chứa ' + url);
    checkLink(url);
  };
  const checkLink = async url => {
    if (url.includes('success')) {
      console.log('Thanh toan rồi nha');
      const response = await axios.post(
        'http://103.57.129.166:3000/user/api/recharge-by-id-user',
        {
          id:idUser,
          amount: parseInt(amount),
        },
      );
      console.log(response.data);
      showToastMessage('','Thanh toán thành công')
    } else {
      console.log('Chưa thanh toán');
    }
  };

  const handleRecharge = async () => {
    try {
      const response = await axios.post(
        'http://103.57.129.166:3000/user/api/create-link-payment',
        {
          amount: parseInt(amount),
          description: 'Nap tien',
          returnUrl: 'http://103.57.129.166:3000/success.html',
          cancelUrl: 'http://103.57.129.166:3000/cancel.html',
        },
      );
      console.log(response.data.data.checkoutUrl);
      if (response.data.data.checkoutUrl) {
        console.log('asdas');
        setCheckoutUrl(response.data.data.checkoutUrl);
        setBlockInput(false)
      }else{
        console.log('==============>');

      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={appStyle.container}>
      <AppHeader title="Nạp tiền"  />
      <View style={appStyle.main}>
        <AppInput
          placeholder={'Nhập số tiền muốn nạp'}
          keyboardType={'number-pad'}
          onChangeText={txt => setAmount(txt)}
          editable={blockInput}
        />
        <AppButton title={'Nạp'} onPress={() => handleRecharge()} />
        <View style={{borderWidth:2,flex:1}}>

        {checkoutUrl != '' && (
          <>
            <WebView
              source={{uri: checkoutUrl}}
              onNavigationStateChange={handleNavigationStateChange}
              style={{flex: 1}}
            />
          </>
        )}
        </View>

      </View>
    </SafeAreaView>
  );

  return (
    <SafeAreaView style={appStyle.container}>
      <AppHeader title="Nạp tiền" />
      <View style={{borderWidth: 0}}>
        <FastImage
          style={{width: windowWidth, height: windowHeight * 0.8}}
          source={require('../../../../assets/image/bank.png')}
        />
        <Text style={[appStyle.text16, {textAlign: 'center', marginTop: 8}]}>
          Ví tiền sẽ được cập nhật sau 12h
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Recharge;

const styles = StyleSheet.create({
  viewTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
  },
  image: {
    width: '100%',
    height: '30%',
    position: 'absolute',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    color: COLOR.black,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 14,
  },
});
