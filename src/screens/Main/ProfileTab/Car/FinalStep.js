import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect, useRef, useContext} from 'react';
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
import {AppContext} from '../../../../utils/AppContext';
import MultipleImagePicker from '../../../../components/MultiImagePicker';

const FinalStep = props => {
  const {navigation, route} = props;
  const cardInfo = route.params;

  const {idUser} = useContext(AppContext);
  const [imageThumbnail, setImageThumbnail] = useState('');
  const handleImageThumbnailSelected = path => {
    setImageThumbnail(path);
  };
  const [images, setImages] = useState([]);
  const handleImagesSelected = path => {
    setImages(path);
  };
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

      if (response.data.result) {
        // showToastMessage('', 'Upload ảnh bìa thành công');
        setImageThumbnail(response.data.link);
        console.log('response.data.link', response.data.link);
        await uploadImages(response.data.link);
      } else {
        showToastMessage('error', 'Upload images thumbnail fail');
      }
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };

  const uploadImages = async thumbnail => {
    try {
      const formData = new FormData();
      images.forEach((uri, index) => {
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

      if (response.data.result) {
        const jsonString = JSON.stringify(response.data.links);
        const jsonStringWithQuotes = `\'${jsonString}\'`;
        console.log('jsonStringWithQuotes', jsonStringWithQuotes);
        setImages(jsonStringWithQuotes);
        // showToastMessage('', 'Upload ảnh xe thành công');
        await addCarStep2(jsonStringWithQuotes, thumbnail);
      } else {
        showToastMessage('error', 'Upload ảnh xe thất bại');
      }
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };
  
  //call api add car here
  const addNewCar = async () => {
    try {
      if (imageThumbnail.length == 0) {
        showToastMessage('error', 'Vui lòng chọn ảnh bìa cho xe');
        return;
      } else if (images && images.filter(image => image !== null).length < 4) {
        showToastMessage('error', 'Vui lòng chọn nhiều hơn 4 tấm ảnh');
        return;
      } else {
        await uploadImage();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addCarStep2 = async (carImages, thumbnail) => {
    try {
      console.log(
        ' cardInfo.carInfo2.price',
        parseInt(cardInfo.carInfo2.price),
      );
      const response = await axios.post(
        'http://103.57.129.166:3000/car/api/add',
        {
          idUser: idUser,
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
          image: carImages,
          imageThumbnail: thumbnail,
          locationCar: '',
        },
      );
      console.log(response.data);
      if (response.status === 200) {
        console.log(response.data);
        showToastMessage('', 'Đăng xe thành công');
        navigation.navigate('ListCar');
      } else {
        showToastMessage('error', 'Xe đã tồn tại rồi');
      }
    } catch (error) {
      showToastMessage('error', 'Đăng xe thất bại');
    }
  };
  return (
    <SafeAreaView style={appStyle.container}>
      <AppHeader title="ẢNH XE" />
      <ScrollView
        style={appStyle.main}
        shouldRasterizeIOS
        showsVerticalScrollIndicator={false}>
        <ImagePickerComponent
          containerStyle={{marginTop: 24, marginBottom: 32}}
          width={windowWidth * 0.8}
          height={200}
          iconSize={50}
          title="Chọn ảnh bìa"
          onImageSelected={handleImageThumbnailSelected}
        />
        <MultipleImagePicker
          onImageSelected={handleImagesSelected}
          numberImage={9}
          space={14}
        />
      </ScrollView>
      <View style={appStyle.boxCenter}>
        <AppButton
          title="Hoàn tất"
          marginBottom={90}
          width="96%"
          onPress={() => addNewCar()}
        />
      </View>
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
