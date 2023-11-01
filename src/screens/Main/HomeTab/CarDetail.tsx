import React, {useState, useEffect} from 'react';
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
import {SlideShow} from '../../../components/Home/Detail/SlideShow';
import {TimeAndPlacePickup} from '../../../components/Home/Detail/TimeAndPlacePickup';
import {FeatureItem} from '../../../components/Home/Detail/FeatureItem';
import {Amenities} from '../../../components/Home/Detail/Amenities';
import {CarLocation} from '../../../components/Home/Detail/CarLocation';
import {OwnerInfo} from '../../../components/Home/Detail/OwnerInfo';
import {Rating} from '../../../components/Home/Detail/Rating';
import {RatingModal} from '../../../components/Home/Detail/RatingModal';
import {Car, CarDetailProps} from '../../../types';
import {calculateAvgRating} from '../../../utils/utils';
import OtherDetails from '../../../components/Home/Detail/OtherDetails';

Geocoder.init(REACT_APP_GOOGLE_MAPS_API_KEY || '');

export const SectionTitle: React.FC<{
  title: string;
  style?: StyleProp<ViewStyle | TextStyle | ImageStyle>;
}> = ({title, style}) => {
  return <Text style={[styles.SectionTitle, style]}>{title}</Text>;
};

const CarDetail: React.FC<CarDetailProps> = ({
  car_id,
  close,
  setSwipeEnabled,
}) => {
  const [carCoordinates, setCarCoordinates] = useState<Geocoder.LatLng | null>(
    null,
  );
  const [isRatingModalVisible, setRatingModalVisible] =
    useState<boolean>(false);

  const [isScrollEnabled, setIsScrollEnabled] = useState<boolean>(true);

  const toggleModal = () => {
    setRatingModalVisible(!isRatingModalVisible);
  };

  const scrollY = new Animated.Value(0);

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

  if (car) {
    return (
      <ScrollView
        style={{
          backgroundColor: COLOR.white,
        }}
        onScroll={({nativeEvent}) => {
          if (nativeEvent.contentOffset.y == 5) {
            setIsScrollEnabled(false);
            setSwipeEnabled(true);
          } else {
            setIsScrollEnabled(true);
            setSwipeEnabled(false);
          }
        }}>
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
              style={[CarCardItemStyles.dot, {marginLeft: 5, marginRight: 5}]}>
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
          <SectionTitle title="Các tiện nghi trên xe" style={{marginTop: 10}} />
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
    );
  }
};

const styles = StyleSheet.create({
  SectionTitle: {fontSize: 16, fontWeight: 'bold'},
});

export default CarDetail;
