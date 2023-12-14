import {StyleSheet, useWindowDimensions} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {appStyle} from '../../../../constants/AppStyle';
import {COLOR} from '../../../../constants/Theme';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import ConfirmTrip from './RouteOfTripCar/ConfirmTrip';
import ActiveTrip from './RouteOfTripCar/ActiveTrip';
import CancleTrip from './RouteOfTripCar/CancleTrip';
import FinishTrip from './RouteOfTripCar/FinishTrip';
import DuringTrip from './RouteOfTripCar/DuringTrip';
import AppHeader from '../../../../components/AppHeader';

const TripOfCar = props => {
  const layout = useWindowDimensions();
  const renderScene = SceneMap({
    first: ConfirmTrip,
    second: CancleTrip,
    third: ActiveTrip,
    forth: DuringTrip,
    fifth: FinishTrip,
  });

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Chờ duyệt'},
    {key: 'second', title: 'Đã hùy'},
    {key: 'third', title: 'Đã xác nhận'},
    {key: 'forth', title: 'Trong chuyến'},
    {key: 'fifth', title: 'Hoàn thành'},
  ]);

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: COLOR.primary}}
      style={{backgroundColor: COLOR.white}}
      labelStyle={{
        color: COLOR.black,
        fontSize: 12,
        textTransform: 'none',
        textAlign: 'center',
        fontWeight: '600',
        lineHeight:18,
        fontSize: 14,
      }}
      activeColor={COLOR.primary}
      inactiveColor={'black'}
    />
  );

  return (
    <SafeAreaView style={appStyle.container}>
      <AppHeader title="Danh sách chuyến" />
      <TabView
        lazy={true}
        navigationState={{index, routes}}
        renderTabBar={renderTabBar}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
      />
    </SafeAreaView>
  );
};

export default TripOfCar;

const styles = StyleSheet.create({});
