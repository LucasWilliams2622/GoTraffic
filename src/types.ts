import {DayProps} from 'react-native-calendars/src/calendar/day';
import {SvgProps} from 'react-native-svg';

export type CarDetailProps = {
  car_id: number;
  close: () => void;
  setSwipeEnabled: (enabled: boolean) => void;
  viewedCars?: Car[];
  setViewedCars?: (viewedCars: Car[]) => void;
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
  price: number;
  licensePlate: string;
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
  style?: object;
}

export type SlideShowProps = {
  images: string[];
  close: () => void;
  scrollY: any;
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
  selectedTime?: any;
  setSelectedTime?: any;
  location?: string;
  setLocation?: any;
}

export interface ViewProps {
  timeString: string;
  navigation?: any;
  route?: any;
  selectedTime?: any;
  setSelectedTime?: any;
  location?: any;
  setLocation?: any;
}

export interface RadioButtonProps {
  value: string;
  tripType: string;
  text: string;
}

export interface CarCardItemProps {
  id: string;
  name: string;
  image: string;
  imageThumbnail: string;
  locationCar: string;
  isDelivery?: string;
  gear: string;
  originalPrice?: number;
  price: number;
  rating: number;
  numberOfBooked: number;
  isFavorite: boolean;
  width?: any;
  onPress: () => void;
}

export interface FeaturedLocationProps {
  id: number;
  title: string;
  image: string;
  totalCar: number;
  selectedTime: any;
  setSelectedTime: any;
}

export interface FeaturedLocationFrameProps extends SvgProps {
  img: string;
}

export interface PromotionProps {
  image: string;
  width: number;
  height: number;
}

export interface BenefitProps {
  image?: any;
  width: number;
  height: number;
}

export interface AirportPickingProps {
  id: number;
  title: string;
  image: string;
  totalCar: number;
  selectedTime: any;
  setSelectedTime: any;
}

export interface RenderListProps<T> {
  data: T[];
  renderItem: ({item}: {item: T}) => JSX.Element;
  snapToInterval: number;
  reverse?: boolean;
}

export interface SectionProps {
  title: string;
  data: any[];
  renderItem: ({item}: {item: any}) => JSX.Element;
  snapToInterval: number;
  reverse?: boolean;
}

export type StackScreenParamList = {
  Home: undefined;
  CarDetail: {car_id: number; navigation: any};
};

export type DateRange = {
  startDate: string;
  endDate: string;
};

export type MarkedDate = {
  startingDay?: boolean;
  endingDay?: boolean;
  color: string;
  textColor: string;
};

export interface ExtendedDayProps extends DayProps {
  price: number;
}

export interface Location {
  latitude: number;
  longitude: number;
}
