import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import {appStyle} from '../../../../../constants/AppStyle';
import ItemTrip from '../../../../../components/Support/ItemTrip';
import ItemCancleTrip from '../../../../../components/Support/ItemCancleTrip';
import { FlatList } from 'native-base';
import AxiosInstance from '../../../../../constants/AxiosInstance';
import {useIsFocused} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

const CancleTrip = () => {
   const [data, setData] = useState('');
  const isFocused = useIsFocused();
   const getCarByIdUser = async () => {
     try {
       const response = await AxiosInstance().get(
         '/booking/api/get-list-cancel?idOwner=1',
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
   useEffect(() => {
     getCarByIdUser();
   }, [isFocused]);
  return (
    <View style={{flex: 1, padding: 10}}>
      <FlatList
        style={[appStyle.main, {marginBottom: 70}]}
        data={data}
        renderItem={({item}) => <ItemCancleTrip data={item} />}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View>
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
}

export default CancleTrip

const styles = StyleSheet.create({
  imageInvisible: {
    width: 192,
    height: 138,
    alignSelf: 'center',
    marginBottom: 20,
  },
});
