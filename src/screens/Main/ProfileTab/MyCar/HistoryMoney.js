import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {appStyle} from '../../../../constants/AppStyle';
import ItemHistoryMoney from '../../../../components/Profile/ItemHistoryMoney';
import AppHeader from '../../../../components/AppHeader';
import {FlatList} from 'native-base';

const HistoryMoney = () => {
  return (
    <SafeAreaView style={appStyle.container}>
      <AppHeader title="Lịch sử giao dịch" />
      <FlatList
        style={{marginBottom: 100}}
        data={DATA}
        renderItem={({item}) => <ItemHistoryMoney data={item} />}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default HistoryMoney;

const styles = StyleSheet.create({});
const DATA = [
  {
    id: 1,
    status: 'Rút tiền',
    from: 'Đến VPBank ***5338',
    time: '21 Tháng 10, 2023',
    price: '200.312',
  },
  {
    id: 2,
    status: 'Nạp tiền',
    from: 'Đến VPBank ***5338',
    time: '21 Tháng 10, 2023',
    price: '200.312',
  },
  {
    id: 3,
    status: 'Rút tiền',
    from: 'Đến VPBank ***5338',
    time: '21 Tháng 10, 2023',
    price: '200.312',
  },
];
