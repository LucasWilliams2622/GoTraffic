import {SafeAreaView, StyleSheet, View, ScrollView} from 'react-native';
import React, {useState, useEffect, useRef, useContext} from 'react';
import {
  appStyle,
  windowHeight,
  windowWidth,
} from '../../../../constants/AppStyle';
import {COLOR, ICON} from '../../../../constants/Theme';
import AppButton from '../../../../components/AppButton';
import axios from 'axios';
import {showToastMessage} from '../../../../utils/utils';
import AppHeader from '../../../../components/AppHeader';
import ImagePickerComponent from '../../../../components/ImagePickerComponent';
import {AppContext} from '../../../../utils/AppContext';
import MultipleImagePicker from '../../../../components/MultiImagePicker';
import {useNavigation} from '@react-navigation/native';

const FinalStep = props => {
  const navigation = useNavigation();
  const {carInfo} = props.route.params;

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
        // console.log('jsonStringWithQuotes', jsonStringWithQuotes);
        setImages(jsonStringWithQuotes);
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
      const data = {
        idUser: idUser,
        //step1
        carBrand: carInfo.selectedBrand,
        numberPlate: carInfo.carNumber,
        name: carInfo.selectedModel,
        yearOfManufacture: carInfo.selectedYear,
        seats: carInfo.selectedSeats,
        gear: carInfo.selectedTransmission,
        fuel: carInfo.selectedFuel,

        //step2
        locationCar: carInfo.locationCar,
        latitude: carInfo.latitude,
        longitude: carInfo.longitude,
        description: carInfo.description,
        fuelConsumption: parseInt(carInfo.fuelConsumption),

        isDelivery: carInfo.isDelivery,
        deliveryWithin: carInfo.deliveryWithin,
        deliveryFee: carInfo.deliveryFee,
        freeDeliveryWithin: carInfo.freeDeliveryWithin,

        limitKmStatus: carInfo.limitKmStatus,
        maxKm: carInfo.maxKm,
        exceededFee: carInfo.exceededFee,

        price: carInfo.price,
        utilities: carInfo.selectedFeatures,
        image: carImages,
        imageThumbnail: thumbnail,
        withDriver: carInfo.withDriver,
      };
      const response = await axios.post(
        'http://103.57.129.166:3000/car/api/add',
        data,
      );

      if (response.data.result) {
        showToastMessage('', 'Đăng xe thành công');
        navigation.navigate('ListCar');
      } else {
        showToastMessage('error', 'Đăng xe thất bại');
      }
    } catch (error) {
      showToastMessage('error', 'Đăng xe thất bại !!!');
    }
  };
  return (
    <SafeAreaView style={appStyle.container}>
      <AppHeader title="Ảnh xe" />
      <ScrollView
        style={[appStyle.main, {marginBottom: 72}]}
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

        <AppButton title="Hoàn tất" width="96%" onPress={() => addNewCar()} />
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
