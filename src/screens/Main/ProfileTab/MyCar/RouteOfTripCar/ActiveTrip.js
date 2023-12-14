import {StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {appStyle} from '../../../../../constants/AppStyle';
import ItemActiveTrip from '../../../../../components/Support/ItemActiveTrip';
import {FlatList} from 'native-base';
import AxiosInstance from '../../../../../constants/AxiosInstance';
import {useIsFocused} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {showToastMessage} from '../../../../../utils/utils';
import {ICON} from '../../../../../constants/Theme';
import {AppContext} from '../../../../../utils/AppContext';
import SkeletonTrip from '../../../../../components/SkeletonTrip';

const ActiveTrip = () => {
  const isFocused = useIsFocused();
  const {idUser} = useContext(AppContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCarByIdUser = async () => {
    try {
      const response = await AxiosInstance().get(
        '/booking/api/get-list-accepted?idOwner=' + idUser,
      );
      if (response.result) {
        setData(response.booking);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
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
        '/booking/api/delivering?id=' + id,
      );
      if (response.result) {
        showToastMessage('', 'Giao xe thành công');
        getCarByIdUser();
      } else {
        showToastMessage('', 'Giao xe thất bại', ICON.cancelWhite);
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
            <ItemActiveTrip data={item} handleCompelete={completeBooking} />
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

export default ActiveTrip;

const styles = StyleSheet.create({
  imageInvisible: {
    width: 192,
    height: 138,
    alignSelf: 'center',
    marginBottom: 20,
  },
});
