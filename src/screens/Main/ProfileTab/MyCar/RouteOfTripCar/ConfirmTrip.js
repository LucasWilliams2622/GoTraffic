import {StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {appStyle} from '../../../../../constants/AppStyle';
import ItemConfirmTrip from '../../../../../components/Support/ItemConfirmTrip';
import {FlatList} from 'native-base';
import AxiosInstance from '../../../../../constants/AxiosInstance';
import {useIsFocused} from '@react-navigation/native';
import Swipelist from 'react-native-swipeable-list-view';
import {showToastMessage} from '../../../../../utils/utils';
import {ICON} from '../../../../../constants/Theme';
import FastImage from 'react-native-fast-image';
import {AppContext} from '../../../../../utils/AppContext';
import SkeletonTrip from '../../../../../components/SkeletonTrip';

const ConfirmTrip = () => {
  const isFocused = useIsFocused();
  const {idUser} = useContext(AppContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCarByIdUser = async () => {
    try {
      const response = await AxiosInstance().get(
        '/booking/api/get-list-pending?idOwner=' + idUser,
      );
      if (response.result) {
        //console.log(response.booking[0].Car.address);

        setData(response.booking);
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      } else {
        console.log('Failed to get car pending');
      }
    } catch (error) {
      console.log('=========>', error);
    }
  };
   
  const cancelBooking = async id => {
    try {
      const response = await AxiosInstance().post(
        '/booking/api/cancel-by-owner?id=' + id,
      );
      if (response.result) {
        showToastMessage('', 'Hủy yêu càu đặt xe thành công');
        getCarByIdUser();
      } else {
        showToastMessage('', 'Hủy yêu càu đặt xe thất bại', ICON.cancelWhite);
      }
    } catch (error) {
      console.log('=========>', error);
    }
  };
  const confirmBooking = async id => {
    try {
      const response = await AxiosInstance().post(
        '/booking/api/accept?id=' + id,
      );
      if (response.result) {
        console.log('Xác nhận thanh cong');
        showToastMessage('', 'Xác nhận yêu càu đặt xe thành công');
        getCarByIdUser();
        isFocused;
      } else {
        showToastMessage('error', 'Xác nhận yêu càu đặt xe thất bại');
      }
    } catch (error) {
      console.log('=========>', error);
    }
  };

  useEffect(() => {
    getCarByIdUser();
  }, [isFocused]);
  return (
    <View style={{flex: 1, padding: 10}}>
      {loading == true ? (
        <View>
          <SkeletonTrip />
          <SkeletonTrip />
          <SkeletonTrip />
          <SkeletonTrip />
        </View>
      ) : (
        <FlatList
          style={[appStyle.container, {marginBottom: 70}]}
          data={data}
          renderItem={({item}) => (
            <ItemConfirmTrip
              data={item}
              handleDelete={cancelBooking}
              handleConfirm={confirmBooking}
            />
          )}
          keyExtractor={item => item._id}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View
              style={{
                marginTop: 50,
              }}>
              <FastImage
                style={styles.imageInvisible}
                resizeMode={'stretch'}
                source={require('../../../../../assets/image/NoTrip.png')}
              />
              <Text
                style={[
                  appStyle.text16,
                  {textAlign: 'center', marginBottom: 10, fontStyle: 'italic'},
                ]}>
                Bạn chưa có lịch sử chuyến
              </Text>
            </View>
          }></FlatList>
      )}
    </View>
  );
};

export default ConfirmTrip;

const styles = StyleSheet.create({
  imageInvisible: {
    width: 192,
    height: 138,
    alignSelf: 'center',
    marginBottom: 20,
  },
});
