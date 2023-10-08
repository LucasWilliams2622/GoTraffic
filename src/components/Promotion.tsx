import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

const Promotion = ({image}) => {
  return (
    <View style={{alignItems: 'center', marginRight: 20}}>
      <FastImage
        source={{
          uri: image,
        }}
        style={{width: 300, height: 200, borderRadius: 10}}
      />
    </View>
  );
};

export default Promotion;

const styles = StyleSheet.create({});
