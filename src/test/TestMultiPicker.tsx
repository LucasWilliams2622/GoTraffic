import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Button,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-actionsheet';
import {Platform} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import AxiosInstance from '../constants/AxiosInstance';
import {showToastMessage} from '../utils/utils';
import axios from 'axios';

const TestMultiPicker = () => {
  const [selectedImages, setSelectedImages] = useState(Array(9).fill(null));
  const actionSheetRef = useRef();

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
              <Image source={{uri: image}} style={styles.image} />
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

    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };
  return (
    <View style={styles.container}>
      <Button title="Print Array Images" onPress={() => uploadImages()} />
      <View style={styles.imageGrid}>{renderSelectedImages()}</View>

      {/* Action Sheet */}
      <ActionSheet
        ref={actionSheetRef}
        title={'Select Image'}
        options={['Choose from Library', 'Take Photo', 'Cancel']}
        cancelButtonIndex={2}
        destructiveButtonIndex={2}
        onPress={handleActionSheetPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
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

export default TestMultiPicker;
