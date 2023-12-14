import { StyleSheet, SafeAreaView, Text, View, TextInput } from 'react-native';
import React, { useState, useMemo, useEffect } from 'react';
import { COLOR, ICON } from '../../../../constants/Theme';
import {
  appStyle,
  windowWidth,
  windowHeight,
} from '../../../../constants/AppStyle';
import AppInput from '../../../../components/AppInput';
import { ScrollView } from 'native-base';
import AppButton from '../../../../components/AppButton';
import AppDropdown from '../../../../components/AppDropdown';
import Brand from '../../../../components/Profile/Brand';
import Model from '../../../../components/Profile/Model';
import Year from '../../../../components/Profile/Year';
import OptionDropdown from '../../../../components/Profile/OptionDropdown';
import { useNavigation } from '@react-navigation/native';
import AppHeader from '../../../../components/AppHeader';
import { showToastMessage } from '../../../../utils/utils';
import axios from 'axios';

const seatNumbers = [];
for (let i = 4; i <= 16; i++) {
  seatNumbers.push({ label: i.toString(), value: i.toString() });
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

const BasicInfor = props => {
  const navigation = useNavigation();

  const [carNumber, setCarNumber] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedTransmission, setSelectedTransmission] = useState('manual');
  const [selectedFuel, setSelectedFuel] = useState('Xăng');

  const seatNumbers = useMemo(() => {
    const numbers = [];
    for (let i = 4; i <= 16; i++) {
      numbers.push({ label: i.toString(), value: i.toString() });
    }
    return numbers;
  }, []);

  useEffect(() => {
    const carInfo = {
      carNumber,
      selectedBrand,
      selectedModel,
      selectedSeats,
      selectedYear,
      selectedTransmission,
      selectedFuel,
    };
    // Cập nhật giá trị carInfo khi có sự thay đổi
    navigation.setParams({ carInfo });
  }, [
    carNumber,
    selectedBrand,
    selectedModel,
    selectedSeats,
    selectedYear,
    selectedTransmission,
    selectedFuel,
  ]);

  const handleNext = async () => {
    if (
      !carNumber ||
      !selectedBrand ||
      !selectedModel ||
      !selectedSeats ||
      !selectedYear ||
      !selectedTransmission ||
      !selectedFuel
    ) {
      showToastMessage('error', 'Vui lòng nhập đầy đủ thông tin xe');
    } else {
      const isCarNumberExist = await checkCarNumberExists(carNumber);
      if (isCarNumberExist) {
        showToastMessage('error', 'Biển số xe đã tồn tại ');
      } else {
        const carInfo = {
          carNumber,
          selectedBrand,
          selectedModel,
          selectedSeats,
          selectedYear,
          selectedTransmission,
          selectedFuel,
        };
        navigation.navigate('DetailsInfor', { carInfo: carInfo });
      }
    }
  };

  const checkCarNumberExists = async (carNumber) => {
    try {
      const response = await axios.get(`http://103.57.129.166:3000/car/api/check-car-exist?numberPlate=${carNumber}`);
      const result = await response.data.result;
      return result;
    } catch (error) {
      console.log('Lỗi check biển số xe', error);
      return false;
    }
  };

  return (
    <SafeAreaView style={appStyle.container}>
      <AppHeader title="Thông tin cơ bản" />
      <ScrollView
        style={[appStyle.main, { marginBottom: 20 }]}
        showsVerticalScrollIndicator={false}>
        <View style={{}}>
          <Text style={styles.textWarn}>
            Lưu ý: Bạn sẽ không thể thay đổi các thông tin về xe sau khi tạo xe
            thành công. Vì vậy, bạn cần phải điền chính xác các thông tin này
            dựa trên giấy tờ xe.
          </Text>

          <View style={[appStyle.cardInfo, { marginTop: 24 }]}>
            <View style={appStyle.rowContent}>
              <Text style={appStyle.text165}>Biển số xe</Text>
              <TextInput
                placeholder="Nhập biển số xe"
                placeholderTextColor={'gray'}
                value={carNumber}
                style={{ width: '50%' }}
                textAlign="right"
                onChangeText={text => setCarNumber(text)}
              />
            </View>

            <Text style={{ marginTop: 8 }}>
              Bạn cần điền chính xác biển số xe theo đăng kiểm. Không dùng biển
              số giả hoặc biển số không có thực.
            </Text>
          </View>

          <Brand
            selectedBrand={selectedBrand}
            setSelectedBrand={setSelectedBrand}
          />

          <Model
            selectedBrand={selectedBrand}
            selectedModel={selectedModel}
            setSelectedModel={setSelectedModel}
          />
          <Year selectedYear={selectedYear} setSelectedYear={setSelectedYear} />

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
                onChange={seats => {
                  setSelectedSeats(seats.value);
                }}
              />
            </View>
          </View>

          <View style={appStyle.cardInfo}>
            <View style={appStyle.rowContent}>
              <Text style={appStyle.text165}>Truyền động</Text>
              <OptionDropdown
                options={transmissionOptions}
                selectedOption={selectedTransmission}
                setSelectedOption={setSelectedTransmission}
              />
            </View>
          </View>

          <View style={[appStyle.cardInfo, { borderBottomWidth: 0 }]}>
            <View style={[appStyle.rowContent]}>
              <Text style={appStyle.text165}>Nhiên liệu</Text>
              <OptionDropdown
                options={fuelOptions}
                selectedOption={selectedFuel}
                setSelectedOption={setSelectedFuel}
              />
            </View>
          </View>
        </View>

        <AppButton
          title="Tiếp theo"
          marginBottom={70}
          marginTop={24}
          onPress={() => handleNext()}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default BasicInfor;

const styles = StyleSheet.create({
  textWarn: {
    color: COLOR.textWarn,
    lineHeight: 20,
  },
});
