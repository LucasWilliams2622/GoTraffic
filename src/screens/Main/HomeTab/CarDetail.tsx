import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {carDetailData} from './data/data';
import {Row, ScrollView} from 'native-base';
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
import {Owner, OwnerInfo} from '../../../components/Home/Detail/OwnerInfo';
import {Rating, RatingItem} from '../../../components/Home/Detail/Rating';
import {RatingModal} from '../../../components/Home/Detail/RatingModal';

Geocoder.init(REACT_APP_GOOGLE_MAPS_API_KEY || '');

type CarDetailProps = {
  route: {
    params: {
      car_id: number;
      navigation: any;
    };
  };
};

type Feature = {
  'Truyền động'?: string;
  'Số ghế'?: string;
  'Nhiên liệu'?: string;
  'Tiêu hao'?: string;
};

type Car = {
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

const SectionTitle = ({title}: {title: string}) => (
  <Text style={styles.SectionTitle}>{title}</Text>
);

const CarDetail = ({route}: CarDetailProps) => {
  const [carCoordinates, setCarCoordinates] = useState<Geocoder.LatLng | null>(
    null,
  );
  const [isRatingModalVisible, setRatingModalVisible] =
    useState<boolean>(false);

  const toggleModal = () => {
    setRatingModalVisible(!isRatingModalVisible);
  };

  const {car_id, navigation} = route.params;
  const car: Car | undefined = carDetailData.find(x => x.id == car_id);

  const calculateAvgRating = (ratings: {rating: number}[]) => {
    const totalRatings = ratings.reduce(
      (sum, rating) => sum + rating.rating,
      0,
    );
    return totalRatings / ratings.length;
  };

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
      <ScrollView style={{backgroundColor: COLOR.white}}>
        <SlideShow images={car.images} navigation={navigation} />
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

          <TimeAndPlacePickup navigation={navigation} location={car.location} />

          <View>
            <SectionTitle title="Đặc điểm" />
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
            <SectionTitle title="Mô tả" />
            <Text>{car.description}</Text>
          </View>
          <View style={[CarCardItemStyles.separator, {marginTop: 20}]} />
          <SectionTitle title="Các tiện nghi trên xe" />
          {car.amenities && <Amenities amenities={car.amenities} />}
          <View style={[CarCardItemStyles.separator, {marginTop: 20}]} />
          {carCoordinates && (
            <View>
              <SectionTitle title="Vị trí xe" />
              <CarLocation
                location={car.location}
                carCoordinates={carCoordinates}
              />
            </View>
          )}
          <View>
            <SectionTitle title="Chủ xe" />
            <OwnerInfo
              owner={car.owner}
              rating={car.owner.rating}
              totalRide={car.totalRide}
            />
          </View>
          <View style={[CarCardItemStyles.separator, {marginTop: 20}]} />
          {car.rating.length > 0 && (
            <View>
              <SectionTitle title="Đánh giá" />
              <Rating rating={car.rating} toggleModal={toggleModal} />
            </View>
          )}
        </View>
        <View style={{width: '100%', height: 300}}></View>
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
  SectionTitle: {fontSize: 16, fontWeight: 'bold', marginTop: 15},
});

export default CarDetail;
