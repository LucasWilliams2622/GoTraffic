import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
  PermissionsAndroid,
  ToastAndroid,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  appStyle,
  windowHeight,
  windowWidth,
} from '../../../../constants/AppStyle';
import Header from '../../../../components/Header';
import {COLOR, ICON} from '../../../../constants/Theme';
import AppButton from '../../../../components/AppButton';
import SwitchToggle from 'react-native-switch-toggle';
import AppInput from '../../../../components/AppInput';
import FastImage from 'react-native-fast-image';
import ItemFeature from '../../../../components/Profile/ItemFeature';
import axios from 'axios';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AppDropdown from '../../../../components/AppDropdown';
import {features} from '../../../../components/Profile/data/DataCar';
import AxiosInstance from '../../../../constants/AxiosInstance';

const DetailsInfor = props => {
  const {navigation, route} = props;
  const cardInfo = route.params;
  console.log('DAY LAF DATA', cardInfo);

  const [cars, setCars] = useState([]);
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
  const [isCameraModalVisible, setIsCameraModalVisible] = useState(false);
  const [selectedImageType, setSelectedImageType] = useState(null);
  const [carImages, setCarImages] = useState({
    front: null,
    back: null,
    left: null,
    right: null,
  });

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

  const cameraModal = imageType => {
    setSelectedImageType(imageType);
    setIsCameraModalVisible(true);
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

  //Chụp ảnh
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission given');
        const result = await launchCamera();

        switch (selectedImageType) {
          case 'front':
            setCarImages(prevImages => ({
              ...prevImages,
              front: result.assets[0].uri,
            }));
            console.log(result.assets[0].uri);
            break;
          case 'left':
            setCarImages(prevImages => ({
              ...prevImages,
              left: result.assets[0].uri,
            }));
            console.log(result.assets[0].uri);
            break;
          case 'right':
            setCarImages(prevImages => ({
              ...prevImages,
              right: result.assets[0].uri,
            }));
            console.log(result.assets[0].uri);
            break;
          case 'back':
            setCarImages(prevImages => ({
              ...prevImages,
              back: result.assets[0].uri,
            }));
            console.log(result.assets[0].uri);
            break;
          default:
            break;
        }
        setIsCameraModalVisible(false);
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  // Chọn ảnh từ thư viện
  const chooseImage = () => {
    const options = {
      mediaType: 'photo',
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('Hủy chọn ảnh');
      } else if (response.error) {
        console.log('Lỗi:', response.error);
      } else {
        console.log(response.assets[0].uri);
        switch (selectedImageType) {
          case 'front':
            setCarImages(prevImages => ({
              ...prevImages,
              front: response.assets[0].uri,
            }));
            setIsCameraModalVisible(false);
            break;
          case 'left':
            setCarImages(prevImages => ({
              ...prevImages,
              left: response.assets[0].uri,
            }));
            setIsCameraModalVisible(false);
            break;
          case 'right':
            setCarImages(prevImages => ({
              ...prevImages,
              right: response.assets[0].uri,
            }));
            setIsCameraModalVisible(false);
            break;
          case 'back':
            setCarImages(prevImages => ({
              ...prevImages,
              back: response.assets[0].uri,
            }));
            setIsCameraModalVisible(false);
            break;
          default:
            break;
        }
      }
    });
  };

  //call api add car here
  const addNewCar = async () => {
    try {
      const response = await AxiosInstance().post('/car/api/add', {
        idUser: 1,
        idCarBrand: 1,
        numberPlate: cardInfo.carInfo.carNumber+"",
        name: cardInfo.carInfo.selectedModel,
        yearOfManufacture: cardInfo.carInfo.selectedYear,
        seats: cardInfo.carInfo.selectedSeats,
        gear: cardInfo.carInfo.selectedTransmission,
        fuel: cardInfo.carInfo.selectedFuel,
        locationCar: location,
        latitude: 0,
        longitude: 0,
        description: description,
        fuelConsumption: parseInt(fuelConsumption),
        isDelivery: true,
        limitKm: 0,
        price: price,
        utilities: selectedFeatures.toString(),
        image: '',
      });
      console.log(response);
      if (response.result) {
        ToastAndroid.show('Đăng xe thành công', ToastAndroid.SHORT);
        // const updatedCarInfo = [...cars];
        // updatedCarInfo.push(combinedInfo);
        // setCars(updatedCarInfo);
        navigation.navigate('ListCar');
      } else {
        ToastAndroid.show('Đăng xe thất bại', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log(error);
    }
    //   const formData = new FormData();
    //   formData.append('image', {
    //     uri:
    //       carImages.back +
    //       ',' +
    //       carImages.front +
    //       ',' +
    //       carImages.left +
    //       ',' +
    //       carImages.right,
    //     type: 'icon/icon_jpeg',
    //     name: 'image.jpg',
    //   });
    //   console.log(formData._parts);
    //   const response = await AxiosInstance('multipart/form-data').post(
    //     '/car/api/upload-car-images',
    //     formData,
    //   );
    //   console.log(response);
    //   if (response.result == true) {
    //     ToastAndroid.show('Upload Image Success', ToastAndroid.SHORT);
    //   } else {
    //     ToastAndroid.show('Upload Image Failed', ToastAndroid.SHORT);
    //   }
  };
  return (
    <SafeAreaView style={appStyle.container}>
      <Header
        text="Thông tin chi tiết"
        icon={ICON.Back}
        onPress={() => navigation.navigate('BasicInfor')}
      />
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
                  width={windowWidth * 0.15}
                  borderWidth={0}
                  value={fuelConsumption}
                  onChangeText={text => setFuelConsumption(text)}
                />
                <Text>lít/100 km</Text>
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
                  width={windowWidth * 0.2}
                  fontSize={18}
                  borderWidth={0}
                  value={price}
                  onChangeText={text => setPrice(text)}
                />
                <Text style={[appStyle.text18Bold, {color: COLOR.primary}]}>
                  K
                </Text>
              </View>
            </View>
            <Text>Giá đề xuất: 960 nghìn đồng</Text>
          </View>

          {/* Ảnh  */}
          <View style={appStyle.cardInfo}>
            <Text style={appStyle.text165}>Ảnh xe</Text>
            <Text>
              Bạn vui lòng đăng 4 ảnh (Trước - sau - trái - phải) để tăng hiệu
              quả cho thuê và đủ điều kiện để đăng ký.
            </Text>
            <View style={[styles.featuresContainer, {paddingHorizontal: 10}]}>
              <TouchableOpacity onPress={() => cameraModal('front')}>
                <View style={appStyle.viewUpload}>
                  {carImages.front ? (
                    <FastImage
                      source={{uri: carImages.front}}
                      style={{width: 170, height: 100}}
                    />
                  ) : (
                    <FastImage
                      source={ICON.Picture}
                      style={{width: 160, height: 100}}
                    />
                  )}
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => cameraModal('back')}>
                <View style={appStyle.viewUpload}>
                  {carImages.back ? (
                    <FastImage
                      source={{uri: carImages.back}}
                      style={{width: 170, height: 100}}
                    />
                  ) : (
                    <FastImage
                      source={ICON.Picture}
                      style={{width: 160, height: 100}}
                    />
                  )}
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => cameraModal('left')}>
                <View style={appStyle.viewUpload}>
                  {carImages.left ? (
                    <FastImage
                      source={{uri: carImages.left}}
                      style={{width: 170, height: 100}}
                    />
                  ) : (
                    <FastImage
                      source={ICON.Picture}
                      style={{width: 160, height: 100}}
                    />
                  )}
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => cameraModal('right')}>
                <View style={appStyle.viewUpload}>
                  {carImages.right ? (
                    <FastImage
                      source={{uri: carImages.right}}
                      style={{width: 170, height: 100}}
                    />
                  ) : (
                    <FastImage
                      source={ICON.Picture}
                      style={{width: 160, height: 100}}
                    />
                  )}
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        <AppButton
          title="Hoàn tất"
          marginBottom={70}
          onPress={() => addNewCar()}
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={isCameraModalVisible}>
        <TouchableOpacity
          style={appStyle.modalBackdrop}
          onPress={() => setIsCameraModalVisible(false)}
        />
        <View style={appStyle.modalContainerCam}>
          <AppButton
            title="Chụp ảnh"
            marginTop={5}
            onPress={() => {
              requestCameraPermission(selectedImageType);
              setSelectedImageType(null);
            }}
          />
          <AppButton
            title="Chọn ảnh"
            marginTop={15}
            backgroundColor={COLOR.background}
            textColor={COLOR.primary}
            onPress={() => {
              chooseImage(selectedImageType);
              setSelectedImageType(null);
            }}
          />
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
    height: windowHeight * 0.58,
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
});
