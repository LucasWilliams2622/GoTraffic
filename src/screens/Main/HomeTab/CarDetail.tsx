import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {amenitiesIconMapping, carDetailData} from './data/data';
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
import MapView, {Circle} from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import {REACT_APP_GOOGLE_MAPS_API_KEY} from '@env';
import FastImage from 'react-native-fast-image';
import Modal from 'react-native-modal';
import {SlideShow} from '../../../components/Home/Detail/SlideShow';
import {TimeAndPlacePickup} from '../../../components/Home/Detail/TimeAndPlacePickup';
import {FeatureItem} from '../../../components/Home/Detail/FeatureItem';
import {Amenities} from '../../../components/Home/Detail/Amenities';

const SectionTitle = ({title}: {title: string}) => (
  <Text style={styles.SectionTitle}>{title}</Text>
);

interface CarLocationProps {
  car: {
    location: string;
  };
  carCoordinates: {
    lat: number;
    lng: number;
  };
  styles: {
    container: object;
    mapContainer: object;
    map: object;
  };
}

const CarLocation: React.FC<CarLocationProps> = ({
  car,
  carCoordinates,
  styles,
}) => {
  return (
    <>
      <Row style={{marginTop: 15, marginBottom: 10}}>
        <Icon name="location-dot" size={20} color={COLOR.borderColor} />
        <Text style={{marginLeft: 10}}>{car.location}</Text>
      </Row>
      <View style={styles.container}>
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            region={{
              latitude: carCoordinates.lat,
              longitude: carCoordinates.lng,
              latitudeDelta: 0.04,
              longitudeDelta: 0.015,
            }}
            pitchEnabled={false}
            rotateEnabled={false}
            scrollEnabled={false}
            zoomEnabled={false}>
            <Circle
              center={{
                latitude: carCoordinates.lat,
                longitude: carCoordinates.lng,
              }}
              radius={1500}
              strokeWidth={1}
              strokeColor={'#1a66ff'}
              fillColor={'rgba(26, 102, 255, 0.3)'}
            />
          </MapView>
        </View>
      </View>
    </>
  );
};

interface OwnerInfoProps {
  owner: {
    avatar: string;
    name: string;
    responseRate: string;
    acceptRate: string;
    responseIn: string;
  };
  rating: number[];
  totalRide: number;

  calculateAvgRating: (ratings: number[]) => number;
}

const OwnerInfo: React.FC<OwnerInfoProps> = ({
  owner,
  rating,
  totalRide,
  calculateAvgRating,
}) => {
  return (
    <>
      <Row style={{marginTop: 10}}>
        <View style={{marginRight: 10}}>
          <FastImage source={{uri: owner.avatar}} style={appStyle.avatar} />
        </View>
        <View style={{flex: 1, width: '100%'}}>
          <Text>{owner.name}</Text>
          <Row style={{alignItems: 'center'}}>
            <Icon name="star" color={COLOR.third} size={12} solid />
            <Text style={[CarCardItemStyles.ratingText, {marginLeft: 5}]}>
              {calculateAvgRating(rating)}
            </Text>
            <Text
              style={[CarCardItemStyles.dot, {marginLeft: 5, marginRight: 5}]}>
              ·
            </Text>
            <Icon name="suitcase" color={COLOR.fifth} size={12} solid />
            <Text style={[CarCardItemStyles.ratingText, {marginLeft: 5}]}>
              {totalRide} chuyến
            </Text>
          </Row>
          <Text>
            Thông tin liên hệ sẽ hiển thị sau khi đặt cọc trên ứng dụng
          </Text>
        </View>
      </Row>
      <View style={[CarCardItemStyles.separator, {marginTop: 20}]} />
      <Row style={{justifyContent: 'space-evenly'}}>
        <View>
          <Text>Tỉ lệ phản hồi</Text>
          <Text style={{color: COLOR.black, fontWeight: 'bold', marginTop: 5}}>
            {owner.responseRate}
          </Text>
        </View>
        <View>
          <Text>Tỉ lệ đồng ý</Text>
          <Text style={{color: COLOR.black, fontWeight: 'bold', marginTop: 5}}>
            {owner.acceptRate}
          </Text>
        </View>
        <View>
          <Text>Phản hồi trong vòng</Text>
          <Text style={{color: COLOR.black, fontWeight: 'bold', marginTop: 5}}>
            {owner.responseIn} phút
          </Text>
        </View>
      </Row>
    </>
  );
};

interface RatingProps {
  rating: {
    avatar: string;
    username: string;
    date: string;
    rating: number;
  }[];
  toggleModal: () => void;
}

const Rating: React.FC<RatingProps> = ({rating, toggleModal}) => {
  return (
    <>
      {rating.slice(0, 2).map(item => (
        <Row
          key={item}
          style={{
            flex: 1,
            width: '100%',
            justifyContent: 'space-between',
            padding: 10,
            borderColor: COLOR.borderColor,
            borderWidth: 0.5,
            borderRadius: 10,
            marginTop: 10,
          }}>
          <Row style={{alignItems: 'center'}}>
            <FastImage source={{uri: item.avatar}} style={appStyle.avatar} />
            <View style={{marginLeft: 10}}>
              <Text style={{color: COLOR.black}}>{item.username}</Text>
              <Text style={{color: COLOR.borderColor}}>{item.date}</Text>
            </View>
          </Row>
          <Row style={{alignItems: 'center'}}>
            <Icon name="star" color={COLOR.third} size={12} solid />
            <Text style={[CarCardItemStyles.ratingText, {marginLeft: 5}]}>
              {item.rating}
            </Text>
          </Row>
        </Row>
      ))}
      <Pressable
        onPress={toggleModal}
        style={{
          flex: 1,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 1,
          borderColor: COLOR.black,
          padding: 10,
          borderRadius: 10,
          marginTop: 10,
        }}>
        <Text style={{color: COLOR.black, fontWeight: 'bold', fontSize: 18}}>
          Xem thêm
        </Text>
      </Pressable>
    </>
  );
};

