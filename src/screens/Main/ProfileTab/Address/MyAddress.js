import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  RefreshControl,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Header from '../../../../components/Header';
import {appStyle, windowHeight} from '../../../../constants/AppStyle';
import {COLOR, ICON} from '../../../../constants/Theme';
import FastImage from 'react-native-fast-image';
import AppButton from '../../../../components/AppButton';
import Address from '../../../../components/Profile/Address';
import AxiosInstance from '../../../../constants/AxiosInstance';
import {AppContext} from '../../../../utils/AppContext';
import {useNavigation} from '@react-navigation/native';
import AppHeader from '../../../../components/AppHeader';
import { squareImageSize } from '../../../../utils/utils';

const MyAddress = props => {
  const navigation = useNavigation();
  const {route} = props;
  const {idUser} = useContext(AppContext);
  const [addresses, setAddresses] = useState([]);

  const getAddress = async () => {
    try {
      const response = await AxiosInstance().get(
        `/address/api/get-address-by-id-user?idUser=${idUser}`,
      );
      console.log(response.data);
      if (response.data != null) {
        setAddresses(response.data);
      } else {
        setAddresses([]);
        console.log('dsads');
      }
    } catch (error) {
      console.log(error);
    }
  };
  const updateAddress = async () => {
    await getAddress();
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      updateAddress();
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (route.params && route.params.newAddressData) {
      const newAddressData = route.params.newAddressData;
      setAddresses(prevAddresses => [...prevAddresses, newAddressData]);
    }
  }, [route.params]);

  useEffect(() => {
    getAddress();
  }, [idUser]);

  return (
    <SafeAreaView style={[appStyle.container]}>
      <AppHeader title="Địa chỉ của tôi" />

      <View style={{height: '77%'}}>
        <FlatList
          style={styles.styleFlat}
          data={addresses}
          renderItem={({item}) => <Address dulieu={item} />}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <FastImage
              source={require('../../../../assets/image/guide/img_address.png')}
              onLoad={() => console.log('Hình ảnh đã được tải thành công')}
              onError={error => console.error('Lỗi khi tải hình ảnh:', error)}
              style={{
                width: squareImageSize(0.8),
                height:squareImageSize(0.8),
                alignSelf: 'center',
                justifyContent: 'center',
              }}
              resizeMode='stretch'
            />
          }
        />
      </View>

      <AppButton
        title="+ Thêm địa chỉ"
        width='94%'
        onPress={() => navigation.navigate('NewAddress')}
      />
    </SafeAreaView>
  );
};

export default MyAddress;

const styles = StyleSheet.create({
  styleFlat: {
    flex: 1,
  },
});
