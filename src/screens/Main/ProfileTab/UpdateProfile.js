import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, PermissionsAndroid, Modal } from 'react-native'
import React, { useState } from 'react'
import { appStyle, windowHeight } from '../../../constants/AppStyle'
import { COLOR, ICON } from '../../../constants/Theme'
import FastImage from 'react-native-fast-image'
import AppInput from '../../../components/AppInput'
import AppButton from '../../../components/AppButton'
import { launchCamera, ImagePicker } from 'react-native-image-picker';
import Header from '../../../components/Header'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const UpdateProfile = (props) => {
    const { navigation } = props;
    const [image, setImage] = useState(null);
    const [imageLoaded, setImageLoaded] = useState(false)
    const [isModalVisible, setModalVisible] = useState(false);
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };


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
                toggleModal();

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
        <SafeAreaView style={[appStyle.container]}>
            <Header
                icon={ICON.Close}
                text="Chỉnh sửa"
                onPress={() => navigation.navigate('Account')}
            //marginLeft={106}
            />
            <View style={{ width: '100%', padding: 15 }}>
                {/* Avatar */}
                {image ? (
                    <FastImage source={{ uri: image }} style={[appStyle.avatar, { marginTop: 20 }]} />
                ) : (
                    <FastImage source={require('../../../assets/image/guide/img_book.jpg')} style={[appStyle.avatar, { marginTop: 20 }]} />
                )}

                {/* Capture image */}
                <TouchableOpacity
                    style={styles.viewCamera}
                    onPress={() => toggleModal()}>
                    <FastImage source={ICON.Camera} style={[appStyle.iconBig]}></FastImage>
                </TouchableOpacity>
                <Modal
                    //isVisible={isModalVisible}
                    animationType='slide'
                    transparent={true}
                    visible={isModalVisible}>
                    <TouchableOpacity
                        style={styles.modalBackdrop}
                        onPress={toggleModal} // Close the modal when tapping outside
                    />
                    <View style={styles.modalContainer}>
                        {/* Add your camera and gallery buttons here */}
                        <AppButton
                            title="Chụp ảnh"
                            marginTop={5}
                            onPress={requestCameraPermission}
                        />
                        <AppButton
                            title="Chọn ảnh"
                            marginTop={5}
                            backgroundColor={COLOR.background}
                            textColor={COLOR.primary}
                        />
                    </View>

                </Modal>

                {/* Validate */}
                <KeyboardAwareScrollView behavior='padding'>
                    <Formik
                        initialValues={{
                            name: '',
                            dob: '',
                            sex: '',
                        }}
                        validationSchema={AccountSchema}
                    // onSubmit={(values) => {
                    //     if (isValid) {
                    //         navigation.navigate('Account', {
                    //             newName: values.name,
                    //             newDOB: values.dob,
                    //             newSex: values.sex
                    //         });
                    //         console.log("Lưu thành công");
                    //         console.log(values.name);
                    //         console.log(values.dob);
                    //         console.log(values.sex);
                    //     } else {
                    //         console.log("Dữ liệu không hợp lệ");
                    //     }
                    // }}
                    >
                        {({ values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit }) => (
                            <>
                                <View style={{ width: '100%', height: 'auto' }}>
                                    <Text style={[appStyle.text14, { color: COLOR.text2 }]}>Tên người dùng</Text>
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
                                    <Text style={[appStyle.text14, { color: COLOR.text2 }]}>Ngày sinh</Text>
                                    <AppInput
                                        placeholder="Ngày sinh"
                                        value={values.dob}
                                        onChangeText={handleChange('dob')}
                                        onBlur={() => setFieldTouched('dob')}
                                    />
                                    {touched.dob && errors.dob && (
                                        <Text style={{ color: 'red' }}>{errors.dob}</Text>
                                    )}
                                </View>

                                <View style={{ width: '100%', height: 'auto', marginTop: 15 }}>
                                    <Text style={[appStyle.text14, { color: COLOR.text2 }]}>Giới tính</Text>
                                    <AppInput
                                        placeholder="Giới tính"
                                        value={values.sex}
                                        onChangeText={handleChange('sex')}
                                        onBlur={() => setFieldTouched('sex')}
                                    />
                                    {touched.sex && errors.sex && (
                                        <Text style={{ color: 'red' }}>{errors.sex}</Text>
                                    )}
                                </View>

                                <AppButton
                                    marginTop={30}
                                    title="Lưu"
                                    onPress={(values) => {
                                        if (isValid) {
                                            navigation.navigate('Account', {
                                                newName: values.name,
                                                newDOB: values.dob,
                                                newSex: values.sex
                                            });
                                            console.log("Lưu thành công");
                                            console.log(values.name);
                                            console.log(values.dob);
                                            console.log(values.sex);
                                        } else {
                                            console.log("Dữ liệu không hợp lệ");
                                        }
                                    }}
                                />
                            </>
                        )}
                    </Formik>
                </KeyboardAwareScrollView>
            </View>
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
    },
    modalContainer: {
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 10,
        alignSelf: 'center',
        width: '95%',
        height: windowHeight * 0.16,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        paddingHorizontal: 10,
        paddingBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,

    },
    item: {
        backgroundColor: 'white',
        width: '100%',
        height: '40%',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLOR.primary,
        marginTop: 8
    },
    modalBackdrop: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background color
        justifyContent: 'center',
        alignItems: 'center',
    },
})