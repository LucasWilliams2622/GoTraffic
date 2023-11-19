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
  title,
  backgroundColor,
  textColor,
  borderColor,
  width = 100,
  height = 100,
  fontSize,
  alignSelf = 'center',
  borderRadius = 12,
  disabled,
  onPress,
  onImageSelected,
}: ImagePickerComponentProps) => {
  const [selectedImage, setSelectedImage] = useState(null);
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
      console.log(image.path);

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
              appStyle.column,
              styles.boxCamera,
              {
                alignSelf: 'center',
                alignItems: 'center',
                marginBottom: 20,
                borderWidth: 1,
                borderRadius: 12,
              },
            ]}>
            <Icon
              name="camera"
              type={IconType.Entypo}
              size={30}
              color={COLOR.primary}
              onPress={() => {}}
            />
            <Text style={[appStyle.text12, {marginTop: 8}, titleStyle]}>
              Chọn ảnh
            </Text>
          </View>
        ) : (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={{uri: selectedImage.uri}}
              style={[
                {
                  width: width,
                  height: height,
                  marginVertical: 24,
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
              height: windowHeight * 0.25,
              alignItems: 'center',
              justifyContent: 'space-around',
            },
          ]}>
          <Text style={[appStyle.text20, {width: '100%', textAlign: 'center'}]}>
            Chọn hình ảnh
          </Text>

          <AppButton title="Chụp ảnh" onPress={() => captureImage()} />
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
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#DFDFDF',
    paddingVertical: 14,
    paddingHorizontal: 22,
    backgroundColor: COLOR.background,
  },
});

export default ImagePickerComponent;
