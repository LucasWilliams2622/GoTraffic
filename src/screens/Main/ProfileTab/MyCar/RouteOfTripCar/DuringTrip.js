import {StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {appStyle} from '../../../../../constants/AppStyle';
import ItemDuringTrip from '../../../../../components/Support/ItemDuringTrip';
import {FlatList} from 'native-base';
import AxiosInstance from '../../../../../constants/AxiosInstance';
import {useIsFocused} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {showToastMessage} from '../../../../../utils/utils';
import {ICON} from '../../../../../constants/Theme';
import {AppContext} from '../../../../../utils/AppContext';

const DuringTrip = () => {
  const isFocused = useIsFocused();
  const {idUser} = useContext(AppContext);
  const [data, setData] = useState([]);
  const getCarByIdUser = async () => {
    try {
      const response = await AxiosInstance().get(
        '/booking/api/get-list-during?idOwner=' + idUser,
      );
      if (response.result) {
        setData(response.booking);
      } else {
        console.log('Failed to get car complete');
      }
    } catch (error) {
      console.log('=========>', error);
    }
  };
  const completeBooking = async id => {
    try {
      const response = await AxiosInstance().post(
        '/booking/api/complete?id=' + id,
      );
      if (response.result) {
        showToastMessage('', 'Đã nhận được xe thành công');
        getCarByIdUser();
      } else {
        showToastMessage('', 'Đã nhận được xe thất bại', ICON.cancelWhite);
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
      <FlatList
        style={[appStyle.main, {marginBottom: 70}]}
        data={data}
        renderItem={({item}) => (
          <ItemDuringTrip data={item} handleCompelete={completeBooking} />
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
    </View>
  );
};

export default DuringTrip;

const styles = StyleSheet.create({
  imageInvisible: {
    width: 192,
    height: 138,
    alignSelf: 'center',
    marginBottom: 20,
  },
});
