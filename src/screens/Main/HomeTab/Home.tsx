import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Dimensions,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {COLOR} from '../../../constants/Theme';
import {appStyle} from '../../../constants/AppStyle';
import {Row, Column} from 'native-base';
import Booking from '../../../components/Home/Home/Booking';
import {useNavigation} from '@react-navigation/native';
import Promotion from '../../../components/Home/Home/Promotion';
import CarCardItem from '../../../components/Home/Home/CarCardItem';
import FeaturedLocation from '../../../components/Home/Home/FeaturedLocation';
import AirportPicking from '../../../components/Home/Home/AirportPicking';
import {
  promotionData,
  carData,
  featuredLocationData,
  AirportData,
  benefitData,
  carDataTest,
} from './data/data';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  RenderListProps,
  SectionProps,
  StackScreenParamList,
} from '../../../types';
import Modal from 'react-native-modal';
import CarDetail from './CarDetail';
import {AppContext} from '../../../utils/AppContext';
import FastImage from 'react-native-fast-image';
import BenefitHome from '../../../components/Home/Home/Benefit';
import AxiosInstance from '../../../constants/AxiosInstance';
import {
  currentDay,
  currentTimeString,
  returnTimeString,
  tomorrow,
} from '../../../utils/utils';

const RenderList: React.FC<RenderListProps<any>> = ({
  data,
  renderItem,
  snapToInterval,
  reverse,
}) => (
  <FlatList
    showsHorizontalScrollIndicator={false}
    data={data}
    keyExtractor={item => item.id.toString()}
    horizontal={true}
    renderItem={renderItem}
    snapToAlignment="start"
    decelerationRate={'fast'}
    inverted={reverse}
    snapToInterval={snapToInterval}
    contentContainerStyle={styles.contentContainer}
  />
);

const Section: React.FC<SectionProps> = ({
  title,
  data,
  renderItem,
  snapToInterval,
  reverse,
}) => (
  <View style={styles.mt20}>
    <View style={[styles.contentContainer]}>
      <Text style={appStyle.text18Bold}>{title}</Text>
    </View>
    <RenderList
      data={data}
      renderItem={renderItem}
      snapToInterval={snapToInterval}
      reverse={reverse}
    />
  </View>
);

const Home: React.FC = () => {
  const [selectedCarId, setSelectedCarId] = useState<number | null>(null);
  const navigation =
    useNavigation<NativeStackNavigationProp<StackScreenParamList, 'Home'>>();

  const [isSwipeEnabled, setSwipeEnabled] = useState<boolean>(true);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedTime, setSelectedTime] = useState<{
    startTime: string | null;
    endTime: string | null;
    startDate: Date | null;
    endDate: Date | null;
  }>({
    startTime: currentTimeString,
    endTime: returnTimeString,
    startDate: currentDay,
    endDate: tomorrow,
  });

  const handleCarPress = (id: number) => {
    setSelectedCarId(id);
    setModalVisible(true);
  };

  // =================| Get List |====================
  const {infoUser, idUser} = useContext(AppContext);
  const [listCar, setListCar] = useState([]);

  const getAllCar = async () => {
    try {
      const response = await AxiosInstance().get('/car/api/list');
      if (response.result) {
        setListCar(response.listCar);
      } else {
        console.log('Error');
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAllCar();
    // setListCar(carDataTest);
  }, []);

  return (
    <ScrollView style={[appStyle.container]}>
      <View style={[styles.headBg]}>
        <Row style={styles.nameAndPointWrapper}>
          <Column style={[styles.iconBG, styles.iconMarginRight]}>
            <FastImage
              style={{width: 40, height: 40, borderRadius: 99}}
              source={
                infoUser?.avatar
                  ? {uri: infoUser.avatar}
                  : require('../../../assets/image/logo_go_traffic.png')
              }
            />
          </Column>
          <Column>
            <Text style={appStyle.text16Bold}>{infoUser.name}</Text>
            <Row style={{alignItems: 'center'}}>
              <Icon
                name="star"
                color={COLOR.third}
                solid
                style={{marginRight: 5}}></Icon>
              <Text style={appStyle.text12Bold}>{infoUser.point}</Text>
            </Row>
          </Column>
        </Row>
      </View>
      <Booking
        navigation={navigation}
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
      />

      <Section
        title="Chương trình khuyến mãi"
        data={promotionData}
        renderItem={({item}) => (
          <Promotion image={item.image} width={300} height={200} />
        )}
        snapToInterval={320}
      />

      <Section
        title="Xe dành cho bạn"
        data={listCar}
        renderItem={({item}) => (
          <CarCardItem {...item} onPress={() => handleCarPress(item.id)} />
        )}
        snapToInterval={350}
      />

      <Modal
        isVisible={isModalVisible}
        style={{margin: 0}}
        onBackButtonPress={() => setSelectedCarId(null)}
        swipeThreshold={50}>
        {selectedCarId && (
          <CarDetail
            car_id={selectedCarId}
            close={() => setModalVisible(false)}
            setSwipeEnabled={setSwipeEnabled}
          />
        )}
      </Modal>

      <Section
        title="Xe đã xem"
        data={listCar}
        reverse={true}
        renderItem={({item}) => (
          <CarCardItem {...item} onPress={() => handleCarPress(item.id)} />
        )}
        snapToInterval={350}
      />

      <Modal
        isVisible={isModalVisible}
        style={{margin: 0}}
        onBackButtonPress={() => setSelectedCarId(null)}
        swipeThreshold={50}>
        {selectedCarId && (
          <CarDetail
            car_id={selectedCarId}
            close={() => setModalVisible(false)}
            setSwipeEnabled={setSwipeEnabled}
          />
        )}
      </Modal>

      <Section
        title="Địa điểm nổi bật"
        data={featuredLocationData}
        renderItem={({item}) => <FeaturedLocation {...item} />}
        snapToInterval={224}
      />
      <Section
        title="Đón xe sân bay"
        data={AirportData}
        renderItem={({item}) => <AirportPicking {...item} />}
        snapToInterval={140}
      />

      <Section
        title="Ưu điểm của Go Traffic"
        data={benefitData}
        renderItem={({item}) => (
          <BenefitHome image={item.image} width={345} height={130} />
        )}
        snapToInterval={365}
      />

      <View
        style={{
          marginTop: 20,
          height: 70,
        }}></View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  headBg: {
    backgroundColor: COLOR.secondary,
    width: '100%',
    height: Dimensions.get('window').height / 3,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    marginBottom: 20,
  },

  nameAndPointWrapper: {
    alignItems: 'center',
    marginTop: Dimensions.get('window').height / 10,
    marginLeft: 15,
  },

  iconBG: {
    backgroundColor: COLOR.white,
    width: 40,
    height: 40,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  iconMarginRight: {
    marginRight: 10,
  },

  alignItemsCenter: {
    alignItems: 'center',
  },

  mt20: {
    marginTop: 20,
  },

  contentContainer: {
    paddingLeft: 20,
    marginBottom: 10,
  },
});
