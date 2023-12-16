import {StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {appStyle} from '../../../../../constants/AppStyle';
import ItemTrip from '../../../../../components/Support/ItemTrip';
import ItemComplete from '../../../../../components/Support/ItemComplete';
import {FlatList, ScrollView} from 'native-base';
import AxiosInstance from '../../../../../constants/AxiosInstance';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {AppContext} from '../../../../../utils/AppContext';
import SkeletonTrip from '../../../../../components/SkeletonTrip';
import {COLOR} from '../../../../../constants/Theme';
import {formatPrice} from '../../../../../utils/utils';

const FinishTrip = () => {
  const [data, setData] = useState([]);
  const {idUser} = useContext(AppContext);
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(true);
  const [price, setPrice] = useState(0);
  const getCarByIdUser = async () => {
    try {
      const response = await AxiosInstance().get(
        '/booking/api/get-list-complete?idOwner=' + idUser,
      );
      if (response.result) {
        setData(response.booking.bookings);
        setPrice(response.booking.totalRevenue);
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      } else {
        console.log('Failed to get car complete');
      }
    } catch (error) {
      console.log('=========>', error);
    }
  };
  // setInterval(() => {
  //   getCarByIdUser();
  // }, 10000);
  useFocusEffect(
    React.useCallback(() => {
      getCarByIdUser();
    }, []),
  );
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
        <ScrollView style={appStyle.container}>
          <View
            style={{
              margin: 20,
              justifyContent: 'space-between',
              flexDirection: 'row',
              marginBottom: 10,
            }}>
            <Text style={[appStyle.text14]}>Tổng số chuyến hoàn thành: </Text>
            <Text style={[appStyle.text14Bold, {color: COLOR.primary}]}>
              {data.length} chuyến
            </Text>
          </View>
          <View
            style={{
              margin: 20,
              marginTop: 0,
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <Text style={[appStyle.text14]}>Tổng doanh thu: </Text>
            <Text style={[appStyle.text14Bold, {color: COLOR.primary}]}>
              {formatPrice(price)}
            </Text>
          </View>

          <FlatList
            style={[{marginBottom: 70}]}
            data={data}
            renderItem={({item}) => <ItemComplete data={item} />}
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
                    {
                      textAlign: 'center',
                      marginBottom: 10,
                      fontStyle: 'italic',
                    },
                  ]}>
                  Bạn chưa có lịch sử chuyến
                </Text>
              </View>
            }></FlatList>
        </ScrollView>
      )}
    </View>
  );
};

export default FinishTrip;

const styles = StyleSheet.create({
  imageInvisible: {
    width: 192,
    height: 138,
    alignSelf: 'center',
    marginBottom: 20,
  },
});
