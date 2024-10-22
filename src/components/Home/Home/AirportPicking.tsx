import {StyleSheet, Text, View} from 'react-native';
import React, {useMemo} from 'react';
import FastImage from 'react-native-fast-image';
import {convertTotalNumber} from '../../../utils/utils';
import {appStyle} from '../../../constants/AppStyle';
import {AirportPickingProps} from '../../../types';

const AirportPicking = ({title, image, totalCar}: AirportPickingProps) => {
  const formattedTotalCar = useMemo(
    () => convertTotalNumber(totalCar),
    [totalCar],
  );
  return (
    <View style={{marginRight: 20}}>
      <View style={{alignItems: 'center'}}>
        <FastImage
          source={{uri: image}}
          style={{height: 120, width: 120, borderRadius: 60}}
        />
        <Text style={[appStyle.text16Bold, {marginTop: 10, marginBottom: 5}]}>
          {title}
        </Text>
        <Text>{formattedTotalCar} xe</Text>
      </View>
    </View>
  );
};

export default AirportPicking;

const styles = StyleSheet.create({});
