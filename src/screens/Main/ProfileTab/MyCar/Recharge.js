import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
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

const Recharge = () => {
  const navigation = useNavigation();

  const [currentUrl, setCurrentUrl] = useState('');

  const handleNavigationStateChange = navState => {
    // Lấy đường dẫn hiện tại từ trạng thái dẫn hướng
    const url = navState.url;
    setCurrentUrl(url);

    // Kiểm tra xem đường dẫn có thay đổi hay không và xử lý một số logic tùy thuộc vào đường dẫn mới.
    // if (url.includes('example.com')) {
    // Xử lý khi chuyển đến trang có chứa 'example.com'
    console.log('Đã chuyển đến trang có chứa ' + url);
    checkLink(url);
    // }
  };
  const checkLink = url => {
    if (url.includes('success')) {
      console.log('asdasdasd');
    } else {
      console.log('===============>no');
    }
  };

  return (
    <SafeAreaView style={appStyle.container}>
      <AppHeader title="Nạp tiền" notLeft/>
      <View style={appStyle.main}>
        <AppInput placeholder={'Nhập số tiền muốn nạp'} keyboardType={'number-pad'}/>
        <AppButton title={'Nạp'} />
        {/* <WebView
          source={{uri: 'http://103.57.129.166:3000/'}}
          onNavigationStateChange={handleNavigationStateChange}
          style={{flex:1}}
        /> */}
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
