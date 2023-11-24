import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {COLOR, ICON} from '../../../../constants/Theme';
import Header from '../../../../components/Header';
import {
  appStyle,
  windowWidth,
  windowHeight,
} from '../../../../constants/AppStyle';
import AppInput from '../../../../components/AppInput';
import {ScrollView} from 'native-base';
import AppButton from '../../../../components/AppButton';
import AppDropdown from '../../../../components/AppDropdown';
import Brand from '../../../../components/Profile/Brand';
import Model from '../../../../components/Profile/Model';
import Year from '../../../../components/Profile/Year';
import OptionDropdown from '../../../../components/Profile/OptionDropdown';
import {useNavigation} from '@react-navigation/native';
import AppHeader from '../../../../components/AppHeader';
import {showToastMessage} from '../../../../utils/utils';

const seatNumbers = [];
for (let i = 4; i <= 16; i++) {
  seatNumbers.push({label: i.toString(), value: i.toString()});
}

const transmissionOptions = [
  {label: 'Số sàn', value: 'manual'},
  {label: 'Số tự động', value: 'automatic'},
];

const fuelOptions = [
  {label: 'Xăng', value: 'Xăng'},
  {label: 'Dầu Diesel', value: 'Dầu Diesel'},
  {label: 'Điện', value: 'Điện'},
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

  const handleNext = () => {
    const carInfo = {
      carNumber,
      selectedBrand,
      selectedModel,
      selectedSeats,
      selectedYear,
      selectedTransmission,
      selectedFuel,
    };
     if (
       carNumber == null ||
       selectedBrand == null ||
       selectedModel == null ||
       selectedSeats == null ||
       selectedYear == null ||
       selectedTransmission == null ||
       selectedFuel == null
     ) {
       showToastMessage(
         '',
         'Vui lòng nhập đầy đủ thông tin xe',
         ICON.cancelWhite,
       );
     } else {
       navigation.navigate('DetailsInfor', {carInfo: carInfo});
     }
    //navigation.navigate('DetailsInfor', {carInfo: carInfo});
  };

  return (
    <SafeAreaView style={appStyle.container}>
      {/* <Header
                backgroundColor={COLOR.bgHeader}
                text="Thông tin cơ bản"
                icon={ICON.Back}
                onPress={() => navigation.navigate('ListCar')}
            /> */}
      <AppHeader title="Thông tin cơ bản" />
      <View style={{flex: 1, paddingHorizontal: 10}}>
        <ScrollView
          style={{flex: 1, width: '100%', marginBottom: 20}}
          showsVerticalScrollIndicator={false}>
          <View style={{paddingHorizontal: 15}}>
            <View
              style={[
                appStyle.cardInfo,
                {paddingVertical: 30, borderTopWidth: 0},
              ]}>
              <Text style={{color: COLOR.textWarn, fontWeight: '300'}}>
                Lưu ý: Bạn sẽ không thể thay đổi các thông tin về xe sau khi tạo
                xe thành công. Vì vậy, bạn cần phải điền chính xác các thông tin
                này dựa trên giấy tờ xe.
              </Text>
            </View>

            <View style={[appStyle.cardInfo, {marginTop: 10}]}>
              <View style={appStyle.rowContent}>
                <Text style={appStyle.text165}>Biển số xe</Text>
                <AppInput
                  width={windowWidth * 0.4}
                  placeholder=""
                  value={carNumber}
                  onChangeText={text => setCarNumber(text)}
                />
              </View>
              <Text style={{marginTop: 5}}>
                Bạn cần điền chính xác biển số xe theo đăng kiểm. Không dùng
                biển số giả hoặc biển số không có thực.
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
            <Year
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
            />

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

            <View style={[appStyle.cardInfo, {borderBottomWidth: 0}]}>
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
        </ScrollView>

        <AppButton
          title="Tiếp theo"
          marginBottom={70}
          onPress={() => handleNext()}
        />
      </View>
    </SafeAreaView>
  );
};

export default BasicInfor;

const styles = StyleSheet.create({});
