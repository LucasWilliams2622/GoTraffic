import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useState, useContext} from 'react';
import {appStyle} from '../../../constants/AppStyle';
import Header from '../../../components/Header';
import {ICON} from '../../../constants/Theme';
import AppInput from '../../../components/AppInput';
import AppButton from '../../../components/AppButton';
import {Formik} from 'formik';
import * as Yup from 'yup';
import AxiosInstance from '../../../constants/AxiosInstance';
import Toast from 'react-native-toast-message';
import {AppContext} from '../../../utils/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showToastMessage} from '../../../utils/utils';
import AppHeader from '../../../components/AppHeader';
import axios from 'axios';

const ChangePassword = props => {
  const {navigation} = props;
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const {setIsLogin, infoUser, idUser} = useContext(AppContext);

  const validationSchema = Yup.object().shape({
    currentPassword: Yup.string().required('Phải nhập mật khẩu hiện tại'),
    newPassword: Yup.string()
      .min(6, 'Mật khẩu mới phải có ít nhất 6 kí tự')
      .matches(/[a-zA-Z]+$/, 'Mật khẩu mới chỉ được chứa kí tự chữ'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Xác nhận mật khẩu không khớp')
      .required('Phải nhập xác nhận mật khẩu'),
  });

  const handleChangePassword = async (oldPassword,newPassword) => {
    try {
      console.log("=========================",oldPassword, newPassword);
      const response = await axios.put(
        'http://103.57.129.166:3000/user/api/change-password',
        {
          phone: infoUser.phone,
          oldPassword: oldPassword,
          newPassword: newPassword,
        },
      );
      console.log(response.data);
      if (response.data.result) {
        await AsyncStorage.removeItem('userInfo');
        setIsLogin(false);
        showToastMessage(
          '',
          'Đổi mật khẩu thành công, vui lòng đăng nhập lại!',
        );
      } else {
        showToastMessage('error', 'Đổi mật khẩu thất bại');
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <SafeAreaView style={appStyle.container}>
      <AppHeader title="Đổi mật khẩu" />
      <Formik
        initialValues={{
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values, {setErrors}) => {
          validationSchema
            .validate(values, {abortEarly: false})
            .then(() => {
              // Xử lý khi không có lỗi
              setOldPassword(values.currentPassword);
              setNewPassword(values.newPassword);

              handleChangePassword(values.currentPassword,values.newPassword);
            })
            .catch(errors => {
              // Có lỗi--> hiển thị lỗi
              console.log('Cập nhật thất bại');
              const formErrors = {};
              errors.inner.forEach(error => {
                formErrors[error.path] = error.message;
              });
              setErrors(formErrors);
            });
        }}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={{padding: 15, width: '100%'}}>
            <AppInput
              returnKeyType={'done'}
              placeholder="Mật khẩu hiện tại"
              isPassword
              secureTextEntry
              marginTop={20}
              onChangeText={handleChange('currentPassword')}
              onBlur={handleBlur('currentPassword')}
              value={values.currentPassword}
            />
            {touched.currentPassword && errors.currentPassword && (
              <Text style={{color: 'red'}}>{errors.currentPassword}</Text>
            )}

            <AppInput
              returnKeyType={'done'}
              placeholder="Mật khẩu mới"
              isPassword
              secureTextEntry
              marginTop={20}
              onChangeText={handleChange('newPassword')}
              onBlur={handleBlur('newPassword')}
              value={values.newPassword}
            />
            {touched.newPassword && errors.newPassword && (
              <Text style={{color: 'red'}}>{errors.newPassword}</Text>
            )}

            <AppInput
              returnKeyType={'done'}
              placeholder="Xác nhận mật khẩu mới"
              isPassword
              secureTextEntry
              marginTop={20}
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              value={values.confirmPassword}
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <Text style={{color: 'red'}}>{errors.confirmPassword}</Text>
            )}

            <AppButton title="Cập nhật" marginTop={20} onPress={handleSubmit} />
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({});
