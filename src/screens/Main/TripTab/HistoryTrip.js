import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {appStyle} from '../../../constants/AppStyle';
import {FlatList, ScrollView} from 'native-base';
import {COLOR} from '../../../constants/Theme';
import ItemTrip from '../../../components/Support/ItemTrip';
import FastImage from 'react-native-fast-image';
import AxiosInstance from '../../../constants/AxiosInstance';
import {AppContext} from '../../../utils/AppContext';
import {useNavigation} from '@react-navigation/native';
import AppHeader from '../../../components/AppHeader';

const HistoryTrip = () => {
  const {infoUser, idUser} = useContext(AppContext);
  const [listBooked, setListBooking] = useState([]);
  const getListBooked = async () => {
    try {
      const response = await AxiosInstance().get(
        '/booking/api/get-history-by-id-user?idUser=' + 9,
      );
      if (response.result) {
        setListBooking(response.booking);
      } else {
        console.log('NETWORK ERROR');
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getListBooked();
  }, []);

  return (
    <SafeAreaView style={appStyle.container}>
      <AppHeader title='Lịch sử chuyến'/>
      {/* <View style={{backgroundColor:COLOR.borderColor2,height:1,width:'100%'}}/> */}
      <ScrollView style={appStyle.main}>
        <Text style={styles.text1}>Đã thuê</Text>
        <FlatList
          style={{width: '100%', marginBottom: 65}}
          data={listBooked}
          renderItem={({item}) => <ItemTrip data={item} />}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View>
              <FastImage
                style={styles.imageInvisible}
                resizeMode={'stretch'}
                source={require('../../../assets/image/NoTrip.png')}
              />
              <Text
                style={[
                  appStyle.text16,
                  {textAlign: 'center', marginBottom: 10, fontStyle: 'italic'},
                ]}>
                Bạn chưa có lịch sử chuyến
              </Text>
            </View>
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HistoryTrip;

const styles = StyleSheet.create({
  viewTitle: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomWidth: 0.5,
  },
  imageInvisible: {
    width: 192,
    height: 138,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    color: COLOR.black,
    fontWeight: '400',
    marginBottom: 20,
    marginTop: 14,
  },
  text1: {
    color: COLOR.black,
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 20,
  },
  line1: {
    width: '100%',
    height: 32,
    backgroundColor: '#EFECEC',
    justifyContent: 'center',
  },
  logo: {
    width: 24,
    height: 24,
    position: 'absolute',
    alignSelf: 'center',
    left: 10,
  },
});

const DATA = [
  {
    id: 1,
    image: require('../../../assets/image/car.jpg'),
    time: '21/09/2023 | 20:30',
    name: 'KIA MORNING 2022',
    timeStart: '21h00,17/10/2023',
    timeEnd: '21h00,18/10/2023',
    price: '1.600.666đ',
  },
  {
    id: 2,
    image: require('../../../assets/image/car.jpg'),
    time: '21/09/2023 | 20:30',
    name: 'KIA MORNING 2022',
    timeStart: '21h00,17/10/2023',
    timeEnd: '21h00,18/10/2023',
    price: '1.600.666đ',
  },
  {
    id: 3,
    image: require('../../../assets/image/car.jpg'),
    time: '21/09/2023 | 20:30',
    name: 'KIA MORNING 2022',
    timeStart: '21h00,17/10/2023',
    timeEnd: '21h00,18/10/2023',
    price: '1.600.666đ',
  },
];
