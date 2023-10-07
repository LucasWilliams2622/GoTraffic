import {
  Image,
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {COLOR, ICON} from '../constants/Theme';
import {Row, Column} from 'native-base';
import AppInput from './AppInput';
import AppButton from './AppButton';
import SteeringWheel from '../assets/icon/ic_steering_wheel';

const Booking = () => {
  return (
    <View style={styles.outerContainer}>
      <View style={styles.heroBtns}>
        <Row style={styles.alignCenter}>
          <TouchableOpacity
            style={{backgroundColor: COLOR.fifth, borderTopLeftRadius: 34}}>
            <Row
              style={{
                paddingVertical: 23,
                paddingHorizontal: 44,
              }}>
              <Icon name="car" color={COLOR.white} size={16} />
              <Text style={{color: COLOR.white, marginLeft: 10}}>
                Xe tự lái
              </Text>
            </Row>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: COLOR.secondary,
              borderTopRightRadius: 30,
            }}>
            <Row style={{paddingVertical: 23, paddingHorizontal: 44}}>
              <SteeringWheel color={COLOR.forth} />
              <Text style={{color: COLOR.forth, marginLeft: 10}}>
                Xe có tài xế
              </Text>
            </Row>
          </TouchableOpacity>
        </Row>

        <View style={styles.contentContainer}>
          <View>
            <Row style={{alignItems: 'center', marginBottom: 10}}>
              <Icon name="map-marker" color={COLOR.borderColor} size={23} />
              <Text style={{color: COLOR.borderColor, marginLeft: 10}}>
                Địa điểm
              </Text>
            </Row>
            <TextInput placeholder="Nhập địa điểm" style={styles.heroInput} />
          </View>
          <View style={{marginBottom: 35}}>
            <Row
              style={{alignItems: 'center', marginBottom: 10, marginTop: 20}}>
              <Icon name="calendar" color={COLOR.borderColor} size={20} />
              <Text style={{color: COLOR.borderColor, marginLeft: 10}}>
                Thời gian thuê
              </Text>
            </Row>
            <TextInput
              placeholder="Nhập thời gian thuê"
              value="21:00, 01/10 - 20:00, 02/10"
              style={[
                styles.heroInput,
                {color: COLOR.black, fontWeight: 'bold'},
              ]}
            />
          </View>

          <AppButton title="Tìm xe" backgroundColor={COLOR.fifth} />
        </View>
      </View>
    </View>
  );
};

export default Booking;

const styles = StyleSheet.create({
  outerContainer: {
    marginTop: -100,
    paddingHorizontal: 20,
    width: '90.3%',
    height: 340,
    alignSelf: 'center',
    backgroundColor: COLOR.white,
    borderRadius: 30,
    shadowColor: COLOR.black,
    shadowRadius: 4.65,
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 4},
    elevation: 5,
  },
  heroBtns: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alignCenter: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 25,
    height: 100,
  },
  heroInput: {
    height: 20,
    paddingVertical: 20,
    paddingLeft: 25,
    borderBottomColor: COLOR.placeholder10,
    borderBottomWidth: 0.5,
  },
});
