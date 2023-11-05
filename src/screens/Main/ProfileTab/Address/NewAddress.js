import { KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
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
import Switch from '../../../../components/Switch'

const NewAddress = (props) => {
    const { navigation } = props;
    const [isSelected, setisSelected] = useState(null);
    const [onSwitch, setonSwitch] = useState(false);
    const [nickName, setNickName] = useState(null);
    
    const [provinces, setProvinces] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [districts, setDistricts] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [wards, setWards] = useState([]);
    const [selectedWard, setSelectedWard] = useState(null);
    const [address, setAddress] = useState(null);
    const [addresses, setAddresses] = useState([]);


    const handleSaveButtonPress = () => {
        const newAddress = {
            type: isSelected,
            nickName: nickName,
            province: selectedProvince?.name,
            district: selectedDistrict?.name,
            ward: selectedWard?.name,
            address: address,
            isDefault: onSwitch,
        };
        const updatedAddresses = [...addresses];

        updatedAddresses.push(newAddress);
        setAddresses(updatedAddresses);
        console.log(newAddress);
        navigation.navigate('MyAddress', { updatedAddresses: [newAddress] });
    };

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
        setonSwitch(!onSwitch);
    };

    const handleButtonPress = (buttonName) => {
        setisSelected(buttonName);
    };
    return (
        <SafeAreaView style={[appStyle.container]}>
            <Header
                icon={ICON.Back}
                text="Chi tiết địa chỉ"
                onPress={() => navigation.navigate('MyAddress')}
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
                            onChangeText={(text) => setNickName(text)}
                        />
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
                            value={selectedProvince?.name}
                            onChange={(val) => {
                                setSelectedProvince(val);
                                setSelectedDistrict(null);
                                setSelectedWard(null);
                            }}
                        />
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
                                setSelectedDistrict(val);
                                setSelectedWard(null);
                            }}
                        />
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
                                setSelectedWard(val);
                            }}
                        />
                    </View>

                    <View>
                        <Text style={[appStyle.text18, { fontWeight: '500', marginTop: 10 }]}>Địa chỉ</Text>
                        <AppInput
                            placeholder="Nhập tên cho địa chỉ"
                            placeholderStyle={{ fontSize: 14 }}
                            value={address}
                            onChangeText={(text) => setAddress(text)}
                        />
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
                        onPress={() => handleSaveButtonPress()}
                    />

                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}

export default NewAddress
const styles = StyleSheet.create({})