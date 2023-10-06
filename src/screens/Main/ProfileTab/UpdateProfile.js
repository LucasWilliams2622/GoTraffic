import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, PermissionsAndroid } from 'react-native'
import React, { useState } from 'react'
import { appStyle } from '../../../constants/AppStyle'
import { COLOR, ICON } from '../../../constants/Theme'
import FastImage from 'react-native-fast-image'
import AppInput from '../../../components/AppInput'
import AppButton from '../../../components/AppButton'
import { launchCamera, ImagePicker } from 'react-native-image-picker';
const UpdateProfile = (props) => {
    const { navigation } = props;
    const [image, setimage] = useState(null);
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
                setimage(result.assets[0].uri);

            } else {
                console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };
    return (
        <SafeAreaView style={[appStyle.container, { padding: 15 }]}>
            <View>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.navigate('Account')}>
                        <FastImage
                            source={ICON.Close}
                            style={[appStyle.iconBig]}
                        />
                    </TouchableOpacity>
                    <Text style={[appStyle.text20, { marginLeft: 110 }]}>Chỉnh sửa</Text>
                </View>
            </View>

            {/* Avatar */}
            {image ? (
                <FastImage source={{ uri: image }} style={[appStyle.avatar]} />
            ) : (
                <FastImage source={require('../../../assets/image/guide/img_book.jpg')} style={[appStyle.avatar]} />
            )}

            {/* Upload image */}
            <TouchableOpacity
                style={styles.viewCamera}
                onPress={() => requestCameraPermission()}>
                <FastImage source={ICON.Camera} style={[appStyle.iconBig]}></FastImage>
            </TouchableOpacity>

            {/* Validate */}
            <View>
                <Text style={[appStyle.text18]}>Tên người dùng</Text>
                <AppInput value="Tên" />
            </View>
            <View style={{ marginTop: 15 }}>
                <Text style={[appStyle.text18]}>Ngày sinh</Text>
                <AppInput value="01/01/1992" />
            </View>
            <View style={{ marginTop: 15 }}>
                <Text style={[appStyle.text18]}>Giới tính</Text>
                <AppInput value="Nam" />
            </View>
            <AppButton
                marginTop={30}
                title="Lưu"
                onPress={() => navigation.navigate('Account')}
            />
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