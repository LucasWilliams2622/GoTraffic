import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import {appStyle} from '../../../../constants/AppStyle';
import {COLOR, ICON} from '../../../../constants/Theme';
import AppProfile from '../../../../components/AppProfile';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';


const DetailInListCar = props => {
  const {navigation} = props;
  const goBack = () => {
    navigation.goBack('Profile');
  };
  const goInfor = () => {
    navigation.navigate('GeneralInformation');
  };
  const layout = useWindowDimensions();
const FirstRoute = () => (
  <View style={{flex: 1, padding: 10}}>
    <AppProfile
      icon={ICON.Trip}
      text="Giá cho thuê"
      onPress={() => navigation.navigate('RentCost')}
    />
    <AppProfile
      icon={ICON.Calendar}
      text="Lịch xe"
      onPress={() => navigation.navigate('CalendarOfCar')}
    />
    <AppProfile
      icon={ICON.Heart}
      text="Giao xe tận nơi"
      onPress={() => navigation.navigate('CarDelivery')}
    />
    <AppProfile
      icon={ICON.Card}
      text="Phụ phí"
      onPress={() => navigation.navigate('Surcharge')}
    />
  </View>
);

const SecondRoute = () => (
  <View style={{flex: 1, backgroundColor: '#673ab7'}} />
);
  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'XE TỰ LÁI'},
    {key: 'second', title: 'XE CÓ TÀI XẾ'},
  ]);
  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: COLOR.primary}}
      style={{backgroundColor: COLOR.white}}
      labelStyle={{color:COLOR.black}}
    />
  );

  return (
    <SafeAreaView style={appStyle.container}>
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
      <TouchableOpacity>
        <FastImage
          source={require('../../../../assets/icon/ic_garbage.png')}
          style={{
            position: 'absolute',
            right: 10,
            top: 20,
            width: 20,
            height: 20,
          }}
        />
      </TouchableOpacity>
      <FastImage
        style={styles.image}
        source={require('../../../../assets/image/bg2.jpg')}
      />
      <View style={styles.viewTitle}>
        <Text style={styles.title}>FORD ESCAPE 2023</Text>
      </View>
      <View style={{padding: 14}}>
        <View style={styles.line1}>
          <FastImage
            style={styles.imageCar}
            source={require('../../../../assets/image/logo-fb.png')}></FastImage>
          <View style={{marginLeft: 10}}>
            <Text style={[appStyle.text16Bold]}>FORD ESCAPE 2023</Text>
            <Text
              style={[
                appStyle.text14Bold,
                {marginTop: 10, color: COLOR.primary},
              ]} onPress={goInfor}>
              Thông tin chung {'>'}{' '}
            </Text>
          </View>
        </View>
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

export default DetailInListCar;

const styles = StyleSheet.create({
  viewTitle: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 70,
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
