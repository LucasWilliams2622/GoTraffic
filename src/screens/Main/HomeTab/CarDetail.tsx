import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Share,
  Alert,
} from 'react-native';
import {amenitiesIconMapping, carDetailData} from './data/data';
import Carousel from 'react-native-snap-carousel';
import ImageView from 'react-native-image-viewing';
import {Radio, Row, ScrollView} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {COLOR} from '../../../constants/Theme';
import ShieldIcon from '../../../assets/icon/ic_shield_verified';
import {appStyle} from '../../../constants/AppStyle';
import SuitcaseIcon from '../../../assets/icon/ic_suitcase';
import {CarCardItemStyles} from '../../../components/Home/CarCardItem';
import {currentDateString, returnDateString} from '../../../utils/utils';
import StickIcon from '../../../assets/icon/ic_stick';
import SeatIcon from '../../../assets/icon/ic_seat';
import GasolineIcon from '../../../assets/icon/ic_gasoline';
import EngineIcon from '../../../assets/icon/ic_engine';
import CarScreenIcon from '../../../assets/icon/ic_car_display';
import BluetoothIcon from '../../../assets/icon/ic_bluetooth';

const renderItem = ({item, setModalVisible}: any) => (
  <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
    <Image source={{uri: item}} style={styles.carouselImage} />
  </TouchableWithoutFeedback>
);

