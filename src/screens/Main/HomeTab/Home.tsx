import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Dimensions,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {COLOR} from '../../../constants/Theme';
import {appStyle} from '../../../constants/AppStyle';
import {Row, Column} from 'native-base';
import Booking from '../../../components/Booking';
import {useNavigation} from '@react-navigation/native';
import Promotion from '../../../components/Promotion';
import CarCardItem, {CarCardItemProps} from '../../../components/CarCardItem';

interface PromotionData {
  id: number;
  image: string;
}

interface RenderPromotionListProps {
  data: PromotionData[];
  renderItem: ({item}: {item: PromotionData}) => JSX.Element;
  snapToInterval: number;
}

const RenderPromotionList: React.FC<RenderPromotionListProps> = ({
  data,
  renderItem,
  snapToInterval,
}) => (
  <FlatList
    showsHorizontalScrollIndicator={false}
    data={data}
    keyExtractor={item => item.id.toString()}
    horizontal={true}
    renderItem={renderItem}
    snapToAlignment="start"
    decelerationRate={'fast'}
    snapToInterval={snapToInterval}
    contentContainerStyle={{paddingLeft: 20}}
  />
);

interface RenderCarListProps {
  data: CarCardItemProps[];
  renderItem: ({item}: {item: CarCardItemProps}) => JSX.Element;
  snapToInterval: number;
}

const RenderCarList: React.FC<RenderCarListProps> = ({
  data,
  renderItem,
  snapToInterval,
}) => (
  <FlatList
    showsHorizontalScrollIndicator={false}
    data={data}
    keyExtractor={item => item.id.toString()}
    horizontal={true}
    renderItem={renderItem}
    snapToAlignment="start"
    decelerationRate={'fast'}
    snapToInterval={snapToInterval}
    contentContainerStyle={{paddingLeft: 20}}
  />
);

const Home: React.FC = () => {
  const navigation = useNavigation();
  const promotionData = [
    {
      id: 1,
      image: 'https://i.imgur.com/UYiroysl.jpg',
    },
    {
      id: 2,
      image: 'https://i.imgur.com/UPrs1EWl.jpg',
    },
    {
      id: 3,
      image: 'https://i.imgur.com/MABUbpDl.jpg',
    },
    {
      id: 4,
      image: 'https://i.imgur.com/KZsmUi2l.jpg',
    },
    {
      id: 5,
      image: 'https://i.imgur.com/2nCt3Sbl.jpg',
    },
  ];

  const carData = [
    {
      id: 1,
      title: 'Honda Camry 2018',
      image:
        'https://tuvanmuaxe.vn/upload/upload_img/images/Toyota-Camry-2018-gia-xe-tuvanmuaxe-4.jpg',
      location: 'Quận 1, TP HCM',
      type: 'Số tự động',
      price: 1200000,
      rating: 4.5,
      totalRide: 15,
    },
    {
      id: 2,
      title: 'Honda Civic 2022',
      image:
        'https://files01.danhgiaxe.com/sxqARZyGxqt_BQww8HR0ig43TX4=/fit-in/1280x0/20220330/danhgiaxe.com-honda-civic-2022-21-023945.jpg',
      location: 'Quận 1, TP HCM',
      benefit: 'Giao xe tận nơi',
      type: 'Số tự động',
      price: 1234567,
      rating: 4.5,
      totalRide: 15,
    },
    {
      id: 3,
      title: 'Vinfast Lux SA 2.0 2021',
      image:
        'https://i2-vnexpress.vnecdn.net/2021/09/18/lux-sa2-1564361912.jpg?w=2400&h=0&q=100&dpr=1&fit=crop&s=Dtfts1hv96Am8dJXVuqe7Q&t=image',
      location: 'Quận 1, TP HCM',
      type: 'Số tự động',
      originalPrice: 1234567,
      price: 870000,
      rating: 4.5,
      totalRide: 15,
    },
  ];
  return (
    <ScrollView style={[appStyle.container]}>
      <View style={[styles.headBg]}>
        <Row style={{alignItems: 'center', marginTop: 100, marginLeft: 15}}>
          <Column style={[styles.iconBG, {marginRight: 10}]}>
            <Icon name="user" color={COLOR.forth} size={23}></Icon>
          </Column>
          <Column>
            <Text style={appStyle.text16Bold}>Lê Hoàng Gia Khánh</Text>
            <Row style={{alignItems: 'center'}}>
              <Icon
                name="star"
                color={COLOR.third}
                solid
                style={{marginRight: 5}}></Icon>
              <Text style={appStyle.text12Bold}>Điểm thưởng</Text>
            </Row>
          </Column>
        </Row>
      </View>
      <Booking navigation={navigation} />

      <View style={{marginTop: 20}}>
        <View style={{paddingLeft: 20, marginBottom: 10}}>
          <Text style={appStyle.text18Bold}>Chương trình khuyến mãi</Text>
        </View>
        <RenderPromotionList
          data={promotionData}
          renderItem={({item}) => <Promotion image={item.image} />}
          snapToInterval={320}
        />
      </View>
      <View style={{marginTop: 20}}>
        <View style={{paddingLeft: 20, marginBottom: 10}}>
          <Text style={appStyle.text18Bold}>Xe dành cho bạn</Text>
        </View>
        <RenderCarList
          data={carData}
          renderItem={({item}) => <CarCardItem {...item} />}
          snapToInterval={330}
        />
      </View>
      <View style={{marginTop: 20}}>
        <View style={{paddingLeft: 20, marginBottom: 10}}>
          <Text style={appStyle.text18Bold}>Xe đã xem</Text>
        </View>
        <RenderCarList
          data={carData}
          renderItem={({item}) => <CarCardItem {...item} />}
          snapToInterval={330}
        />
      </View>
      <View
        style={{
          marginTop: 20,
          height: 300,
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
  },

  iconBG: {
    backgroundColor: COLOR.white,
    width: 40,
    height: 40,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
