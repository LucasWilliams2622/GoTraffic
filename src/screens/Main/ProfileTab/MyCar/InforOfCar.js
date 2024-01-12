import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Checkbox, FlatList, ScrollView} from 'native-base';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  appStyle,
  windowWidth,
  windowHeight,
} from '../../../../constants/AppStyle';
import {COLOR, ICON} from '../../../../constants/Theme';
import axios from 'axios';
import SwitchToggle from 'react-native-switch-toggle';
import Header from '../../../../components/Header';
import AppInput from '../../../../components/AppInput';
import AppDropdown from '../../../../components/AppDropdown';
import AppButton from '../../../../components/AppButton';
import ItemFeature from '../../../../components/Profile/ItemFeature';
import AxiosInstance from '../../../../constants/AxiosInstance';
import {showToastMessage} from '../../../../utils/utils';
import AppHeader from '../../../../components/AppHeader';

const InforOfCar = props => {
  const {navigation, route} = props;
  const updatedCarInfo = route.param?.updatedCarInfo;
  const [carNumber, setCarNumber] = useState('88A-289.09');
  const [description, setDescription] = useState(null);
  const [fuelConsumption, setFuelConsumption] = useState(null);
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  const [openAddress, setOpenAddress] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [wards, setWards] = useState([]);
  const [selectedWard, setSelectedWard] = useState(null);
  const [address, setAddress] = useState(null);
  const [location, setLocation] = useState(null);
  const [onSwitch, setonSwitch] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const {data} = props.route.params;
  useEffect(() => {
    setCarNumber(data.numberPlate);
    setLocation(data.address);
    setDescription(data.description);
    setFuelConsumption(data.fuelConsumption);
  }, []);
  const handleAddressClick = () => {
    setOpenAddress(!openAddress);
  };
  const handleAddressSubmit = () => {
    const newAddressString = `${address}, ${selectedWard?.name}, ${selectedDistrict?.name}, ${selectedProvince?.name}`;
    setLocation(newAddressString);
    handleAddressClick();
  };

  // feature
  const handleFeatureSelection = featureName => {
    if (selectedFeatures.includes(featureName)) {
      setSelectedFeatures(prevSelectedFeatures =>
        prevSelectedFeatures.filter(feature => feature !== featureName),
      );
    } else {
      setSelectedFeatures(prevSelectedFeatures => [
        ...prevSelectedFeatures,
        featureName,
      ]);
    }
  };

  const handleUpdate = () => {
    const updatedCarInfo = {
      carNumber,
      description,
      fuelConsumption,
      location,
      selectedFeatures,
    };
  };

  useEffect(() => {
    fetch('https://provinces.open-api.vn/api/p/')
      .then(response => response.json())
      .then(data => {
        setProvinces(data);
      })
      .catch(error => {
        console.error('Lỗi khi lấy dữ liệu từ API: ', error);
      });
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      axios
        .get(
          `https://provinces.open-api.vn/api/p/${selectedProvince.code}?depth=2`,
        )
        .then(response => {
          setDistricts(response.data.districts);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      axios
        .get(
          `https://provinces.open-api.vn/api/d/${selectedDistrict.code}?depth=2`,
        )
        .then(response => {
          setWards(response.data.wards);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [selectedDistrict]);

  const handleUpdateCar = async () => {
    try {
      const jsonString = JSON.stringify(selectedFeatures);
      const jsonStringWithQuotes = `\'${jsonString}\'`;
      const response = await AxiosInstance().put(
        '/car/api/update-info-car?idCar=' + data.id,
        {
          numberPlate: carNumber,
          locationCar: location,
          description: description,
          utilities: jsonStringWithQuotes,
        },
      );
      if (response.result) {
        showToastMessage('', 'Cập nhật thông tin xe thành công');
        navigation.navigate('ListCar', {data: data});
      } else {
        showToastMessage('error', 'Cập nhật thông tin xe thất bại');
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleSwitchToggle = () => {
    if (!onSwitch) {
      setModalVisible(true);
    } else {
      setonSwitch(!onSwitch);
    }
  };
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const handleConfirm = () => {
    setonSwitch(true);
    toggleModal();
  };

  return (
    <SafeAreaView style={appStyle.container}>
      <AppHeader
        title="Thông tin xe"
        onPressLeft={() =>
          navigation.goBack('GeneralInformation', {data: data})
        }
      />
      <ScrollView style={[appStyle.main, {marginBottom: 70}]}>
        <View style={[appStyle.cardInfo, {marginTop: 10}]}>
          <View style={appStyle.rowContent}>
            <Text style={appStyle.text165}>Biển số xe</Text>
            <AppInput
              width={windowWidth * 0.35}
              height={windowHeight * 0.05}
              value={carNumber}
              onChangeText={carNumberNew => setCarNumber(carNumberNew)}
            />
          </View>
        </View>
        {/* Xe có tài xế*/}
        <View style={appStyle.cardInfo}>
          <View style={appStyle.rowContent}>
            <Text style={appStyle.text165}>Xe có tài xế</Text>
            <SwitchToggle
              switchOn={onSwitch}
              onPress={handleSwitchToggle}
              circleColorOff={COLOR.background}
              circleColorOn={COLOR.background}
              backgroundColorOn={COLOR.primary}
              backgroundColorOff="#C4C4C4"
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
          </View>
        </View>
        <View style={[appStyle.cardInfo, {marginTop: 10}]}>
          <View style={appStyle.rowContent}>
            <Text style={appStyle.text165}>Địa chỉ</Text>
            <TouchableOpacity
              style={{
                backgroundColor: COLOR.bgHeader,
                borderRadius: 5,
                paddingHorizontal: 7,
              }}
              onPress={() => handleAddressClick()}>
              <Text
                style={[appStyle.text12Bold, {color: COLOR.fifth, margin: 3}]}>
                Thay đổi
              </Text>
            </TouchableOpacity>
          </View>
          <Text>
            {location
              ? location
              : '12 QL51, TT.Phú Mỹ, Tân Thành,Bà Rịa - Vũng Tàu, Việt Nam'}
          </Text>

          {openAddress && (
            <View
              style={{
                width: '100%',
                height: windowHeight * 0.4,
                justifyContent: 'space-evenly',
                alignItems: 'center',
              }}>
              <AppDropdown
                width={windowWidth * 0.7}
                height={40}
                labelField="name"
                valueField="name"
                placeholder="Tỉnh/Thành phố"
                data={provinces}
                value={selectedProvince?.name}
                onChange={val => {
                  setSelectedProvince(val);
                  setSelectedDistrict(null);
                  setSelectedWard(null);
                }}
              />
              <AppDropdown
                width={windowWidth * 0.7}
                height={40}
                labelField="name"
                valueField="name"
                placeholder="Quận Huyện"
                data={districts}
                value={selectedDistrict?.name}
                onChange={val => {
                  setSelectedDistrict(val);
                  setSelectedWard(null);
                }}
              />
              <AppDropdown
                width={windowWidth * 0.7}
                height={40}
                labelField="name"
                valueField="name"
                placeholder="Phường Xã"
                data={wards}
                value={selectedWard?.name}
                onChange={val => {
                  setSelectedWard(val);
                }}
              />
              <AppInput
                width={windowWidth * 0.7}
                height={40}
                placeholder="Nhập địa chỉ"
                value={address}
                onChangeText={text => setAddress(text)}
              />
              <AppButton
                title="Lưu"
                width={windowWidth * 0.5}
                height={40}
                onPress={() => handleAddressSubmit()}
              />
            </View>
          )}
        </View>

        <View style={appStyle.cardInfo}>
          <Text style={appStyle.text165}>Mô tả xe</Text>
          <View style={[appStyle.inputBig]}>
            <TextInput
              style={{paddingVertical: 0, alignSelf: 'flex-start'}}
              placeholder="Mô tả xe của bạn"
              value={description}
              multiline
              onChangeText={text => setDescription(text)}
            />
          </View>
        </View>

        <View style={appStyle.cardInfo}>
          <View style={appStyle.rowContent}>
            <Text style={appStyle.text165}>Mức tiêu thụ nhiên liệu</Text>
            <View style={appStyle.inputRight}>
              <Text>{fuelConsumption}</Text>
              <Text> lít/100 km</Text>
            </View>
          </View>
        </View>

        {/* Tính năng */}
        <View style={appStyle.cardInfo}>
          <Text style={appStyle.text165}>Tính năng xe</Text>
          <View style={[styles.featuresContainer, {marginTop: 10}]}>
            {features.map(feature => (
              <ItemFeature
                key={feature}
                featureName={feature.name}
                isSelected={selectedFeatures.includes(feature)}
                featureType={feature.type}
                onPress={handleFeatureSelection}
              />
            ))}
          </View>
        </View>

        <AppButton
          title="Cập nhật"
          marginBottom={70}
          onPress={() => handleUpdateCar()}
        />
      </ScrollView>
      <Modal animationType="fade" transparent={true} visible={isModalVisible}>
        <TouchableOpacity
          style={appStyle.modalBackdrop}
          onPress={toggleModal}
        />
        <View style={styles.modalContainer}>
          <Text style={[appStyle.text20Bold, {marginVertical: 20}]}>LƯU Ý</Text>
          <Text
            style={[
              styles.itemText,
              {
                textAlign: 'center',
                lineHeight: 20,
                letterSpacing: 0.5,
              },
            ]}>
            Đăng ký này sẽ cập nhật xe của bạn từ trạng thái xe tự lái sang xe
            có tài xế và tài xế sẽ phải bắt buộc cần di chuyển đến vị trí của
            người thuê xe.
          </Text>

          <AppButton
            title="XÁC NHẬN"
            fontSize={18}
            fontWeight={'300'}
            marginTop={50}
            onPress={() => handleConfirm()}
          />
          <TouchableOpacity onPress={toggleModal}>
            <Text style={[appStyle.text18, {marginTop: 15}]}>HỦY</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default InforOfCar;

const styles = StyleSheet.create({
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  modalContainer: {
    backgroundColor: 'white',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [
      {translateX: -windowWidth * 0.45},
      {translateY: -windowHeight * 0.29},
    ],
    width: windowWidth * 0.9,
    borderRadius: 12,
    paddingHorizontal: 25,
    paddingBottom: 10,
    alignSelf: 'center',
    alignItems: 'center',
  },
});
const features = [
  {
    key: 'backup-tire',
    name: 'Lốp dự phòng',
    type: 'tire',
  },
  {
    key: 'speed-warning',
    name: 'Cảnh báo tốc độ',
    type: 'speedometer',
  },
  {
    key: '360-camera',
    name: 'Camera hành trình',
    type: 'camera',
  },
  {
    key: 'airbag',
    name: 'Túi khi an toàn',
    type: 'airbag',
  },
  {
    key: 'usb',
    name: 'Khe cắm USB',
    type: 'usb',
  },
  {
    key: 'bluetooth',
    name: 'BlueTooth',
    type: 'bluetooth',
  },
  {
    key: 'back-camera',
    name: 'Camera lùi',
    type: 'camera',
  },
  {
    key: 'etc',
    name: 'ETC',
    type: 'ticket',
  },
  {
    key: 'sunroof',
    name: 'Cửa sổ trời',
    type: 'car',
  },
  {
    key: 'tire-sensor',
    name: 'Cảm biến lốp',
    type: 'tire',
  },
  {
    key: 'map',
    name: 'Bản đồ',
    type: 'map',
  },
  {
    key: 'gps',
    name: 'Định vị GPS',
    type: 'crosshairs-gps',
  },
];
