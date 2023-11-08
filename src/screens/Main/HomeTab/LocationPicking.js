import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { appStyle, windowWidth } from '../../../constants/AppStyle';
import Header from '../../../components/Header';
import { useNavigation } from '@react-navigation/native';
import { COLOR, ICON } from '../../../constants/Theme';
import AppInput from '../../../components/AppInput';
import FastImage from 'react-native-fast-image';
import ButtonSelected from '../../../components/ButtonSelected';
import ItemAddress from '../../../components/Profile/ItemAddress';
const LocationPicking = (props) => {
  const navigation = useNavigation();
  const [locationPicking, setLocationPicking] = useState(null);


  return (
    <SafeAreaView style={appStyle.container}>
      {/* <Text onPress={() => navigation.pop()}>LocationPicking</Text> */}
      <Header
        text="Địa điểm"
        icon={ICON.Back}
        onPress={() => navigation.goBack()}
      />
      <View style={appStyle.viewContainer}>
        <AppInput
          isLocation
          justifyContent={'flex-start'}
          placeholder="Nhập địa điểm"
          value={locationPicking}
          onChange={(text) => setLocationPicking(text)}
        />

        <TouchableOpacity style={appStyle.card} onPress={() => navigation.goBack()}>
          <FastImage source={ICON.Location} style={appStyle.iconBig} />
          <Text style={[appStyle.text165, { marginLeft: 5 }]}>Vị trí hiện tại</Text>
        </TouchableOpacity>

        {/* Navigate qua sổ địa chỉ của user  */}
        <TouchableOpacity style={[appStyle.rowBetween, { marginTop: 10 }]}>
          <Text style={appStyle.text14}>Địa chỉ của tôi </Text>
          <FastImage source={ICON.Next} resizeMode='stretch' style={appStyle.iconMedium} />
        </TouchableOpacity>

        {/* Địa chỉ mặc định của user */}
        <TouchableOpacity>
          <View style={styles.container}>
            <View style={styles.content}>
              <FastImage
                style={[appStyle.iconBig, { alignSelf: 'center' }]}
                source={ICON.Home}
              />
              <View style={{ marginLeft: 16 }}>
                <View style={{ width: windowWidth * 0.35, justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row' }}>
                  <Text style={[appStyle.text16, { fontWeight: '600' }]}>Nhà</Text>
                  <View>
                    <Text style={[appStyle.text14, { backgroundColor: COLOR.bgHeader, marginLeft: 10, borderRadius: 15, padding: 8 }]}>Mặc định</Text>
                  </View>
                </View>
                <Text style={[appStyle.text14]}>603 Trần Hưng Đạo</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <View style={{ marginTop: 10, paddingVertical: 8, borderBottomWidth: 0.5, borderBottomColor: COLOR.borderColor }}>
          <Text style={appStyle.text14}>Đưa đón sân bay </Text>
          <FlatList
            style={{ width: '100%', marginVertical: 10 }}
            data={plane}
            renderItem={({ item }) => <ButtonSelected data={item} onPress={()=> navigation.navigate('Home')}/>}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View style={{ marginTop: 10 }}>
          <Text style={appStyle.text14}>Tìm kiếm gần đây</Text>
          <FlatList
            style={{ width: '100%', marginVertical: 10 }}
            data={locationViewed}
            renderItem={({ item }) => <ItemAddress data={item} />}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LocationPicking;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.background,
    width: '100%',
    height: 'auto',
    alignSelf: 'center',
    borderBottomColor: COLOR.borderColor,
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 8,
    marginTop: 10,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
})

const plane = [
  {
    id: 1,
    text: 'Tân Sơn Nhất'
  },
  {
    id: 2,
    text: 'Nội Bài'
  },
  {
    id: 3,
    text: 'Đà Nẵng'
  },
  {
    id: 4,
    text: 'Cam Ranh'
  },
  {
    id: 5,
    text: 'Phú Quốc'
  },
  {
    id: 6,
    text: 'Liên Khương'
  }
]

const locationViewed = [
  {
    id: 1,
    name: 'Phường 1',
    address: '123 Đường A, Phường 1, Quận A, Thành phố X'
  },
  {
    id: 2,
    name: 'Phường 2',
    address: '456 Đường B, Phường 2, Quận B, Thành phố Y'
  },
  {
    id: 3,
    name: 'Phường 3',
    address: '789 Đường C, Phường 3, Quận C, Thành phố Z'
  },
]