import {SvgProps} from 'react-native-svg';

export type CarDetailProps = {
  // route: {
  //   params: {
  //     car_id?: number;
  //     navigation: any;
  //   };
  // };
  car_id: number;
  close: () => void;
};

export type Feature = {
  'Truyền động'?: string;
  'Số ghế'?: string;
  'Nhiên liệu'?: string;
  'Tiêu hao'?: string;
};

export type Car = {
  id: number;
  images: string[];
  title: string;
  rating: RatingItem[];
  totalRide: number;
  location: string;
  features: Feature[];
  description: string;
  amenities?: string[];
  owner: Owner;
};

export interface CarLocationProps {
  location: string;
  carCoordinates: {
    lat: number;
    lng: number;
  };
}

export type IconComponentType = React.ComponentType<IconProps>;

export type FeatureItemProps = {
  icon: IconComponentType;
  color: string;
  feature: {[key: string]: string};
};

export type TimeAndPlacePickupProps = {
  location: string;
};

export interface PressableIconProps {
  name: string;
  color: string;
  size: number;
  solid?: boolean;
  onPress: () => void;
}

export type SlideShowProps = {
  images: string[];
  close: () => void;
};

export type ImageViewComponentProps = {
  images: {uri: string}[];
  imageIndex: number;
  modalVisible: boolean;
  handleClose: () => void;
};

export type Owner = {
  avatar: string;
  name: string;
  rating: number;
  responseRate: string;
  acceptRate: string;
  responseIn: number;
};

export interface OwnerInfoProps {
  owner: Owner;
  rating: number;
  totalRide: number;
}

export type RatingItem = {
  avatar: string;
  username: string;
  date: string;
  rating: number;
  description?: string;
};

export interface RatingProps {
  rating: RatingItem[];
  toggleModal: () => void;
}

export interface RatingItemProps {
  item: RatingItem;
}

export interface RatingModalProps {
  isRatingModalVisible: boolean;
  toggleModal: () => void;
  rating: {
    avatar: string;
    username: string;
    date: string;
    description?: string;
    rating: number;
  }[];
}

export interface IconProps extends SvgProps {
  color?: string;
  width?: number;
  height?: number;
}

type AmenityIcon = {
  name: string;
  icon: any;
};

export type AmenitiesIconMapping = {
  [key: string]: AmenityIcon;
};

export interface ButtonProps {
  isSelfDriving: boolean;
  setIsSelfDriving: (value: boolean) => void;
  config: ButtonConfig;
}

export enum ButtonSide {
  Left = 'left',
  Right = 'right',
}

export interface ButtonConfig {
  value: boolean;
  side: ButtonSide;
  icon: (isActive: boolean) => JSX.Element;
  text: string;
}

export interface InputFieldProps {
  iconName: string;
  placeholderText: string;
  value?: string;
  navigation: any;
  navigateTo: string;
}

export interface ViewProps {
  timeString: string;
  navigation?: any;
}

export interface RadioButtonProps {
  value: string;
  tripType: string;
  text: string;
}

export interface CarCardItemProps {
  id: number;
  title: string;
  image: string;
  location: string;
  benefit?: string;
  type: string;
  originalPrice?: number;
  price: number;
  rating: number;
  totalRide: number;
  onPress: () => void;
}

export interface FeaturedLocationProps {
  id: number;
  title: string;
  image: string;
  totalCar: number;
}

export interface FeaturedLocationFrameProps extends SvgProps {
  img: string;
}

export interface PromotionProps {
  image: string;
  width: number;
  height: number;
}

export interface AirportPickingProps {
  id: number;
  title: string;
  image: string;
  totalCar: number;
}

export interface RenderListProps<T> {
  data: T[];
  renderItem: ({item}: {item: T}) => JSX.Element;
  snapToInterval: number;
}

export interface SectionProps {
  title: string;
  data: any[];
  renderItem: ({item}: {item: any}) => JSX.Element;
  snapToInterval: number;
}

export type StackScreenParamList = {
  Home: undefined;
  CarDetail: {car_id: number; navigation: any};
};
