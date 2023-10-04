import {
  Image,
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  ScrollView,
} from 'react-native';
import React from 'react';
import {COLOR} from '../../../constants/Theme';
import {appStyle} from '../../../constants/AppStyle';
import AppInput from '../../../components/AppInput';
import AppButton from '../../../components/AppButton';

const Home = () => {
  return (
    <SafeAreaView style={appStyle.container}>
      <View style={styles.headBg}>
        <Text>Home</Text>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  headBg: {
    backgroundColor: COLOR.secondary,
    width: '100%',
    height: '30%',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
});
