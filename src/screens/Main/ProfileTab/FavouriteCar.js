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


const FavouriteCar = (props) => {
  const navigation = useNavigation();
  // const [hasFavouriteCars, sethasFavouriteCars] = useState(false);
  const { infoUser, idUser } = useContext(AppContext);
  const [listCar, setListCar] = useState([]);
  const [isFavorite, setIsFavorite] = useState(true);
  const [refreshing, setRefreshing] = useState(false);


  const fetchFavoriteCars = async () => {
    try {
      const response = await AxiosInstance().get(`/favorite-car/api/list-by-user?idUser=${idUser}`);
      setListCar(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };



  useEffect(() => {
    fetchFavoriteCars();
  }, []);


  return (
    <SafeAreaView style={[appStyle.container]}>
      <Header
        icon={ICON.Back}
        text="Xe yêu thích"
        onPress={() => navigation.navigate('Profile')}
      />
      <View style={{ padding: 15, width: '100%', height: '90%' }}>
        {/* <FlatList
          style={{ marginBottom: 20 }}
          extraData={listUpdate}
          data={listCar}
          renderItem={({ item }) => (
            <ItemCarCard
              {...item.Car}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            <View>
              <FastImage source={require('../../../assets/image/guide/img_favourite_car.png')} style={{ width: '100%', height: windowHeight * 0.75 }} />
            </View>
          }
          showsVerticalScrollIndicator={false}

        /> */}
        <FlatList
          style={{ marginBottom: 20 }}
          data={listCar}
          shouldRasterizeIOS
          showsVerticalScrollIndicator={false}
          // refreshControl={
          //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          // }
          ListEmptyComponent={
            <View>
              <FastImage source={require('../../../assets/image/guide/img_favourite_car.png')} style={{ width: '100%', height: windowHeight * 0.75 }} />
            </View>
          }
          renderItem={({ item }) => <CarCardItem width={'100%'} {...item.Car} />}
          keyExtractor={item => item.id}
        />
      </View>

    </SafeAreaView>
  )
}

export default FavouriteCar

const styles = StyleSheet.create({

})