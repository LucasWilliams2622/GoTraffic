import {StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {appStyle, windowHeight} from '../../../../../constants/AppStyle';
import ItemTrip from '../../../../../components/Support/ItemTrip';
import ItemCancleTrip from '../../../../../components/Support/ItemCancleTrip';
import {FlatList} from 'native-base';
import AxiosInstance from '../../../../../constants/AxiosInstance';
import {useIsFocused} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {AppContext} from '../../../../../utils/AppContext';
import SkeletonTrip from '../../../../../components/SkeletonTrip';

const CancleTrip = () => {
  const [data, setData] = useState([]);
  const {idUser} = useContext(AppContext);
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(true);

  const getCarByIdUser = async () => {
    try {
      const response = await AxiosInstance().get(
        '/booking/api/get-list-cancel?idOwner=' + idUser,
      );
      if (response.result) {
        setData(response.booking);
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
          renderItem={({item}) => <ItemCancleTrip data={item} />}
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
                  {textAlign: 'center', marginBottom: 10, fontStyle: 'italic'},
                ]}>
                Bạn chưa có chuyến hủy nào !
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
};

export default CancleTrip;

const styles = StyleSheet.create({
  imageInvisible: {
    width: 192,
    height: 138,
    alignSelf: 'center',
    marginBottom: 20,
  },
});
