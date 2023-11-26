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
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import {COLOR} from '../constants/Theme';
import MultipleImagePicker from '../components/MultiImagePicker';
import AppButton from '../components/AppButton';

const TestMultiPicker = () => {
  const [images, setImages] = useState([]);
  const handleImageThumbnailSelected = path => {
    console.log(path);
    setImages(path);
  };
  
  const uploadImages = async () => {
    try {
      const formData = new FormData();
      console.log(images);

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
      console.log(response.data.links);
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };
  return (
    <View style={styles.container}>
      <AppButton onPress={() => uploadImages()} />
      <MultipleImagePicker onImageSelected={handleImageThumbnailSelected} />
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
    justifyContent: 'center',
    alignItems: 'center',

    borderWidth: 2,
    borderRadius: 8,
    padding: 12,
    borderColor: '#f1f1f1',
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
