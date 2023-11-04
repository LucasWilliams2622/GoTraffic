import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {appStyle} from '../../../../constants/AppStyle';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLOR} from '../../../../constants/Theme';
import FastImage from 'react-native-fast-image';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {CalendarList} from 'react-native-calendars';
import ToggleSwitch from 'toggle-switch-react-native';
import {Switch} from 'native-base';
import Slider from '@react-native-community/slider';

const CarDelivery = props => {
  const {navigation} = props;
  const goBack = () => {
    navigation.goBack('DetailInListCar');
  };
  const [isEnabled, setEnabled] = useState(false);
  const [first, setfirst] = useState(0);
  const [second, setsecond] = useState(0);
  const [third, setthird] = useState(0);
  const [howFar, sethowFar] = useState(0);
  const logCat = () => {
    console.log("Trong vong: ",Math.floor(first * 100));
    console.log('Phi: ', Math.floor(second * 10 * 5));
    console.log('Mien phi trong vong: ', Math.floor(third * 10));
  };
  return (
    <SafeAreaView style={appStyle.container}>
      <View style={styles.viewTitle}>
        <TouchableOpacity onPress={goBack}>
          <FastImage
            source={require('../../../../assets/icon/ic_left.png')}
            style={{
              position: 'absolute',
              left: 10,
              top: 20,
              width: 20,
              height: 20,
            }}
          />
        </TouchableOpacity>
        <Text style={styles.title}>GIAO NHẬN XE TẬN NƠI</Text>
        <View />
      </View>
      <View style={[appStyle.main, {marginTop: 20}]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            height: 50,
          }}>
          <Text style={appStyle.text16Bold}>GIAO NHẬN XE TẬN NƠI</Text>
          <Switch
            style={{alignSelf: 'center', marginTop: -20}}
            value={isEnabled}
            onValueChange={value => setEnabled(value)}
          />
        </View>
        {isEnabled ? (
          <View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text>Trong vòng</Text>
              <Text>{Math.floor(first * 100)} km</Text>
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
              <Text>Phí</Text>
              <Text>{Math.floor(second * 10 * 5)} K/km</Text>
            </View>
            <Slider
              style={{width: '100%', height: 40}}
              minimumValue={0}
              maximumValue={1}
              minimumTrackTintColor="#41cff2"
              maximumTrackTintColor="#000000"
              onValueChange={value => setsecond(value)}
            />
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text>Miễn phí trong vòng</Text>
              <Text>{Math.floor(third * 10)} km</Text>
            </View>
            <Slider
              style={{width: '100%', height: 40}}
              minimumValue={0}
              maximumValue={1}
              minimumTrackTintColor="#41cff2"
              maximumTrackTintColor="#000000"
              onValueChange={value => setthird(value)}
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
      </View>
    </SafeAreaView>
  );
};

export default CarDelivery;

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
    position: 'absolute',
    bottom: 100,
    left: 10,
    right: 10,
    height: 50,
    borderRadius: 10,
    alignContent: 'center',
    justifyContent: 'center',
  },
});
