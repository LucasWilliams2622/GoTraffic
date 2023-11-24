import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ICON, COLOR} from '../constants/Theme';
import * as Animatable from 'react-native-animatable';
import {AppContext} from '../utils/AppContext';
import Login from '../screens/Begin/Login';
import Home from '../screens/Main/HomeTab/Home';
import Profile from '../screens/Main/ProfileTab/Profile';
import Notification from '../screens/Main/NotificationTab/Notification';
import Support from '../screens/Main/SupportTab/Support';
import Trip from '../screens/Main/TripTab/Trip';
import HistoryTrip from '../screens/Main/TripTab/HistoryTrip';
import FavouriteCar from '../screens/Main/ProfileTab/FavouriteCar';
import MyAddress from '../screens/Main/ProfileTab/Address/MyAddress';
import ShareWithFriend from '../screens/Main/ProfileTab/ShareWithFriend';
import ChangePassword from '../screens/Main/ProfileTab/ChangePassword';
import UpdateProfile from '../screens/Main/ProfileTab/Account/UpdateProfile';
import NewAddress from '../screens/Main/ProfileTab/Address/NewAddress';
import UpdateAddress from '../screens/Main/ProfileTab/Address/UpdateAddress';
import Account from '../screens/Main/ProfileTab/Account/Account';
import Register from '../screens/Begin/Register';
import Verified from '../screens/Begin/Verified';
import MyCard from '../screens/Main/ProfileTab/Payment/MyCard';
import LocationPicking from '../screens/Main/HomeTab/LocationPicking';
import NewCard from '../screens/Main/ProfileTab/Payment/NewCard';
import CarDetail from '../screens/Main/HomeTab/CarDetail';
import HomeCar from '../screens/Main/ProfileTab/MyCar/HomeCar';
import DetailInListCar from '../screens/Main/ProfileTab/MyCar/DetailInListCar';
import GeneralInformation from '../screens/Main/ProfileTab/MyCar/GeneralInformation';
import RentCost from '../screens/Main/ProfileTab/MyCar/RentCost';
import CalendarOfCar from '../screens/Main/ProfileTab/MyCar/CalendarOfCar';
import CarDelivery from '../screens/Main/ProfileTab/MyCar/CarDelivery';
import Surcharge from '../screens/Main/ProfileTab/MyCar/Surcharge';
import TripOfCar from '../screens/Main/ProfileTab/MyCar/TripOfCar';
import InforOfCar from '../screens/Main/ProfileTab/MyCar/InforOfCar';
import ExhibitOfCar from '../screens/Main/ProfileTab/MyCar/ExhibitOfCar';
import MyWallet from '../screens/Main/ProfileTab/MyCar/MyWallet';
import HandOverReport from '../screens/Main/ProfileTab/MyCar/Contract/HandOverReport';
import SampleContract from '../screens/Main/ProfileTab/MyCar/Contract/SampleContract';
import LeaseCar from '../screens/Main/ProfileTab/MyCar/Contract/LeaseCar';
import BasicInfor from '../screens/Main/ProfileTab/Car/BasicInfor';
import DetailsInfor from '../screens/Main/ProfileTab/Car/DetailsInfor';
import FinalStep from '../screens/Main/ProfileTab/Car/FinalStep';
import ListCar from '../screens/Main/ProfileTab/Car/ListCar';
import VerifyLicense from '../screens/Main/ProfileTab/Account/VerifyLicense';
import ListCarCity from '../components/Home/Home/ListCarCity';
import Test2 from '../test/Test2';
import RatingTrip from '../screens/Main/TripTab/RatingTrip';
import Recharge from '../screens/Main/ProfileTab/MyCar/Recharge';
import FindingCar from '../screens/Main/HomeTab/FindingCar';
import ChangeBooking from '../screens/Main/HomeTab/ChangeBooking';
import {appStyle} from '../constants/AppStyle';
import {Badge} from 'react-native-elements';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const StackBegin = () => {
  console.log('StackBegin');
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Verified" component={Verified} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="BottomNav" component={BottomTabNav} />
    </Stack.Navigator>
  );
};

const StackHome = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false, animationEnabled: false}}
      mode="modal">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="LocationPicking"
        component={LocationPicking}
        options={{
          animationEnabled: true,
          animation: 'slide_from_bottom',
        }}
      />
      <Stack.Screen
        name="CarDetail"
        component={CarDetail}
        options={{animationEnabled: true, animation: 'slide_from_bottom'}}
      />
      <Stack.Screen
        name="ListCarCity"
        component={ListCarCity}
        options={{animationEnabled: true, animation: 'slide_from_bottom'}}
      />
      <Stack.Screen
        name="FindingCar"
        component={FindingCar}
        options={{
          animationEnabled: true,
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="ChangeBooking"
        component={ChangeBooking}
        options={{animationEnabled: true, animation: 'slide_from_bottom'}}
      />
    </Stack.Navigator>
  );
};

const StackNotification = () => {
  const {setNotificationCount} = useContext(AppContext);

  // Simulate fetching notification count from server
  useEffect(() => {
    // Replace this with your logic to fetch notification count
    const fetchNotificationCount = async () => {
      // Simulate fetching count from server
      // const count = await yourApiCallToFetchNotificationCount();
      setNotificationCount(2);
    };

    // Fetch notification count
    fetchNotificationCount();
  }, []);

  return (
    <Stack.Navigator
      initialRouteName="Notification"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Notification" component={Notification} />
    </Stack.Navigator>
  );
};

