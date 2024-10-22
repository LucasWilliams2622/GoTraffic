import React, {useState, useEffect, useMemo} from 'react';
import {
  ImageStyle,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
  Animated,
  ScrollView,
  Share,
  Alert,
  Pressable,
} from 'react-native';
import {carDetailData} from './data/data';
import {Row} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {COLOR} from '../../../constants/Theme';
import ShieldIcon from '../../../assets/icon/ic_shield_verified';
import {appStyle} from '../../../constants/AppStyle';
import SuitcaseIcon from '../../../assets/icon/ic_suitcase';
import {CarCardItemStyles} from '../../../components/Home/Home/CarCardItem';
import StickIcon from '../../../assets/icon/ic_stick';
import SeatIcon from '../../../assets/icon/ic_seat';
import GasolineIcon from '../../../assets/icon/ic_gasoline';
import EngineIcon from '../../../assets/icon/ic_engine';
import Geocoder from 'react-native-geocoding';
import {REACT_APP_GOOGLE_MAPS_API_KEY} from '@env';
import {
  PressableIcon,
  SlideShow,
} from '../../../components/Home/Detail/SlideShow';
import {TimeAndPlacePickup} from '../../../components/Home/Detail/TimeAndPlacePickup';
import {FeatureItem} from '../../../components/Home/Detail/FeatureItem';
import {Amenities} from '../../../components/Home/Detail/Amenities';
import {CarLocation} from '../../../components/Home/Detail/CarLocation';
import {OwnerInfo} from '../../../components/Home/Detail/OwnerInfo';
import {Rating} from '../../../components/Home/Detail/Rating';
import {RatingModal} from '../../../components/Home/Detail/RatingModal';
import {Car, CarDetailProps, PressableIconProps} from '../../../types';
import {calculateAvgRating, formatPrice} from '../../../utils/utils';
import OtherDetails from '../../../components/Home/Detail/OtherDetails';
import Confirm from './Confirm';
import Modal from 'react-native-modal';

Geocoder.init(REACT_APP_GOOGLE_MAPS_API_KEY || '');

export const SectionTitle: React.FC<{
  title: string;
  style?: StyleProp<ViewStyle | TextStyle | ImageStyle>;
}> = ({title, style}) => {
  return <Text style={[styles.SectionTitle, style]}>{title}</Text>;
};

const ICON_SIZE = 20;

const PressableIconCarDetail = ({
  name,
  color,
  size = ICON_SIZE,
  solid,
  onPress,
}: PressableIconProps) => (
  <Pressable onPress={onPress}>
    <Icon name={name} color={color} size={size} solid={solid} />
  </Pressable>
);

