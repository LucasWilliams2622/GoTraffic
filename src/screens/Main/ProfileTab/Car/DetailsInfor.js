import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
  PermissionsAndroid,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
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
import {showToastMessage} from '../../../../utils/utils';
import {Button} from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-actionsheet';
import {Platform} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import AppHeader from '../../../../components/AppHeader';

const DetailsInfor = props => {
  const {navigation, route} = props;
  const cardInfo = route.params;

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
  const [selectedImages, setSelectedImages] = useState(Array(9).fill(null));
  const [carImages, setCarImages] = useState('');
  const actionSheetRef = useRef();

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

  //call api add car here
  const addNewCar = async () => {
    try {
      console.log('bien so : ', cardInfo.carInfo.carNumber.toString());
      const response = await axios.post(
        'http://103.57.129.166:3000/car/api/add',
        {
          idUser: 1,
          carBrand: cardInfo.carInfo.selectedBrand,
          numberPlate: cardInfo.carInfo.carNumber,
          //numberPlate: '5122-LD99999',
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
          image: carImages.toString(),
        },
      );
      console.log(response.data);
      if (response.data.result) {
        showToastMessage('', 'Đăng xe thành công');
        // const updatedCarInfo = [...cars];
        // updatedCarInfo.push(combinedInfo);
        // setCars(updatedCarInfo);
        navigation.navigate('ListCar');
      } else {
        showToastMessage('', 'Đăng xe thất bại', ICON.cancelWhite);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // Kiểm tra và yêu cầu quyền truy cập
  const checkAndRequestPermission = async () => {
    if (Platform.OS === 'android') {
      const result = await check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
      if (result !== RESULTS.GRANTED) {
        const requestResult = await request(
          PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
        );
        if (requestResult !== RESULTS.GRANTED) {
          // Xử lý khi người dùng từ chối cấp quyền
        }
      }
    } else if (Platform.OS === 'ios') {
      const result = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);
      if (result !== RESULTS.GRANTED) {
        const requestResult = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
        if (requestResult !== RESULTS.GRANTED) {
          // Xử lý khi người dùng từ chối cấp quyền
        }
      }
    }
  };

  // Chọn hình từ thư viện hoặc chụp hình
  const showImagePickerOptions = () => {
    actionSheetRef.current.show({useNativeDriver: true});
  };
  const removeImage = index => {
    const updatedImages = [...selectedImages];
    updatedImages[index] = null;
    setSelectedImages(updatedImages);
  };

  // Hiển thị action sheet
  const handleActionSheetPress = index => {
    if (index === 0) {
      pickImage();
    } else if (index === 1) {
      takePhoto();
    }
  };

  // Chọn hình từ thư viện
  const pickImage = async () => {
    try {
      const image = await ImagePicker.openPicker({
        mediaType: 'photo',
      });
      const updatedImages = [...selectedImages];
      const emptySlotIndex = updatedImages.indexOf(null);
      if (emptySlotIndex !== -1) {
        updatedImages[emptySlotIndex] = image.path;
        setSelectedImages(updatedImages);
      }
      setSelectedImages(updatedImages);
    } catch (error) {
      console.log('ImagePicker Error: ', error);
    }
  };

  // Chụp hình
  const takePhoto = async () => {
    try {
      await checkAndRequestPermission();
      const image = await ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
      });

      // Find the first empty slot in selectedImages and update the state
      const updatedImages = [...selectedImages];
      const emptySlotIndex = updatedImages.indexOf(null);
      if (emptySlotIndex !== -1) {
        updatedImages[emptySlotIndex] = image.path;
        setSelectedImages(updatedImages);
      }
    } catch (error) {
      console.log('ImagePicker Error: ', error);
    }
  };

  // Render selected images
  const renderSelectedImages = () => {
    return selectedImages.map((image, index) => (
      <TouchableOpacity key={index} onPress={() => showImagePickerOptions()}>
        <View style={styles.imageContainer}>
          {image && (
            <View>
              <FastImage source={{uri: image}} style={styles.image} />
              <TouchableOpacity onPress={() => removeImage(index)}>
                <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
          {!image && <Text>Select Image</Text>}
        </View>
      </TouchableOpacity>
    ));
  };

  const uploadImages = async () => {
    try {
      const formData = new FormData();
      console.log(selectedImages);
      selectedImages.forEach((uri, index) => {
        if (uri) {
          const fileName = `image_${index}.jpg`;
          formData.append('images', {
            uri,
            type: 'image/jpeg',
            name: fileName,
          });
        }
      });
      const response = await axios.post(
        'http://103.57.129.166:3000/car/api/upload-car-images',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      console.log(response.data.links);
      setCarImages(response.data.links);

      if (response.data.result) {
        console.log('image car:', carImages);
        showToastMessage('', 'Upload images success');
      } else {
        showToastMessage('', 'Upload images fail', ICON.cancelWhite);
      }
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };
  return (
    <SafeAreaView style={appStyle.container}>
      <AppHeader
        title='Thông tin chi tiết'
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
            <Text style={{marginBottom: 10}}>
              Bạn vui lòng đăng 4 ảnh (Trước - sau - trái - phải) để tăng hiệu
              quả cho thuê và đủ điều kiện để đăng ký.
            </Text>
            <AppButton
              title="Upload Image"
              onPress={() => uploadImages()}
              backgroundColor={COLOR.redOrange}
            />

            {/* Action Sheet */}
            <View style={styles.imageGrid}>{renderSelectedImages()}</View>
            <ActionSheet
              ref={actionSheetRef}
              title={'Select Image'}
              options={['Choose from Library', 'Take Photo', 'Cancel']}
              cancelButtonIndex={2}
              destructiveButtonIndex={2}
              onPress={handleActionSheetPress}
            />
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
