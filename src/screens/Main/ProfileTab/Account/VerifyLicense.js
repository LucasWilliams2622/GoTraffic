import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  PermissionsAndroid,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  appStyle,
  windowHeight,
  windowWidth,
} from '../../../../constants/AppStyle';
import Header from '../../../../components/Header';
import {COLOR, ICON} from '../../../../constants/Theme';
import FastImage from 'react-native-fast-image';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AppInput from '../../../../components/AppInput';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AppButton from '../../../../components/AppButton';
import LicenseModal from '../../../../components/Profile/Modal/LicenseModal';
import CameraModal from '../../../../components/Profile/Modal/CameraModal';
import Modal from 'react-native-modal';
import {AppContext} from '../../../../utils/AppContext';
import axios from 'axios';

const VerifyLicense = ({isVisible, onClose}) => {
  const navigation = useNavigation();

  const [numberLicense, setNumberLicense] = useState(null);
  const [fullName, setFullName] = useState(null);
  const [date, setDate] = useState(null);
  const [image, setImage] = useState(null);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCameraModalVisible, setIsCameraModalVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const handleUpdate = async userInfo => {
    const carLicense = {
      numberLicense,
      fullName,
      date,
      image,
    };
    console.log(carLicense);
    const response = await axios.put(
      `http://103.57.129.166:3000/user/api/verify-driver-license?id=${userInfo.id}`,
    );
    console.log(
      `Verify license url: http://103.57.129.166:3000/user/api/verify-driver-license?id=${userInfo.id}`,
    );
    console.log('response: ' + JSON.stringify(response));

    if (response.data.result === true) {
      // update infoUser by calling the get user api again
      const userResponse = await axios.get(
        'http://103.57.129.166:3000/user/api/get-by-id?id=' + userInfo.id,
      );
      console.log('userResponse: ' + JSON.stringify(userResponse));
      if (userResponse.data.result === true) {
        // update the infoUser from context
        const updatedInfoUser = userResponse.data.data;
        setInfoUser(updatedInfoUser);
      }
    }
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = selectedDate => {
    hideDatePicker();
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      setDate(formattedDate);
    }
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const result = await launchCamera();
        const formData = new FormData();
        formData.append('image', {
          uri: result.assets[0].uri,
          type: 'icon/icon_jpeg',
          name: 'image.jpg',
        });
        setImage(result.assets[0].uri);
        setIsCameraModalVisible(false);
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const chooseImage = () => {
    const options = {
      mediaType: 'photo',
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('Hủy chọn ảnh');
      } else if (response.error) {
        console.log('Lỗi:', response.error);
      } else {
        console.log(response.assets[0].uri);
        setImage(response.assets[0].uri);
        setIsCameraModalVisible(false);
      }
    });
  };

  const {infoUser, idUser, setInfoUser} = useContext(AppContext);
  console.log(infoUser);

  return (
    <Modal isVisible={isVisible} style={{flex: 1, margin: 0}}>
      <SafeAreaView style={appStyle.container}>
        <Header icon={ICON.Close} text="Xác thực GPLX" onPress={onClose} />
        <ScrollView
          style={{
            flex: 1,
            width: '100%',
            height: '80%',
            marginBottom: windowHeight * 0.01,
          }}>
          <View style={{padding: 15}}>
            <View
              style={{
                backgroundColor: COLOR.warn,
                padding: 10,
                borderRadius: 5,
              }}>
              <Text style={[appStyle.text14, {color: COLOR.red}]}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: COLOR.textWarn,
                    textAlign: 'center',
                  }}>
                  Lưu ý:{' '}
                </Text>
                Để tránh phát sinh vấn dề trong quá trình thuê xe. Người đặt xe
                trên Mioto (đã xác thực GPLX){' '}
                <Text style={{fontWeight: 'bold', color: COLOR.textWarn}}>
                  ĐỒNG THỜI{' '}
                </Text>
                phải là người nhận xe.
              </Text>
            </View>

            <View style={{marginTop: 15}}>
              <Text style={[appStyle.text165]}> Ảnh mặt trước GPLX</Text>
              <Text>
                Hình chụp cần thấy được
                <Text style={{fontWeight: 'bold'}}> Ảnh đại diện </Text>
                và
                <Text style={{fontWeight: 'bold'}}> GPLX </Text>
              </Text>
              <TouchableOpacity
                style={styles.viewImg}
                onPress={() => setIsCameraModalVisible(true)}>
                {image ? (
                  <FastImage
                    source={{uri: image}}
                    resizeMode="stretch"
                    style={{height: windowHeight * 0.26}}
                  />
                ) : (
                  <FastImage
                    source={ICON.License}
                    resizeMode="stretch"
                    style={{height: windowHeight * 0.26}}
                  />
                )}
              </TouchableOpacity>
            </View>

            <View style={{marginTop: 15}}>
              <Text style={[appStyle.text165]}>Số giấy phép lái xe</Text>
              <Text>Dãy 12 chữ số ở mặt trước GPLX</Text>
              <AppInput
                marginTop={10}
                placeholder="0000-0000-0000"
                value={numberLicense}
                onChangeText={text => setNumberLicense(text)}
              />
            </View>

            <View style={{marginTop: 15}}>
              <Text style={[appStyle.text165]}>Họ và tên</Text>
              <AppInput
                marginTop={10}
                placeholder="Họ và tên"
                value={fullName}
                onChangeText={text => setFullName(text)}
              />
            </View>

            <View style={{marginTop: 15}}>
              <Text style={[appStyle.text165]}>Ngày sinh</Text>
              <TouchableOpacity onPress={() => showDatePicker()}>
                <AppInput
                  marginTop={10}
                  placeholder="Ngày sinh"
                  value={date}
                  onChangeText={text => setDate(text)}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        <View style={styles.viewBottom}>
          <TouchableOpacity
            onPress={() => setIsModalVisible(true)}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <FastImage
              source={ICON.Warning}
              resizeMode="stretch"
              style={appStyle.iconMedium}
            />
            <Text
              style={[
                appStyle.text105,
                {marginLeft: 5, textDecorationLine: 'underline'},
              ]}>
              Vì sao tôi cần phải xác thực GPLX
            </Text>
          </TouchableOpacity>
          <AppButton title="Cập nhật" onPress={() => handleUpdate(infoUser)} />
        </View>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />

        <CameraModal
          isVisible={isCameraModalVisible}
          onClose={() => setIsCameraModalVisible(false)}
          onRequestCameraPermission={requestCameraPermission}
          onChooseImage={chooseImage}
        />

        <LicenseModal
          isVisible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
        />
      </SafeAreaView>
    </Modal>
  );
};

export default VerifyLicense;

const styles = StyleSheet.create({
  viewImg: {
    width: '100%',
    height: windowHeight * 0.3,
    marginTop: 10,
    borderWidth: 0.7,
    borderRadius: 10,
    justifyContent: 'center',
  },
  viewBottom: {
    borderTopWidth: 0.5,
    justifyContent: 'space-evenly',
    paddingHorizontal: 15,
    borderColor: COLOR.gray,
    width: '100%',
    height: windowHeight * 0.09,
    marginBottom: 70,
  },
});
