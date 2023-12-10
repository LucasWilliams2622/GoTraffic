import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {COLOR, ICON} from '../../constants/Theme';
import {appStyle, windowHeight, windowWidth} from '../../constants/AppStyle';
import {useNavigation} from '@react-navigation/native';
import {formatPrice} from '../../utils/utils';
import {SafeAreaView} from 'react-native-safe-area-context';
import Moment from 'moment';
const ItemCar = props => {
  const navigation = useNavigation();
  const {data} = props;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.carContainer}>
        <FastImage
          source={require('../../assets/image/logo_go_traffic.png')}
          style={{
            height: 30,
            width: 30,
            borderRadius: 30,
            borderWidth: 0.5,
            alignSelf: 'center',
          }}
        />
        <View style={{marginLeft: 30, width: '60%'}}>
          {data.status == 1 ? (
            <Text style={[appStyle.text16Bold, {marginBottom: 5}]}>
              Nạp tiền
            </Text>
          ) : (
            <Text style={[appStyle.text16Bold, {marginBottom: 5}]}>
              Rút tiền
            </Text>
          )}
          <Text style={[appStyle.text14, {marginBottom: 5}]}>
            Đến {data.bankName} {data.bankNumber}
          </Text>
          <Text style={[appStyle.text14, ]}>
            {Moment(data.createdAt).format('HH:mm, DD/MM/YYYY ')}
          </Text>
        </View>
        {data.status == 1 ? (
          <Text style={[appStyle.text16, {color: COLOR.green}]}>
            +đ{data.amount}
          </Text>
        ) : (
          <Text style={[appStyle.text16, {color: COLOR.red}]}>
            -đ{data.amount}
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ItemCar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  carContainer: {
    width: '90%',
    backgroundColor: COLOR.white,
    borderColor: COLOR.borderColor,
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 0.4,
  },
});
