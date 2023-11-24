import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {
  appStyle,
  windowHeight,
  windowWidth,
} from '../../../../constants/AppStyle';
import {COLOR, ICON} from '../../../../constants/Theme';
import AppButton from '../../../../components/AppButton';
import FastImage from 'react-native-fast-image';
import axios from 'axios';
import {showToastMessage} from '../../../../utils/utils';
import AppHeader from '../../../../components/AppHeader';
import ImagePickerComponent from '../../../../components/ImagePickerComponent';

const FinalStep = props => {
  const {navigation, route} = props;
  const cardInfo = route.params;
  console.log(cardInfo);
  const [carImages, setCarImages] = useState('');

  
  const [selectedImagePath, setSelectedImagePath] = useState(Array);
  const [imageThumbnail, setImageThumbnail] = useState('');
  const handleImageSelected = path => {
    setSelectedImagePath(prevArray => [...prevArray, path]);
  };
  const handleImageThumbnailSelected = path => {
    setImageThumbnail(path);
  };
  const [checkImage, setCheckImage] = useState(false);
  const [checkImageThumbnail, setCheckImageThumbnail] = useState(false);
  const uploadImage = async () => {
    try {
      const formData = new FormData();
      formData.append('image', {
        uri: imageThumbnail,
        type: 'icon/icon_jpeg',
        name: 'image.jpg',
      });
      const response = await axios.post(
        'http://103.57.129.166:3000/car/api/upload-single-image',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      console.log(response.data.link);
     
      setImageThumbnail(response.data.link);
      if (response.data.result) {
        showToastMessage('', 'Upload images thumbnail success');
        setCheckImageThumbnail(true);
      } else {
        showToastMessage('', 'Upload images thumbnail fail', ICON.cancelWhite);
      }
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };
  const uploadImages = async () => {
    try {
      const formData = new FormData();
      selectedImagePath.forEach((uri, index) => {
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
      const encodedImageUrls = response.data.link.map(url => encodeURIComponent(url));
      console.log("hinhãnhe",encodedImageUrls);
      setCarImages(encodedImageUrls);
      if (response.data.result) {
        showToastMessage('', 'Upload images success');
        setCheckImage(true);
      } else {
        showToastMessage('', 'Upload images fail', ICON.cancelWhite);
      }
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };
  //call api add car here
  const addNewCar = async () => {
    try {
      console.log('hinh anh : ', JSON.stringify(carImages));
      const response = await axios.post(
        'http://103.57.129.166:3000/car/api/add',
        {
          idUser: 1,
          //step1
          carBrand: cardInfo.carInfo.carInfo.selectedBrand,
          numberPlate: cardInfo.carInfo.carInfo.carNumber,
          name: cardInfo.carInfo.carInfo.selectedModel,
          yearOfManufacture: cardInfo.carInfo.carInfo.selectedYear,
          seats: cardInfo.carInfo.carInfo.selectedSeats,
          gear: cardInfo.carInfo.carInfo.selectedTransmission,
          fuel: cardInfo.carInfo.carInfo.selectedFuel,

          //step2
          locationCar: cardInfo.carInfo2.location,
          latitude: 0,
          longitude: 0,
          description: cardInfo.carInfo2.description,
          fuelConsumption: parseInt(cardInfo.carInfo2.fuelConsumption),

          isDelivery: cardInfo.carInfo2.isDelivery,
          deliveryWithin: cardInfo.carInfo2.deliveryWithin,
          deliveryFee: cardInfo.carInfo2.deliveryFee,
          freeDeliveryWithin: cardInfo.carInfo2.freeDeliveryWithin,

          limitKmStatus: cardInfo.carInfo2.limitKmStatus,
          maxKm: cardInfo.carInfo2.maxKm,
          exceededFee: cardInfo.carInfo2.exceededFee,

          price: cardInfo.carInfo2.price,
          utilities: cardInfo.carInfo2.selectedFeatures.toString(),
          image: carImages.toString(),
          imageThumbnail: imageThumbnail,
          locationCar: "",
        },
      );
      console.log(response.data);
      if (response.data.result) {
        showToastMessage('', 'Đăng xe thành công');
        navigation.navigate('ListCar');
      } else {
        showToastMessage('', 'Đăng xe thất bại', ICON.cancelWhite);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <SafeAreaView style={appStyle.container}>
      <AppHeader title="ẢNH XE" />
      <ScrollView style={appStyle.main}>
        <View style={{flex: 1, justifyContent: 'space-evenly'}}>
          <Text style={appStyle.text165}>Ảnh xe</Text>
          <Text style={{marginBottom: 10}}>
            Bạn vui lòng đăng 1 tấm ảnh đại diện của xe
          </Text>
          <ImagePickerComponent
            onImageSelected={handleImageThumbnailSelected}
          />
          {checkImageThumbnail == false ? (
            <TouchableOpacity
              style={{marginBottom: 20, marginTop: 10, flexDirection: 'row'}}
              onPress={() => {
                uploadImage();
                //setCheckImage(true);
              }}>
              <FastImage
                source={ICON.Add}
                tintColor={COLOR.primary}
                style={appStyle.icon}
              />
              <Text
                style={[
                  appStyle.text14Bold,
                  {marginLeft: 10, color: COLOR.primary},
                ]}>
                Thêm ảnh bìa
              </Text>
            </TouchableOpacity>
          ) : (
            <View
              style={{marginBottom: 20, marginTop: 10, flexDirection: 'row'}}>
              <FastImage
                source={ICON.Done}
                tintColor={COLOR.green}
                style={appStyle.icon}
              />
              <Text
                style={[
                  appStyle.text14Bold,
                  {marginLeft: 10, color: COLOR.green},
                ]}>
                Đã cập nhật ảnh bìa
              </Text>
            </View>
          )}
          <Text style={{marginBottom: 10}}>
            Bạn vui lòng đăng 4 ảnh (Trước - sau - trái - phải) để tăng hiệu quả
            cho thuê và đủ điều kiện để đăng ký.
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          <ImagePickerComponent onImageSelected={handleImageSelected} />
          <ImagePickerComponent onImageSelected={handleImageSelected} />
          <ImagePickerComponent onImageSelected={handleImageSelected} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          <ImagePickerComponent onImageSelected={handleImageSelected} />
          <ImagePickerComponent onImageSelected={handleImageSelected} />
          <ImagePickerComponent onImageSelected={handleImageSelected} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          <ImagePickerComponent onImageSelected={handleImageSelected} />
          <ImagePickerComponent onImageSelected={handleImageSelected} />
          <ImagePickerComponent onImageSelected={handleImageSelected} />
        </View>
        {checkImage == false ? (
          <TouchableOpacity
            style={{marginBottom: 20, marginTop: 10, flexDirection: 'row'}}
            onPress={() => {
              uploadImages();
            }}>
            <FastImage
              source={ICON.Add}
              tintColor={COLOR.primary}
              style={appStyle.icon}
            />
            <Text
              style={[
                appStyle.text14Bold,
                {marginLeft: 10, color: COLOR.primary},
              ]}>
              Thêm hình ảnh xe
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={{marginBottom: 20, marginTop: 10, flexDirection: 'row'}}>
            <FastImage
              source={ICON.Done}
              tintColor={COLOR.green}
              style={appStyle.icon}
            />
            <Text
              style={[
                appStyle.text14Bold,
                {marginLeft: 10, color: COLOR.green},
              ]}>
              Đã cập nhật hình ảnh xe
            </Text>
          </View>
        )}

        <AppButton
          title="Hoàn tất"
          marginBottom={70}
          onPress={() => addNewCar()}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default FinalStep;

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
  bottomNavigationView: {
    backgroundColor: '#fff',
    width: '100%',
    height: windowHeight * 0.7,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
