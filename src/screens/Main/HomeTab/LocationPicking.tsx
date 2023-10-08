import {View, Text} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

const LocationPicking = ({navigation}) => {
  return (
    <SafeAreaView>
      <Text onPress={() => navigation.pop()}>LocationPicking</Text>
    </SafeAreaView>
  );
};

export default LocationPicking;
