import { SafeAreaView, StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../../../components/Header'
import { appStyle } from '../../../../constants/AppStyle'
import { COLOR, ICON } from '../../../../constants/Theme'
import FastImage from 'react-native-fast-image'
import AppButton from '../../../../components/AppButton'
import Address from '../../../../components/Profile/Address'
import { blue } from 'react-native-reanimated/lib/typescript/reanimated2/Colors'

const MyAddress = (props) => {
  const { navigation, route } = props;
  const [address, setAddress] = useState('');
  const [addresses, setAddresses] = useState([]);
  const [hasAddress, setHasAddress] = useState(false);

  useEffect(() => {
    const updatedAddresses = props.route.params?.updatedAddresses || [];
    if (updatedAddresses.length > 0) {
      // Nếu có địa chỉ đã được cập nhật, thêm vào danh sách
      setAddresses([...addresses, ...updatedAddresses]);
      setHasAddress(true); // Đảm bảo hiển thị danh sách khi có địa chỉ
    }
  }, [props.route.params]);


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
          {hasAddress ? (
            <FlatList
              style={styles.styleFlat}
              data={addresses}
              renderItem={({ item }) => <Address dulieu={item} />}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
            />

          ) : (
              <FastImage
                source={require('../../../../assets/image/guide/img_address.png')}
                onLoad={() => console.log('Hình ảnh đã được tải thành công')}
                onError={(error) => console.error('Lỗi khi tải hình ảnh:', error)}
                style={{ width: '80%', height: '80%', alignSelf: 'center', justifyContent: 'center' }}
              />
          )}
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