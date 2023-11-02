import { SafeAreaView, StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal, PermissionsAndroid } from 'react-native'
import React, { useState } from 'react'
import { appStyle, windowHeight, windowWidth } from '../../../../constants/AppStyle';
import Header from '../../../../components/Header';
import { COLOR, ICON } from '../../../../constants/Theme';
import AppButton from '../../../../components/AppButton';
import SwitchToggle from 'react-native-switch-toggle';
import AppInput from '../../../../components/AppInput';
import FastImage from 'react-native-fast-image';
import ItemFeature from '../../../../components/Profile/ItemFeature';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';


const DetailsInfor = (props) => {
  const { navigation } = props;
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [onSwitch, setonSwitch] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isCameraModalVisible, setIsCameraModalVisible] = useState(false);
  const [selectedImageType, setSelectedImageType] = useState(null);
  const [imageFront, setImageFront] = useState(null);
  const [imageLeft, setImageLeft] = useState(null);
  const [imageRight, setImageRight] = useState(null);
  const [imageBack, setImageBack] = useState(null);



  const handleFeatureSelection = (featureName) => {
    if (selectedFeatures.includes(featureName)) {
      setSelectedFeatures((prevSelectedFeatures) =>
        prevSelectedFeatures.filter((feature) => feature !== featureName)
      );
    } else {
      setSelectedFeatures((prevSelectedFeatures) => [...prevSelectedFeatures, featureName]);
    }
  };

  const features = [
    'Lốp dự phòng',
    'Cảnh báo tốc độ',
    'Camera hành trình',
    'Túi khi an toàn',
    'Khe cắm USB',
    'BlueTooth',
    'Camera lùi',
    'ETC',
    'Cửa sổ trời',
    'Cảm biến lốp',
    'Bản đồ',
    'Định vị GPS',
  ];

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const cameraModal = (imageType) => {
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
          title: "App Camera Permission",
          message: "App needs access to your camera ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Camera permission given");
        const result = await launchCamera();

        switch (selectedImageType) {
          case 'front':
            setImageFront(result.assets[0].uri);
            console.log(result.assets[0].uri);
            break;
          case 'left':
            setImageLeft(result.assets[0].uri);
            console.log(result.assets[0].uri);
            break;
          case 'right':
            setImageRight(result.assets[0].uri);
            console.log(result.assets[0].uri);
            break;
          case 'back':
            setImageBack(result.assets[0].uri);
            console.log(result.assets[0].uri);
            break;
          default:
            break;
        }
        setIsCameraModalVisible(false);
      } else {
        console.log("Camera permission denied");
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

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('Hủy chọn ảnh');
      } else if (response.error) {
        console.log('Lỗi:', response.error);
      } else {
        console.log(response.assets[0].uri);
        switch (selectedImageType) {
          case 'front':
            setImageFront(response.assets[0].uri);
            setIsCameraModalVisible(false);
            break;
          case 'left':
            setImageLeft(response.assets[0].uri);
            setIsCameraModalVisible(false);
            break;
          case 'right':
            setImageRight(response.assets[0].uri);
            setIsCameraModalVisible(false);
            break;
          case 'back':
            setImageBack(response.assets[0].uri);
            setIsCameraModalVisible(false);
            break;
          default:
            break;
        }
        setIsCameraModalVisible(false);
      }
    });
  };

  return (
    <SafeAreaView style={appStyle.container}>
      <Header
        text="Thông tin chi tiết"
        icon={ICON.Back}
        onPress={() => navigation.navigate('BasicInfor')}
      />
      <View style={{ flex: 1, paddingHorizontal: 10 }} >
        <ScrollView style={{ flex: 1, width: '100%', marginBottom: 20 }}
          showsVerticalScrollIndicator={false}>

          {/* Địa chỉ */}
          <View style={appStyle.cardInfo}>
            <View style={appStyle.rowContent}>
              <Text style={appStyle.text165}>Địa chỉ</Text>
              <TouchableOpacity
                style={{
                  backgroundColor: COLOR.bgHeader,
                  borderRadius: 5,
                  paddingHorizontal: 7
                }}
              //onPress={()=> navigation.navigate('')}
              >
                <Text style={[appStyle.text12Bold, { color: COLOR.fifth, margin: 3 }]}>Thay đổi</Text>
              </TouchableOpacity>
            </View>
            <Text>0223 Nguyễn Du </Text>
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
                backgroundColorOff='#C4C4C4'
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
              <View style={{ marginTop: 10 }}>
                <Text>Yêu cầu thuê xe sẽ được tự động đồng ý trong khoảng thời gian cài đặt</Text>
                <View style={[
                  {
                    marginTop: 10,
                    paddingVertical: 20,
                    width: windowWidth * 0.78,
                    alignSelf: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    borderBottomWidth: 0.5
                  }]}>
                  <Text>Giới hạn từ</Text>
                  <Text>6 giờ tới</Text>
                </View>
                <View style={{
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
            />
          </View>

          {/* Nhiên liệu */}
          <View style={appStyle.cardInfo}>
            <View style={appStyle.rowContent}>
              <Text style={appStyle.text165}>Mức tiêu thụ nhiên liệu</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', width: windowWidth * 0.4, justifyContent: 'flex-end' }}>
                <AppInput
                  placeholder="0"
                  width={windowWidth * 0.15}
                  borderWidth={0}
                />
                <Text>lít/100 km</Text>
              </View>
            </View>
          </View>

          {/* Tính năng */}
          <View style={appStyle.cardInfo}>
            <Text style={appStyle.text165}>Tính năng xe</Text>
            <View style={[styles.featuresContainer, { marginTop: 10 }]}>
              {features.map((feature) => (
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
              <View style={{ flexDirection: 'row', alignItems: 'center', width: windowWidth * 0.4, justifyContent: 'flex-end' }}>
                <AppInput
                  placeholder="0"
                  width={windowWidth * 0.2}
                  fontSize={18}
                  borderWidth={0}
                />
                <Text style={[appStyle.text18Bold, { color: COLOR.primary }]}>K</Text>
              </View>
            </View>
            <Text>Giá đề xuất: 960 nghìn đồng</Text>
          </View>

          {/* Ảnh  */}
          <View style={appStyle.cardInfo}>
            <Text style={appStyle.text165}>Ảnh xe</Text>
            <Text>
              Bạn vui lòng đăng 4 ảnh (Trước - sau - trái - phải)
              để tăng hiệu quả cho thuê và đủ điều kiện để đăng ký.
            </Text>
            <View style={[styles.featuresContainer, { paddingHorizontal: 10 }]}>
              <TouchableOpacity onPress={() => cameraModal('front')}>
                <View style={{ width: 170, height: 100, backgroundColor: '#D9D9D9', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                  {imageFront ? (
                    <FastImage source={{ uri: imageFront }} style={{ width: 170, height: 100 }} />
                  ) : (
                    <FastImage source={ICON.Picture} style={{ width: 160, height: 100 }} />
                  )}

                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => cameraModal('back')}>
                <View style={{ width: 170, height: 100, backgroundColor: '#D9D9D9', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                  {imageBack ? (
                    <FastImage source={{ uri: imageBack }} style={{ width: 170, height: 100 }} />
                  ) : (
                    <FastImage source={ICON.Picture} style={{ width: 160, height: 100 }} />
                  )}

                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => cameraModal('left')}>
                <View style={{ width: 170, height: 100, backgroundColor: '#D9D9D9', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                  {imageLeft ? (
                    <FastImage source={{ uri: imageLeft }} style={{ width: 170, height: 100 }} />
                  ) : (
                    <FastImage source={ICON.Picture} style={{ width: 160, height: 100 }} />
                  )}

                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => cameraModal('right')}>
                <View style={{ width: 170, height: 100, backgroundColor: '#D9D9D9', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                  {imageRight ? (
                    <FastImage source={{ uri: imageRight }} style={{ width: 170, height: 100 }} />
                  ) : (
                    <FastImage source={ICON.Picture} style={{ width: 160, height: 100 }} />
                  )}
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        <AppButton
          title="Hoàn tất"
          marginBottom={70}
          onPress={() => navigation.navigate('ListCar')}
        />
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}>
        <TouchableOpacity
          style={styles.modalBackdrop}
          onPress={toggleModal}
        />
        <View style={styles.modalContainer}>
          <Text style={[appStyle.text20Bold, { marginVertical: 20 }]}>LƯU Ý</Text>
          <Text style={[styles.itemText, {
            textAlign: 'center',
            lineHeight: 20,
            letterSpacing: 0.5
          }]}>
            Nếu chủ xe hủy chuyến sau khi khách hàng đặt cọc, sẽ áp dụng chính sách
            hủy chuyến và nhận đánh giá từ 1-3* nên chủ xe cần cập nhật lịch bận thường
            xuyên và đảm bảo xe luôn sẵn sàng. {'\n'}Nếu có khách hàng đang "Đặt xe nhanh"
            nhưng chủ xe thay đổi kế hoạch cho thuê hoặc chưa cập nhật lịch bận, vui lòng
            truy cập ứng dụng để hủy chuyến trong thời gian sớm nhất, trước khi hành khách
            đặt cọc thành công.
          </Text>

          <AppButton
            title="XÁC NHẬN"
            fontSize={18}
            fontWeight={'300'}
            marginTop={50}
            onPress={() => handleConfirm()}
          />
          <TouchableOpacity onPress={toggleModal}>
            <Text style={[appStyle.text18, { marginTop: 15 }]}>HỦY</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal
        animationType='slide'
        transparent={true}
        visible={isCameraModalVisible}>
        <TouchableOpacity
          style={styles.modalBackdrop}
          onPress={cameraModal}
        />
        <View style={styles.modalContainerCam}>
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
  )
}

export default DetailsInfor

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background color
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -windowWidth * 0.45 }, { translateY: -windowHeight * 0.29 }],
    width: windowWidth * 0.9,
    height: windowHeight * 0.58,
    borderRadius: 12,
    paddingHorizontal: 25,
    paddingBottom: 10,
    alignSelf: 'center',
    alignItems: 'center',
  },
  modalContainerCam: {
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    width: '100%',
    zIndex: 1,
    height: windowHeight * 0.18,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingHorizontal: 10,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,

  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

})