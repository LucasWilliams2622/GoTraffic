import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {appStyle, windowHeight} from '../../../constants/AppStyle';
import FastImage from 'react-native-fast-image';
import {COLOR, ICON} from '../../../constants/Theme';
import {useNavigation} from '@react-navigation/native';
import Header from '../../../components/Header';
import AppButton from '../../../components/AppButton';
import ReactNativeModal from 'react-native-modal';
import LocationPicking from './LocationPicking';
import {InputField} from '../../../components/Home/Home/Booking';
import {timeString} from '../../../utils/utils';

const ChangeBooking = ({
  location,
  setLocation,
  selectedTime,
  setSelectedTime,
  close,
}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [inputAddress, setInputAddress] = useState('');

  const navigation = useNavigation();
  return (
    <SafeAreaView style={appStyle.container}>
      <Header text="" icon={ICON.Close} onPress={() => close()} />
      <View style={{flex: 1, padding: 15}}>
        {/* <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.outside}>
          <FastImage
            source={ICON.Location}
            resizeMode="stretch"
            style={appStyle.icon}
          />
          <View style={styles.card}>
            <Text>Địa điểm</Text>
            <Text numberOfLines={1} style={appStyle.text165}>
              342 Lô H Phường 28, Quận Bình Thạnh, TP.HCM
            </Text>
          </View>
        </TouchableOpacity> */}
        <InputField
          iconName="location-dot"
          placeholderText="Địa điểm"
          navigation={navigation}
          navigateTo="LocationPicking"
          location={location}
          setLocation={setLocation}
        />
        <ReactNativeModal
          isVisible={isModalVisible}
          style={{margin: 0, display: 'flex'}}>
          <LocationPicking
            close={() => setModalVisible(false)}
            setInputAddress={setInputAddress}
          />
        </ReactNativeModal>
        {/* <TouchableOpacity
          onPress={() => navigation.navigate('TimePickingModal')}
          style={styles.outside}>
          <FastImage
            source={ICON.Calendar}
            resizeMode="stretch"
            style={appStyle.icon}
          />
          <View style={styles.card}>
            <Text>Thời gian thuê</Text>
            <Text numberOfLines={1} style={appStyle.text165}>
              21h00, 10/11 - 20h00, 11/11
            </Text>
          </View>
        </TouchableOpacity> */}
        <InputField
          iconName="calendar"
          placeholderText="Thời gian thuê"
          value={timeString}
          navigation={navigation}
          navigateTo="TimePicking"
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
        />
      </View>
      <View style={styles.bottom}>
        <Text>Số ngày cho thuê: 1 ngày</Text>
        <AppButton title="Tìm xe" width={100} onPress={() => close()} />
      </View>
    </SafeAreaView>
  );
};

export default ChangeBooking;

const styles = StyleSheet.create({
  bottom: {
    width: '100%',
    height: windowHeight * 0.08,
    position: 'absolute',
    bottom: 70,
    alignSelf: 'center',
    borderTopWidth: 0.8,
    borderTopColor: COLOR.borderColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  card: {
    borderBottomWidth: 0.5,
    borderBottomColor: COLOR.borderColor,
    width: '90%',
    marginLeft: 10,
  },
  outside: {
    flexDirection: 'row',
    height: windowHeight * 0.08,
    paddingVertical: 10,
  },
});
