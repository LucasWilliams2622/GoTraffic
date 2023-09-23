import { StyleSheet, Text, View, Image, } from 'react-native'
import React, { useState, useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { ICON, COLOR } from '../constants/Theme'
import * as Animatable from 'react-native-animatable';
import { AppContext } from "../utils/AppContext";
import Login from '../screens/Begin/Login';
import Home from '../screens/Main/Home';
import Profile from '../screens/Main/Profile';



const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const StackBegin = () => {
    return (
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="BottomNav" component={BottomTabNav} />

        </Stack.Navigator>
    )
}
const StackHome = () => {
    return (
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} />

        </Stack.Navigator>
    )
}
const StackProfile = () => {
    return (
        <Stack.Navigator initialRouteName="Profile" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Profile" component={Profile} />

        </Stack.Navigator>
    )
}
const Main = () => {
    const { infoUser, idUser, showWebView, setShowWebView } = useContext(AppContext);

    return (
        <Tab.Navigator
            initialRouteName="StackHome"
            screenOptions={
                ({ route }) => ({
                    tabBarIcon: ({ focused, label, size }) => {
                        let iconName = focused
                        if (route.name === 'StackHome') {
                            iconName = focused ? ICON.HomeFocus : ICON.Home
                            label = 'Trang chủ'
                        } else if (route.name === 'StackSchedule') {
                            iconName = focused ? ICON.ScheduleFocus : ICON.Schedule;
                            label = 'Lịch'
                        } else if (route.name === 'StackGoFPT') {
                            iconName = focused ? ICON.Walk : ICON.Walk;
                            label = 'Go FPT'
                        } else if (route.name === 'StackNews') {
                            iconName = focused ? ICON.NotificationFocus : ICON.Notification;
                            label = 'Tin tức'
                        }
                        else if (route.name === 'StackProfile') {
                            iconName = focused ? ICON.ProfileFocus : ICON.Profile;
                            label = 'Hồ sơ'
                        }
                        // You can return any component that you like here!
                        return <View style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 60
                        }}>

                            <Animatable.View
                                animation="zoomIn"
                                duration={2000}>
                                <Image source={iconName}
                                    style={{
                                        width: focused ? 28 : 24,
                                        height: focused ? 28 : 24,

                                        resizeMode: 'stretch',
                                        tintColor: focused ? COLOR.focus : COLOR.notFocus,
                                    }} />
                            </Animatable.View>
                            <Text style={{
                                fontSize: focused ? 10 : 0,
                                fontWeight: focused ? "600" : "100",
                                marginTop: 4,
                                color: focused ? COLOR.focus : COLOR.notFocus,

                            }}>{label}</Text>
                        </View>;
                    },

                    tabBarHideOnKeyboard: true,
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        height: 65,
                        position: 'absolute',
                        backgroundColor: COLOR.background,


                    },
                })}
        >
            <Tab.Screen name="StackHome" component={StackHome} />
            <Tab.Screen name="StackProfile" component={StackProfile} />
        </Tab.Navigator>
    )
}
const BottomTabNav = () => {
    // const [isLogin, setfirst] = useState(true)
    const { isLogin, infoUser } = useContext(AppContext);
    // console.log("isLogin Bottom Tabs=================>", isLogin);
    // console.log("infoUser Bottom Tabs=========>", infoUser);
    return (
        <>
            {
                isLogin == false ? <StackBegin /> : <Main />
            }
        </>)
}
//ADMIN
export default BottomTabNav

const styles = StyleSheet.create({})