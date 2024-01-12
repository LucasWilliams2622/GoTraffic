import {StyleProp, TextProps, TextStyle, ViewStyle} from 'react-native';

export type ImagePickerComponentProps = {
  containerStyle?: StyleProp<ViewStyle>;
  title?: string;
  titleStyle?: StyleProp<TextStyle>;

  borderRadius?: number;
  width?: number;
  height?: number;
  alignSelf?:
    | 'center'
    | 'flex-end'
    | 'flex-start'
    | 'baseline'
    | 'stretch'
    | 'auto';
  onImageSelected?: any;
  icon?: any;
  imageUrl?: any;
  iconSize?: any;
};
