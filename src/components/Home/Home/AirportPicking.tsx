import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useMemo, useState} from 'react';
import FastImage from 'react-native-fast-image';
import {convertTotalNumber} from '../../../utils/utils';
import {appStyle} from '../../../constants/AppStyle';
import {AirportPickingProps} from '../../../types';
import {useNavigation} from '@react-navigation/native';
import ReactNativeModal from 'react-native-modal';
import FindingCar from '../../../screens/Main/HomeTab/FindingCar';

const AirportPicking = ({
  title,
  image,
  totalCar,
  selectedTime,
  setSelectedTime,
}: AirportPickingProps) => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const formattedTotalCar = useMemo(
    () => convertTotalNumber(totalCar),
    [totalCar],
  );
  return (
    <View>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={{marginRight: 20}}>
        <View style={{alignItems: 'center'}}>
          <FastImage
            source={{uri: image}}
            resizeMode="stretch"
            style={{height: 120, width: 120, borderRadius: 60}}
          />
          <Text style={[appStyle.text16Bold, {marginTop: 10, marginBottom: 5}]}>
            {title}
          </Text>
          <Text>{formattedTotalCar} xe</Text>
        </View>
      </TouchableOpacity>
      <ReactNativeModal
        isVisible={isModalVisible}
        style={{margin: 0, display: 'flex'}}>
        <FindingCar
          title={title}
          close={() => setModalVisible(false)}
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
        />
      </ReactNativeModal>
    </View>
  );
};

export default AirportPicking;

const styles = StyleSheet.create({});
