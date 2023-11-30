import {StyleProp, TextProps, TextStyle, ViewStyle} from 'react-native';

export type MultiImagePickerComponentProps = {
  containerStyle?: StyleProp<ViewStyle>;
  title?: string;
  titleStyle?: StyleProp<TextStyle>;

  borderRadius?: number;
  width?: number;
  height?: number;

  numberImage?: number;
  onImageSelected?: any;
  imageUrl?: any;
  iconSize?: any;
  icon?: any;
  space?: number;
};
