import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { appStyle } from '../../../constants/AppStyle'
import Header from '../../../components/Header'
import { ICON } from '../../../constants/Theme'
import AppInput from '../../../components/AppInput'
import AppButton from '../../../components/AppButton'
import { Formik } from 'formik';
import * as Yup from 'yup';

const ChangePassword = (props) => {
  const { navigation } = props;

  const validationSchema = Yup.object().shape({
    currentPassword: Yup.string().required("Phải nhập mật khẩu hiện tại"),
    newPassword: Yup.string()
      .min(6, "Mật khẩu mới phải có ít nhất 6 kí tự")
      .matches(/[a-zA-Z]+$/, "Mật khẩu mới chỉ được chứa kí tự chữ"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Xác nhận mật khẩu không khớp')
      .required("Phải nhập xác nhận mật khẩu"),
  });

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
              console.log('Cập nhật thành công');
              navigation.navigate('Profile');
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