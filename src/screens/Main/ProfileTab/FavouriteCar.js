import { SafeAreaView, StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { appStyle, windowHeight, windowWidth } from '../../../constants/AppStyle'
import Header from '../../../components/Header'
import { ICON, COLOR } from '../../../constants/Theme'
import Icon from 'react-native-vector-icons/FontAwesome6';
import FastImage from 'react-native-fast-image'
import { useNavigation } from '@react-navigation/native';
import AxiosInstance from '../../../constants/AxiosInstance';
import { AppContext } from '../../../utils/AppContext';
import ItemCarCard from '../../../components/Profile/ItemCarCard';
import ShieldIcon from '../../../assets/icon/ic_shield_verified';
import SuitcaseIcon from '../../../assets/icon/ic_suitcase';

const FavouriteCar = (props) => {
  const navigation = useNavigation();
  // const [hasFavouriteCars, sethasFavouriteCars] = useState(false);
  const { infoUser, idUser } = useContext(AppContext);
  const [listCar, setListCar] = useState([]);
  const [isFavorite, setIsFavorite] = useState(true);


  const getFavourite = async () => {
    try {
      const response = await AxiosInstance().get(`/favorite-car/api/list-by-user?idUser=${idUser}`);
      if (response.result) {
        setListCar(response.data);
        console.log(response.data);
      } else {
        console.log('Error');
      }
    } catch (error) {
      console.log(error);

    }
  }
  useEffect(() => {
    getFavourite();
  }, [])
  return (
    <SafeAreaView style={[appStyle.container]}>
      <Header
        icon={ICON.Back}
        text="Xe yêu thích"
        onPress={() => navigation.navigate('Profile')}
      />
      <View style={{ padding: 15, width: '100%', height: '100%' }}>
        <FlatList
          style={{ marginBottom: 50 }}
          data={listCar}
          renderItem={({ item }) => <ItemCarCard {...item.Car} />}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>

    </SafeAreaView>
  )
}

export default FavouriteCar

const styles = StyleSheet.create({

})