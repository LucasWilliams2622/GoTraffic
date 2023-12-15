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
import {appStyle, windowHeight} from '../../../constants/AppStyle';
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
import SkeletonTrip from '../../../components/SkeletonTrip';
import {showToastMessage} from '../../../utils/utils';
import data from '../../data';
const Trip = () => {
  const {infoUser, idUser} = useContext(AppContext);
  const [listBookingCurrent, setListBookingCurrent] = useState([]);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(true);

  const getListBookingCurrent = async () => {
    try {
      const response = await AxiosInstance().get(
        '/booking/api/get-list-current-booking-of-user?idUser=' + idUser,
      );
      if (response.result) {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
        setListBookingCurrent(response.booking);
        console.log('=============================>', response.booking);
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
  const receivedBooking = async id => {
    try {
      console.log(id);
      const response = await AxiosInstance().post(
        '/booking/api/receive?id=' + id,
      );
      if (response.result) {
        showToastMessage('', 'Nhận xe thành công');
        getListBookingCurrent();
      } else {
        showToastMessage('', 'Nhận xe thất bại');
      }
    } catch (error) {
      console.log('=========>', error);
    }
  };

  const returnCar = async id => {
    try {
      console.log(id);
      const response = await AxiosInstance().post(
        '/booking/api/return-car?id=' + id,
      );
      if (response.result) {
        showToastMessage('', 'Trả xe thành công');
        getListBookingCurrent();
      } else {
        showToastMessage('', 'Trả xe thất bại');
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
        icon={require('../../../assets/icon/ic_luggage.png')}
        onPressRight={() => navigation.navigate('HistoryTrip')}
        notLeft
      />

      <ScrollView style={[appStyle.container, {marginBottom: 70}]}>
        <FastImage
          source={{
            uri: 'https://i.pinimg.com/originals/4a/24/2b/4a242b1af58a55c62deaf5a972622909.gif',
          }}
          style={{width: '100%', height: 200}}
        />
        <View style={[appStyle.main]}>
          <Text style={styles.text1}>Hiện tại</Text>
          {loading == true ? (
            <View>
              <SkeletonTrip />
              <SkeletonTrip />
              <SkeletonTrip />
              <SkeletonTrip />
            </View>
          ) : (
            <View>
              {isLoading == true ? (
                <View style={appStyle.ma}>
                  <FastImage
                    style={styles.imageInvisible}
                    resizeMode={'stretch'}
                    source={require('../../../assets/image/NoTrip.png')}
                  />
                  <Text
                    style={[
                      appStyle.text16,
                      {
                        textAlign: 'center',
                        marginBottom: 10,
                        fontStyle: 'italic',
                      },
                    ]}>
                    Bạn chưa có lịch sử chuyến
                  </Text>
                </View>
              ) : (
                <Swipelist
                  style={{width: '100%', marginBottom: 65}}
                  data={listBookingCurrent}
                  renderRightItem={(data, index) => (
                    <View key={index}>
                      <ItemTrip
                        data={data}
                        car={listBookingCurrent}
                        handleCancle={cancelBooking}
                        handleReceived={receivedBooking}
                        handleReturn={returnCar}
                      />
                    </View>
                  )}
                  renderHiddenItem={(data, index) => (
                    <View>
                      {data.status == 1 ? (
                        <TouchableOpacity
                          style={[
                            styles.rightAction,
                            {backgroundColor: COLOR.red},
                          ]}
                          onPress={() => {
                            console.log(data.id);
                            cancelBooking(data.id);
                          }}>
                          <FastImage
                            source={ICON.Delete}
                            style={appStyle.iconBig}
                            tintColor={COLOR.white}
                          />
                        </TouchableOpacity>
                      ) : null}
                    </View>
                  )}
                  rightOpenValue={100}
                />
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Trip;

const styles = StyleSheet.create({
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
    marginTop: 20,
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
    width: '100%',
    marginVertical: 0,
    alignItems: 'center',
    justifyContent: 'center',
    height: '88%',
    marginTop: 8,
    marginLeft: -5,
  },
});
