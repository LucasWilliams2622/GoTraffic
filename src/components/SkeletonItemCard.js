import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const SkeletonItemCard = () => {
  return (
    <SkeletonPlaceholder>
      <View
        style={{
          flexDirection: 'column',
          marginTop: 16,
          padding: 10,
          borderWidth: 1,
          margin: 10,
          borderRadius: 14,
        }}>
        <View
          style={{
            width: 360,
            height: 220,
            borderRadius: 14,
            alignSelf: 'center',
          }}
        />
        <View style={{marginTop: 10, flexDirection: 'row'}}>
          <View style={{width: 80, height: 26, borderRadius: 20}} />
          <View
            style={{width: 80, height: 26, borderRadius: 20, marginLeft: 10}}
          />
        </View>
        <View
          style={{
            width: 140,
            height: 16,
            borderRadius: 4,
            marginTop: 14,
          }}
        />
        <View
          style={{
            width: '96%',
            height: 16,
            borderRadius: 4,
            marginTop: 14,
          }}
        />
        <View style={{width: '100%', height: 1, marginTop: 10}} />
        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{width: 100, height: 10, borderRadius: 10}} />
          <View>
            <View style={{width: 100, height: 10, borderRadius: 10}} />
            <View
              style={{width: 100, height: 10, borderRadius: 10, marginTop: 5}}
            />
          </View>
        </View>
      </View>
    </SkeletonPlaceholder>
  );
};

export default SkeletonItemCard;

const styles = StyleSheet.create({});
