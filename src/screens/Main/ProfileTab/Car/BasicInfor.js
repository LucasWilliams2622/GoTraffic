import { StyleSheet, SafeAreaView, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { COLOR, ICON } from '../../../../constants/Theme';
import Header from '../../../../components/Header';
import { appStyle, windowWidth, windowHeight } from '../../../../constants/AppStyle';
import AppInput from '../../../../components/AppInput';
import { ScrollView } from 'native-base';
import AppButton from '../../../../components/AppButton';
import AppDropdown from '../../../../components/AppDropdown';
import { listBrand, listModal } from '../../../../components/Profile/data/DataCar';
import { useNavigation } from '@react-navigation/native';


const seatNumbers = [];
for (let i = 4; i <= 16; i++) {
    seatNumbers.push({ label: i.toString(), value: i.toString() });
}

const productionYears = [];
for (let year = 2008; year <= 2023; year++) {
    productionYears.push({ label: year.toString(), value: year.toString() });
}

const transmissionOptions = [
    { label: 'Số sàn', value: 'manual' },
    { label: 'Số tự động', value: 'automatic' },
];

const fuelOptions = [
    { label: 'Xăng', value: 'Xăng' },
    { label: 'Dầu Diesel', value: 'Dầu Diesel' },
    { label: 'Điện', value: 'Điện' },
];

const BasicInfor = (props) => {
    const navigation = useNavigation();

    const [carNumber, setCarNumber] = useState(null);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [selectedModel, setSelectedModel] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState(null);
    const [selectedYear, setSelectedYear] = useState(null);
    const [selectedTransmission, setSelectedTransmission] = useState('manual');
    const [selectedFuel, setSelectedFuel] = useState('Xăng');

    const handleNext = () => {
        const carInfo = {
            carNumber,
            selectedBrand,
            selectedModel,
            selectedSeats,
            selectedYear,
            selectedTransmission,
            selectedFuel
        }
        navigation.navigate('DetailsInfor', { carInfo: carInfo });
    }

    return (
        <SafeAreaView style={appStyle.container}>
            <Header
                backgroundColor={COLOR.bgHeader}
                text="Thông tin cơ bản"
                icon={ICON.Back}
                onPress={() => navigation.navigate('ListCar')}
            />
            <View style={{ flex: 1, paddingHorizontal: 10 }} >
                <ScrollView style={{ flex: 1, width: '100%', marginBottom: 20 }}
                    showsVerticalScrollIndicator={false}>
                    <View style={{ paddingHorizontal: 15 }}>
                        <View style={[appStyle.cardInfo, { paddingVertical: 30, borderTopWidth: 0 }]}>
                            <Text style={{ color: COLOR.textWarn, fontWeight: '300' }}>
                                Lưu ý: Bạn sẽ không thể thay đổi các thông tin
                                về xe sau khi tạo xe thành công. Vì vậy, bạn cần phải
                                điền chính xác các thông tin này dựa trên giấy tờ xe.
                            </Text>
                        </View>

                        <View style={[appStyle.cardInfo, { marginTop: 10 }]}>
                            <View style={appStyle.rowContent}>
                                <Text style={appStyle.text165}>Biển số xe</Text>
                                <AppInput
                                    width={windowWidth * 0.4}
                                    placeholder=""
                                    value={carNumber}
                                    onChangeText={(text) => setCarNumber(text)}

                                />
                            </View>
                            <Text style={{ marginTop: 5 }}>
                                Bạn cần điền chính xác biển số xe
                                theo đăng kiểm. Không dùng biển số giả hoặc biển
                                số không có thực.
                            </Text>
                        </View>

                        <View style={[appStyle.cardInfo]}>
                            <View style={appStyle.rowContent}>
                                <Text style={appStyle.text165}>Hãng xe</Text>
                                <AppDropdown
                                    width={windowWidth * 0.3}
                                    height={windowHeight * 0.04}
                                    borderWidth={0}
                                    labelField="label"
                                    valueField="value"
                                    data={listBrand}
                                    value={selectedBrand}
                                    onChange={(brand) => {
                                        setSelectedBrand(brand.value);
                                        setSelectedModel(null);
                                    }}
                                />
                            </View>
                        </View>


                        <View style={[appStyle.cardInfo]}>
                            <View style={appStyle.rowContent}>
                                <Text style={appStyle.text165}>Mẫu xe</Text>
                                {selectedBrand && (
                                    <AppDropdown
                                        width={windowWidth * 0.3}
                                        height={windowHeight * 0.04}
                                        borderWidth={0}
                                        labelField="label"
                                        valueField="value"
                                        data={listModal[selectedBrand]}
                                        value={selectedModel}
                                        onChange={(model) => {
                                            setSelectedModel(model.value);
                                        }}
                                    />
                                )}
                            </View>
                        </View>


                        <View style={[appStyle.cardInfo]}>
                            <View style={appStyle.rowContent}>
                                <Text style={appStyle.text165}>Năm sản xuất</Text>
                                <AppDropdown
                                    width={windowWidth * 0.3}
                                    height={windowHeight * 0.04}
                                    borderWidth={0}
                                    labelField="label"
                                    valueField="value"
                                    data={productionYears}
                                    value={selectedYear}
                                    onChange={(year) => {
                                        setSelectedYear(year.value);
                                    }}
                                />
                            </View>
                        </View>

                        <View style={[appStyle.cardInfo]}>
                            <View style={appStyle.rowContent}>
                                <Text style={appStyle.text165}>Số ghế</Text>
                                <AppDropdown
                                    width={windowWidth * 0.3}
                                    height={windowHeight * 0.04}
                                    borderWidth={0}
                                    labelField="label"
                                    valueField="value"
                                    data={seatNumbers}
                                    value={selectedSeats}
                                    onChange={(seats) => {
                                        setSelectedSeats(seats.value);
                                    }}
                                />
                            </View>
                        </View>

                        <View style={appStyle.cardInfo}>
                            <View style={appStyle.rowContent}>
                                <Text style={appStyle.text165}>Truyền động</Text>
                                <View style={{ flexDirection: 'row', backgroundColor: COLOR.gray, borderRadius: 8 }}>
                                    {transmissionOptions.map((option) => (
                                        <TouchableOpacity
                                            key={option.value}
                                            style={[
                                                {
                                                    marginHorizontal: 0,
                                                    backgroundColor:
                                                        selectedTransmission === option.value ? 'black' : 'transparent',
                                                    borderRadius: 8,
                                                    padding: 5,

                                                },
                                            ]}
                                            onPress={() => {
                                                setSelectedTransmission(option.value);
                                            }}
                                        >
                                            <Text style={{
                                                fontSize: 16,
                                                marginHorizontal: 3,
                                                color: selectedTransmission === option.value ? 'white' : 'black',
                                                fontWeight: selectedTransmission === option.value ? 'bold' : 'normal'
                                            }}>{option.label}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>
                        </View>

                        <View style={[appStyle.cardInfo, { borderBottomWidth: 0 }]}>
                            <View style={[appStyle.rowContent]}>
                                <Text style={appStyle.text165}>Nhiên liệu</Text>
                                <View style={{ flexDirection: 'row', backgroundColor: COLOR.gray, borderRadius: 8 }}>
                                    {fuelOptions.map((option) => (
                                        <TouchableOpacity
                                            key={option.value}
                                            style={[
                                                {
                                                    marginHorizontal: 0,
                                                    backgroundColor: selectedFuel === option.value ? 'black' : 'transparent',
                                                    borderRadius: 8,
                                                    padding: 5,
                                                },
                                            ]}
                                            onPress={() => {
                                                setSelectedFuel(option.value);
                                            }}
                                        >
                                            <Text style={{
                                                fontSize: 16,
                                                marginHorizontal: 3,
                                                color: selectedFuel === option.value ? 'white' : 'black',
                                                fontWeight: selectedFuel === option.value ? 'bold' : 'normal'
                                            }}>{option.label}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>
                        </View>

                    </View>
                </ScrollView>
                <AppButton
                    title="Tiếp theo"
                    marginBottom={70}
                    onPress={() => handleNext()}
                />
            </View>
        </SafeAreaView>
    )

}

export default BasicInfor

const styles = StyleSheet.create({})