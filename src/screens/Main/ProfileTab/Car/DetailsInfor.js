import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
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
import {features} from '../../../../components/Profile/data/DataCar';
import {formatPriceWithUnit, showToastMessage} from '../../../../utils/utils';
import AppHeader from '../../../../components/AppHeader';
import {Switch} from 'native-base';
import Slider from '@react-native-community/slider';
import numeral from 'numeral';

const DetailsInfor = props => {
  const {navigation, route} = props;
  const cardInfo = route.params;
  const [description, setDescription] = useState(null);
  const [fuelConsumption, setFuelConsumption] = useState(null);
  const [price, setPrice] = useState(null);
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  // địa chỉ
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

  const handleSwitchToggle = () => {
    if (!onSwitch) {
      setModalVisible(true);
    } else {
      setonSwitch(!onSwitch);
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
  const handleNext = () => {
    const carInfo2 = {
      location,
      description,
      fuelConsumption,
      price,
      selectedFeatures,

      isDelivery: isEnabled,
      deliveryWithin: Math.floor(first * 100),
      deliveryFee: Math.floor(second * 10 * 5),
      freeDeliveryWithin: Math.floor(third * 10),

      limitKmStatus: isEnabledLimitKm,
      maxKm: Math.floor(fourth * 100 * 8),
      exceededFee: Math.floor(fifth * 10),
    };

    // navigation.navigate('FinalStep', {
    //   carInfo: cardInfo,
    //   carInfo2: carInfo2,
    // });
    if (
      location == null ||
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
              carInfo: cardInfo,
              carInfo2: carInfo2,
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
          style={{flex: 1, width: '100%', marginBottom: 20}}
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
                onPress={() => handleAddressClick()}>
                <Text
                  style={[
                    appStyle.text12Bold,
                    {color: COLOR.fifth, margin: 3},
                  ]}>
                  Thay đổi
                </Text>
              </TouchableOpacity>
            </View>
            <Text>{location ? location : 'Chưa có địa chỉ'}</Text>

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

          {/* Mô tả */}
          <View style={appStyle.cardInfo}>
            <Text style={appStyle.text165}>Mô tả xe</Text>
            <AppInput
              height={windowHeight * 0.17}
              marginTop={8}
              placeholder="Mô tả xe của bạn"
              value={description}
              onChangeText={text => setDescription(text)}
            />
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
              <Text style={appStyle.text16Bold}>GIAO NHẬN XE TẬN NƠI</Text>
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
              <Text style={[appStyle.text16Bold, {marginRight: 10}]}>
                GIỚI HẠN SỐ KM THUÊ XE
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
                  featureName={feature}
                  isSelected={selectedFeatures.includes(feature)}
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
          marginBottom={90}
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
