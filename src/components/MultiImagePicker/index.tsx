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
import {Platform} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import axios from 'axios';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import FastImage from 'react-native-fast-image';
import {appStyle, windowHeight} from '../../constants/AppStyle';
import {BottomSheet} from 'react-native-btr';
import AppButton from '../AppButton';
import {COLOR} from '../../constants/Theme';
import {MultiImagePickerComponentProps} from './type';

const MultipleImagePicker = ({
  containerStyle,
  title = 'Chọn ảnh',
  titleStyle,
  borderRadius = 8,
  width = 100,
  height = 100,

  numberImage = 8,
  onImageSelected,
  imageUrl,
  iconSize = 30,
  icon,
  space,
}: MultiImagePickerComponentProps) => {
  const [selectedImages, setSelectedImages] = useState(
    Array(numberImage).fill(null),
  );
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

  const openBottomSheet = () => {
    setBottomSheetVisible(true);
  };

  const closeBottomSheet = () => {
    setBottomSheetVisible(false);
  };

  const removeImage = index => {
    const updatedImages = [...selectedImages];
    updatedImages[index] = null;
    setSelectedImages(updatedImages);
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

  // Chọn hình từ thư viện
  const pickImage = async () => {
    try {
      const image = await ImagePicker.openPicker({
        mediaType: 'photo',
        // cropping: true,
      });
      const updatedImages = [...selectedImages];
      const emptySlotIndex = updatedImages.indexOf(null);
      if (emptySlotIndex !== -1) {
        updatedImages[emptySlotIndex] = image.path;
        setSelectedImages(updatedImages);
        onImageSelected && onImageSelected(updatedImages);
        closeBottomSheet();
      }
    } catch (error) {
      console.log('ImagePicker Error: ', error);
    }
  };

  // Chụp hình
  const takePhoto = async () => {
    try {
      await checkAndRequestPermission();
      const image = await ImagePicker.openCamera({
        cropping: true,
      });

      // Find the first empty slot in selectedImages and update the state
      const updatedImages = [...selectedImages];
      const emptySlotIndex = updatedImages.indexOf(null);
      if (emptySlotIndex !== -1) {
        updatedImages[emptySlotIndex] = image.path;
        setSelectedImages(updatedImages);
        onImageSelected && onImageSelected(updatedImages);
        closeBottomSheet();
      }
    } catch (error) {
      console.log('ImagePicker Error: ', error);
    }
  };

  // Render selected images
  const renderSelectedImages = () => {
    return selectedImages.map((image, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => openBottomSheet()}
        style={{marginBottom: space}}>
        {image ? (
          <View>
            <FastImage
              source={{uri: image}}
              style={[
                {
                  width: width,
                  height: height,
                  borderRadius: borderRadius,
                },
                containerStyle,
              ]}
            />
            <TouchableOpacity onPress={() => removeImage(index)}>
              <Text
                style={[
                  appStyle.text12,
                  {
                    marginTop: 8,
                    textAlign: 'center',
                    fontWeight: '500',
                    color: 'red',
                  },
                ]}>
                Xóa
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={[
              styles.imageContainer,
              {width: width, height: height, borderRadius: borderRadius},
              containerStyle,
            ]}>
            <Icon
              name="camera"
              type={IconType.Entypo}
              size={iconSize}
              color={COLOR.primary}
            />
            {!image && (
              <Text
                style={[appStyle.text12, {marginTop: 8, textAlign: 'center'}]}>
                {title}
              </Text>
            )}
          </View>
        )}
      </TouchableOpacity>
    ));
  };

  return (
    <View style={{}}>
      <View style={styles.imageGrid}>{renderSelectedImages()}</View>

      <BottomSheet
        visible={bottomSheetVisible}
        onBackButtonPress={closeBottomSheet}
        onBackdropPress={closeBottomSheet}>
        <View
          style={[
            appStyle.modalContentBottom,
            {
              height: windowHeight * 0.3,
              alignItems: 'center',
              justifyContent: 'space-around',
            },
          ]}>
          <Text style={[appStyle.text20, {width: '100%', textAlign: 'center'}]}>
            Chọn hình ảnh
          </Text>

          <AppButton
            title="Chụp ảnh"
            onPress={() => takePhoto()}
            containerStyle={{}}
          />
          <AppButton
            title="Chọn ảnh"
            backgroundColor={COLOR.background}
            textColor={COLOR.primary}
            onPress={() => pickImage()}
          />
          <TouchableOpacity onPress={closeBottomSheet}>
            <Text style={[appStyle.text16, {color: 'red'}]}>Huỷ</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </View>
  );
};

export default MultipleImagePicker;

const styles = StyleSheet.create({
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  boxCamera: {
    borderWidth: 1,
    borderColor: '#DFDFDF',
    paddingVertical: 14,
    backgroundColor: COLOR.background,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',

    borderWidth: 2,
    borderRadius: 8,
    padding: 14,
    borderColor: '#f1f1f1',
  },
  removeText: {
    color: 'red',
    marginTop: 5,
  },
});
