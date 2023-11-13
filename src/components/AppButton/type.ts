import {StyleProp, TextProps, TextStyle, ViewStyle} from 'react-native';

export type AppButtonProps = {
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  title?: string;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  width?: string;
  fontSize?: number;
  alignSelf?:
    | 'center'
    | 'flex-end'
    | 'flex-start'
    | 'baseline'
    | 'stretch'
    | 'auto';
  disabled?: string;
  noShadow?: boolean;
  iconColor?: string;
  icon?: any;
  iconSize?: any;
  onPress?: () => void;
};