const CarDetail = ({route}: any) => {
  const [index, setIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = React.useState<boolean>(false);
  const [receiveCarLocation, setReceiveCarLocation] =
    useState<string>('atCarLocation');
  const {car_id, navigation} = route.params;
  const car = carDetailData.find(x => x.id == car_id) || {
    images: [],
    title: 'Car not found',
  };

  const images = car.images.map(image => ({uri: image}));

  const itemWidth = Dimensions.get('window').width;

  const handleIndexChange = (newIndex: number) => {
    setIndex(newIndex);
  };

  const handleClose = () => {
    setModalVisible(false);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: 'Check out this car!',
      });
    } catch (error) {
      Alert(error.message);
    }
  };

  return (
    <ScrollView style={{backgroundColor: COLOR.white}}>
      <View
        style={{
          position: 'absolute',
          top: 50,
          left: 20,
          zIndex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          paddingRight: 40,
        }}>
        <Pressable
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            padding: 10,
            borderRadius: 50,
            width: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => navigation.pop()}>
          <Icon name="x" size={20} color={COLOR.white} />
        </Pressable>
        <View style={{flexDirection: 'row'}}>
          <Pressable
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              padding: 10,
              borderRadius: 50,
              marginLeft: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={handleShare}>
            <Icon name="share-nodes" size={24} color={COLOR.white} />
          </Pressable>
          <Pressable
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              padding: 10,
              borderRadius: 50,
              marginLeft: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => setIsFavorite(!isFavorite)}>
            <Icon
              name="heart"
              color={isFavorite ? COLOR.fifth : COLOR.white}
              size={20}
              solid={isFavorite}
            />
          </Pressable>
        </View>
      </View>

      <Carousel
        data={car.images}
        renderItem={({item}) => renderItem({item, setModalVisible})}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={itemWidth}
        snapToInterval={itemWidth}
        snapToAlignment="start"
        decelerationRate="fast"
        inactiveSlideOpacity={1}
        inactiveSlideScale={1}
        onSnapToItem={(index: number) => setIndex(index)}
        removeClippedSubviews={false}
      />
      <View style={styles.indexContainer}>
        <Text style={styles.indexText}>{`${index + 1}/${
          car.images.length
        }`}</Text>
      </View>

      {car.images.length > 0 && (
        <ImageView
          images={images}
          imageIndex={index}
          visible={modalVisible}
          onIndexChange={handleIndexChange}
          onRequestClose={handleClose}
          onDismiss={handleClose}
          swipeToCloseEnabled={false}
          FooterComponent={({imageIndex}) => (
            <View style={styles.indexContainer}>
              <Text style={styles.indexText}>{`${imageIndex + 1}/${
                car.images.length
              }`}</Text>
            </View>
          )}
          renderFooter={({imageIndex}) => (
            <View style={styles.indexContainer}>
              <Text style={styles.indexText}>{`${imageIndex + 1}/${
                car.images.length
              }`}</Text>
            </View>
          )}
        />
      )}
      <View style={{paddingHorizontal: 10, paddingVertical: 20}}>
        <Row style={{alignItems: 'center'}}>
          <Text style={[appStyle.text16Bold, {marginRight: 10}]}>
            {car.title.toUpperCase()}
          </Text>
          <ShieldIcon color={COLOR.fifth} />
        </Row>
        <Row style={{alignItems: 'center'}}>
          <Icon name="star" color={COLOR.third} size={12} solid />
          <Text style={[CarCardItemStyles.ratingText, {marginLeft: 5}]}>
            {car.rating}
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
        <View
          style={{
            backgroundColor: COLOR.grayBackGround,
            paddingHorizontal: 15,
            paddingVertical: 15,
            borderRadius: 10,
            marginTop: 15,
          }}>
          <Text style={[appStyle.text16Bold, {marginBottom: 20}]}>
            Thời gian thuê xe
          </Text>
          <Pressable
            style={{
              backgroundColor: COLOR.white,
              padding: 10,
              paddingVertical: 15,
              borderRadius: 10,
              borderColor: COLOR.borderColor3,
              borderWidth: 0.5,
              marginBottom: 20,
            }}
            onPress={() => navigation.navigate('TimePicking')}>
            <Row style={{justifyContent: 'space-evenly'}}>
              <View>
                <Text style={{color: COLOR.borderColor, marginBottom: 5}}>
                  Nhận xe
                </Text>
                <Text style={{fontSize: 13.5, fontWeight: 'bold'}}>
                  {currentDateString}
                </Text>
              </View>
              <View>
                <Text style={{color: COLOR.borderColor, marginBottom: 5}}>
                  Trả xe
                </Text>
                <Text style={{fontSize: 13.5, fontWeight: 'bold'}}>
                  {returnDateString}
                </Text>
              </View>
            </Row>
          </Pressable>
          <Text style={[appStyle.text16Bold, {marginBottom: 20}]}>
            Địa điểm giao nhận xe
          </Text>
          <Radio.Group
            name="receiveCarLocation"
            value={receiveCarLocation}
            onChange={nextValue => {
              setReceiveCarLocation(nextValue);
            }}>
            <Pressable
              onPress={() => setReceiveCarLocation('atCarLocation')}
              style={{
                backgroundColor: COLOR.white,
                padding: 10,
                borderRadius: 10,
                flex: 1,
                width: '100%',
              }}>
              <Row style={{alignItems: 'flex-start'}}>
                <Radio
                  value={'atCarLocation'}
                  my="1"
                  size="sm"
                  style={{marginRight: 10}}
                />
                <View style={{flex: 1}}>
                  <Row
                    style={{
                      marginTop: 3,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text>Tôi tự đến lấy xe</Text>
                    <Text
                      style={{
                        marginRight: 10,
                        fontSize: 15,
                        color: COLOR.fifth,
                      }}>
                      Miễn phí
                    </Text>
                  </Row>
                  <Text style={[appStyle.text14Bold, {marginTop: 10}]}>
                    {car.location}
                  </Text>
                  <Text style={{color: COLOR.placeholder, marginTop: 10}}>
                    Địa chỉ xe cụ thể sẽ được hiển thị sau khi đặt cọc thành
                    công trên ứng dụng
                  </Text>
                </View>
              </Row>
            </Pressable>
            <Pressable
              onPress={() => setReceiveCarLocation('atUserLocation')}
              style={{
                backgroundColor: COLOR.white,
                padding: 10,
                borderRadius: 10,
                flex: 1,
                width: '100%',
                marginTop: 15,
              }}>
              <Row style={{alignItems: 'flex-start'}}>
                <Radio
                  value={'atUserLocation'}
                  my="1"
                  size="sm"
                  style={{marginRight: 10}}
                />
                <View style={{flex: 1}}>
                  <Row
                    style={{
                      marginTop: 3,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text>Tôi muốn được giao xe tận nơi</Text>
                  </Row>
                  <Text style={{color: COLOR.placeholder, marginTop: 10}}>
                    Chủ xe sẽ giao và nhận xe đến địa chỉ cụ thể mà bạn lựa chọn
                  </Text>
                </View>
              </Row>
            </Pressable>
          </Radio.Group>
        </View>
        <View>
          <Text style={{fontSize: 16, fontWeight: 'bold', marginTop: 15}}>
            Đặc điểm
          </Text>
          <Row
            style={{
              marginTop: 20,
              flex: 1,
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-evenly',
            }}>
            <View style={{alignItems: 'center'}}>
              <StickIcon width={32} height={32} color={COLOR.fifth} />
              <Text style={{color: COLOR.borderColor, marginTop: 15}}>
                {Object.keys(car.features[0])[0]}
              </Text>
              <Text style={{fontWeight: 'bold'}}>
                {Object.values(car.features[0])[0]}
              </Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <SeatIcon width={32} height={32} color={COLOR.fifth} />
              <Text style={{color: COLOR.borderColor, marginTop: 15}}>
                {Object.keys(car.features[1])[0]}
              </Text>
              <Text style={{fontWeight: 'bold'}}>
                {Object.values(car.features[1])[0]}
              </Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <GasolineIcon width={32} height={32} color={COLOR.fifth} />
              <Text style={{color: COLOR.borderColor, marginTop: 15}}>
                {Object.keys(car.features[2])[0]}
              </Text>
              <Text style={{fontWeight: 'bold'}}>
                {Object.values(car.features[2])[0]}
              </Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <EngineIcon width={32} height={32} color={COLOR.fifth} />
              <Text style={{color: COLOR.borderColor, marginTop: 15}}>
                {Object.keys(car.features[3])[0]}
              </Text>
              <Text style={{fontWeight: 'bold'}}>
                {Object.values(car.features[3])[0]}
              </Text>
            </View>
          </Row>
        </View>
        <View style={[CarCardItemStyles.separator, {marginTop: 20}]} />
        <View>
          <Text style={{fontSize: 16, fontWeight: 'bold', marginTop: 15}}>
            Mô tả
          </Text>
          <Text>{car.description}</Text>
        </View>
        <View style={[CarCardItemStyles.separator, {marginTop: 20}]} />
        {car.amenities && (
          <View>
            <Text style={{fontSize: 16, fontWeight: 'bold', marginTop: 15}}>
              Các tiện nghi trên xe
            </Text>
            {car.amenities.map((item: string) => {
              const Icon = amenitiesIconMapping[item].icon;
              return (
                <Row style={{alignItems: 'center', marginTop: 10}} key={item}>
                  <Icon width={24} height={24} color={COLOR.fifth} />
                  <Text style={{marginLeft: 10}}>
                    {amenitiesIconMapping[item].name}
                  </Text>
                </Row>
              );
            })}
          </View>
        )}
      </View>
      <View style={{width: '100%', height: 300}}></View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  indexContainer: {
    position: 'absolute',
    top: 265,
    right: 7,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
});

export default CarDetail;
