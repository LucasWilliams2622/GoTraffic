import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import React, {useState} from 'react';
import {FlatList} from 'native-base';
import {SafeAreaView} from 'react-native-safe-area-context';
import {appStyle} from '../../../../constants/AppStyle';
import {COLOR} from '../../../../constants/Theme';
import FastImage from 'react-native-fast-image';
import ItemListCar from '../../../../components/Support/ItemListCar';
import ItemTrip from '../../../../components/Support/ItemTrip';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import ConfirmTrip from './RouteOfTripCar/ConfirmTrip';
import ActiveTrip from './RouteOfTripCar/ActiveTrip';
import CancleTrip from './RouteOfTripCar/CancleTrip';
import FinishTrip from './RouteOfTripCar/FinishTrip';


const TripOfCar = props => {
  const {navigation} = props;
  const goBack = () => {
    navigation.goBack('HomeCar');
  };
  const layout = useWindowDimensions();

  const renderScene = SceneMap({
    first: ConfirmTrip,
    second: CancleTrip,
    third: ActiveTrip,
    forth: FinishTrip,
  });
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Chờ duyệt'},
    {key: 'second', title: 'Đã hùy'},
    {key: 'third', title: 'Trong chuyến'},
    {key: 'forth', title: 'Hoàn thành'},
  ]);
  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: COLOR.primary}}
      style={{backgroundColor: COLOR.white}}
      labelStyle={{color: COLOR.black}}
    />
  );
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
        <Text style={styles.title}>Danh sách chuyến</Text>

        <TouchableOpacity>
          <FastImage
            source={require('../../../../assets/icon/ic_add.png')}
            style={{
              position: 'absolute',
              right: 10,
              top: 20,
              width: 20,
              height: 20,
            }}
          />
        </TouchableOpacity>
      </View>
      <TabView
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
});
