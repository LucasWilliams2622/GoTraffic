import {StyleSheet, View} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {PromotionProps} from '../../../types';

const Promotion = ({image, width, height}: PromotionProps) => {
  return (
    <View style={{alignItems: 'center', marginRight: 20}}>
      <FastImage
        source={{
          uri: image,
        }}
        resizeMode="stretch"
        style={{width: width, height: height, borderRadius: 10}}
      />
    </View>
  );
};

export default Promotion;

const styles = StyleSheet.create({});
