import React, { Dispatch, SetStateAction } from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

export default function Splash({ setIsLoading }) {
  return (<View style={styles.splash}>
    <LottieView source={require('../../assets/json/initiativeCompany.json')} autoPlay loop={false} resizeMode="cover" onAnimationFinish={() => {
          // console.log('animation finished');
          setIsLoading(false);
      }}/>
  </View>);
}
const styles = StyleSheet.create({
  splash: {
    flex: 1,
    alignItems: 'center',
    margin: 0,
  },
});
