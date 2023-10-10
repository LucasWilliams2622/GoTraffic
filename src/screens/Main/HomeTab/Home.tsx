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
import Booking from '../../../components/Home/Booking';
import {useNavigation} from '@react-navigation/native';
import Promotion from '../../../components/Home/Promotion';
import CarCardItem from '../../../components/Home/CarCardItem';
import FeaturedLocation from '../../../components/Home/FeaturedLocation';
import AirportPicking from '../../../components/Home/AirportPicking';
import {
  promotionData,
  carData,
  featuredLocationData,
  AirportData,
  benefitData,
} from './data/data';

interface RenderListProps<T> {
  data: T[];
  renderItem: ({item}: {item: T}) => JSX.Element;
  snapToInterval: number;
}

const RenderList: React.FC<RenderListProps<any>> = ({
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
    contentContainerStyle={styles.contentContainer}
  />
);

interface SectionProps {
  title: string;
  data: any[];
  renderItem: ({item}: {item: any}) => JSX.Element;
  snapToInterval: number;
}

const Section: React.FC<SectionProps> = ({
  title,
  data,
  renderItem,
  snapToInterval,
}) => (
  <View style={styles.mt20}>
    <View style={[styles.contentContainer]}>
      <Text style={appStyle.text18Bold}>{title}</Text>
    </View>
    <RenderList
      data={data}
      renderItem={renderItem}
      snapToInterval={snapToInterval}
    />
  </View>
);

const Home: React.FC = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={[appStyle.container]}>
      <View style={[styles.headBg]}>
        <Row style={styles.nameAndPointWrapper}>
          <Column style={[styles.iconBG, styles.iconMarginRight]}>
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
        data={carData}
        renderItem={({item}) => <CarCardItem {...item} />}
        snapToInterval={350}
      />

      <Section
        title="Xe đã xem"
        data={carData}
        renderItem={({item}) => <CarCardItem {...item} />}
        snapToInterval={350}
      />

      <Section
        title="Địa điểm nổi bật"
        data={featuredLocationData}
        renderItem={({item}) => <FeaturedLocation {...item} />}
        snapToInterval={330}
      />

      <Section
        title="Đón xe sân bay"
        data={AirportData}
        renderItem={({item}) => <AirportPicking {...item} />}
        snapToInterval={330}
      />

      <Section
        title="Ưu điểm của Go Traffic"
        data={benefitData}
        renderItem={({item}) => (
          <Promotion image={item.image} width={345} height={130} />
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
