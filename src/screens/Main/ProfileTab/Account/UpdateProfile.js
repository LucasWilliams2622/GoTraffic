import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, PermissionsAndroid, Modal } from 'react-native'
import React, { useState, useContext } from 'react'
import { appStyle, windowHeight } from '../../../../constants/AppStyle'
import { COLOR, ICON } from '../../../../constants/Theme'
import FastImage from 'react-native-fast-image'
import AppInput from '../../../../components/AppInput'
import AppButton from '../../../../components/AppButton'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Header from '../../../../components/Header'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { AppContext } from '../../../../utils/AppContext'
import AxiosInstance from '../../../../constants/AxiosInstance'
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message'

const UpdateProfile = (props) => {
    const navigation = useNavigation();
    const [imageLoaded, setImageLoaded] = useState(false)
    const [isModalVisible, setModalVisible] = useState(false);
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const { setIsLogin, infoUser, idUser } = useContext(AppContext);
    const [image, setImage] = useState(null);
    const [name, setName] = useState(infoUser.name)
    const [dob, setdob] = useState(infoUser.dob)
    const handleUpdate = async () => {
        try {
            const response = await AxiosInstance().put(
                '/user/api/update?id=' + idUser, {
                name: name,
                firstName: "",
                lastName: "",
                email: infoUser.email,
                gender: "string",
                dob: dob,
                avatar: image
            }
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
            console.log('error', e)
        }
    }

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
                const result = await launchCamera();
                const formData = new FormData();
                formData.append('image', {
                    uri: result.assets[0].uri,
                    type: 'icon/icon_jpeg',
                    name: 'image.jpg',
                });

                const response = await AxiosInstance("multipart/form-data").post('/car/api/upload-single-image', formData);
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
                }
                else {
                    Toast.show({
                        type: 'error',
                        text1: 'Upload ảnh thất bại',
                        visibilityTime: 2000,
                        autoHide: true,
                        topOffset: 30,
                        bottomOffset: 40,
                    });
                }
                setImage(result.assets[0].uri);
                toggleModal();

            } else {
                console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };

    const chooseImage = () => {
        const options = {
            mediaType: 'photo',
        };

        launchImageLibrary(options, (response) => {
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
        dob: Yup.string()
            .matches(
                /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(194[5-9]|19[5-9]\d|20[0-2][0-3])$/,
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
                    <FastImage source={{ uri: image }} style={[appStyle.avatar, { marginTop: 20 }]} resizeMode='stretch' />
                ) : (
                    <FastImage source={require('../../../../assets/image/guide/img_friends.png')} style={[appStyle.avatar, { marginTop: 20 }]} />
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
                <KeyboardAwareScrollView behavior='padding'>
                    <Formik
                        initialValues={{
                            name: 'Bảo',
                            dob: '11/01/1992',
                            sex: 'Nữ',
                        }}
                        validationSchema={AccountSchema}
                        onSubmit={(values, { setSubmitting }) => {
                            // Kiểm tra tính hợp lệ bằng cách sử dụng setSubmitting
                            setSubmitting(true); // Đánh dấu rằng việc xác thực đang diễn ra
                            AccountSchema.validate(values)
                                .then(valid => {
                                    if (valid) {
                                        setName(values.name)
                                        setdob(values.dob)
                                        handleUpdate()
                                    } else {
                                        console.log("Dữ liệu không hợp lệ");
                                    }
                                })
                                .finally(() => {
                                    setSubmitting(false); // Kết thúc quá trình xác thực
                                });
                        }}
                    >
                        {({ values, errors, touched, handleChange, setFieldTouched, handleSubmit }) => (
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
                                    onPress={handleSubmit}
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
        width: '100%',
        height: windowHeight * 0.18,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
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