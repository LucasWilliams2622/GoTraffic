import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {COLOR, ICON} from '../constants/Theme';
import FastImage from 'react-native-fast-image';
import {appStyle} from '../constants/AppStyle';

const SkeletonTrip = () => {
  return (
    <SkeletonPlaceholder>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 14,
          width: '100$',
          height: 125,
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
          marginBottom: 20,
          padding: 20,
          borderWidth: 1,
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
            marginRight: 20,
            marginTop: -10,
            justifyContent: 'space-between',
            paddingRight: 10,
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{width: 140, height: 14, borderRadius: 4}} />
            <View style={{flexDirection: 'row'}}>
              <FastImage
                source={ICON.SteeringWheel}
                style={appStyle.iconMedium}
              />
              <View
                style={{width: 40, height: 10, borderRadius: 4, marginLeft: 5}}
              />
            </View>
          </View>
          <View
            style={{width: 180, height: 12, borderRadius: 4, marginTop: 5}}
          />

          <View
            style={{width: 180, height: 12, borderRadius: 4, marginTop: 5}}
          />
          <View
            style={{width: 250, height: 1, borderRadius: 4, marginTop: 10}}
          />
          <View
            style={{width: 180, height: 12, borderRadius: 4, marginTop: 10}}
          />
          <View
            style={{width: 180, height: 12, borderRadius: 4, marginTop: 5}}
          />
        </View>
      </View>
    </SkeletonPlaceholder>
  );
};

export default SkeletonTrip;

const styles = StyleSheet.create({
});