const BottomBar: React.FC<{price: number; car: Car}> = ({price, car}) => {
  const formattedPrice = useMemo(() => formatPrice(price), [price]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  return (
    <View
      style={{
        backgroundColor: COLOR.white,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderTopColor: COLOR.borderColor,
        borderTopWidth: StyleSheet.hairlineWidth,
        paddingBottom: 30,
      }}>
      <Row style={{display: 'flex', justifyContent: 'space-between'}}>
        <View>
          <Text>Số ngày thuê: 1 ngày</Text>
          <Pressable>
            <Text
              style={{color: COLOR.fifth, fontSize: 18, fontWeight: 'bold'}}>
              {formattedPrice}
            </Text>
          </Pressable>
        </View>
        <Modal isVisible={isModalVisible} style={{margin: 0}}>
          <Confirm closeModal={() => setIsModalVisible(false)} car={car} />
        </Modal>
        <Pressable
          style={{backgroundColor: COLOR.fifth, padding: 10, borderRadius: 8}}
          onPress={() => setIsModalVisible(true)}>
          <Row style={{alignItems: 'center'}}>
            <Icon name={'bolt'} color={COLOR.white} size={20} solid />
            <Text
              style={{color: COLOR.white, marginLeft: 5, fontWeight: 'bold'}}>
              Chọn thuê
            </Text>
          </Row>
        </Pressable>
      </Row>
    </View>
  );
};
const CarDetail: React.FC<CarDetailProps> = ({car_id, close}) => {
  const [carCoordinates, setCarCoordinates] = useState<Geocoder.LatLng | null>(
    null,
  );
  const [isRatingModalVisible, setRatingModalVisible] =
    useState<boolean>(false);

  const toggleModal = () => {
    setRatingModalVisible(!isRatingModalVisible);
  };

  const [isFavorite, setIsFavorite] = React.useState<boolean>(false);

  const car: Car | undefined = carDetailData.find(x => x.id == car_id);

  useEffect(() => {
    if (car) {
      Geocoder.from(car.location)
        .then(json => {
          let location = json.results[0].geometry.location;
          setCarCoordinates(location);
          console.log(location);
        })
        .catch(error => console.warn(error));
    }
  }, [car]);

  const SLIDESHOW_HEIGHT = 200;

  const scrollY = new Animated.Value(0);

  const topBarY = scrollY.interpolate({
    inputRange: [SLIDESHOW_HEIGHT, SLIDESHOW_HEIGHT + 5],
    outputRange: [-150, 0],
    extrapolate: 'clamp',
  });

  const handleShare = async () => {
    try {
      await Share.share({
        message: 'Check out this car!',
      });
    } catch (error) {
      const message = (error as Error).message;
      Alert.alert(message);
    }
  };

  const StickyHeader: React.FC<{name: string}> = ({name}) => {
    return (
      <Animated.View
        style={{
          transform: [{translateY: topBarY}],
          backgroundColor: COLOR.white,
          width: '100%',
          position: 'absolute',
          top: 0,
          borderBottomColor: COLOR.borderColor,
          borderBottomWidth: StyleSheet.hairlineWidth,
          paddingTop: 20,
        }}>
        <Row
          style={{
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            paddingVertical: 30,
          }}>
          <Row
            style={{
              alignItems: 'center',
            }}>
            <PressableIconCarDetail
              name="x"
              color={COLOR.black}
              size={20}
              onPress={close}
            />
            <Text
              style={{
                color: COLOR.black,
                fontWeight: 'bold',
                fontSize: 18,
                marginLeft: 20,
              }}>
              {name.length > 15 ? name.substring(0, 15) + '...' : name}
            </Text>
          </Row>

          <PressableIconCarDetail
            name="share-nodes"
            color={COLOR.black}
            size={24}
            onPress={handleShare}
          />
          <PressableIconCarDetail
            name="heart"
            color={isFavorite ? COLOR.fifth : COLOR.black}
            size={20}
            solid={isFavorite}
            onPress={() => setIsFavorite(!isFavorite)}
          />
        </Row>
      </Animated.View>
    );
  };

  const topViewOpacity = scrollY.interpolate({
    inputRange: [SLIDESHOW_HEIGHT, SLIDESHOW_HEIGHT + 5],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  if (car) {
    return (
      <View style={{flex: 1}}>
        <Animated.View style={[styles.topContainer, {opacity: topViewOpacity}]}>
          <PressableIcon
            name="x"
            color={COLOR.white}
            size={20}
            onPress={close}
          />
          <View style={styles.row}>
            <PressableIcon
              name="share-nodes"
              color={COLOR.white}
              size={24}
              onPress={handleShare}
              style={{marginRight: 10}}
            />
            <PressableIcon
              name="heart"
              color={isFavorite ? COLOR.fifth : COLOR.white}
              size={20}
              solid={isFavorite}
              onPress={() => setIsFavorite(!isFavorite)}
            />
          </View>
        </Animated.View>
        <ScrollView
          style={{
            backgroundColor: COLOR.white,
          }}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {useNativeDriver: false},
          )}>
          <SlideShow images={car.images} close={close} scrollY={scrollY} />

          <View style={{paddingHorizontal: 10, paddingVertical: 20}}>
            {/* Car title and rating info */}
            <Row style={{alignItems: 'center'}}>
              <Text style={[appStyle.text16Bold, {marginRight: 10}]}>
                {car.title.toUpperCase()}
              </Text>
              <ShieldIcon color={COLOR.fifth} />
            </Row>
            <Row style={{alignItems: 'center'}}>
              <Icon name="star" color={COLOR.third} size={12} solid />
              <Text style={[CarCardItemStyles.ratingText, {marginLeft: 5}]}>
                {calculateAvgRating(car.rating)}
              </Text>
              <Text
                style={[
                  CarCardItemStyles.dot,
                  {marginLeft: 5, marginRight: 5},
                ]}>
                ·
              </Text>
              <SuitcaseIcon color={COLOR.fifth} />
              <Text style={[CarCardItemStyles.ratingText, {marginLeft: 5}]}>
                {car.totalRide} chuyến
              </Text>
            </Row>

            <TimeAndPlacePickup location={car.location} />

            <View>
              <SectionTitle title="Đặc điểm" style={{marginTop: 10}} />
              <Row
                style={{
                  marginTop: 20,
                  flex: 1,
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'space-evenly',
                }}>
                {car.features.map((feature, index) => {
                  const icons = [StickIcon, SeatIcon, GasolineIcon, EngineIcon];
                  return (
                    <FeatureItem
                      key={index}
                      icon={icons[index]}
                      color={COLOR.fifth}
                      feature={feature}
                    />
                  );
                })}
              </Row>
            </View>
            <View style={[CarCardItemStyles.separator, {marginTop: 20}]} />
            <View>
              <SectionTitle title="Mô tả" style={{marginTop: 10}} />
              <Text>{car.description}</Text>
            </View>
            <View style={[CarCardItemStyles.separator, {marginTop: 20}]} />
            <SectionTitle
              title="Các tiện nghi trên xe"
              style={{marginTop: 10}}
            />
            {car.amenities && <Amenities amenities={car.amenities} />}
            <View style={[CarCardItemStyles.separator, {marginTop: 20}]} />
            {carCoordinates && (
              <View>
                <SectionTitle title="Vị trí xe" style={{marginTop: 10}} />
                <CarLocation
                  location={car.location}
                  carCoordinates={carCoordinates}
                />
              </View>
            )}
            <View>
              <SectionTitle title="Chủ xe" style={{marginTop: 10}} />
              <OwnerInfo
                owner={car.owner}
                rating={car.owner.rating}
                totalRide={car.totalRide}
              />
            </View>
            <View style={[CarCardItemStyles.separator, {marginTop: 20}]} />
            {car.rating.length > 0 && (
              <View>
                <SectionTitle title="Đánh giá" style={{marginTop: 10}} />
                <Rating rating={car.rating} toggleModal={toggleModal} />
              </View>
            )}
            <View style={[CarCardItemStyles.separator, {marginTop: 20}]} />
            <OtherDetails />
          </View>

          <View style={{width: '100%', height: 70}}></View>
          <RatingModal
            isRatingModalVisible={isRatingModalVisible}
            toggleModal={toggleModal}
            rating={car.rating}
          />
        </ScrollView>
        <StickyHeader name={car.title} />
        <BottomBar price={car.price} car={car} />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  SectionTitle: {fontSize: 16, fontWeight: 'bold'},
  topContainer: {
    width: '100%',
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 40,
  },
  row: {
    flexDirection: 'row',
  },
});

export default CarDetail;
