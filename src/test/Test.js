import { Image, StyleSheet, Text, View ,TouchableOpacity} from 'react-native';
import React from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { appStyle } from '../constants/AppStyle';
const Tab = createMaterialTopTabNavigator();

const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel;
        const isFocused = state.index === index;

        const icon = options.tabBarIcon;
        const iconColor = isFocused ? COLOR.primary : COLOR.gray;

        return (
          <TouchableOpacity
            key={index}
            style={styles.tabItem}
            onPress={() => navigation.navigate(route.name)}
          >
            <Image source={icon} style={[styles.tabIcon, { tintColor: iconColor }]} />
            <Text style={[styles.tabLabel, { color: isFocused ? COLOR.primary : COLOR.gray }]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const Home = () => {
  return (
    <View style={appStyle.container}>
      <View style={styles.headBg}>
        <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
          <Tab.Screen
            name="Home"
            component={Test}
            options={{
              tabBarLabel: 'Tab 1',
              tabBarIcon: require('../assets/icon/ic_home.png'),
            }}
          />
          <Tab.Screen
            name="Settings"
            component={Test2}
            options={{
              tabBarLabel: 'Tab 2',
              tabBarIcon: require('../assets/icon/ic_message.png'),
            }}
          />
        </Tab.Navigator>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  headBg: {
    backgroundColor: COLOR.secondary,
    width: '100%',
    height: '40%',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 50,
    backgroundColor: COLOR.secondary,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:'row'
  },
  tabIcon: {
    width: 16,
    height: 15,
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 5,
  },
});
