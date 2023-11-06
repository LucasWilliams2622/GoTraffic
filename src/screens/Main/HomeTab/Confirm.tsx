import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React from 'react';
import { COLOR } from '../../../constants/Theme';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { Car } from '../../../types';
import { Row } from 'native-base';
import FastImage from 'react-native-fast-image';
import { CarCardItemStyles } from '../../../components/Home/Home/CarCardItem';


const Confirm: React.FC<{ closeModal: any; car: Car }> = ({ closeModal, car }) => {

  return (
    <View style={{ backgroundColor: COLOR.white, flex: 1 }}>
      <SafeAreaView>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Pressable
            onPress={closeModal}
            style={[styles.closeBtn, { position: 'absolute', left: 20 }]}>
            <Icon name="x" size={20} color={COLOR.black} />
          </Pressable>
          <Text style={{ fontSize: 22 }}>Xác nhận đặt xe</Text>
        </View>
        <ScrollView style={{ paddingHorizontal: 15, marginTop: 10 }}>
          <Row>
            <FastImage
              source={{ uri: car.images[0] }}
              style={{ height: 100, width: 150, borderRadius: 10 }}
            />
            <View
              style={{
                marginLeft: 15,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
              <View>
                <Text style={{ fontSize: 18 }}>{car.title.toUpperCase()}</Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: COLOR.placeholder,
                    marginTop: 10,
                  }}>
                  Biển số xe: {car.licensePlate}
                </Text>
              </View>

              <Row style={{ alignItems: 'center', marginTop: 20 }}>
                <Icon name="star" color={COLOR.third} size={12} solid />
                <Text style={[CarCardItemStyles.ratingText, { marginLeft: 5 }]}>
                  {car.owner.rating}
                </Text>
                <Text
                  style={[
                    CarCardItemStyles.dot,
                    { marginLeft: 5, marginRight: 5 },
                  ]}>
                  ·
                </Text>
                <Icon name="suitcase" color={COLOR.fifth} size={12} solid />
                <Text style={[CarCardItemStyles.ratingText, { marginLeft: 5 }]}>
                  {car.totalRide} chuyến
                </Text>
              </Row>
            </View>
          </Row>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Confirm;

const styles = StyleSheet.create({
  closeBtn: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 30,
    width: 40,
    height: 40,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
