import { SafeAreaView, StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../../../../components/Header'
import { appStyle } from '../../../../constants/AppStyle'
import { COLOR, ICON } from '../../../../constants/Theme'
import FastImage from 'react-native-fast-image'
import AppButton from '../../../../components/AppButton'
import Address from '../../../../components/Profile/Address'
import AxiosInstance from '../../../../constants/AxiosInstance'
import { AppContext } from '../../../../utils/AppContext'

const MyAddress = (props) => {
  const { navigation, route } = props;
  const { idUser } = useContext(AppContext);
  const [addresses, setAddresses] = useState([]);


  useEffect(() => {
    const getAddress = async () => {
      try {
        const response = await AxiosInstance().get(`/address/api/get-address-by-id-user?idUser=${idUser}`);
        setAddresses(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (route.params && route.params.newAddressData) {
      const newAddressData = route.params.newAddressData;
      setAddresses([...addresses, newAddressData]);
    } else {
      getAddress();
    }
  }, [route.params, idUser, addresses]);

  return (
    <SafeAreaView style={[appStyle.container]}>
      <Header
        icon={ICON.Back}
        text="Địa chỉ của tôi"
        onPress={() => navigation.navigate('Profile')}
        marginLeft={86}
      />

      <View style={{ padding: 15, width: '100%', alignItems: 'center' }}>
        <View style={{ height: '80%' }}>
          <FlatList
            style={styles.styleFlat}
            data={addresses}
            renderItem={({ item }) => <Address dulieu={item} />}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <FastImage
                source={require('../../../../assets/image/guide/img_address.png')}
                onLoad={() => console.log('Hình ảnh đã được tải thành công')}
                onError={(error) => console.error('Lỗi khi tải hình ảnh:', error)}
                style={{ width: '80%', height: '80%', alignSelf: 'center', justifyContent: 'center' }}
              />
            }
          />
        </View>

        <AppButton
          title="+ Thêm địa chỉ"
          marginTop={45}
          onPress={() => navigation.navigate('NewAddress')}
        />
      </View>

    </SafeAreaView>
  )
}

export default MyAddress

const styles = StyleSheet.create({
  styleFlat: {
    marginTop: 20,
    height: '100%',

  },

})