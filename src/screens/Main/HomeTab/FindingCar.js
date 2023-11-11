import { SafeAreaView, StyleSheet, Text, View, FlatList, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { appStyle, windowHeight } from '../../../constants/AppStyle'
import ButtonSelected from '../../../components/ButtonSelected';
import FastImage from 'react-native-fast-image'
import { COLOR, ICON } from '../../../constants/Theme'
import { useNavigation } from '@react-navigation/native';

const FindingCar = (props) => {
  const navigation = useNavigation();
  const [isSelected, setIsSelected] = useState(null);

  const sortByBrand = () => {
    setIsSelected('Hãng xe');
  };
  const sortByPrice = () => {
    setIsSelected('Giá tăng dần');
  };
  const sortByRating = () => {
    setIsSelected('Đánh giá');
  };

  const resetOptions = () => {
    setIsSelected(null);
  };

  return (
    <SafeAreaView style={appStyle.container}>
      <View style={styles.viewTop}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FastImage source={ICON.Back} resizeMode='stretch' style={appStyle.iconBig} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ChangeBooking')} style={styles.viewSearch}>
          <View style={{ alignItems: 'center', width: '90%' }}>
            <Text style={appStyle.text18Bold}>Tân Sơn Nhất</Text>
            <Text>21h00, 10/11 · 21h00, 11/11</Text>
          </View>
          <FastImage source={ICON.Search} style={appStyle.iconBig} resizeMode='stretch' />
        </TouchableOpacity>
      </View>
      <View style={{ paddingHorizontal: 15 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <ButtonSelected
            text="Xóa"
            icon={ICON.Refresh}
            isSelected={isSelected === 'Xóa'}
            onPress={() => resetOptions()}
          />
          <ButtonSelected
            text="Hãng Xe"
            icon={ICON.TripFocus}
            isSelected={isSelected === 'Hãng xe'}
            onPress={() => sortByBrand()}
          />
          <ButtonSelected
            text="Giá tăng dần"
            icon={ICON.Promotion}
            isSelected={isSelected === 'Giá tăng dần'}
            onPress={() => sortByPrice()}
          />
          <ButtonSelected
            text="Đánh giá"
            icon={ICON.Star}
            isSelected={isSelected === 'Đánh giá'}
            onPress={() => sortByRating()}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default FindingCar

const styles = StyleSheet.create({
  viewTop:
  {
    height: windowHeight * 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  viewSearch: {
    backgroundColor: COLOR.gray,
    width: '85%',
    height: '70%',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingEnd: 10
  }
})

