import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLOR} from '../../../constants/Theme';
import {FlatList, ScrollView} from 'native-base';
import ItemNotification from '../../../components/Support/ItemNotification';
import {appStyle, windowHeight} from '../../../constants/AppStyle';
import AxiosInstance from '../../../constants/AxiosInstance';
import {AppContext} from '../../../utils/AppContext';
import {useIsFocused} from '@react-navigation/native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import AppHeader from '../../../components/AppHeader';
import SkeletonItemNoti from '../../../components/SkeletonItemNoti';
import {showToastMessage} from '../../../utils/utils';
const Notification = () => {
  const [data, setData] = useState('');
  const [dataTrip, setDataTrip] = useState([]);
  const {setNotificationCount} = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const {idUser} = useContext(AppContext);
  const [checkLength, setCheckLength] = useState(false);
  const [heightList, setHeightList] = useState(0);
  const isFocused = useIsFocused();

  const getListNotifications = async () => {
    try {
      const response = await AxiosInstance().get('/notification/api');
      if (response.result) {
        // console.log(response.notification);
        setData(response.notification);
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      } else {
        console.log('NETWORK ERROR');
      }
    } catch (e) {
      console.log(e);
    }
  };
  const getListNotificationsByIDUser = async () => {
    try {
      const response = await AxiosInstance().get(
        '/notification-booking/api/get-by-user?idUser=' + idUser,
      );
      if (response.result) {
        setNotificationCount(0);
        setDataTrip(response.notifications);
        if (response.notifications.length > 0) {
          setCheckLength(true);
          if (response.notifications.length < 5) {
            setHeightList(windowHeight * 0.106 * response.notifications.length);
          } else {
            setHeightList(windowHeight * 0.5);
          }
        } else {
          setCheckLength(false);
        }
      } else {
        console.log('NETWORK ERROR');
      }
    } catch (e) {
      console.log(e);
    }
  };
  const readDetailListNotifications = async id => {
    try {
      const response = await AxiosInstance().post(
        '/notification/api/read?id=' + id,
      );
      if (response.result) {
        //showToastMessage('', 'Đã đọc thông báo');
        getListNotifications();
      } else {
        console.log('NETWORK ERROR');
      }
    } catch (e) {
      console.log(e);
    }
  };
  const readDetailListNotificationsBooking = async id => {
    try {
      const response = await AxiosInstance().post(
        '/notification-booking/api/read?id=' + id,
      );
      if (response.result) {
        //showToastMessage('', 'Đã đọc thông báo');
        getListNotificationsByIDUser();
      } else {
        console.log('NETWORK ERROR');
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getListNotificationsByIDUser();
    getListNotifications();
  }, [isFocused]);
  return (
    <SafeAreaView style={appStyle.container}>
      <AppHeader title="Thông báo" notLeft />
      <ScrollView shouldRasterizeIOS showsVerticalScrollIndicator={false}>
        {checkLength && (
          <View style={styles.line1}>
            <Text style={styles.text1}>Thông báo chuyến</Text>
          </View>
        )}
        {loading == true ? (
          <View>
            <SkeletonItemNoti />
            <SkeletonItemNoti />
            <SkeletonItemNoti />
            <SkeletonItemNoti />
          </View>
        ) : (
          checkLength && (
            <FlatList
              style={{width: '100%', height: heightList}}
              data={dataTrip}
              renderItem={({item}) => (
                <ItemNotification
                  data={item}
                  handleRead={readDetailListNotificationsBooking}
                  imagelogo={require('../../../assets/image/noti.png')}
                />
              )}
              keyExtractor={item => item._id}
              showsVerticalScrollIndicator={false}
            />
          )
        )}
        {checkLength && (
          <View style={styles.line1}>
            <Text style={styles.text1}>Thông báo ứng dụng</Text>
          </View>
        )}

        {loading == true ? (
          <View>
            <SkeletonItemNoti />
            <SkeletonItemNoti />
            <SkeletonItemNoti />
            <SkeletonItemNoti />
            <SkeletonItemNoti />
          </View>
        ) : (
          <FlatList
            style={{width: '100%', marginBottom: 65}}
            data={data}
            renderItem={({item}) => (
              <ItemNotification
                data={item}
                handleRead={readDetailListNotifications}
                imagelogo={require('../../../assets/image/logo_go_traffic.png')}
              />
            )}
            keyExtractor={item => item._id}
            showsVerticalScrollIndicator={false}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Notification;

const styles = StyleSheet.create({
  viewTitle: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.23,
    shadowRadius: 11.27,
    elevation: 14,
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
    marginLeft: 10,
  },
  line1: {
    width: '100%',
    height: 32,
    backgroundColor: '#EFECEC',
    justifyContent: 'center',
  },
});
const DATA = [
  {
    id: 1,
    image: require('../../../assets/image/logo-fb.png'),
    title: 'Welcome to Mioto',
    content:
      'Chào mừng bạn tham gia cộng đồng Mioto, bấm vào đây để xem những kinh nghiệm thuê xe hữu ích',
    time: '17h43, 25/09',
    poster: require('../../../assets/image/poster.jpg'),
  },
  {
    id: 2,
    image: require('../../../assets/image/logo-fb.png'),
    title: 'Welcome to Mioto',
    content:
      'Chào mừng bạn tham gia cộng đồng Mioto, bấm vào đây để xem những kinh nghiệm thuê xe hữu ích',
    time: '17h43, 25/09',
    poster: require('../../../assets/image/poster.jpg'),
  },
  {
    id: 3,
    image: require('../../../assets/image/logo-fb.png'),
    title: 'Welcome to Mioto',
    content:
      'Chào mừng bạn tham gia cộng đồng Mioto, bấm vào đây để xem những kinh nghiệm thuê xe hữu ích',
    time: '17h43, 25/09',
    poster: require('../../../assets/image/poster.jpg'),
  },
];
