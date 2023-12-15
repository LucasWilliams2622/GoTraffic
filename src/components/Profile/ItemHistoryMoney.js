import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {COLOR, ICON} from '../../constants/Theme';
import {appStyle, windowHeight, windowWidth} from '../../constants/AppStyle';
import {useNavigation} from '@react-navigation/native';
import {MoneyText, formatPrice} from '../../utils/utils';
import {SafeAreaView} from 'react-native-safe-area-context';
import Moment from 'moment';
const ItemCar = props => {
  const navigation = useNavigation();
  const {data} = props;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.carContainer}>
        <View style={[appStyle.rowCenter, {}]}>
          <FastImage
            source={require('../../assets/image/logo_go_traffic.png')}
            style={{
              height: 30,
              width: 30,
              borderRadius: 30,
              borderWidth: 0.5,
              alignSelf: 'center',
              padding: 10,
            }}
          />
          <View style={{marginLeft: 24, width: '60%'}}>
            {data.status == 1 ? (
              <Text style={[appStyle.text16Bold, {marginBottom: 5}]}>
                Nạp tiền
              </Text>
            ) : (
              <Text style={[appStyle.text16Bold, {marginBottom: 5}]}>
                Rút tiền
              </Text>
            )}
            <Text style={[appStyle.text14, {marginBottom: 5,}]}>
              Đến {data.bankName} {data.bankNumber}
            </Text>
            <Text style={[appStyle.text14]}>
              {Moment(data.createdAt).format('HH:mm, DD/MM/YYYY ')}
            </Text>
          </View>
        </View>

        {data.status == 1 ? (
          <Text style={[appStyle.text16Bold, {color: COLOR.green}]}>
            +{MoneyText(data.amount)}đ
          </Text>
        ) : (
          <Text style={[appStyle.text16Bold, {color: COLOR.red}]}>
            -{MoneyText(data.amount)}đ
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderColor: COLOR.borderColor,
    borderBottomWidth: 0.4,
  },
  carContainer: {
    backgroundColor: COLOR.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
