import {View, Text, StyleSheet} from 'react-native';
import React, {useMemo} from 'react';
import {COLOR} from '../../../constants/Theme';
import FeaturedLocationFrame from './FeaturedLocationFrame';
import {convertTotalNumber} from '../../../utils/utils';
import {appStyle} from '../../../constants/AppStyle';

interface FeaturedLocationProps {
  id: number;
  title: string;
  image: string;
  totalCar: number;
}

const FeaturedLocation = ({title, image, totalCar}: FeaturedLocationProps) => {
  const formattedTotalCar = useMemo(
    () => convertTotalNumber(totalCar),
    [totalCar],
  );
  return (
    <View
      style={{
        marginRight: 20,
      }}>
      <View style={styles.textWrapper}>
        <Text style={[appStyle.text16Bold, {color: COLOR.white}]}>{title}</Text>
        <Text style={{color: COLOR.white}}>{formattedTotalCar} xe</Text>
      </View>

      <FeaturedLocationFrame color={COLOR.fifth} img={image} />
    </View>
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
