import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {appStyle} from '../../../../constants/AppStyle';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLOR} from '../../../../constants/Theme';
import FastImage from 'react-native-fast-image';
import AppHeader from '../../../../components/AppHeader';
import { formatPrice } from '../../../../utils/utils';

const RentCost = props => {
  const {navigation} = props;
  const {price} = props.route.params;
  const goBack = () => {
    navigation.goBack('DetailInListCar');
  };
  return (
    <SafeAreaView style={appStyle.container}>
      <AppHeader title="Gía xe" />
      <View style={styles.line1}>
        <Text
          style={[appStyle.text16, {color: COLOR.white, textAlign: 'center'}]}>
          Giá cơ bản sẽ được sử dụng cho các ngày {'\n'} không có Giá tùy chỉnh
          thiết lập bởi chủ xe.
        </Text>
        <Text style={[appStyle.text30Bold, {color: COLOR.primary}]}>
          {formatPrice(price)}
        </Text>
        <View
          style={{width: '30%', height: 1, backgroundColor: COLOR.primary}}
        />
        <Text
          style={[appStyle.text16, {color: COLOR.white, textAlign: 'center'}]}>
          Giá cơ bản đề xuất {'\n'} cho mẫu xe FORD ESCAPE 2023 LÀ{' '}
          {formatPrice(price)}/ngày
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 14,
        }}>
        <View>
          <Text style={[appStyle.text16Bold]}>T2</Text>
          <Text>{formatPrice(price)}</Text>
        </View>
        <View>
          <Text style={[appStyle.text16Bold]}>T3</Text>
          <Text>{formatPrice(price)}</Text>
        </View>
        <View>
          <Text style={[appStyle.text16Bold]}>T4</Text>
          <Text>{formatPrice(price)}</Text>
        </View>
        <View>
          <Text style={[appStyle.text16Bold]}>T5</Text>
          <Text>{formatPrice(price)}</Text>
        </View>
        <View>
          <Text style={[appStyle.text16Bold]}>T6</Text>
          <Text>{formatPrice(price)}</Text>
        </View>
        <View>
          <Text style={[appStyle.text16Bold, {color: COLOR.orange}]}>T7</Text>
          <Text style={{color: COLOR.orange}}>{formatPrice(price * 1.1)}</Text>
        </View>
        <View>
          <Text style={[appStyle.text16Bold, {color: COLOR.orange}]}>CN</Text>
          <Text style={{color: COLOR.orange}}>{formatPrice(price * 1.1)}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RentCost;

const styles = StyleSheet.create({
  viewTitle: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 70,
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
    height: '30%',
    padding: 14,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginBottom: 10,
    backgroundColor: COLOR.black,
  },
});
