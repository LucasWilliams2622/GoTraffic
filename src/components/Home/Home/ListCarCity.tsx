import {StyleSheet, Text, FlatList, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import Header from '../../Header';
import {ICON} from '../../../constants/Theme';
import {useNavigation} from '@react-navigation/native';
import {appStyle, windowHeight, windowWidth} from '../../../constants/AppStyle';
import CarCardItem from './CarCardItem';
import AxiosInstance from '../../../constants/AxiosInstance';
const ListCarCity = props => {
  const navigation = useNavigation();
  const {title} = props.route.params;
  // console.log(props.route.params.title);
  // =================| Get List |====================
  const [listCar, setListCar] = useState([]);
  const getAllCar = async () => {
    try {
      const response = await AxiosInstance().get(
        '/car/api/get-car-by-city?city=' + title,
      );
      if (response.result) {
        setListCar(response.listCar);
      } else {
        console.log('Error');
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAllCar();
  }, []);

  return (
    <SafeAreaView style={appStyle.container}>
      <Header
        icon={ICON.Back}
        text={title}
        onPress={() => navigation.goBack()}
      />
      <View style={appStyle.main}>
        <FlatList
          data={listCar}
          shouldRasterizeIOS
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={[appStyle.boxCenter, {marginTop: windowHeight * 0.4}]}>
              <Text style={appStyle.text16}>
                Hiện không có xe nào tại địa điểm này
              </Text>
            </View>
          }
          renderItem={({item}) => <CarCardItem width={'100%'} {...item} />}
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

export default ListCarCity;

const styles = StyleSheet.create({});
