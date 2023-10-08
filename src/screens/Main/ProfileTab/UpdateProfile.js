import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, PermissionsAndroid } from 'react-native'
import React, { useState } from 'react'
import { appStyle } from '../../../constants/AppStyle'
import { COLOR, ICON } from '../../../constants/Theme'
import FastImage from 'react-native-fast-image'
import AppInput from '../../../components/AppInput'
import AppButton from '../../../components/AppButton'
import { launchCamera, ImagePicker } from 'react-native-image-picker';
import Header from '../../../components/Header'
import { Formik } from 'formik';
import * as Yup from 'yup';

const UpdateProfile = (props) => {
    const { navigation } = props;
    const [image, setImage] = useState(null);


    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: "App Camera Permission",
                    message: "App needs access to your camera ",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("Camera permission given");
                const result = await launchCamera();
                console.log(result.assets[0].uri);
                setImage(result.assets[0].uri);

            } else {
                console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };

    const AccountSchema = Yup.object().shape({
        name: Yup.string()
            .min(1, 'Quá ngắn')
            .max(50, 'Quá dài')
            .required('Bắt buộc'),
        dob: Yup.string()
            .matches(
                /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
                'Ngày tháng năm sinh không hợp lệ, hãy nhập theo định dạng DD/MM/YYYY'
            )
            .required('Bắt buộc'),
        sex: Yup.string()
            .oneOf(['nam', 'nữ', 'khác', 'Nam', 'Nữ', 'Khác'], 'Giới tính không hợp lệ')
            .required('Bắt buộc'),
    });

    return (
        <SafeAreaView style={[appStyle.container, { padding: 15 }]}>
            <Header
                icon={ICON.Close}
                text="Chỉnh sửa"
                onPress={() => navigation.navigate('Account')}
                marginLeft={106}
            />

            {/* Avatar */}
            {image ? (
                <FastImage source={{ uri: image }} style={[appStyle.avatar]} />
            ) : (
                <FastImage source={require('../../../assets/image/guide/img_book.jpg')} style={[appStyle.avatar]} />
            )}

            {/* Capture image */}
            <TouchableOpacity
                style={styles.viewCamera}
                onPress={() => requestCameraPermission()}>
                <FastImage source={ICON.Camera} style={[appStyle.iconBig]}></FastImage>
            </TouchableOpacity>

            {/* Validate */}
            <Formik
                initialValues={{
                    name: '',
                    dob: '',
                    sex: '',
                }}
                validationSchema={AccountSchema}
            >
                {({ values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit }) => (
                    <>
                        <Text style={[appStyle.text18]}>Tên người dùng</Text>
                        <AppInput
                            placeholder="Tên người dùng"
                            value={values.name}
                            onChangeText={handleChange('name')}
                            onBlur={()=>setFieldTouched('name')}
                        />
                        {touched.name && errors.name && (
                            <Text style={{ color: 'red' }}>{errors.name}</Text>
                        )}

                        <Text style={[appStyle.text18]}>Ngày sinh</Text>
                        <AppInput
                            placeholder="Ngày sinh"
                            value={values.dob}
                            onChangeText={handleChange('dob')}
                            onBlur={()=>setFieldTouched('dob')}
                        />
                        {touched.dob && errors.dob && (
                            <Text style={{ color: 'red' }}>{errors.dob}</Text>
                        )}

                        <Text style={[appStyle.text18]}>Giới tính</Text>
                        <AppInput
                            placeholder="Giới tính"
                            value={values.sex}
                            onChangeText={handleChange('sex')}
                            onBlur={()=>setFieldTouched('sex')}
                        />
                        {touched.sex && errors.sex && (
                            <Text style={{ color: 'red' }}>{errors.sex}</Text>
                        )}
                        <AppButton
                            marginTop={30}
                            title="Lưu"
                            onPress={() =>{
                                if(isValid){
                                    navigation.navigate('Account', {
                                        newName: values.name,
                                        newDOB: values.dob,
                                        newSex: values.sex
                                    });
                                    console.log("Lưu thành công");
                                    console.log(values.name);
                                    console.log(values.dob);
                                    console.log(values.sex);

                                }else{
                                    console.log("Dữ liệu không hợp lệ");
                                }
                            }} 
                        />
                    </>
                )}
            </Formik>

        </SafeAreaView>
    )
}

export default UpdateProfile

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 50,
        backgroundColor: COLOR.background,
        flexDirection: 'row',
        //alignItems: 'center',
        paddingHorizontal: 0,
        justifyContent: 'flex-start'
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
    }
})