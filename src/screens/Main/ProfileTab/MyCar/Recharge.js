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
import {useNavigation} from '@react-navigation/native';
import {COLOR} from '../../../../constants/Theme';
import AppHeader from '../../../../components/AppHeader';
import {WebView} from 'react-native-webview';
import AppInput from '../../../../components/AppInput';
import axios from 'axios';
import {AppContext} from '../../../../utils/AppContext';
import {showToastMessage} from '../../../../utils/utils';
import AppButton from '../../../../components/AppButton';
import {useFormik} from 'formik';
import * as Yup from 'yup';

const Recharge = () => {
  const navigation = useNavigation();
  const [amount, setAmount] = useState(0);
  const [blockInput, setBlockInput] = useState(true);
  const [checkoutUrl, setCheckoutUrl] = useState('');
  const {idUser} = useContext(AppContext);
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
          id: idUser,
          amount: parseInt(amount),
        },
      );
      setBlockInput(true);
      setAmount(0);
      showToastMessage('', 'Thanh toán thành công');
    } else {
      console.log('Chưa thanh toán');
    }
  };
  const formik = useFormik({
    initialValues: {
      amount: '',
    },
    validationSchema: Yup.object({
      amount: Yup.string()
        .matches(/^[0-9]+$/, 'Chỉ được nhập số')
        .test(
          'greaterThan1000',
          'Vui lòng nhập số tiền lớn hơn 1000 VNĐ',
          value => {
            return parseInt(value) > 1000;
          },
        )
        .required('Vui lòng nhập số tiền'),
    }),
    onSubmit: async values => {
      console.log(values.amount);
      const response = await axios.post(
        'http://103.57.129.166:3000/user/api/create-link-payment',
        {
          amount: parseInt(values.amount),
          description: 'Nap tien',
          returnUrl: 'http://103.57.129.166:3000/success.html',
          cancelUrl: 'http://103.57.129.166:3000/cancel.html',
        },
      );
      if (response.data.data.checkoutUrl) {
        setCheckoutUrl(response.data.data.checkoutUrl);
        setBlockInput(false);
      } else {
        console.log('==============>ERROR');
      }
    },
  });

  return (
    <SafeAreaView style={appStyle.container}>
      <AppHeader title="Nạp tiền" />
      <View style={appStyle.main}>
        <View style={{marginVertical: 16}}>
          <AppInput
            placeholder={'Nhập số tiền muốn nạp'}
            keyboardType={'number-pad'}
            value={formik.values.amount}
            onChangeText={formik.handleChange('amount')}
            onBlur={formik.handleBlur('amount')}
            editable={blockInput}
          />
          {formik.touched.amount && formik.errors.amount ? (
            <Text style={{color: 'red', marginTop: 4}}>
              {formik.errors.amount}
            </Text>
          ) : null}
        </View>

        <AppButton title={'Nạp'} onPress={formik.handleSubmit}  />

        <View style={{flex: 1, marginBottom: 70}}>
          {checkoutUrl != '' ? (
            <>
              <WebView
                shouldRasterizeIOS
                showsVerticalScrollIndicator={false}
                source={{uri: checkoutUrl}}
                onNavigationStateChange={handleNavigationStateChange}
                style={{flex: 1}}
              />
            </>
          ) : (
            <View style={[appStyle.boxCenter, {marginTop: windowHeight * 0.2}]}>
              <Text style={appStyle.text16}>Hãy nhập số tiền muốn nạp</Text>
            </View>
          )}
        </View>
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
