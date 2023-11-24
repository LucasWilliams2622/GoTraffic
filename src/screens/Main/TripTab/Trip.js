import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {appStyle} from '../../../constants/AppStyle';
import {FlatList, ScrollView} from 'native-base';
import {COLOR, ICON} from '../../../constants/Theme';
import ItemTrip from '../../../components/Support/ItemTrip';
import FastImage from 'react-native-fast-image';
import AxiosInstance from '../../../constants/AxiosInstance';
import {AppContext} from '../../../utils/AppContext';
import {useNavigation} from '@react-navigation/native';
import AppHeader from '../../../components/AppHeader';
import {useIsFocused} from '@react-navigation/native';
import Swipelist from 'react-native-swipeable-list-view';
import {showToastMessage} from '../../../utils/utils';
const Trip = () => {
  const {infoUser, idUser} = useContext(AppContext);
  const [listBookingCurrent, setListBookingCurrent] = useState(null);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(true);
  const getListBookingCurrent = async () => {
    try {
      const response = await AxiosInstance().get(
        // '/booking/api/get-list-current-booking-of-user?idUser=' + 9,
        `/booking/api/get-list-current-booking-of-user?idUser= ${idUser}` + 9,
        
      );
      if (response.result) {
        setListBookingCurrent(response.booking);
        console.log(response.booking[0]==null);
        if (response.booking[0] == null) {
          setIsLoading(true);
        } else {
          setIsLoading(false);
        }
      } else {
        console.log('NETWORK ERROR');
      }
    } catch (e) {
      console.log(e);
    }
  };
  const cancelBooking = async id => {
    try {
      console.log(id);
      const response = await AxiosInstance().post(
        '/booking/api/cancel?id=' + id,
      );
      if (response.result) {
        showToastMessage('', 'Hủy chuyến thành công');
        getListBookingCurrent();
      } else {
        showToastMessage('', 'Hủy chuyến thất bại');
      }
    } catch (error) {
      console.log('=========>', error);
    }
  };

  useEffect(() => {
    getListBookingCurrent();
  }, [isFocused]);
  return (
    <SafeAreaView style={appStyle.container}>
      <AppHeader
        title="Chuyến của tôi"
        icon={require('../../../assets/image/logoTrip.png')}
        onPressRight={() => navigation.navigate('HistoryTrip')}
        notLeft
      />
      <View
        style={{backgroundColor: COLOR.borderColor2, height: 1, width: '100%'}}
      />

      <ScrollView style={[appStyle.main, {marginBottom: 70}]}>
        <Text style={styles.text1}>Hiện tại</Text>
        {isLoading == true ? (
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
        ) : (
          <Swipelist
            data={listBookingCurrent}
            renderRightItem={(data, index) => (
              <View key={index}>
                <ItemTrip data={data} car={listBookingCurrent} />
              </View>
            )}
            renderHiddenItem={(data, index) => (
              <TouchableOpacity
                style={[styles.rightAction, {backgroundColor: 'red'}]}
                onPress={() => {
                  console.log(data.id);
                  cancelBooking(data.id);
                }}>
                <FastImage source={ICON.Delete} style={appStyle.icon} />
              </TouchableOpacity>
            )}
            rightOpenValue={200}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Trip;

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
    right: 10,
  },
  rightAction: {
    width: '50%',
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: '96%',
    borderRadius: 20,
    borderWidth: 1,
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
