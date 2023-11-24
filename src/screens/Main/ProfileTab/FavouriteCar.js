import { SafeAreaView, StyleSheet, Text, View, FlatList, TouchableOpacity, RefreshControl } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { appStyle, windowHeight, windowWidth } from '../../../constants/AppStyle'
import Header from '../../../components/Header'
import { ICON, COLOR } from '../../../constants/Theme'
import FastImage from 'react-native-fast-image'
import { useNavigation } from '@react-navigation/native';
import CarCardItem from '../../../components/Home/Home/CarCardItem';
import AxiosInstance from '../../../constants/AxiosInstance';
import { AppContext } from '../../../utils/AppContext';
import ItemCarCard from '../../../components/Profile/ItemCarCard';
import AppHeader from '../../../components/AppHeader'
import { showToastMessage } from '../../../utils/utils'


const FavouriteCar = (props) => {
  const navigation = useNavigation();
  const { infoUser, idUser } = useContext(AppContext);
  const [listCar, setListCar] = useState([]);
  //const [data, setData] = useState('');

  const fetchFavoriteCars = async () => {
    try {
      const response = await AxiosInstance().get(`/favorite-car/api/list-by-user?idUser=${idUser}`);
      setListCar(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromFavorites = async (id) => {
    try {

        await AxiosInstance().delete(`/favorite-car/api/delete?idUser=${idUser}&idCar=${id}`);
        showToastMessage('','Đã gỡ yêu thích');
        fetchFavoriteCars();
    } catch (error) {
        console.log(error);
    }
};
 

  useEffect(() => {
    fetchFavoriteCars();
  }, []);

  return (
    <SafeAreaView style={[appStyle.container]}>
      <AppHeader title='Xe yêu thích'/>
      <View style={{ padding: 15, width: '100%', height: '90%' }}>
        <FlatList
          style={{ marginBottom: 44 }}
          //extraData={listUpdate}
          data={listCar}
          renderItem={({ item }) => (
            <ItemCarCard
              {...item.Car}
              removeFromFavorites={removeFromFavorites}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={
            <View>
              <FastImage source={require('../../../assets/image/guide/img_favourite_car.png')} style={{ width: '100%', height: windowHeight * 0.75 }} />
            </View>
          }
          showsVerticalScrollIndicator={false}

        />
        {/* <FlatList
          style={{ marginBottom: 20 }}
          data={listCar}
          shouldRasterizeIOS
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            <View>
              <FastImage source={require('../../../assets/image/guide/img_favourite_car.png')} style={{ width: '100%', height: windowHeight * 0.75 }} />
            </View>
          }
          renderItem={({ item }) => <CarCardItem
            width={'100%'}
            {...item.Car}
            isFavorite={item.isFavorite}
          />}
          keyExtractor={item => item.id}
        /> */}
      </View>
    </SafeAreaView>
  )
}

export default FavouriteCar

const styles = StyleSheet.create({

})