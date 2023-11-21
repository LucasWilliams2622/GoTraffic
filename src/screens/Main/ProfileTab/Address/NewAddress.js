import { KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { appStyle } from '../../../../constants/AppStyle'
import Header from '../../../../components/Header'
import { COLOR, ICON } from '../../../../constants/Theme'
import ButtonSelected from '../../../../components/ButtonSelected'
import AppInput from '../../../../components/AppInput'
import SwitchToggle from "react-native-switch-toggle";
import AppButton from '../../../../components/AppButton'
import AppDropdown from '../../../../components/AppDropdown'
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { AppContext } from '../../../../utils/AppContext'
import AppHeader from '../../../../components/AppHeader'
import * as yup from 'yup';
import { useFormik } from 'formik';
import { showToastMessage } from '../../../../utils/utils'


const validationSchema = yup.object().shape({
    selectedProvince: yup.object().required('Vui lòng chọn tỉnh/thành phố'),
    selectedDistrict: yup.object().required('Vui lòng chọn quận/huyện'),
    selectedWard: yup.object().required('Vui lòng chọn phường/xã'),
    nickName: yup.string().max(20, 'Tên gợi nhớ tối đa 20 kí tự').required('Vui lòng nhập tên gợi nhớ'),
    address: yup.string().required('Vui lòng nhập địa chỉ cụ thể').max(30, 'Địa chỉ tối đa 30 kí tự').matches(/^[a-zA-Z0-9\s]+$/, 'Địa chỉ không được chứa kí tự đặc biệt'),
});

const NewAddress = (props) => {
    const { navigation } = props;
    const { infoUser, idUser } = useContext(AppContext);

    const [isSelected, setIsSelected] = useState(null);
    const [onSwitch, setOnSwitch] = useState(false);
    const [nickName, setNickName] = useState(null);

    const [provinces, setProvinces] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [districts, setDistricts] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [wards, setWards] = useState([]);
    const [selectedWard, setSelectedWard] = useState(null);
    const [address, setAddress] = useState(null);

    const formik = useFormik({
        initialValues: {
            selectedProvince: selectedProvince,
            selectedDistrict: selectedDistrict,
            selectedWard: selectedWard,
            nickName: '',
            address: '',
        },
        validationSchema: validationSchema,
        onSubmit: values => {
            // Xử lý submit
            console.log(values);
            // Nếu không có lỗi, thực hiện các xử lý tiếp theo
            handleSave();
        },
    });

    const newAddress = async () => {
        try {
            const response = await axios.post(`http://103.57.129.166:3000/address/api/add-new-address`, {
                idUser: idUser,
                city: selectedProvince?.name,
                district: selectedDistrict?.name,
                ward: selectedWard?.name,
                street: isSelected,
                number: '',
                note: nickName,
                address: address,
                isDefault: onSwitch

            });
            // console.log("======>",response.data);
            console.log('Địa chỉ mới:', response.data);
            const newAddressData = {
                idUser: idUser,
                city: selectedProvince?.name,
                district: selectedDistrict?.name,
                ward: selectedWard?.name,
                street: isSelected,
                number: '',
                note: nickName,
                address: address,
                isDefault: onSwitch
            };
            navigation.navigate('MyAddress', { newAddressData });
        } catch (error) {
            console.log(error);
            showToastMessage('error','Chưa đủ thông tin!')
            console.log(error.response?.data);
        }
    }

    useEffect(() => {
        // Gọi API để lấy danh sách tỉnh/thành phố và set nó vào state 'provinces'
        fetch('https://provinces.open-api.vn/api/p/')
            .then((response) => response.json())
            .then((data) => {
                setProvinces(data);
                //console.log(data);
                // Chọn tỉnh/thành phố mặc định (nếu muốn)
                // setSelectedProvince(data[0]); // Chọn tỉnh/thành phố đầu tiên trong danh sách
            })
            .catch((error) => {
                console.error('Lỗi khi lấy dữ liệu từ API: ', error);
            });
    }, []);

    useEffect(() => {
        if (selectedProvince) {
            axios.get(`https://provinces.open-api.vn/api/p/${selectedProvince.code}?depth=2`)
                .then((response) => {
                    //alert(JSON.stringify(response.data));
                    // console.log(response.data);
                    setDistricts(response.data.districts);
                    //setSelectedDistrict(response.data.districts[0]);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [selectedProvince]);

    useEffect(() => {
        if (selectedDistrict) {
            axios.get(`https://provinces.open-api.vn/api/d/${selectedDistrict.code}?depth=2`)
                .then((response) => {
                    //console.log(response.data);
                    setWards(response.data.wards);
                    //setSelectedWard(response.data[0]);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [selectedDistrict]);

    const handleSwitchToggle = () => {
        setOnSwitch(!onSwitch);
    };

    const handleButtonPress = (buttonName) => {
        setIsSelected(buttonName);
    };
    return (
        <SafeAreaView style={[appStyle.container]}>
            <AppHeader
                title='Chi tiết địa chỉ'
            />
            <KeyboardAwareScrollView behavior='padding'>
                <View style={{ width: '100%', padding: 15 }}>
                    <Text style={[appStyle.text18, { fontWeight: '600' }]}>Loại địa chỉ</Text>
                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <ButtonSelected
                            text="Nhà riêng"
                            icon={ICON.Home}
                            isSelected={isSelected === 'Nhà riêng'}
                            onPress={() => handleButtonPress('Nhà riêng')}
                        />
                        <ButtonSelected
                            text="Công ty"
                            icon={ICON.Company}
                            isSelected={isSelected === 'Công ty'}
                            onPress={() => handleButtonPress('Công ty')}
                        />
                        <ButtonSelected
                            text="Khác"
                            icon={ICON.Other}
                            isSelected={isSelected === 'Khác'}
                            onPress={() => handleButtonPress('Khác')}
                        />
                    </View>


                    <View>
                        <Text style={[appStyle.text18, { fontWeight: '500', marginTop: 10 }]}>Tên gợi nhớ</Text>
                        <AppInput
                            placeholder="Nhập tên cho địa chỉ"
                            placeholderStyle={{ fontSize: 14 }}
                            value={nickName}
                            onChangeText={(text) => {
                                formik.setFieldValue('nickName', text);
                                setNickName(text);
                            }}
                        />
                        {formik.errors.nickName && formik.touched.nickName ? (
                            <Text style={appStyle.errorText}>{formik.errors.nickName}</Text>
                        ) : null}
                    </View>

                    <View>
                        <Text style={[appStyle.text18, { fontWeight: '500', marginTop: 10 }]}>Tỉnh/Thành phố</Text>
                        <AppDropdown
                            placeholderStyle={{ fontSize: 14 }}
                            fontSize={16}
                            labelField="name"
                            valueField="name"
                            placeholder="Tỉnh/Thành phố"
                            data={provinces}
                            value={selectedProvince}
                            onChange={val => {
                                formik.setFieldValue('selectedProvince', val);
                                setSelectedProvince(val);
                            }}
                        />
                        {formik.errors.selectedProvince && formik.touched.selectedProvince ? (
                            <Text style={appStyle.errorText}>{formik.errors.selectedProvince}</Text>
                        ) : null}
                    </View>

                    <View>
                        <Text style={[appStyle.text18, { fontWeight: '500', marginTop: 10 }]}>Quận Huyện</Text>
                        <AppDropdown
                            placeholderStyle={{ fontSize: 14 }}
                            fontSize={16}
                            labelField="name"
                            valueField="name"
                            placeholder="Quận Huyện"
                            data={districts}
                            value={selectedDistrict?.name}
                            onChange={(val) => {
                                formik.setFieldValue('selectedDistrict', val);
                                setSelectedDistrict(val);
                                setSelectedWard(null);
                            }}
                        />
                        {formik.errors.selectedDistrict && formik.touched.selectedDistrict ? (
                            <Text style={appStyle.errorText}>{formik.errors.selectedDistrict}</Text>
                        ) : null}
                    </View>

                    <View>
                        <Text style={[appStyle.text18, { fontWeight: '500', marginTop: 10 }]}>Phường Xã</Text>
                        <AppDropdown
                            labelField="name"
                            valueField="name"
                            placeholder="Phường Xã"
                            data={wards}
                            value={selectedWard?.name}
                            onChange={(val) => {
                                formik.setFieldValue('selectedWard', val);
                                setSelectedWard(val);
                            }}
                        />
                        {formik.errors.selectedWard && formik.touched.selectedWard ? (
                            <Text style={appStyle.errorText}>{formik.errors.selectedWard}</Text>
                        ) : null}
                    </View>

                    <View>
                        <Text style={[appStyle.text18, { fontWeight: '500', marginTop: 10 }]}>Địa chỉ</Text>
                        <AppInput
                            placeholder="Nhập tên cho địa chỉ"
                            placeholderStyle={{ fontSize: 14 }}
                            value={address}
                            onChangeText={(text) => {
                                formik.setFieldValue('address', text);
                                setAddress(text);
                            }}
                        />
                        {formik.errors.address && formik.touched.address ? (
                            <Text style={appStyle.errorText}>{formik.errors.address}</Text>
                        ) : null}
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-between' }}>
                        <Text style={[appStyle.text14, { fontWeight: '500' }]}>Đặt làm địa chỉ mặc định</Text>
                        <SwitchToggle
                            switchOn={onSwitch}
                            onPress={handleSwitchToggle}
                            circleColorOff={COLOR.background}
                            circleColorOn={COLOR.background}
                            backgroundColorOn={COLOR.primary}
                            backgroundColorOff='#C4C4C4'
                            containerStyle={{
                                width: 42,
                                height: 24,
                                borderRadius: 25,
                                padding: 2,
                            }}
                            circleStyle={{
                                width: 21,
                                height: 20,
                                borderRadius: 20,
                            }}
                        />
                        {/* <Switch switchOn={onSwitch} onPress={handleSwitchToggle}/> */}
                    </View>

                    <AppButton
                        title="Lưu"
                        marginTop={60}
                        onPress={() => {
                            if (!formik.isValidating && formik.isValid) {
                                newAddress();
                            } else {
                                console.log("Form không hợp lệ");
                                formik.submitForm();
                            }
                        }}
                    />

                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}

export default NewAddress
const styles = StyleSheet.create({})