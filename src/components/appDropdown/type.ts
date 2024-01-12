import {StyleProp, TextProps, TextStyle, ViewStyle} from 'react-native';

export type AppDropdownProps = {
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  selectedTextStyle?: StyleProp<TextStyle>;
  inputSearchStyle?: StyleProp<TextStyle>;
  iconStyle?: StyleProp<ViewStyle>;
  placeholderStyle?: StyleProp<TextStyle>;
  dropdownStyle?: StyleProp<ViewStyle>;
  title?: string;
  placeholder?: string;

  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;

  width?: any;
  height?: any;
  maxHeight?: number;

  paddingVertical?: number;
  paddingHorizontal?: number;
  mode?: 'auto' | 'default' | 'modal';
  alignSelf?:
    | 'center'
    | 'flex-end'
    | 'flex-start'
    | 'baseline'
    | 'stretch'
    | 'auto';

  search?: boolean;
  searchPlaceholder?: string;
  placeholderTextColor?: string;
  data: Array<any>;
  labelField?: string;
  valueField?: string;
  value?: any;
  onChange: (value: any) => void;
  onFocus?: () => void;
  onBlur?: () => void;
};
