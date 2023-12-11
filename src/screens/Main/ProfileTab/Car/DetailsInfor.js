import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, {useState, useEffect, useRef, useContext} from 'react';
import {
  appStyle,
  windowHeight,
  windowWidth,
} from '../../../../constants/AppStyle';
import {COLOR, ICON} from '../../../../constants/Theme';
import AppButton from '../../../../components/AppButton';
import SwitchToggle from 'react-native-switch-toggle';
import AppInput from '../../../../components/AppInput';
import ItemFeature from '../../../../components/Profile/ItemFeature';
import axios from 'axios';
import AppDropdown from '../../../../components/AppDropdown';
import {formatPriceWithUnit, showToastMessage} from '../../../../utils/utils';
import AppHeader from '../../../../components/AppHeader';
import {Switch} from 'native-base';
import Slider from '@react-native-community/slider';
import {AppContext} from '../../../../utils/AppContext';
import {TextInput} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const DetailsInfor = props => {
  const navigation = useNavigation();
  const {carInfo, addressCar, markerPosition} = props.route.params;
  const {infoUser} = useContext(AppContext);
  console.log('markerPosition', markerPosition);
  const [description, setDescription] = useState(null);
  const [fuelConsumption, setFuelConsumption] = useState(null);
  const [price, setPrice] = useState(null);
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  const userAddress =
    infoUser.address.address +
    ', ' +
    infoUser.address.street +
    ', ' +
    infoUser.address.ward +
    ', ' +
    infoUser.address.district +
    ',' +
    infoUser.address.city;
  // địa chỉ
  const [openAddress, setOpenAddress] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(
    infoUser.address.city,
  );
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(
    infoUser.address.district,
  );
  const [wards, setWards] = useState([]);
  const [selectedWard, setSelectedWard] = useState(infoUser.address.ward);
  const [address, setAddress] = useState(infoUser.address.address);
  const [location, setLocation] = useState(
    addressCar == null ? userAddress : addressCar,
  );

  useEffect(() => {
    if (addressCar !== null) {
      setLocation(addressCar == null ? userAddress : addressCar);
    }
  }, [addressCar]);

  const [onSwitch, setonSwitch] = useState(false);
  const [onSwitch2, setonSwitch2] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible2, setModalVisible2] = useState(false);
  const [isEnabled, setEnabled] = useState(false);
  const [isEnabledLimitKm, setEnabledLimitKm] = useState(false);
  const [first, setfirst] = useState(0);
  const [second, setsecond] = useState(0);
  const [third, setthird] = useState(0);
  const [fourth, setfourth] = useState(0);
  const [fifth, setfifth] = useState(0);
  // api địa chỉ
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

  // feature
  const handleFeatureSelection = featureName => {
    console.log(featureName);
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

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleModal2 = () => {
    setModalVisible2(!isModalVisible2);
  };

  const handleSwitchToggle = () => {
    if (!onSwitch) {
      setModalVisible(true);
    } else {
      setonSwitch(!onSwitch);
    }
  };
  const handleSwitchToggle2 = () => {
    if (!onSwitch2) {
      setModalVisible2(true);
    } else {
      setonSwitch2(!onSwitch2);
    }
  };
  // địa chỉ
  const handleAddressClick = () => {
    setOpenAddress(!openAddress);
  };
  const handleAddressSubmit = () => {
    const newAddressString = `${address}, ${selectedWard?.name}, ${selectedDistrict?.name}, ${selectedProvince?.name}`;
    setLocation(newAddressString);
    handleAddressClick();
  };

  const handleConfirm = () => {
    setonSwitch(true);
    toggleModal();
  };
  const handleConfirm2 = () => {
    setonSwitch2(true);
    toggleModal2();
  };
  const handleNext = () => {
    const jsonString = JSON.stringify(selectedFeatures);
    const jsonStringWithQuotes = `\'${jsonString}\'`;
    console.log('jsonStringWithQuotes', jsonStringWithQuotes);
    const carInfo2 = {
      ...carInfo,
      locationCar: location,
      city: selectedProvince,
      district: selectedDistrict,
      ward: selectedWard,
      address: address,
      description,
      fuelConsumption,
      price,
      longitude: markerPosition?.longitude
        ? markerPosition?.longitude
        : 106.628345,

      latitude: markerPosition?.latitude ? markerPosition?.latitude : 10.853747,
      selectedFeatures: jsonStringWithQuotes,

      isDelivery: isEnabled,
      deliveryWithin: Math.floor(first * 100),
      deliveryFee: Math.floor(second * 10 * 5),
      freeDeliveryWithin: Math.floor(third * 10),

      limitKmStatus: isEnabledLimitKm,
      maxKm: Math.floor(fourth * 100 * 8),
      exceededFee: Math.floor(fifth * 10),
    };
    // navigation.navigate('FinalStep', {
    //   carInfo: carInfo,
    //   carInfo2: carInfo2,
    // });

    if (
      description == null ||
      fuelConsumption == null ||
      price == null ||
      selectedFeatures == null
    ) {
      showToastMessage('error', 'Vui lòng nhập đầy đủ thông tin xe');
    } else {
      if (fuelConsumption < 10) {
        showToastMessage('error', 'Mức tiêu thụ nhiên liệu phải lớn hơn 10L');
      } else {
        if (price < 300000) {
          showToastMessage('error', 'Giá tiền phải lớn hơn 300K');
        } else {
          if (selectedFeatures.length < 4) {
            showToastMessage('error', 'Vui lòng chọn nhiều hơn 4 chức năng');
          } else {
            navigation.navigate('FinalStep', {
              carInfo: carInfo2,
              // carInfo2: carInfo2,
            });
          }
        }
      }
    }
  };

  return (
    <SafeAreaView style={appStyle.container}>
      <AppHeader title="Thông tin chi tiết" />
      <View style={{flex: 1, paddingHorizontal: 10}}>
        <ScrollView
          style={{flex: 1, width: '100%', marginBottom: 10}}
          showsVerticalScrollIndicator={false}>
          {/* Địa chỉ */}
          <View style={appStyle.cardInfo}>
            <View style={appStyle.rowContent}>
              <Text style={appStyle.text165}>Địa chỉ</Text>
              <TouchableOpacity
                style={{
                  backgroundColor: COLOR.bgHeader,
                  borderRadius: 5,
                  paddingHorizontal: 7,
                }}
                // onPress={() => handleAddressClick()}
                onPress={() =>
                  navigation.navigate('PickLocation', {carInfo: carInfo})
                }>
                <Text
                  style={[
                    appStyle.text12Bold,
                    {color: COLOR.fifth, margin: 3},
                  ]}>
                  Thay đổi
                </Text>
              </TouchableOpacity>
            </View>
            <Text>{location ? location : userAddress}</Text>

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

          {/* Đặt xe nhanh */}
          <View style={appStyle.cardInfo}>
            <View style={appStyle.rowContent}>
              <Text style={appStyle.text16}>Đặt xe nhanh</Text>
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
            {onSwitch && (
              <View style={{marginTop: 10}}>
                <Text>
                  Yêu cầu thuê xe sẽ được tự động đồng ý trong khoảng thời gian
                  cài đặt
                </Text>
                <View
                  style={[
                    {
                      marginTop: 10,
                      paddingVertical: 20,
                      width: windowWidth * 0.78,
                      alignSelf: 'center',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      borderBottomWidth: 0.5,
                    },
                  ]}>
                  <Text>Giới hạn từ</Text>
                  <Text>6 giờ tới</Text>
                </View>
                <View
                  style={{
                    paddingVertical: 20,
                    width: windowWidth * 0.78,
                    alignSelf: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text>Cho đến</Text>
                  <Text>1 tuần</Text>
                </View>
              </View>
            )}
          </View>
          {/* Xe có tài xế*/}
          <View style={appStyle.cardInfo}>
            <View style={appStyle.rowContent}>
              <Text style={appStyle.text165}>Xe có tài xế</Text>
              <SwitchToggle
                switchOn={onSwitch2}
                onPress={handleSwitchToggle2}
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
          {/* Mô tả */}
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
            {/* <AppInput
              height={windowHeight * 0.17}
              marginTop={8}
              placeholder="Mô tả xe của bạn"
              value={description}
              onChangeText={text => setDescription(text)}
            /> */}
          </View>

          {/* Nhiên liệu */}
          <View style={appStyle.cardInfo}>
            <View style={appStyle.rowContent}>
              <Text style={appStyle.text165}>Mức tiêu thụ nhiên liệu</Text>
              <View style={appStyle.inputRight}>
                <AppInput
                  placeholder="0"
                  width={windowWidth * 0.3}
                  borderWidth={0}
                  value={fuelConsumption}
                  textAlign={'right'}
                  keyboardType={'numeric'}
                  onChangeText={text => setFuelConsumption(text)}
                />
                <Text>lít/100 km</Text>
              </View>
            </View>
          </View>

          {/* Giao xe tan noi */}
          <View style={appStyle.cardInfo}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                height: 50,
              }}>
              <Text style={appStyle.text165}>Giao nhận xe tận nơi</Text>
              <Switch
                style={{alignSelf: 'center', marginTop: -20}}
                value={isEnabled}
                onValueChange={value => setEnabled(value)}
              />
            </View>
            {isEnabled ? (
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text>Trong vòng</Text>
                  <Text>{Math.floor(first * 100)} km</Text>
                </View>
                <Slider
                  style={{width: '100%', height: 40}}
                  minimumValue={0}
                  maximumValue={1}
                  minimumTrackTintColor="#41cff2"
                  maximumTrackTintColor="#000000"
                  onValueChange={value => setfirst(value)}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text>Phí</Text>
                  <Text>{Math.floor(second * 10 * 5)} K/km</Text>
                </View>
                <Slider
                  style={{width: '100%', height: 40}}
                  minimumValue={0}
                  maximumValue={1}
                  minimumTrackTintColor="#41cff2"
                  maximumTrackTintColor="#000000"
                  onValueChange={value => setsecond(value)}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text>Miễn phí trong vòng</Text>
                  <Text>{Math.floor(third * 10)} km</Text>
                </View>
                <Slider
                  style={{width: '100%', height: 40}}
                  minimumValue={0}
                  maximumValue={1}
                  minimumTrackTintColor="#41cff2"
                  maximumTrackTintColor="#000000"
                  onValueChange={value => setthird(value)}
                />
              </View>
            ) : null}
          </View>
          {/* Gioi han so km */}
          <View style={appStyle.cardInfo}>
            {/*Visible of LimitKilometer*/}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                height: 50,
              }}>
              <Text style={[appStyle.text165, {marginRight: 10}]}>
                Giới hạn km thuê xe
              </Text>
              <Switch
                style={{alignSelf: 'center', marginTop: -20}}
                value={isEnabledLimitKm}
                onValueChange={value => setEnabledLimitKm(value)}
              />
            </View>
            {isEnabledLimitKm ? (
              <View style={styles.containerSlider}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={appStyle.text14}>Số km tối đa</Text>
                  <Text style={appStyle.text14}>
                    {Math.floor(fourth * 100 * 8)} km/ngày
                  </Text>
                </View>
                <Slider
                  style={{width: '100%', height: 40}}
                  minimumValue={0}
                  maximumValue={1}
                  minimumTrackTintColor="#41cff2"
                  maximumTrackTintColor="#000000"
                  onValueChange={value => setfourth(value)}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={appStyle.text14}>Phí vượt qua giới hạn</Text>
                  <Text style={appStyle.text14}>
                    {Math.floor(fifth * 10)} K/km
                  </Text>
                </View>
                <Slider
                  style={{width: '100%', height: 40}}
                  minimumValue={0}
                  maximumValue={1}
                  minimumTrackTintColor="#41cff2"
                  maximumTrackTintColor="#000000"
                  onValueChange={value => setfifth(value)}
                />
              </View>
            ) : null}
          </View>

          {/* Tính năng */}
          <View style={appStyle.cardInfo}>
            <Text style={appStyle.text165}>Tính năng xe</Text>
            <View style={[styles.featuresContainer, {marginTop: 10}]}>
              {features.map(feature => (
                <ItemFeature
                  key={feature}
                  featureName={feature.name}
                  isSelected={selectedFeatures.includes(feature.key)}
                  featureKey={feature.key}
                  onPress={handleFeatureSelection}
                />
              ))}
            </View>
          </View>

          {/* Giá  */}
          <View style={appStyle.cardInfo}>
            <View style={appStyle.rowContent}>
              <Text style={appStyle.text165}>Giá cho thuê</Text>
              <View style={appStyle.inputRight}>
                <AppInput
                  placeholder="0"
                  width={windowWidth * 0.35}
                  fontSize={18}
                  borderWidth={0}
                  value={price}
                  textAlign={'right'}
                  keyboardType={'numeric'}
                  onChangeText={text => setPrice(text)}
                />
                <Text style={[appStyle.text18Bold, {color: COLOR.primary}]}>
                  VNĐ
                </Text>
              </View>
            </View>
            <Text>Giá đề xuất: 960 nghìn đồng</Text>
          </View>
        </ScrollView>

        <AppButton
          title="Tiếp theo"
          marginBottom={80}
          onPress={() => handleNext()}
        />
      </View>

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
            Nếu chủ xe hủy chuyến sau khi khách hàng đặt cọc, sẽ áp dụng chính
            sách hủy chuyến và nhận đánh giá từ 1-3* nên chủ xe cần cập nhật
            lịch bận thường xuyên và đảm bảo xe luôn sẵn sàng. {'\n'}Nếu có
            khách hàng đang "Đặt xe nhanh" nhưng chủ xe thay đổi kế hoạch cho
            thuê hoặc chưa cập nhật lịch bận, vui lòng truy cập ứng dụng để hủy
            chuyến trong thời gian sớm nhất, trước khi hành khách đặt cọc thành
            công.
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
      <Modal animationType="fade" transparent={true} visible={isModalVisible2}>
        <TouchableOpacity
          style={appStyle.modalBackdrop}
          onPress={toggleModal2}
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
            onPress={() => handleConfirm2()}
          />
          <TouchableOpacity onPress={toggleModal2}>
            <Text style={[appStyle.text18, {marginTop: 15}]}>HỦY</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default DetailsInfor;

const styles = StyleSheet.create({
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
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLOR.red,
    justifyContent: 'space-evenly',
  },
  imageContainer: {
    margin: 10,
  },
  image: {
    width: 100,
    height: 100,
  },
  removeText: {
    color: 'red',
    marginTop: 5,
  },
});
const features = [
  {
    key: 'backup-tire',
    name: 'Lốp dự phòng',
  },
  {
    key: 'speed-warning',
    name: 'Cảnh báo tốc độ',
  },
  {
    key: '360-camera',
    name: 'Camera hành trình',
  },
  {
    key: 'airbag',
    name: 'Túi khi an toàn',
  },
  {
    key: 'usb',
    name: 'Khe cắm USB',
  },
  {
    key: 'bluetooth',
    name: 'BlueTooth',
  },
  {
    key: 'back-camera',
    name: 'Camera lùi',
  },
  {
    key: 'etc',
    name: 'ETC',
  },
  {
    key: 'sunroof',
    name: 'Cửa sổ trời',
  },
  {
    key: 'tire-sensor',
    name: 'Cảm biến lốp',
  },
  {
    key: 'map',
    name: 'Bản đồ',
  },
  {
    key: 'gps',
    name: 'Định vị GPS',
  },
];
