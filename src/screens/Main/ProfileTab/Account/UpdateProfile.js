import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useContext} from 'react';
import {appStyle, windowHeight} from '../../../../constants/AppStyle';
import {COLOR, ICON} from '../../../../constants/Theme';
import AppInput from '../../../../components/AppInput';
import AppButton from '../../../../components/AppButton';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AppDropdown from '../../../../components/AppDropdown';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {AppContext} from '../../../../utils/AppContext';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import AppHeader from '../../../../components/AppHeader';
import moment from 'moment';
import ImagePickerComponent from '../../../../components/ImagePickerComponent';
import {showToastMessage} from '../../../../utils/utils';

const UpdateProfile = props => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const {updateUserInfo, infoUser, idUser, currentDay, appState, setAppState} =
    useContext(AppContext);
  const dobUser = moment(infoUser.dob).format('DD/MM/YYYY');
  const [name, setName] = useState(infoUser.name);
  const [dob, setdob] = useState(infoUser.dob.slice(0, 10));
  const [avatar, setAvatar] = useState(infoUser.avatar);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dob);
  const [selectedSex, setSelectedSex] = useState(
    infoUser.gender ? 'Nam' : 'Nữ',
  );
  const sex = [
    {label: 'Nam', value: 'Nam'},
    {label: 'Nữ', value: 'Nữ'},
  ];

  // IMAGE PICKER FOR AVATAR
  const [selectedImagePath, setSelectedImagePath] = useState(null);
  const handleImageSelected = path => {
    setSelectedImagePath(path);
  };

  const handleUpdate = async name => {
    try {
      const response = await axios.put(
        'http://103.57.129.166:3000/user/api/update?idUser=' + idUser,
        {
          name: name,
          firstName: '',
          lastName: '',
          email: infoUser.email,
          gender: selectedSex === 'Nam',
          dob: selectedDate,
          avatar: avatar,
        },
      );
      if (response.data.result) {
        await updateUserInfo({newInfo: response.data.user});
        // await setAppState(2);
        showToastMessage('', 'Cập nhật thành công');
        navigation.goBack();
      } else {
        showToastMessage('error', 'Cập nhật thất bại');
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

  const AccountSchema = Yup.object().shape({
    name: Yup.string()
      .min(1, 'Quá ngắn')
      .max(50, 'Quá dài')
      .required('Bắt buộc'),
  });
  const isImageUrlValid = /^https?:\/\/.*\.(png|jpg)$/i.test(avatar);
  console.log(avatar);
  return (
    <SafeAreaView style={[appStyle.container]}>
      <AppHeader title="Chỉnh sửa" />
      <View style={{width: '100%', padding: 15}}>
        {/* Avatar */}
        <ImagePickerComponent
          onImageSelected={handleImageSelected}
          url={avatar}
        />

        {/* Validate */}
        <KeyboardAwareScrollView behavior="padding">
          <Formik
            initialValues={{
              name: infoUser.name,
              dob: infoUser.dob.slice(0, 10),
              sex: infoUser.gender ? 'Nam' : 'Nữ',
            }}
            validationSchema={AccountSchema}
            onSubmit={(values, {setSubmitting}) => {
              setSubmitting(true); // Đánh dấu rằng việc xác thực đang diễn ra
              AccountSchema.validate(values)
                .then(valid => {
                  if (valid) {
                    handleUpdate(values.name);
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
                <View style={{width: '100%', height: 'auto'}}>
                  <Text style={[appStyle.text14, {color: COLOR.text2}]}>
                    Tên người dùng
                  </Text>
                  <AppInput
                    placeholder="Tên người dùng"
                    value={values.name}
                    onChangeText={handleChange('name')}
                    onBlur={() => setFieldTouched('name')}
                  />
                  {touched.name && errors.name && (
                    <Text style={{color: 'red'}}>{errors.name}</Text>
                  )}
                </View>

                <View style={{width: '100%', height: 'auto', marginTop: 15}}>
                  <Text style={[appStyle.text14, {color: COLOR.text2}]}>
                    Ngày sinh
                  </Text>
                  <TouchableOpacity
                    onPress={showDatePicker}
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      height: windowHeight * 0.06,
                      borderWidth: 1,
                      borderRadius: 6,
                      borderColor: COLOR.primary,
                    }}>
                    <Text style={[appStyle.text16, {marginLeft: 8}]}>
                      {selectedDate}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={{width: '100%', height: 'auto', marginTop: 15}}>
                  <Text style={[appStyle.text14, {color: COLOR.text2}]}>
                    Giới tính
                  </Text>
                  <AppDropdown
                    labelField="label"
                    valueField="value"
                    data={sex}
                    value={selectedSex}
                    onChange={sexs => {
                      setSelectedSex(sexs.value);
                    }}
                  />
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

const styles = StyleSheet.create({});
