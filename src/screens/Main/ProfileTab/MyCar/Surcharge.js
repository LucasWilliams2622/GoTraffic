import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {appStyle} from '../../../../constants/AppStyle';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLOR, ICON} from '../../../../constants/Theme';
import FastImage from 'react-native-fast-image';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {CalendarList} from 'react-native-calendars';
import ToggleSwitch from 'toggle-switch-react-native';
import {ScrollView, Switch} from 'native-base';
import Slider from '@react-native-community/slider';
import AppHeader from '../../../../components/AppHeader';
import {showToastMessage} from '../../../../utils/utils';
import axios from 'axios';
import Modal from 'react-native-modal';
import AppButton from '../../../../components/AppButton';

const Surcharge = props => {
  const {navigation} = props;
  const {id} = props.route.params;
  console.log(id);
  const goBack = () => {
    navigation.goBack('DetailInListCar');
  };
  const [isEnabledLimitKm, setEnabledLimitKm] = useState(false);
  const [isEnabledOffTime, setisEnabledOffTime] = useState(false);
  const [isEnabledHygiene, setisEnabledHygiene] = useState(false);
  const [isEnabledDeodorize, setisEnabledDeodorize] = useState(false);
  const [first, setfirst] = useState(0);
  const [second, setsecond] = useState(0);
  const [third, setthird] = useState(0);
  const [fourth, setfourth] = useState(0);
  const [fifth, setfifth] = useState(0);
  const [sixth, setsixth] = useState(0);
  const [modalLimitKm, setModalLimitKm] = useState(false);
  const [modalOverTime, setModalOverTime] = useState(false);
  //const [, setfirst] = useState(second)
  const [modalHygine, setModalHygine] = useState(false);
  const [modalDeodorize, setModalDeodorize] = useState(false);
  const logCat = () => {
    console.log('Số km tối đa', Math.floor(first * 100 * 8));
    console.log('Phí vượt giới hạn: ', Math.floor(second * 10));
    console.log('Phí quá giờ: ', Math.floor(third * 1000));
    console.log('Tính giá 1 ngày nếu quá: ', Math.floor(fourth * 10));
    console.log('Phí vs: ', Math.floor(fifth * 100 * 3));
    console.log('Khử mùi xe: ', Math.floor(sixth * 1000));
  };
  const handleUpdateSurcharge = async () => {
    try {
      const response = await axios.put(
        'http://103.57.129.166:3000/car/api/update-surcharge-car?idCar=' + id,
        {
          limitKmStatus: isEnabledLimitKm,
          maxKm: Math.floor(first * 100 * 8),
          exceededFee: Math.floor(second * 10),
          overtimeStatus: isEnabledOffTime,
          overtimeCharge: Math.floor(third * 1000),
          overtimeDay: Math.floor(fourth * 10),
          carCleanStatus: isEnabledHygiene,
          carCleanFee: Math.floor(fifth * 100 * 3),
          carDeodorizerStatus: isEnabledDeodorize,
          carDeodorizerFee: Math.floor(sixth * 1000),
        },
      );
      if (response.data.result) {
        goBack();
        showToastMessage('', 'Cập nhật thành công');
      } else {
        showToastMessage('error', 'Cập nhật thất bại');
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <SafeAreaView style={appStyle.container}>
      <AppHeader title="Phụ phí" />

      <ScrollView style={[appStyle.main, {marginTop: 20}]}>
        {/*Visible of LimitKilometer*/}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            height: 50,
          }}>
          <View style={{flexDirection: 'row'}}>
            <Text style={[appStyle.text16Bold, {marginRight: 10}]}>
              GIỚI HẠN SỐ KM THUÊ XE
            </Text>
            <TouchableOpacity
              style={{
                borderRadius: 50,
                height: 20,
                width: 20,
                borderColor: COLOR.borderColor,
                alignContent: 'center',
                borderWidth: 1,
              }}
              onPress={() => setModalLimitKm(true)}>
              <Text style={{textAlign: 'center'}}>?</Text>
            </TouchableOpacity>
          </View>
          <Switch
            style={{alignSelf: 'center', marginTop: -20}}
            value={isEnabledLimitKm}
            onValueChange={value => setEnabledLimitKm(value)}
          />
        </View>
        {isEnabledLimitKm ? (
          <View style={styles.containerSlider}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={appStyle.text14}>Số km tối đa</Text>
              <Text style={appStyle.text14}>
                {Math.floor(first * 100 * 8)} km/ngày
              </Text>
            </View>
            <Slider
              style={{width: '100%', height: 40}}
              minimumValue={0}
              maximumValue={1}
              minimumTrackTintColor="#41cff2"
              maximumTrackTintColor="#000000"
              onValueChange={value => setfirst(value)}
            />
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={appStyle.text14}>Phí vượt qua giới hạn</Text>
              <Text style={appStyle.text14}>
                {Math.floor(second * 10)} K/km
              </Text>
            </View>
            <Slider
              style={{width: '100%', height: 40}}
              minimumValue={0}
              maximumValue={1}
              minimumTrackTintColor="#41cff2"
              maximumTrackTintColor="#000000"
              onValueChange={value => setsecond(value)}
            />
          </View>
        ) : null}

        {/*Visible of Off time*/}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            height: 50,
          }}>
          <View style={{flexDirection: 'row'}}>
            <Text style={[appStyle.text16Bold, {marginRight: 10}]}>
              QUÁ GIỜ
            </Text>
            <TouchableOpacity
              style={{
                borderRadius: 50,
                height: 20,
                width: 20,
                borderColor: COLOR.borderColor,
                alignContent: 'center',
                borderWidth: 1,
              }}
              onPress={() => setModalLimitKm(true)}>
              <Text style={{textAlign: 'center'}}>?</Text>
            </TouchableOpacity>
          </View>
          <Switch
            style={{alignSelf: 'center', marginTop: -20}}
            value={isEnabledOffTime}
            onValueChange={value => setisEnabledOffTime(value)}
          />
        </View>
        {isEnabledOffTime ? (
          <View style={styles.containerSlider}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={appStyle.text14}>Phí quá giờ</Text>
              <Text style={appStyle.text14}>
                {Math.floor(third * 1000)} K/giờ
              </Text>
            </View>
            <Slider
              style={{width: '100%', height: 40}}
              minimumValue={0}
              maximumValue={1}
              minimumTrackTintColor="#41cff2"
              maximumTrackTintColor="#000000"
              onValueChange={value => setthird(value)}
            />
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={appStyle.text14}>Tính giá tiền 1 ngày nếu quá</Text>
              <Text style={appStyle.text14}>{Math.floor(fourth * 10)} giờ</Text>
            </View>
            <Slider
              style={{width: '100%', height: 40}}
              minimumValue={0}
              maximumValue={1}
              minimumTrackTintColor="#41cff2"
              maximumTrackTintColor="#000000"
              onValueChange={value => setfourth(value)}
            />
          </View>
        ) : null}

        {/*Visible of Hygiene*/}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            height: 50,
          }}>
          <View style={{flexDirection: 'row'}}>
            <Text style={[appStyle.text16Bold, {marginRight: 10}]}>
              VỆ SINH XE
            </Text>
            <TouchableOpacity
              style={{
                borderRadius: 50,
                height: 20,
                width: 20,
                borderColor: COLOR.borderColor,
                alignContent: 'center',
                borderWidth: 1,
              }}
              onPress={() => setModalLimitKm(true)}>
              <Text style={{textAlign: 'center'}}>?</Text>
            </TouchableOpacity>
          </View>
          <Switch
            style={{alignSelf: 'center', marginTop: -20}}
            value={isEnabledHygiene}
            onValueChange={value => setisEnabledHygiene(value)}
          />
        </View>
        {isEnabledHygiene ? (
          <View style={styles.containerSlider2}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={appStyle.text14}>Phí</Text>
              <Text style={appStyle.text14}>
                {Math.floor(fifth * 100 * 3)} K/chuyến
              </Text>
            </View>
            <Slider
              style={{width: '100%', height: 40}}
              minimumValue={0}
              maximumValue={1}
              minimumTrackTintColor="#41cff2"
              maximumTrackTintColor="#000000"
              onValueChange={value => setfifth(value)}
            />
          </View>
        ) : null}

        {/*Visible of Deodorize*/}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            height: 50,
          }}>
          <View style={{flexDirection: 'row'}}>
            <Text style={[appStyle.text16Bold, {marginRight: 10}]}>
              PHỤ PHÍ
            </Text>
            <TouchableOpacity
              style={{
                borderRadius: 50,
                height: 20,
                width: 20,
                borderColor: COLOR.borderColor,
                alignContent: 'center',
                borderWidth: 1,
              }}
              onPress={() => setModalLimitKm(true)}>
              <Text style={{textAlign: 'center'}}>?</Text>
            </TouchableOpacity>
          </View>
          <Switch
            style={{alignSelf: 'center', marginTop: -20}}
            value={isEnabledDeodorize}
            onValueChange={value => setisEnabledDeodorize(value)}
          />
        </View>
        {isEnabledDeodorize ? (
          <View style={styles.containerSlider2}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={appStyle.text14}>Khử mùi xe</Text>
              <Text style={appStyle.text14}>
                {Math.floor(sixth * 1000)} K/chuyến
              </Text>
            </View>
            <Slider
              style={{width: '100%', height: 40}}
              minimumValue={0}
              maximumValue={1}
              minimumTrackTintColor="#41cff2"
              maximumTrackTintColor="#000000"
              onValueChange={value => setsixth(value)}
            />
          </View>
        ) : null}
        <TouchableOpacity
          style={styles.btn}
          onPress={() => handleUpdateSurcharge()}>
          <Text
            style={[
              appStyle.text16Bold,
              {color: COLOR.white, textAlign: 'center'},
            ]}>
            CẬP NHẬT
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalLimitKm}
        onBackdropPress={() => setModalLimitKm(false)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text
              style={[
                [appStyle.text18Bold, {lineHeight: 30, paddingHorizontal: 20}],
              ]}>
              Phụ thu quá km
            </Text>
            <Text
              style={[
                [
                  appStyle.text14,
                  {
                    textAlign: 'center',
                  },
                ],
              ]}>
              Áp dụng trong trường hợp khách hàng đi quá só KM quy định.
            </Text>
            <Text
              style={[
                [
                  appStyle.text14,
                  {
                    textAlign: 'center',
                  },
                ],
              ]}>
              {'(*'} Nếu khách hàng thuê từ 2 ngày: Giới hạn số KM của chuyến đi
              = Giới hạn số KM/ngày x Số ngày thuê {')'}.
            </Text>
            <AppButton
              title="Đóng"
              backgroundColor={COLOR.primary}
              onPress={() => setModalLimitKm(false)}
            />
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalOverTime}
        onBackdropPress={() => setModalOverTime(false)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text
              style={[
                [appStyle.text18Bold, {lineHeight: 30, paddingHorizontal: 20}],
              ]}>
              Phụ thu quá km
            </Text>
            <Text
              style={[
                [
                  appStyle.text14,
                  {
                    textAlign: 'center',
                  },
                ],
              ]}>
              Áp dụng trong trường hợp khách hàng đi quá só KM quy định.
            </Text>
            <Text
              style={[
                [
                  appStyle.text14,
                  {
                    textAlign: 'center',
                  },
                ],
              ]}>
              {'(*'} Nếu khách hàng thuê từ 2 ngày: Giới hạn số KM của chuyến đi
              = Giới hạn số KM/ngày x Số ngày thuê {')'}.
            </Text>
            <AppButton
              title="Đóng"
              backgroundColor={COLOR.primary}
              onPress={() => setModalOverTime(false)}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Surcharge;

const styles = StyleSheet.create({
  viewTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 70,
    borderBottomWidth: 0.5,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    color: COLOR.black,
    fontWeight: '650',
    marginBottom: 20,
    marginTop: 14,
  },
  line1: {
    width: '100%',
    height: '30%',
    padding: 14,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: COLOR.black,
  },
  btn: {
    backgroundColor: COLOR.primary,
    height: 50,
    borderRadius: 10,
    alignContent: 'center',
    justifyContent: 'center',
    marginBottom: 70,
    marginTop: 20,
  },
  containerSlider: {
    backgroundColor: COLOR.borderColor3,
    height: 150,
    width: '100%',
    justifyContent: 'space-evenly',
    padding: 10,
    borderRadius: 10,
  },
  containerSlider2: {
    backgroundColor: COLOR.borderColor3,
    height: 80,
    width: '100%',
    justifyContent: 'space-evenly',
    padding: 10,
    borderRadius: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '100%',
    height: '30%',
    margin: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 0,
    elevation: 5,
    padding: 20,
    justifyContent: 'space-evenly',
  },
});
