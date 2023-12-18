import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import FastImage from 'react-native-fast-image';
import {appStyle, windowWidth} from '../../constants/AppStyle';
import {COLOR, ICON} from '../../constants/Theme';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';

const ItemFeature = ({
  featureName,
  isSelected,
  onPress,
  featureKey,
  featureType,
}) => {
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
      <Icon
        name={featureType}
        type={IconType.MaterialCommunityIcons}
        size={24}
        color={COLOR.black}
        onPress={() => {}}
        style={{alignSelf: 'center',marginTop:4}}
      />
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
    justifyContent: 'center',
  },
  featureText: {
    ...appStyle.text105,
    textAlign: 'center',
  },
});
