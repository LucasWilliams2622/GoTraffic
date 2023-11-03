import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { appStyle } from '../../../../constants/AppStyle'
import AppButton from '../../../../components/AppButton'
import AppDropdown from '../../../../components/AppDropdown'

const Form = () => {
    return (
        <View style={appStyle.container}>
            <View style={{paddingHorizontal: 30}}>
                <AppDropdown
                    placeholderStyle={{ fontSize: 14 }}
                    borderWidth={0}
                    fontSize={16}
                    labelField="name"
                    valueField="name"
                    placeholder="Tỉnh/Thành phố"
                    // data={provinces}
                    // value={selectedProvince?.name}
                    // onChange={(val) => {
                    //     setSelectedProvince(val);
                    //     setSelectedDistrict(null);
                    //     setSelectedWard(null);
                    // }}
                />
            </View>

            {/* <View>
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
            </View> */}

        </View>
    )
}

export default Form

const styles = StyleSheet.create({})