import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {appStyle, windowHeight} from '../../../constants/AppStyle';
import ButtonSelected from '../../../components/ButtonSelected';
import FastImage from 'react-native-fast-image';
import CarCardItem from '../../../components/Home/Home/CarCardItem';
import {COLOR, ICON} from '../../../constants/Theme';
import ReactNativeModal from 'react-native-modal';
import ChangeBooking from './ChangeBooking';
import {formatTimeApi, timeDateFormat} from '../../../utils/utils';
import {REACT_APP_VIETMAP_API_KEY} from '@env';
import axios from 'axios';
import CarDetail from './CarDetail';

const FindingCar = ({
  location,
  setLocation,
  close,
  selectedTime,
  setSelectedTime,
  viewedCars,
  setViewedCars,
}) => {
  const [isSelected, setIsSelected] = useState(null);
  const [isChangeBookingModalVisible, setChangeBookingModalVisible] =
    useState(false);
  const [selectedCarId, setSelectedCarId] = useState(null);
  const [isCarModalVisible, setCarModalVisible] = useState(false);
  const [key, setKey] = useState(Math.random().toString());

  const [listCar, setListCar] = useState([]);

  useEffect(() => {
    setKey(Math.random().toString());
  }, [listCar]);

  const getAllCar = async (ward, district, city) => {
    try {
      if (location === 'Sài Gòn' || location === 'Tân Sơn Nhất') {
        location = 'Ho Chi Minh';
      } else if (location === 'Nội Bài') {
        location = 'Hà Nội';
      }

      console.log(
        'location: ' +
          ' ward: ' +
          JSON.stringify(ward) +
          ' district: ' +
          JSON.stringify(district) +
          ' city: ' +
          JSON.stringify(city),
      );

      const data = {
        location: `${ward ? ward.full_name : ''}, ${
          district ? district.full_name : ''
        }, ${city ? city.full_name : ''}`,
        startTime: formatTimeApi(selectedTime.startDate),
        endTime: formatTimeApi(selectedTime.endDate),
      };

      const locations = [
        `${ward ? ward.full_name : ''}, ${
          district ? district.full_name : ''
        }, ${city ? city.full_name : ''}`,
        `${district ? district.full_name : ''}, ${city ? city.full_name : ''}`,
        `${city ? city.full_name : ''}`,
      ];

      let availableCars = [];

      for (let i = 0; i < locations.length; i++) {
        data.location = locations[i];
        try {
          const response = await axios.post(
            'http://103.57.129.166:3000/car/api/sort-by-location-and-time',
            data,
          );
          if (response.data.listCar.availableCarsLength > 0) {
            availableCars = [
              ...availableCars,
              ...response.data.listCar.availableCars,
            ];
            if (availableCars.length >= 5) {
              break;
            }
          }
        } catch (error) {
          console.warn(`Error ${i + 1}: ` + JSON.stringify(error));
        }
      }

      // Remove duplicates
      availableCars = availableCars.reduce((unique, item) => {
        return unique.findIndex(uniqueItem => uniqueItem.id === item.id) < 0
          ? [...unique, item]
          : unique;
      }, []);

      setListCar(availableCars);
    } catch (e) {
      console.log('Error in getAllCar: ' + e);
    }
  };

  const getDetailLocation = async location => {
    console.log(5);
    try {
      return axios
        .get(
          `https://maps.vietmap.vn/api/search/v3?apikey=${REACT_APP_VIETMAP_API_KEY}&text=${location}`,
        )
        .then(response => {
          console.log(6);
          console.log('response.data: ' + JSON.stringify(response.data[0]));
          let ward, district, city;
          if (response.data[0].boundaries.length == 1) {
            ward = '';
            district = '';
            city = response.data[0].boundaries[0];
          } else if (response.data[0].boundaries.length === 2) {
            ward = '';
            district = response.data[0].boundaries[0];
            city = response.data[0].boundaries[1];
          } else {
            ward = response.data[0].boundaries[0];
            district = response.data[0].boundaries[1];
            city = response.data[0].boundaries[2];
          }
          return {ward, district, city};
        });
    } catch (error) {
      console.warn('Error in getDetailLocation:', error);
    }
  };

  useEffect(() => {
    getDetailLocation(location)
      .then(({ward, district, city}) => {
        getAllCar(ward, district, city);
      })
      .catch(error => {
        console.warn('Error in getDetailLocation:', error);
      });
  }, []);

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

  const handleCarPress = id => {
    console.log('id: ' + id);
    setSelectedCarId(id);
    setCarModalVisible(true);
  };

  return (
    <SafeAreaView style={appStyle.container}>
      <View style={styles.viewTop}>
        <TouchableOpacity onPress={close}>
          <FastImage
            source={ICON.Back}
            resizeMode="stretch"
            style={appStyle.iconBig}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setChangeBookingModalVisible(true)}
          style={styles.viewSearch}>
          <View style={{alignItems: 'center', width: '90%'}}>
            <Text style={appStyle.text14Bold}>
              {location.length > 30 ? location.slice(0, 30) + '...' : location}
            </Text>
            <Text style={{marginTop: 5}}>{`${timeDateFormat(
              selectedTime.startDate,
            )}  - ${timeDateFormat(selectedTime.endDate)} `}</Text>
          </View>
          <FastImage
            source={ICON.Search}
            style={appStyle.iconBig}
            resizeMode="stretch"
          />
        </TouchableOpacity>
        <ReactNativeModal
          visible={isChangeBookingModalVisible}
          style={{margin: 0, flex: 1}}>
          <ChangeBooking
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
            close={() => setChangeBookingModalVisible(false)}
            location={location}
            setLocation={setLocation}
          />
        </ReactNativeModal>
      </View>
      <View>
        <ScrollView
          horizontal
          style={{
            padding: 0,
            margin: 0,
            paddingHorizontal: 14,
          }}>
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

      <ScrollView style={{paddingHorizontal: 15}}>
        <FlatList
          key={key}
          data={listCar}
          shouldRasterizeIOS
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={[appStyle.boxCenter]}>
              <Text style={appStyle.text16}>
                Hiện không có xe nào tại địa điểm này
              </Text>
            </View>
          }
          renderItem={({item}) => (
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
                paddingLeft: 20,
              }}>
              <CarCardItem {...item} onPress={() => handleCarPress(item.id)} />
            </View>
          )}
          keyExtractor={item => item.id}
        />
        <ReactNativeModal
          isVisible={isCarModalVisible}
          style={{margin: 0}}
          onBackButtonPress={() => setCarModalVisible(null)}
          swipeThreshold={50}>
          {selectedCarId && (
            <CarDetail
              car_id={selectedCarId}
              close={() => setCarModalVisible(false)}
              viewedCars={viewedCars}
              setViewedCars={setViewedCars}
            />
          )}
        </ReactNativeModal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FindingCar;

const styles = StyleSheet.create({
  viewTop: {
    height: windowHeight * 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  viewSearch: {
    backgroundColor: COLOR.gray,
    width: '85%',
    height: '70%',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingEnd: 10,
  },
});
