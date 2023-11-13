import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {appStyle} from '../../../../constants/AppStyle';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLOR} from '../../../../constants/Theme';
import FastImage from 'react-native-fast-image';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {CalendarList} from 'react-native-calendars';
import ToggleSwitch from 'toggle-switch-react-native';
import {ScrollView, Switch} from 'native-base';
import Slider from '@react-native-community/slider';
import AppHeader from '../../../../components/AppHeader';

const Surcharge = props => {
  const {navigation} = props;
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

  const logCat = () => {
    console.log('Số km tối đa', Math.floor(first * 100 * 8));
    console.log('Phí vượt giới hạn: ', Math.floor(second * 10));
    console.log('Phí quá giờ: ', Math.floor(third * 1000));
    console.log('Tính giá 1 ngày nếu quá: ', Math.floor(fourth * 10));
    console.log('Phí vs: ', Math.floor(fifth * 100 * 3));
    console.log('Khử mùi xe: ', Math.floor(sixth * 1000));
  };

  return (
    <SafeAreaView style={appStyle.container}>
      <AppHeader title="PHỤ PHÍ" />
      <View
        style={{backgroundColor: COLOR.borderColor2, height: 1, width: '100%'}}
      />
      <ScrollView style={[appStyle.main, {marginTop: 20}]}>
        {/*Visible of LimitKilometer*/}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            height: 50,
          }}>
          <Text style={appStyle.text16Bold}>GIỚI HẠN SỐ KM THUÊ XE</Text>
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
          <Text style={appStyle.text16Bold}>QUÁ GIỜ</Text>
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
          <Text style={appStyle.text16Bold}>VỆ SINH XE</Text>
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
          <Text style={appStyle.text16Bold}>PHỤ PHÍ</Text>
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
        <TouchableOpacity style={styles.btn} onPress={logCat}>
          <Text
            style={[
              appStyle.text16Bold,
              {color: COLOR.white, textAlign: 'center'},
            ]}>
            CẬP NHẬT
          </Text>
        </TouchableOpacity>
      </ScrollView>
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
});