interface RatingModalProps {
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

const RatingModal: React.FC<RatingModalProps> = ({
  isRatingModalVisible,
  toggleModal,
  rating,
}) => {
  return (
    <Modal
      isVisible={isRatingModalVisible}
      onSwipeComplete={toggleModal}
      swipeDirection="down"
      style={{
        margin: 0,
        justifyContent: 'flex-end',
      }}>
      <View
        style={{
          backgroundColor: COLOR.white,
          height: Dimensions.get('window').height * 0.9,
          width: '100%',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          padding: 10,
        }}>
        <Row
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 20,
            marginTop: 30,
          }}>
          <Pressable
            style={{
              padding: 10,
              width: 40,
              height: 40,
              borderRadius: 50,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 0.5,
              borderColor: COLOR.borderColor,
              position: 'absolute',
              top: 10,
              left: 10,
            }}
            onPress={toggleModal}>
            <Icon name="x" size={20} color={COLOR.borderColor2} />
          </Pressable>
          <Text style={{marginTop: 20, fontSize: 20, fontWeight: 'bold'}}>
            Đánh giá
          </Text>
        </Row>
        <ScrollView style={{flex: 1}}>
          {rating.map(item => (
            <Row key={item} style={styles.mapRow}>
              <Row style={{alignItems: 'center'}}>
                <FastImage
                  source={{uri: item.avatar}}
                  style={appStyle.avatar}
                />
                <View style={{marginLeft: 10}}>
                  <Text style={{color: COLOR.black}}>{item.username}</Text>
                  <Text style={{color: COLOR.borderColor}}>{item.date}</Text>
                  {item.description && <Text>{item.description}</Text>}
                </View>
              </Row>
              <Row style={{alignItems: 'center'}}>
                <Icon name="star" color={COLOR.third} size={12} solid />
                <Text style={[CarCardItemStyles.ratingText, {marginLeft: 5}]}>
                  {item.rating}
                </Text>
              </Row>
            </Row>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );
};

Geocoder.init(REACT_APP_GOOGLE_MAPS_API_KEY || '');

const renderItem = ({item, setModalVisible}: any) => (
  <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
    <Image source={{uri: item}} style={styles.carouselImage} />
  </TouchableWithoutFeedback>
);

type CarDetailProps = {
  route: {
    params: {
      car_id: number;
      navigation: any;
    };
  };
};

type Car = {
  id: number;
  images: string[];
  title: string;
  rating: number[];
  totalRide: number;
  location: string;
  features: {[key: string]: string}[];
  description: string;
  amenities: string[];
  owner: {
    avatar: string;
    name: string;
    responseRate: string;
    acceptRate: string;
    responseIn: string;
  };
};

const CarDetail = ({route}: CarDetailProps) => {
  const [carCoordinates, setCarCoordinates] = useState(null);
  const [isRatingModalVisible, setRatingModalVisible] =
    useState<boolean>(false);

  const toggleModal = () => {
    setRatingModalVisible(!isRatingModalVisible);
  };

  const {car_id, navigation} = route.params;
  const car: Car = carDetailData.find(x => x.id == car_id);

  const images = car.images.map(image => ({uri: image}));

  const calculateAvgRating = ratings => {
    const totalRatings = ratings.reduce(
      (sum, rating) => sum + rating.rating,
      0,
    );
    return totalRatings / ratings.length;
  };

  useEffect(() => {
    Geocoder.from(car.location)
      .then(json => {
        var location = json.results[0].geometry.location;
        setCarCoordinates(location);
        console.log(location);
      })
      .catch(error => console.warn(error));
  }, []);

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
              car={car}
              carCoordinates={carCoordinates}
              styles={styles}
            />
          </View>
        )}
        <View>
          <SectionTitle title="Chủ xe" />
          <OwnerInfo
            owner={car.owner}
            rating={car.rating}
            totalRide={car.totalRide}
            calculateAvgRating={calculateAvgRating}
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
};

const styles = StyleSheet.create({
  topContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingRight: 40,
  },
  pressable: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  timeAndPlacePickupContainer: {
    backgroundColor: COLOR.grayBackGround,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 15,
  },
  timeAndPlacePickupPressable: {
    backgroundColor: COLOR.white,
    padding: 10,
    borderRadius: 10,
    flex: 1,
    width: '100%',
    marginTop: 15,
  },
  SectionTitle: {fontSize: 16, fontWeight: 'bold', marginTop: 15},

  container: {
    height: 200,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 10,
    overflow: 'hidden',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  indexContainer: {
    position: 'absolute',
    top: 265,
    right: 7,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  indexText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  carouselImage: {
    width: Dimensions.get('window').width,
    height: 300,
  },
  mapRow: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    padding: 10,
    borderColor: COLOR.borderColor,
    borderWidth: 0.5,
    borderRadius: 10,
    marginTop: 10,
  },
});

export default CarDetail;
