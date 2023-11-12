import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import {appStyle} from '../../../../constants/AppStyle';
import {COLOR, ICON} from '../../../../constants/Theme';
import AppProfile from '../../../../components/AppProfile';
import {useNavigation} from '@react-navigation/native';
import Header from '../../../../components/Header';
import AppHeader from '../../../../components/AppHeader';

const GeneralInformation = props => {
  const navigation = useNavigation();

  const {data} = props.route.params;
  return (
    <SafeAreaView style={appStyle.container}>
      <AppHeader title="Thông tin chung" />
      <View style={appStyle.main}>
        <AppProfile
          icon={ICON.Warning}
          text="Thông tin xe"
          onPress={() => navigation.navigate('InforOfCar', {data: data})}
        />
        <AppProfile
          icon={ICON.Wallet}
          text="Giấy tờ xe & Bảo hiểm"
          onPress={() => navigation.navigate('ExhibitOfCar')}
        />
        <AppProfile
          icon={ICON.Location}
          text="GPS"
          onPress={() => navigation.navigate('')}
        />
      </View>
    </SafeAreaView>
  );
};

export default GeneralInformation;

const styles = StyleSheet.create({
  viewTitle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    width: '100%',
    borderBottomWidth: 0.5,
  },
  imageCar: {
    height: 80,
    width: 80,
    borderRadius: 50,
  },
  image: {
    width: '100%',
    height: '18%',
    position: 'absolute',
    top: 70,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    color: COLOR.black,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 14,
  },
  line1: {
    width: '100%',
    height: 100,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 10,
  },
});