const StackTrip = () => {
  return (
    <Stack.Navigator
      initialRouteName="Trip"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Trip" component={Trip} />
      <Stack.Screen name="HistoryTrip" component={HistoryTrip} />
      <Stack.Screen name="RatingTrip" component={RatingTrip} />
      <Stack.Screen
        name="CarDetail"
        component={CarDetail}
        options={{animationEnabled: true, animation: 'slide_from_bottom'}}
      />
    </Stack.Navigator>
  );
};

const StackSupport = () => {
  return (
    <Stack.Navigator
      initialRouteName="Support"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Support" component={Support} />
    </Stack.Navigator>
  );
};

const StackProfile = () => {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="FavouriteCar" component={FavouriteCar} />
      <Stack.Screen name="HomeCar" component={HomeCar} />
      <Stack.Screen name="ListCar" component={ListCar} />
      <Stack.Screen name="DetailInListCar" component={DetailInListCar} />
      <Stack.Screen name="GeneralInformation" component={GeneralInformation} />
      <Stack.Screen name="RentCost" component={RentCost} />
      <Stack.Screen name="CalendarOfCar" component={CalendarOfCar} />
      <Stack.Screen name="CarDelivery" component={CarDelivery} />
      <Stack.Screen name="Surcharge" component={Surcharge} />
      <Stack.Screen name="TripOfCar" component={TripOfCar} />
      <Stack.Screen name="InforOfCar" component={InforOfCar} />
      <Stack.Screen name="ExhibitOfCar" component={ExhibitOfCar} />
      <Stack.Screen name="MyWallet" component={MyWallet} />
      <Stack.Screen name="MyAddress" component={MyAddress} />
      <Stack.Screen name="UpdateAddress" component={UpdateAddress} />
      <Stack.Screen name="ShareWithFriend" component={ShareWithFriend} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
      <Stack.Screen name="NewAddress" component={NewAddress} />
      <Stack.Screen name="MyCard" component={MyCard} />
      <Stack.Screen name="NewCard" component={NewCard} />
      <Stack.Screen name="BasicInfor" component={BasicInfor} />
      <Stack.Screen name="DetailsInfor" component={DetailsInfor} />
      <Stack.Screen name="FinalStep" component={FinalStep} />
      <Stack.Screen name="LeaseCar" component={LeaseCar} />
      <Stack.Screen name="SampleContract" component={SampleContract} />
      <Stack.Screen name="HandOverReport" component={HandOverReport} />
      <Stack.Screen name="VerifyLicense" component={VerifyLicense} />
      <Stack.Screen name="Test2" component={Test2} />
      <Stack.Screen name="Recharge" component={Recharge} />
    </Stack.Navigator>
  );
};

const Main = () => {
  const {
    infoUser,
    idUser,
    showWebView,
    setShowWebView,
    setNotificationCount,
    notificationCount,
  } = useContext(AppContext);
  console.log('Main');
  return (
    <Tab.Navigator
      initialRouteName="StackHome"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, label, size}) => {
          let iconName = focused;
          if (route.name === 'StackHome') {
            iconName = focused ? ICON.HomeFocus : ICON.Home;
            label = 'Trang chủ';
          } else if (route.name === 'StackNotification') {
            // ... Các thiết lập khác
            return (
              <View style={[{flex: 1, alignItems: 'center', marginTop: 10}]}>
                <Image
                  source={
                    (iconName = focused
                      ? ICON.NotificationFocus
                      : ICON.Notification)
                  }
                  style={{
                    width: 26,
                    height: 26,
                    resizeMode: 'stretch',
                    tintColor: focused ? COLOR.focus : COLOR.notFocus,
                  }}
                />
                {notificationCount <= 0 && (
                  <Badge
                    value={notificationCount}
                    containerStyle={{position: 'absolute', top: -6, right: -6}}
                    badgeStyle={{backgroundColor: 'red'}}
                  />
                )}
                <Text
                  style={[
                    appStyle.text8,

                    {
                      marginTop: 4,
                      textAlign: 'center',
                      fontSize: 10,
                      fontWeight: '600',
                      color: focused ? COLOR.focus : COLOR.notFocus,
                    },
                  ]}>
                  Thông báo
                </Text>
              </View>
            );
          } else if (route.name === 'StackTrip') {
            iconName = focused ? ICON.TripFocus : ICON.Trip;
            label = 'Chuyến đi';
          } else if (route.name === 'StackSupport') {
            iconName = focused ? ICON.SupportFocus : ICON.Support;
            label = 'Hỗ trợ';
          } else if (route.name === 'StackProfile') {
            iconName = focused ? ICON.ProfileFocus : ICON.Profile;
            label = 'Cá nhân';
          }
          // You can return any component that you like here!
          return (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Animatable.View animation="zoomIn" duration={2000}>
                {}

                <Image
                  source={iconName}
                  style={{
                    width: 26,
                    height: 26,

                    resizeMode: 'stretch',
                    tintColor: focused ? COLOR.focus : COLOR.notFocus,
                  }}
                />
              </Animatable.View>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  marginTop: 4,
                  color: focused ? COLOR.focus : COLOR.notFocus,
                }}>
                {label}
              </Text>
            </View>
          );
        },

        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 80,
          position: 'absolute',
          backgroundColor: COLOR.background,
        },
      })}>
      <Tab.Screen name="StackHome" component={StackHome} />
      <Tab.Screen name="StackNotification" component={StackNotification} />
      <Tab.Screen name="StackTrip" component={StackTrip} />
      <Tab.Screen name="StackSupport" component={StackSupport} />
      <Tab.Screen name="StackProfile" component={StackProfile} />
    </Tab.Navigator>
  );
};

const BottomTabNav = () => {
  const {isLogin, infoUser} = useContext(AppContext);
  console.log('BottomTabNav');
  return <>{isLogin ? <Main /> : <StackBegin />}</>;
};

export default BottomTabNav;

const styles = StyleSheet.create({});
