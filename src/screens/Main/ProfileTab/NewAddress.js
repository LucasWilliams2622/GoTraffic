import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { appStyle } from '../../../constants/AppStyle'
import Header from '../../../components/Header'
import { COLOR, ICON } from '../../../constants/Theme'
import FastImage from 'react-native-fast-image'
import ButtonSelected from '../../../components/ButtonSelected'
import AppInput from '../../../components/AppInput'
import SwitchToggle from "react-native-switch-toggle";
import AppButton from '../../../components/AppButton'
import { Dropdown } from 'react-native-element-dropdown';
import AppDropdown from '../../../components/AppDropdown'
import axios from 'axios';



const NewAddress = (props) => {
    const { navigation } = props;
    const [isSelected, setisSelected] = useState(null);
    const [onSwitch, setonSwitch] = useState(false);
    const [value, setValue] = useState(null);
    const [provinces, setProvinces] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [districts, setDistricts] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [wards, setWards] = useState([]);
    const [selectedWard, setSelectedWard] = useState(null);

    useEffect(() => {
        // Gọi API để lấy danh sách tỉnh/thành phố và set nó vào state 'provinces'
        fetch('https://provinces.open-api.vn/api/p/')
            .then((response) => response.json())
            .then((data) => {
                setProvinces(data);
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

    // const data = [
    //     { label: 'Item 1', value: '1' },
    //     { label: 'Item 2', value: '2' },
    //     { label: 'Item 3', value: '3' },
    //     { label: 'Item 4', value: '4' },
    //     { label: 'Item 5', value: '5' },
    //     { label: 'Item 6', value: '6' },
    //     { label: 'Item 7', value: '7' },
    //     { label: 'Item 8', value: '8' },
    // ];

    const handleSwitchToggle = () => {
        setonSwitch(!onSwitch); // Thay đổi giá trị của state khi SwitchToggle được bật/tắt
    };

    const handleButtonPress = (buttonName) => {
        setisSelected(buttonName);
    };
    return (
        <SafeAreaView style={[appStyle.container, { padding: 15 }]}>
            <Header
                icon={ICON.Back}
                text="Chi tiết địa chỉ"
                marginLeft={90}
                onPress={() => navigation.navigate('MyAddress')}
            />
            <Text style={[appStyle.text18, { fontWeight: '600' }]}>Loại địa chỉ</Text>
            <View style={{ flexDirection: 'row' }}>
                <ButtonSelected
                    text="Nhà riêng"
                    icon={ICON.Home}

                    isSelected={isSelected === 'button1'}
                    onPress={() => handleButtonPress('button1')}
                />
                <ButtonSelected
                    text="Công ty"
                    icon={ICON.Company}
                    isSelected={isSelected === 'button2'}
                    onPress={() => handleButtonPress('button2')}
                />
                <ButtonSelected
                    text="Khác"
                    icon={ICON.Other}
                    isSelected={isSelected === 'button3'}
                    onPress={() => handleButtonPress('button3')}
                />
            </View>
            <Text style={[appStyle.text18, { fontWeight: '500', marginTop: 10 }]}>Tên gợi nhớ</Text>
            <AppInput
                placeholder="Nhập tên cho địa chỉ"
                placeholderStyle={{ fontSize: 14 }}
            />
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
            <Text style={[appStyle.text18, { fontWeight: '500', marginTop: 10 }]}>Địa chỉ</Text>
            <AppInput
                placeholder="Nhập tên cho địa chỉ"
            />
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
                        width: 45,
                        height: 24,
                        borderRadius: 25,
                        padding: 2,
                    }}
                    circleStyle={{
                        width: 20,
                        height: 20,
                        borderRadius: 20,
                    }}
                />
            </View>
            <AppButton
                title="Lưu"
                marginTop={30}
                onPress={() => navigation.navigate('MyAddress')}
            />
        </SafeAreaView>
    )
}

export default NewAddress

const styles = StyleSheet.create({
    dropdown: {
        height: 50,
        maxWidth: '100%',
        borderBottomColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 6
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
})