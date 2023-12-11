import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import FastImage from 'react-native-fast-image';
import {appStyle, windowWidth} from '../../constants/AppStyle';
import {COLOR, ICON} from '../../constants/Theme';

const ItemFeature = ({featureName, isSelected, onPress, featureKey}) => {
  return (
    <TouchableOpacity
      style={[
        styles.featureItem,
        {
          borderWidth: isSelected ? 1 : 0.5,
          borderColor: isSelected ? COLOR.primary : COLOR.borderColor,
        },
      ]}
      onPress={() => {
        onPress(featureKey);
      }}>
      <Text style={styles.featureText}>{featureName}</Text>
      <FastImage style={appStyle.iconBig} source={ICON.TripFocus} />
    </TouchableOpacity>
  );
};

export default ItemFeature;

const styles = StyleSheet.create({
  featureItem: {
    borderWidth: 0.5,
    borderColor: COLOR.borderColor,
    borderRadius: 10,
    width: windowWidth * 0.22,
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
    marginBottom: 8,
  },
  featureText: {
    ...appStyle.text105,
    textAlign: 'center',
  },
});
