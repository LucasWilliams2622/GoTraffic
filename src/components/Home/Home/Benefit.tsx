import {StyleSheet, View} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {BenefitProps, PromotionProps} from '../../../types';

const BenefitHome = ({image, width, height}: BenefitProps) => {
  console.log(typeof image);

  return (
    <View style={{alignItems: 'center', marginRight: 20}}>
      <FastImage
        source={image}
        resizeMode="stretch"
        style={{width: width, height: height, borderRadius: 10}}
      />
    </View>
  );
};

export default BenefitHome;

const styles = StyleSheet.create({});
