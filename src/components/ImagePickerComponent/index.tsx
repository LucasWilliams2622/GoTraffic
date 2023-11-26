import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Button,
  Text,
  TouchableOpacity,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {BottomSheet} from 'react-native-btr';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import {ImagePickerComponentProps} from './type';
import {appStyle, windowHeight} from '../../constants/AppStyle';
import {COLOR} from '../../constants/Theme';
import AppButton from '../AppButton';
const ImagePickerComponent = ({
  containerStyle,
  titleStyle,
  width = 100,
  height = 100,
  alignSelf = 'center',
  borderRadius = 12,
  onImageSelected,
  imageUrl,
  iconSize = 30,
  title = 'Chọn ảnh',
}: ImagePickerComponentProps) => {
  const [selectedImage, setSelectedImage] = useState(imageUrl);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

  const pickImageFromGallery = async () => {
    try {
      const image = await ImagePicker.openPicker({
        cropping: true,
      });
      setSelectedImage({uri: image.path});
      console.log(image.path);

      // Call the callback function with the image path
      onImageSelected && onImageSelected(image.path);
      setBottomSheetVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  const captureImage = async () => {
    try {
      const image = await ImagePicker.openCamera({
        cropping: true,
      });
      setSelectedImage({uri: image.path});
      // console.log(image.path);

      // Call the callback function with the image path
      onImageSelected && onImageSelected(image.path);
      setBottomSheetVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  const openBottomSheet = () => {
    setBottomSheetVisible(true);
  };

  const closeBottomSheet = () => {
    setBottomSheetVisible(false);
  };

  return (
    <View>
      <TouchableOpacity onPress={openBottomSheet}>
        {!selectedImage ? (
          <View
            style={[
              styles.boxCamera,
              {
                alignSelf: alignSelf,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderRadius: 12,
                width: width,
                height: height,
              },
              containerStyle,
            ]}>
            <Icon
              name="camera"
              type={IconType.Entypo}
              size={iconSize}
              color={COLOR.primary}
              onPress={() => {}}
            />
            <Text style={[appStyle.text12, {marginTop: 8}, titleStyle]}>
              {title}
            </Text>
          </View>
        ) : (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: alignSelf,
            }}>
            <Image
              source={{uri: imageUrl ? imageUrl : selectedImage.uri}}
              style={[
                {
                  width: width,
                  height: height,
                  borderRadius: borderRadius,
                },
              ]}
            />
          </View>
        )}
      </TouchableOpacity>

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
            onPress={() => captureImage()}
            containerStyle={{}}
          />
          <AppButton
            title="Chọn ảnh"
            backgroundColor={COLOR.background}
            textColor={COLOR.primary}
            onPress={() => pickImageFromGallery()}
          />
          <TouchableOpacity onPress={closeBottomSheet}>
            <Text style={[appStyle.text16, {color: 'red'}]}>Huỷ</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </View>
  );
};
const styles = StyleSheet.create({
  boxCamera: {
    borderWidth: 1,
    borderColor: '#DFDFDF',
    paddingVertical: 14,
    backgroundColor: COLOR.background,
  },
});

export default ImagePickerComponent;
