import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useState, useContext} from 'react';
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
import Policy from '../screens/Main/ProfileTab/Policy';
import FavouriteCar from '../screens/Main/ProfileTab/FavouriteCar';
import MyCar from '../screens/Main/ProfileTab/MyCar';
import MyAddress from '../screens/Main/ProfileTab/MyAddress';
import ShareWithFriend from '../screens/Main/ProfileTab/ShareWithFriend';
import ChangePassword from '../screens/Main/ProfileTab/ChangePassword';
import UpdateProfile from '../screens/Main/ProfileTab/UpdateProfile';
import NewAddress from '../screens/Main/ProfileTab/NewAddress';
import Account from '../screens/Main/ProfileTab/Account';
import Register from '../screens/Begin/Register';
import Verified from '../screens/Begin/Verified';
import MyCard from '../screens/Main/ProfileTab/MyCard';
import TimePicking from '../screens/Main/HomeTab/TimePicking';
import LocationPicking from '../screens/Main/HomeTab/LocationPicking';
import NewCard from '../screens/Main/ProfileTab/NewCard';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const StackBegin = () => {
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
        name="TimePicking"
        component={TimePicking}
        options={{animationEnabled: true, animation: 'slide_from_bottom'}}
      />
    </Stack.Navigator>
  );
};

const StackNotification = () => {
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
        <Stack.Navigator initialRouteName="Profile" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Account" component={Account} />
            <Stack.Screen name="FavouriteCar" component={FavouriteCar} />
            <Stack.Screen name="MyCar" component={MyCar} />
            <Stack.Screen name="MyAddress" component={MyAddress} />
            <Stack.Screen name="ShareWithFriend" component={ShareWithFriend}/> 
            <Stack.Screen name="Policy" component={Policy}/> 
            <Stack.Screen name="ChangePassword" component={ChangePassword} />
            <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
            <Stack.Screen name="NewAddress" component={NewAddress} />
            <Stack.Screen name="MyCard" component={MyCard} />
            <Stack.Screen name="NewCard" component={NewCard} />

        </Stack.Navigator>
    )
}
const Main = () => {
  const {infoUser, idUser, showWebView, setShowWebView} =
    useContext(AppContext);

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
            iconName = focused ? ICON.NotificationFocus : ICON.Notification;
            label = 'Thông báo';
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
                justifyContent: 'center',
                width: 60,
              }}>
              <Animatable.View animation="zoomIn" duration={2000}>
                <Image
                  source={iconName}
                  style={{
                    width: focused ? 26 : 24,
                    height: focused ? 26 : 24,

                    resizeMode: 'stretch',
                    tintColor: focused ? COLOR.focus : COLOR.notFocus,
                  }}
                />
              </Animatable.View>
              <Text
                style={{
                  fontSize: focused ? 10 : 0,
                  fontWeight: focused ? '600' : '100',
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
          height: 65,
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
  // const [isLogin, setfirst] = useState(true)
  const {isLogin, infoUser} = useContext(AppContext);
  // console.log("isLogin Bottom Tabs=================>", isLogin);
  // console.log("infoUser Bottom Tabs=========>", infoUser);
  return <>{isLogin == false ? <StackBegin /> : <Main />}</>;
};
//ADMIN
export default BottomTabNav;

const styles = StyleSheet.create({});
