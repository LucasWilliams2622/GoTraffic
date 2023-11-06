import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState, useContext } from 'react'
import { appStyle } from '../../../constants/AppStyle'
import Header from '../../../components/Header'
import { ICON } from '../../../constants/Theme'
import AppInput from '../../../components/AppInput'
import AppButton from '../../../components/AppButton'
import { Formik } from 'formik';
import * as Yup from 'yup';
import AxiosInstance from '../../../constants/AxiosInstance';
import Toast from 'react-native-toast-message';
import { AppContext } from '../../../utils/AppContext'
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChangePassword = (props) => {
  const { navigation } = props;
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const { setIsLogin, infoUser, idUser } = useContext(AppContext);

  const validationSchema = Yup.object().shape({
    currentPassword: Yup.string().required("Phải nhập mật khẩu hiện tại"),
    newPassword: Yup.string()
      .min(6, "Mật khẩu mới phải có ít nhất 6 kí tự")
      .matches(/[a-zA-Z]+$/, "Mật khẩu mới chỉ được chứa kí tự chữ"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Xác nhận mật khẩu không khớp')
      .required("Phải nhập xác nhận mật khẩu"),
  });

  const handleChangePassword = async () => {
    try {

      const response = await AxiosInstance().put(
        '/user/api/change-password', {
        phone: infoUser.phone,
        oldPassword: oldPassword,
        newPassword: newPassword
      },
      );
      if (response.result) {
        await AsyncStorage.removeItem('userInfo');
        setIsLogin(false);

        Toast.show({
          type: 'success',
          text1: 'Đổi mật khẩu thành công',
          text2: 'vui lòng đăng nhập lại',
          visibilityTime: 2000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });

      } else {
        ToastAndroid.show('Đăng nhập thất bại', ToastAndroid.SHORT);
      }
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <SafeAreaView style={appStyle.container}>
      <Header
        text="Đổi mật khẩu"
        icon={ICON.Back}
        onPress={() => navigation.navigate('Profile')}
      />
      <Formik
        initialValues={{
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setErrors }) => {
          validationSchema.validate(values, { abortEarly: false })
            .then(() => {
              // Xử lý khi không có lỗi
              setOldPassword(values.currentPassword)
              setNewPassword(values.newPassword)

              handleChangePassword()
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
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={{ padding: 15, width: '100%' }}>
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
              <Text style={{ color: 'red' }}>{errors.currentPassword}</Text>
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
              <Text style={{ color: 'red' }}>{errors.newPassword}</Text>
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
              <Text style={{ color: 'red' }}>{errors.confirmPassword}</Text>
            )}

            <AppButton title="Cập nhật" marginTop={20} onPress={handleSubmit} />
          </View>
        )}
      </Formik>
    </SafeAreaView>
  )
}

export default ChangePassword

const styles = StyleSheet.create({})