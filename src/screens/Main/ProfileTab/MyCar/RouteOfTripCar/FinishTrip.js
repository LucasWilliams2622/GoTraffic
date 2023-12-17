import {StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {appStyle, windowHeight} from '../../../../../constants/AppStyle';
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
          <View style={[appStyle.boxCenter, styles.boxTotal]}>
            <Text style={[appStyle.text12Bold, {textTransform: 'uppercase'}]}>
              Tổng doanh thu
            </Text>
            <Text
              style={[
                appStyle.text16Bold,
                {color: COLOR.primary, marginTop: 4},
              ]}>
              {formatPrice(price)} / {data.length}{' '}
              <Text
                style={[
                  appStyle.text12Medium,
                  {color: COLOR.primary, fontStyle: 'italic'},
                ]}>
                {' '}
                chuyến
              </Text>
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
                  marginTop: windowHeight * 0.2,
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
                  Bạn chưa có chuyến hoàn thành nào !
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
  boxTotal: {
    width: '100%',
    alignSelf: 'center',
    backgroundColor: COLOR.sixth,
    opacity: 0.8,
    borderRadius: 16,
    paddingVertical: 8,
    borderWidth: 2,
    borderColor: COLOR.primary,
    marginBottom: 16,
    marginTop: 8,
  },
});
