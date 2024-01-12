import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';


const SkeletonItemNoti = () => {
  return (
    <SkeletonPlaceholder>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 20,
          paddingHorizontal: 14,
        }}>
        <View style={{width: 50, height: 50, borderRadius: 50}} />
        <View style={{marginLeft: 20}}>
          <View style={{width: 180, height: 20, borderRadius: 4}} />
          <View
            style={{
              marginTop: 6,
              width: 300,
              height: 20,
              borderRadius: 4,
            }}
          />
        </View>
      </View>
    </SkeletonPlaceholder>
  );
};

export default SkeletonItemNoti;

const styles = StyleSheet.create({});
