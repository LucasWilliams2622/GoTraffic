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
import {useNavigation} from '@react-navigation/native';
import AxiosInstance from '../../../constants/AxiosInstance';
import ReactNativeModal from 'react-native-modal';
import ChangeBooking from './ChangeBooking';
import {timeDateFormat} from '../../../utils/utils';

const FindingCar = ({
  location,
  setLocation,
  close,
  selectedTime,
  setSelectedTime,
}) => {
  const navigation = useNavigation();
  const [isSelected, setIsSelected] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const [listCar, setListCar] = useState([]);
  const getAllCar = async () => {
    try {
      const response = await AxiosInstance().get('/car/api/list');
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
        <TouchableOpacity onPress={close}>
          <FastImage
            source={ICON.Back}
            resizeMode="stretch"
            style={appStyle.iconBig}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.viewSearch}>
          <View style={{alignItems: 'center', width: '90%'}}>
            <Text style={appStyle.text18Bold}>{location}</Text>
            <Text>{`${timeDateFormat(
              selectedTime.startDate,
            )}  - ${timeDateFormat(selectedTime.endDate)} `}</Text>
          </View>
          <FastImage
            source={ICON.Search}
            style={appStyle.iconBig}
            resizeMode="stretch"
          />
        </TouchableOpacity>
        <ReactNativeModal visible={isModalVisible} style={{margin: 0, flex: 1}}>
          <ChangeBooking
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
            close={() => setModalVisible(false)}
            location={location}
            setLocation={setLocation}
          />
        </ReactNativeModal>
      </View>
      <View style={{paddingHorizontal: 15}}>
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
    // <Text>Test</Text>
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
