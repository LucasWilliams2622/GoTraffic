import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useMemo, useState} from 'react';
import {COLOR} from '../../../constants/Theme';
import FeaturedLocationFrame from './FeaturedLocationFrame';
import {convertTotalNumber} from '../../../utils/utils';
import {appStyle} from '../../../constants/AppStyle';
import {FeaturedLocationProps} from '../../../types';
import {useNavigation} from '@react-navigation/native';
import FindingCar from '../../../screens/Main/HomeTab/FindingCar';
import ReactNativeModal from 'react-native-modal';

const FeaturedLocation = ({
  title,
  image,
  totalCar,
  selectedTime,
  setSelectedTime,
}: FeaturedLocationProps) => {
  const formattedTotalCar = useMemo(
    () => convertTotalNumber(totalCar),
    [totalCar],
  );
  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{
        marginRight: 20,
      }}
      onPress={() => {
        setModalVisible(true);
      }}>
      <View style={styles.textWrapper}>
        <Text style={[appStyle.text16Bold, {color: COLOR.white}]}>{title}</Text>
        <Text style={{color: COLOR.white}}>{formattedTotalCar} xe</Text>
      </View>
      <FeaturedLocationFrame img={image} />
      <ReactNativeModal
        isVisible={isModalVisible}
        style={{margin: 0, display: 'flex'}}>
        <FindingCar
          location={title}
          close={() => setModalVisible(false)}
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
        />
      </ReactNativeModal>
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
