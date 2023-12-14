import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Modal,
  PermissionsAndroid,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  appStyle,
  windowHeight,
  windowWidth,
} from '../../../../constants/AppStyle';
import {COLOR, ICON} from '../../../../constants/Theme';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import FastImage from 'react-native-fast-image';
import Header from '../../../../components/Header';
import AppButton from '../../../../components/AppButton';
import CarImageSection from '../../../../components/Profile/CameraImageSection';
import AppHeader from '../../../../components/AppHeader';
import {useNavigation} from '@react-navigation/native';
import {AppContext} from '../../../../utils/AppContext';
import ImagePickerComponent from '../../../../components/ImagePickerComponent';
import MultipleImagePicker from '../../../../components/MultiImagePicker';
import axios from 'axios';
import {showToastMessage} from '../../../../utils/utils';

const ExhibitOfCar = props => {
  const navigation = useNavigation();
  const {id} = props.route.params;
  const {idUser} = useContext(AppContext);
  const [imageRegister, setImageRegister] = useState('');
  const [imageInsurance, setImageInsurance] = useState('');
  const handleImageRegister = path => {
    setImageRegister(path);
  };
  const handleImageInsurance = path => {
    setImageInsurance(path);
  };
  const [images, setImages] = useState([]);
  const handleImagesSelected = path => {
    setImages(path);
  };
  const uploadImage = async () => {
    try {
      const formData = new FormData();
      formData.append('image', {
        uri: imageRegister,
        type: 'icon/icon_jpeg',
        name: 'image.jpg',
      });
      const formData2 = new FormData();
      formData2.append('image', {
        uri: imageInsurance,
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
      const response2 = await axios.post(
        'http://103.57.129.166:3000/car/api/upload-single-image',
        formData2,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      if (response.data.result && response2.data.result) {
        setImageRegister(response.data.link);
        setImageInsurance(response2.data.link);
        await uploadImages(response.data.link, response2.data.link);
      } else {
        showToastMessage('error', 'Upload image fail');
      }
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };

  const uploadImages = async (imageRegister, imageInsurance) => {
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
        await updateImage(jsonStringWithQuotes, imageRegister, imageInsurance);
      } else {
        showToastMessage('error', 'Upload ảnh xe thất bại');
      }
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };
  const handleUpdate = async () => {
    try {
      if (imageRegister.length == 0) {
        showToastMessage('error', 'Vui lòng chọn ảnh đăng ký');
        return;
      } else if (imageInsurance.length == 0) {
        showToastMessage('error', 'Vui lòng chọn ảnh bảo hiểm');
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

  const updateImage = async (images, imageRegister, imageInsurance) => {
    try {
      console.log('anh xe:   ', images);
      const response = await axios.put(
        'http://103.57.129.166:3000/car/api/update-image-car?idCar=' + id,
        {
          image: images,
          imageRegister: imageRegister,
          imageRegistry: imageRegister,
          imageInsurance: imageInsurance,
          imageThumbnail: '',
        },
      );
      if (response.data.result) {
        showToastMessage('', 'Cập nhật hình ảnh xe thành công');
        navigation.navigate('ListCar');
      } else {
        showToastMessage('error', 'Cập nhật hình ảnh xe thất bại');
      }
    } catch (error) {
      showToastMessage('error', 'Cập nhật hình ảnh xe thất bại !!!');
    }
  };

  return (
    <SafeAreaView style={appStyle.container}>
      <AppHeader title="Hợp đồng & bảo hiểm" />

      <ScrollView
        style={{
          flex: 1,
          width: windowWidth,
          height: windowHeight * 0.8,
          marginBottom: 70,
        }}>
        <View style={appStyle.main}>
          {/* Giấy tờ xe */}
          <View style={{marginTop: 20}}>
            <Text style={[appStyle.text18Bold]}>Giấy tờ của xe</Text>
            <View style={[appStyle.rowBetween, {marginTop: 10}]}>
              <ImagePickerComponent
                containerStyle={{marginTop: 24, marginBottom: 32}}
                width={windowWidth * 0.8}
                height={200}
                iconSize={50}
                title="Chọn ảnh giấy tờ"
                onImageSelected={handleImageRegister}
              />
            </View>
          </View>

          {/* Bảo hiểm */}
          <View style={{marginTop: 20}}>
            <Text style={[appStyle.text18Bold]}>Bảo hiểm của xe</Text>
            <View style={[appStyle.rowBetween, {marginTop: 10}]}>
              <ImagePickerComponent
                containerStyle={{marginTop: 24, marginBottom: 32}}
                width={windowWidth * 0.8}
                height={200}
                iconSize={50}
                title="Chọn ảnh bảo hiểm"
                onImageSelected={handleImageInsurance}
              />
            </View>
          </View>

          {/* Xe */}
          <View style={{marginTop: 20}}>
            <Text style={[appStyle.text18Bold]}>Ảnh của xe</Text>
            <View style={[appStyle.columnCenter, {marginTop: 10}]}>
              <MultipleImagePicker
                onImageSelected={handleImagesSelected}
                numberImage={9}
                space={14}
              />
            </View>
          </View>
          <AppButton
            title="Cập nhật"
            marginTop={20}
            onPress={() => handleUpdate()}
          />
        </View>
      </ScrollView>
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
    marginTop: 20,
  },
});
