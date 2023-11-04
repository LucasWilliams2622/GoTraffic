import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Modal } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { appStyle, windowHeight, windowWidth } from '../../../../constants/AppStyle'
import { COLOR, ICON } from '../../../../constants/Theme';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import FastImage from 'react-native-fast-image';
import Header from '../../../../components/Header';
import AppButton from '../../../../components/AppButton';

const ExhibitOfCar = props => {
  const { navigation } = props;
  const [isCameraModalVisible, setIsCameraModalVisible] = useState(false);
  const [selectedImageType, setSelectedImageType] = useState(null);
  const [carImages, setCarImages] = useState({
    front: null,
    back: null,
    left: null,
    right: null,
  });

  const goBack = () => {
    navigation.goBack('HomeCar');
  };


  const cameraModal = (imageType) => {
    setSelectedImageType(imageType);
    setIsCameraModalVisible(true);
  };

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
            setCarImages((prevImages) => ({
              ...prevImages,
              front: result.assets[0].uri,
            }));
            console.log(result.assets[0].uri);
            break;
          case 'left':
            setCarImages((prevImages) => ({
              ...prevImages,
              left: result.assets[0].uri,
            }));
            console.log(result.assets[0].uri);
            break;
          case 'right':
            setCarImages((prevImages) => ({
              ...prevImages,
              right: result.assets[0].uri,
            }));
            console.log(result.assets[0].uri);
            break;
          case 'back':
            setCarImages((prevImages) => ({
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
            setCarImages((prevImages) => ({
              ...prevImages,
              front: response.assets[0].uri,
            }));
            setIsCameraModalVisible(false);
            break;
          case 'left':
            setCarImages((prevImages) => ({
              ...prevImages,
              left: response.assets[0].uri,
            }));
            setIsCameraModalVisible(false);
            break;
          case 'right':
            setCarImages((prevImages) => ({
              ...prevImages,
              right: response.assets[0].uri,
            }));
            setIsCameraModalVisible(false);
            break;
          case 'back':
            setCarImages((prevImages) => ({
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

  const handleUpdate = () => { };
  return (
    <SafeAreaView style={appStyle.container}>
      <Header
        icon={ICON.Back}
        text="Giấy tờ & Bảo hiểm"
        onPress={goBack}
      />
      <ScrollView style={{ flex: 1, width: windowWidth, height: windowHeight * 0.8, marginBottom: 70 }}>
        <View style={appStyle.main}>

          {/* Giấy tờ xe */}
          <View style={{ marginTop: 20 }}>
            <Text style={[appStyle.text18Bold]}>
              Giấy tờ của xe
            </Text>
            <View style={[appStyle.rowBetween, { marginTop: 10 }]}>
              <TouchableOpacity style={styles.upLoadImage}>
                <Text style={{ textAlign: 'center' }}>
                  Vui lòng chụp mặt trước của giấy tờ xe
                </Text>
                <FastImage
                  style={{ width: 30, height: 30, marginTop: 10 }}
                  source={ICON.Picture}
                />
              </TouchableOpacity>

              <TouchableOpacity style={styles.upLoadImage}>
                <Text style={{ textAlign: 'center' }}>
                  Vui lòng chụp mặt sau của giấy tờ xe
                </Text>
                <FastImage
                  style={{ width: 30, height: 30, marginTop: 10 }}
                  source={ICON.Picture}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Bảo hiểm */}
          <View style={{ marginTop: 20 }}>
            <Text style={[appStyle.text18Bold]}>
              Bảo hiểm của xe
            </Text>
            <View style={[appStyle.rowBetween, { marginTop: 10 }]}>
              <TouchableOpacity style={styles.upLoadImage}>
                <Text style={{ textAlign: 'center' }}>
                  Vui lòng chụp mặt trước của bảo hiểm
                </Text>
                <FastImage
                  style={{ width: 30, height: 30, marginTop: 10 }}
                  source={ICON.Picture}
                />
              </TouchableOpacity>

              <TouchableOpacity style={styles.upLoadImage}>
                <Text style={{ textAlign: 'center' }}>
                  Vui lòng chụp mặt sau của bảo hiểm
                </Text>
                <FastImage
                  style={{ width: 30, height: 30, marginTop: 10 }}
                  source={ICON.Picture}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Xe */}
          <View style={{ marginTop: 20 }}>
            <Text style={[appStyle.text18Bold]}>
              Ảnh của xe
            </Text>
            <View style={[appStyle.columnCenter, { marginTop: 10 }]}>
              <View style={{ width: windowWidth * 0.9, height: windowHeight * 0.3, alignItems: 'center' }}>
                <View style={appStyle.rowBetween}>
                  <Text style={appStyle.text16}>
                    Ảnh bên trái
                  </Text>
                  <TouchableOpacity onPress={() => cameraModal('left')}>
                    <FastImage source={ICON.Edit} style={appStyle.iconMedium} />
                  </TouchableOpacity>
                </View>
                {carImages.left ? (
                  <FastImage source={{ uri: carImages.left }} style={styles.imgCar} />
                ) : (
                  <FastImage source={ICON.Picture} style={styles.imgCar} />
                )}
              </View>

              <View style={{ width: windowWidth * 0.9, height: windowHeight * 0.3, alignItems: 'center' }}>
                <View style={appStyle.rowBetween}>
                  <Text style={appStyle.text16}>
                    Ảnh bên phải
                  </Text>
                  <TouchableOpacity onPress={() => cameraModal('right')}>
                    <FastImage source={ICON.Edit} style={appStyle.iconMedium} />
                  </TouchableOpacity>
                </View>
                {carImages.right ? (
                  <FastImage source={{ uri: carImages.right }} style={styles.imgCar} />
                ) : (
                  <FastImage source={ICON.Picture} style={styles.imgCar} />
                )}
              </View>

              <View style={{ width: windowWidth * 0.9, height: windowHeight * 0.3, alignItems: 'center' }}>
                <View style={appStyle.rowBetween}>
                  <Text style={appStyle.text16}>
                    Ảnh mặt trước
                  </Text>
                  <TouchableOpacity onPress={() => cameraModal('front')}>
                    <FastImage source={ICON.Edit} style={appStyle.iconMedium} />
                  </TouchableOpacity>
                </View>
                {carImages.front ? (
                  <FastImage source={{ uri: carImages.front }} style={styles.imgCar} />
                ) : (
                  <FastImage source={ICON.Picture} style={styles.imgCar} />
                )}
              </View>

              <View style={{ width: windowWidth * 0.9, height: windowHeight * 0.3, alignItems: 'center' }}>
                <View style={appStyle.rowBetween}>
                  <Text style={appStyle.text16}>
                    Ảnh mặt sau
                  </Text>
                  <TouchableOpacity onPress={() => cameraModal('back')}>
                    <FastImage source={ICON.Edit} style={appStyle.iconMedium} />
                  </TouchableOpacity>
                </View>
                {carImages.back ? (
                  <FastImage source={{ uri: carImages.back }} style={styles.imgCar} />
                ) : (
                  <FastImage source={ICON.Picture} style={styles.imgCar} />
                )}
              </View>
            </View>
          </View>
          <AppButton
            title="Cập nhật"
            marginTop={20}
            onPress={() => handleUpdate()}
          />
        </View>
      </ScrollView>
      <Modal
        animationType='slide'
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

export default ExhibitOfCar;

const styles = StyleSheet.create({
  upLoadImage: {
    height: 120,
    width: 174,
    borderWidth: 0.5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },

  imgCar: {
    width: 250,
    height: 150,
    marginTop: 20
  }
});

