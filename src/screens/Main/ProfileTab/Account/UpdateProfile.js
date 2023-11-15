import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  PermissionsAndroid,
  Modal,
} from 'react-native';
import React, { useState, useContext } from 'react';
import { appStyle, windowHeight, windowWidth } from '../../../../constants/AppStyle';
import { COLOR, ICON } from '../../../../constants/Theme';
import FastImage from 'react-native-fast-image';
import AppInput from '../../../../components/AppInput';
import AppButton from '../../../../components/AppButton';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Header from '../../../../components/Header';
import AppDropdown from '../../../../components/AppDropdown';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AppContext } from '../../../../utils/AppContext';
import AxiosInstance from '../../../../constants/AxiosInstance';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import axios from 'axios';

const UpdateProfile = props => {
  const navigation = useNavigation();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const { setIsLogin, infoUser, idUser, currentDay, appState, setAppState } =
    useContext(AppContext);
  const [image, setImage] = useState(infoUser.avatar);
  const [name, setName] = useState(infoUser.name);
  const [dob, setdob] = useState(infoUser.dob);
  const [selectedSex, setSelectedSex] = useState(infoUser.gender);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dob);


  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        'http://103.57.129.166:3000/user/api/update?idUser=' + idUser,
        {
          name: name,
          firstName: '',
          lastName: '',
          email: infoUser.email,
          gender: true,
          dob: currentDay,
          avatar: image,
        },
      );
      if (response.result) {
        Toast.show({
          type: 'success',
          text1: 'Cập nhật thành công',
          visibilityTime: 2000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
        setAppState(appState + 1);
        navigation.goBack();
      } else {
        Toast.show({
          type: 'error',
          text1: 'Cập nhật thất bại',
          visibilityTime: 2000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
      }
    } catch (e) {
      console.log('error', e);
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
      setSelectedDate(formattedDate);
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

        const response = await AxiosInstance('multipart/form-data').post(
          '/car/api/upload-single-image',
          formData,
        );
        console.log(response.link);
        if (response.result == true) {
          setImage(response.link);
          Toast.show({
            type: 'success',
            text1: 'Upload ảnh thành công',
            visibilityTime: 2000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
          });
        } else {
          Toast.show({
            type: 'error',
            text1: 'Upload ảnh thất bại',
            visibilityTime: 2000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
          });
        }
        // setImage(result.assets[0].uri);
        toggleModal();
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
        toggleModal();
      }
    });
  };

  const AccountSchema = Yup.object().shape({
    name: Yup.string()
      .min(1, 'Quá ngắn')
      .max(50, 'Quá dài')
      .required('Bắt buộc'),
  });
  const isImageUrlValid = /^https?:\/\/.*\.(png|jpg)$/i.test(image);
  return (
    <SafeAreaView style={[appStyle.container]}>
      <Header
        icon={ICON.Close}
        text="Chỉnh sửa"
        onPress={() => navigation.navigate('Account')}
      //marginLeft={106}
      />
      <View style={{ width: '100%', padding: 15 }}>
        {/* Avatar */}
        {isImageUrlValid ? (
          <FastImage
            source={{ uri: image }}
            style={[appStyle.avatar, { marginTop: 20 }]}
            resizeMode="stretch"
          />
        ) : (
          <FastImage
            source={require('../../../../assets/image/logo_go_traffic.png')}
            style={[appStyle.avatar, { marginTop: 20 }]}
          />
        )}

        {/* Capture image */}
        <TouchableOpacity
          style={styles.viewCamera}
          onPress={() => toggleModal()}>
          <FastImage
            source={ICON.Camera}
            style={[appStyle.iconBig]}></FastImage>
        </TouchableOpacity>

        <Modal
          //isVisible={isModalVisible}
          animationType="slide"
          transparent={true}
          visible={isModalVisible}>
          <TouchableOpacity
            style={appStyle.modalBackdrop}
            onPress={toggleModal} // Close the modal when tapping outside
          />
          <View style={appStyle.modalContainerCam}>
            {/* Add your camera and gallery buttons here */}
            <AppButton
              title="Chụp ảnh"
              marginTop={5}
              onPress={() => requestCameraPermission()}
            />
            <AppButton
              title="Chọn ảnh"
              marginTop={15}
              backgroundColor={COLOR.background}
              textColor={COLOR.primary}
              onPress={() => chooseImage()}
            />
          </View>
        </Modal>

        {/* Validate */}
        <KeyboardAwareScrollView behavior="padding">
          <Formik
            initialValues={{
              name: infoUser.name,
              // dob: infoUser.dob.slice(0, 10),
              // sex: infoUser.gender ? 'Nam' : 'Nữ',
            }}
            validationSchema={AccountSchema}
            onSubmit={(values, { setSubmitting }) => {
              // Kiểm tra tính hợp lệ bằng cách sử dụng setSubmitting
              setSubmitting(true); // Đánh dấu rằng việc xác thực đang diễn ra
              AccountSchema.validate(values)
                .then(valid => {
                  if (valid) {
                    setName(values.name);
                    // setdob(values.dob);
                    handleUpdate();
                  } else {
                    console.log('Dữ liệu không hợp lệ');
                  }
                })
                .finally(() => {
                  setSubmitting(false); // Kết thúc quá trình xác thực
                });
            }}>
            {({
              values,
              errors,
              touched,
              handleChange,
              setFieldTouched,
              handleSubmit,
            }) => (
              <>
                <View style={{ width: '100%', height: 'auto' }}>
                  <Text style={[appStyle.text14, { color: COLOR.text2 }]}>
                    Tên người dùng
                  </Text>
                  <AppInput
                    placeholder="Tên người dùng"
                    value={values.name}
                    onChangeText={handleChange('name')}
                    onBlur={() => setFieldTouched('name')}
                  />
                  {touched.name && errors.name && (
                    <Text style={{ color: 'red' }}>{errors.name}</Text>
                  )}
                </View>

                <View style={{ width: '100%', height: 'auto', marginTop: 15 }}>
                  <Text style={[appStyle.text14, { color: COLOR.text2 }]}>
                    Ngày sinh
                  </Text>
                  <TouchableOpacity
                    onPress={showDatePicker}
                    style={{ width: '100%', justifyContent: 'center', height: windowHeight * 0.06, borderWidth: 1, borderRadius: 6, borderColor: COLOR.primary }}>
                    <Text style={[appStyle.text16, { marginLeft: 8 }]}>{selectedDate}</Text>
                  </TouchableOpacity>
                  {/* <AppInput
                    placeholder="Ngày sinh"
                    value={values.dob}
                    onChangeText={handleChange('dob')}
                    onBlur={() => setFieldTouched('dob')}
                  />
                  {touched.dob && errors.dob && (
                    <Text style={{ color: 'red' }}>{errors.dob}</Text>
                  )} */}
                </View>

                <View style={{ width: '100%', height: 'auto', marginTop: 15 }}>
                  <Text style={[appStyle.text14, { color: COLOR.text2 }]}>
                    Giới tính
                  </Text>
                  <AppDropdown
                    borderWidth={1}
                    labelField="label"
                    valueField="value"
                    data={sex}
                    value={selectedSex}
                    onChange={(sexs) => {
                      setSelectedSex(sexs.value);
                    }}
                  />
                  {/* <AppInput
                    placeholder="Giới tính"
                    value={values.sex}
                    onChangeText={handleChange('sex')}
                    onBlur={() => setFieldTouched('sex')}
                  />
                  {touched.sex && errors.sex && (
                    <Text style={{color: 'red'}}>{errors.sex}</Text>
                  )} */}
                </View>

                <AppButton marginTop={30} title="Lưu" onPress={handleSubmit} />
              </>
            )}
          </Formik>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
};

export default UpdateProfile;

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 50,
    backgroundColor: COLOR.background,
    flexDirection: 'row',
    //alignItems: 'center',
    paddingHorizontal: 0,
    justifyContent: 'flex-start',
  },
  viewCamera: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLOR.lightBlue,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    top: -25,
  },
  item: {
    backgroundColor: 'white',
    width: '100%',
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLOR.primary,
    marginTop: 8,
  },
});

const sex = [
  { label: 'Nam', value: 'Nam' },
  { label: 'Nữ', value: 'Nữ' },
  { label: 'Khác', value: 'Khác' },
]
