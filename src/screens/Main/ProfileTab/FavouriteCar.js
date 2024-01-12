import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {appStyle, windowHeight, windowWidth} from '../../../constants/AppStyle';
import Header from '../../../components/Header';
import {ICON, COLOR} from '../../../constants/Theme';
import FastImage from 'react-native-fast-image';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import CarCardItem from '../../../components/Home/Home/CarCardItem';
import AxiosInstance from '../../../constants/AxiosInstance';
import {AppContext} from '../../../utils/AppContext';
import AppHeader from '../../../components/AppHeader';
import Modal, {ReactNativeModal} from 'react-native-modal';
import CarDetail from '../HomeTab/CarDetail';
import {ViewedCarsContext} from '../../../utils/ViewedCarContext';
import {HStack, Heading, Spinner} from 'native-base';

const FavouriteCar = props => {
  const {idUser} = useContext(AppContext);
  const [listCar, setListCar] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedCarId, setSelectedCarId] = useState(null);
  const [isSwipeEnabled, setSwipeEnabled] = useState(true);
  const {viewedCars, setViewedCars} = useContext(ViewedCarsContext);
  const [isLoading, setIsLoading] = useState(true);

  const fetchFavoriteCars = async () => {
    try {
      setIsLoading(true);
      const response = await AxiosInstance().get(
        `/favorite-car/api/list-by-user?idUser=${idUser}`,
      );
      if (response.result) {
        const listCar = response.data;
        listCar.forEach(car => {
          car.Car.isFavorite = true;
        });
        setIsLoading(false);
        setListCar(listCar);
      } else {
        console.log('Error');
      }
    } catch (e) {
      setIsLoading(false);
      console.log(e);
    }
  };

  const handleCarPress = id => {
    setSelectedCarId(id);
    setModalVisible(true);
  };

  useEffect(() => {
    fetchFavoriteCars();
  }, []);

  return (
    <SafeAreaView style={[appStyle.container]}>
      <Modal
        isVisible={isLoading}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}>
        <HStack
          space={2}
          justifyContent="center"
          style={{backgroundColor: 'white', padding: 20, width: 'auto'}}>
          <Spinner accessibilityLabel="Loading posts" />
          <Heading color="primary.500" fontSize="md">
            Loading
          </Heading>
        </HStack>
      </Modal>
      <AppHeader title="Xe yêu thích" />
      <View
        style={{
          // align the flatlist to center
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <FlatList
          style={{
            marginBottom: 44,
            width: '100%',
            paddingHorizontal: 15,
            alignSelf: 'center',
          }}
          data={listCar}
          renderItem={({item}) => (
            <CarCardItem
              {...item.Car}
              width={360}
              onPress={() => handleCarPress(item.Car.id)}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={
            <View>
              <FastImage
                source={require('../../../assets/image/guide/img_favourite_car.png')}
                style={{width: '100%', height: windowHeight * 0.75}}
              />
            </View>
          }
          showsVerticalScrollIndicator={false}
        />
        <Modal
          isVisible={isModalVisible}
          style={{margin: 0}}
          onBackButtonPress={() => setModalVisible(false)}
          swipeThreshold={50}>
          {selectedCarId && (
            <CarDetail
              car_id={selectedCarId}
              close={() => setModalVisible(false)}
              setSwipeEnabled={setSwipeEnabled}
              viewedCars={viewedCars}
              setViewedCars={setViewedCars}
            />
          )}
        </Modal>
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
  );
};

export default FavouriteCar;

const styles = StyleSheet.create({});
