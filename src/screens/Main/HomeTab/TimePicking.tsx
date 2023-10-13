import {View, Text} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

const TimePicking = ({navigation}) => {
  return (
    <SafeAreaView>
      <Text onPress={() => navigation.pop()}>TimePicking</Text>
    </SafeAreaView>
  );
};

export default TimePicking;
