import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {COLOR, ICON} from '../constants/Theme';


const SkeletonItemCar = () => {
  return (
    <SkeletonPlaceholder>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 14,
          width: '94%',
          height: 120,
          borderRadius: 14,
          borderColor: COLOR.borderColor,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          margin: 10,
          padding: 20,
          borderWidth: 1,
          marginRight: 20,
        }}>
        <View
          style={{
            width: 110,
            height: 110,
            borderRadius: 10,
            alignSelf: 'center',
          }}
        />
        <View
          style={{
            marginLeft: 10,
            marginTop: -10,
            marginRight: 10,
          }}>
          <View
            style={{width: 180, height: 12, borderRadius: 4, marginTop: 0}}
          />
          <View
            style={{width: 180, height: 12, borderRadius: 4, marginTop: 10}}
          />
          <View
            style={{width: 180, height: 12, borderRadius: 4, marginTop: 10}}
          />
          <View
            style={{width: 180, height: 12, borderRadius: 4, marginTop: 10}}
          />
          <View
            style={{width: 100, height: 12, borderRadius: 4, marginTop: 3}}
          />
        </View>
      </View>
    </SkeletonPlaceholder>
  );
};

export default SkeletonItemCar;

const styles = StyleSheet.create({});
