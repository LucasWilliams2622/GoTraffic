import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useMemo} from 'react';
import {COLOR} from '../../../constants/Theme';
import FeaturedLocationFrame from './FeaturedLocationFrame';
import {convertTotalNumber} from '../../../utils/utils';
import {appStyle} from '../../../constants/AppStyle';
import {FeaturedLocationProps} from '../../../types';
import {useNavigation} from '@react-navigation/native';

const FeaturedLocation = ({title, image, totalCar}: FeaturedLocationProps) => {
  const formattedTotalCar = useMemo(
    () => convertTotalNumber(totalCar),
    [totalCar],
  );
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{
        marginRight: 20,
      }}
      onPress={() => {
        navigation.navigate('ListCarCity', {title: title});
      }}>
      <View style={styles.textWrapper}>
        <Text style={[appStyle.text16Bold, {color: COLOR.white}]}>{title}</Text>
        <Text style={{color: COLOR.white}}>{formattedTotalCar} xe</Text>
      </View>
      <FeaturedLocationFrame img={image} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textWrapper: {
    position: 'absolute',
    bottom: 45,
    left: 20,
    zIndex: 1,
  },
});

export default FeaturedLocation;
