import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {appStyle} from '../../../../constants/AppStyle';
import {COLOR, ICON} from '../../../../constants/Theme';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../../../../utils/AppContext';
import numeral from 'numeral';
import AppHeader from '../../../../components/AppHeader';

const MyWallet = props => {
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack('HomeCar');
  };
  const { infoUser, idUser } = useContext(AppContext);

  return (
    <SafeAreaView style={appStyle.container}>
      <AppHeader title="Ví của tôi" />
      <View style={[appStyle.main, {marginTop: 20}]}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={appStyle.text14}>Chủ ví:</Text>
          <Text style={appStyle.text14}>{infoUser.name}</Text>
        </View>
        <View style={styles.containerContent}>
          <Text
            style={[
              appStyle.text14,
              {color: COLOR.white, textAlign: 'center'},
            ]}>
            Tài khoản chính
          </Text>
          <Text
            style={[
              appStyle.text16Bold,
              {color: COLOR.white, textAlign: 'center'},
            ]}>
            {numeral(infoUser.surplus).format('0,0')}đ
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <TouchableOpacity onPress={() => navigation.navigate('Recharge')}>
              <FastImage
                style={{
                  width: 30,
                  height: 30,
                  marginTop: 10,
                  alignSelf: 'center',
                }}
                tintColor={COLOR.white}
                source={ICON.Wallet}
              />
              <Text style={[appStyle.text14, {color: COLOR.white}]}>
                Nạp tiền
              </Text>
            </TouchableOpacity>
            <View>
              <FastImage
                style={{
                  width: 30,
                  height: 30,
                  marginTop: 10,
                  alignSelf: 'center',
                }}
                source={ICON.Wallet}
                tintColor={COLOR.white}
              />
              <Text style={[appStyle.text14, {color: COLOR.white}]}>
                Rút tiền
              </Text>
            </View>
            <View>
              <FastImage
                style={{
                  width: 30,
                  height: 30,
                  marginTop: 10,
                  alignSelf: 'center',
                }}
                tintColor={COLOR.white}
                source={ICON.Wallet}
              />
              <Text style={[appStyle.text14, {color: COLOR.white}]}>
                Lịch sử
              </Text>
            </View>
          </View>
          <View
            style={{
              width: '100%',
              height: 0.5,
              backgroundColor: COLOR.white,
              marginTop: 20,
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 10,
            }}>
            <Text style={[appStyle.text14, {color: COLOR.white}]}>
              Lịch sử rút
            </Text>
            <Text style={[appStyle.text14, {color: COLOR.white}]}>
              0đ {' >'}
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MyWallet;

const styles = StyleSheet.create({
  viewTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
  },
  image: {
    width: '100%',
    height: '30%',
    position: 'absolute',
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
  containerContent: {
    height: '30%',
    width: '100%',
    backgroundColor: COLOR.fifth,
    borderRadius: 10,
    marginTop: 20,
    justifyContent: 'space-evenly',
    alignContent: 'center',
  },
});