import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const SkeletonItemMoney = () => {
  return (
    <SkeletonPlaceholder>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 16,
          paddingHorizontal: 14,
        }}>
        <View style={{width: 40, height: 40, borderRadius: 50}} />
        <View style={{marginLeft: 20, width: '60%'}}>
          <View style={{width: 120, height: 16, borderRadius: 4}} />
          <View
            style={{
              marginTop: 6,
              width: 120,
              height: 16,
              borderRadius: 4,
            }}
          />
        </View>
        <View
          style={{
            width: 70,
            height: 16,
            borderRadius: 4,
          }}
        />
      </View>
      <View style={{width: '100%', height: 1, marginTop: 10}} />
    </SkeletonPlaceholder>
  );
};

export default SkeletonItemMoney;

const styles = StyleSheet.create({});
