import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {appStyle} from '../../../../constants/AppStyle';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLOR, ICON} from '../../../../constants/Theme';
import FastImage from 'react-native-fast-image';
import AppHeader from '../../../../components/AppHeader';
import {formatPrice, showToastMessage} from '../../../../utils/utils';
import {useNavigation} from '@react-navigation/native';

import AxiosInstance from '../../../../constants/AxiosInstance';
import axios from 'axios';

const RentCost = props => {
  const navigation = useNavigation();
  const {price, id} = props.route.params;

  const [priceUpdate, setPriceUpdate] = useState(0);

  const hanldUpdatePrice = async () => {
    try {
      console.log(priceUpdate);
      if (priceUpdate < 100) {
        showToastMessage('error', 'Vui lòng nhập giá lớn hơn 100K');
      } else {
        const response = await axios.put(
          'http://103.57.129.166:3000/car/api/update-price-car?idCar=' + id,
          {
            price: parseInt(priceUpdate * 1000),
          },
        );
        if (response.data.result) {
          showToastMessage('', 'Cập nhật giá thành công');
          navigation.navigate('ListCar');
        } else {
          showToastMessage('error', 'Cập nhật giá thất bại');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setPriceUpdate(price / 1000);
  }, []);
  return (
    <SafeAreaView style={appStyle.container}>
      <AppHeader
        title="Giá xe"
        icon={ICON.Edit}
        onPressRight={() => hanldUpdatePrice()}
      />
      <View style={styles.line1}>
        <Text
          style={[appStyle.text16, {color: COLOR.white, textAlign: 'center'}]}>
          Giá cơ bản sẽ được sử dụng cho các ngày {'\n'} không có Giá tùy chỉnh
          thiết lập bởi chủ xe.
        </Text>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <TextInput
            style={[
              appStyle.text30Bold,
              {
                color: COLOR.primary,
                paddingVertical: 0,
                width: '20%',
                textAlign: 'center',
              },
            ]}
            numberOfLines={1}
            value={priceUpdate.toString()}
            onChangeText={price => setPriceUpdate(price)}
            maxLength={4}
          />
          <Text
            style={[
              appStyle.text30Bold,
              {
                color: COLOR.primary,
                paddingVertical: 0,
                textAlign: 'center',
              },
            ]}>
            K
          </Text>
        </View>
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
