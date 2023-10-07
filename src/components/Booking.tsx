import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {COLOR} from '../constants/Theme';
import {Row, Radio, HStack} from 'native-base';
import AppButton from './AppButton';
import SteeringWheel from '../assets/icon/ic_steering_wheel';

const Booking = () => {
  const [isSelfDriving, setIsSelfDriving] = useState(true);

  return (
    <View style={styles.outerContainer}>
      <View style={styles.heroBtns}>
        <Row style={styles.alignCenter}>
          <Button
            isSelfDriving={isSelfDriving}
            setIsSelfDriving={setIsSelfDriving}
            value={true}
            side="left">
            <Icon
              name="car"
              color={isSelfDriving === true ? COLOR.white : COLOR.forth}
              size={16}
            />
            <Text
              style={[getTextStyle(isSelfDriving === true), {marginLeft: 10}]}>
              Xe tự lái
            </Text>
          </Button>
          <Button
            isSelfDriving={isSelfDriving}
            setIsSelfDriving={setIsSelfDriving}
            value={false}
            side="right">
            <SteeringWheel
              color={isSelfDriving === false ? COLOR.white : COLOR.forth}
            />
            <Text
              style={[getTextStyle(isSelfDriving === false), {marginLeft: 10}]}>
              Xe có tài xế
            </Text>
          </Button>
        </Row>
      </View>
      <View style={styles.contentWrapper}>
        <View style={styles.contentContainer}>
          {isSelfDriving === true ? <SelfDrivingView /> : <DriverView />}

          <AppButton title="Tìm xe" backgroundColor={COLOR.fifth} />
        </View>
      </View>
    </View>
  );
};

const getTextStyle = isActive =>
  isActive ? {color: COLOR.white} : {color: COLOR.forth};

const Button = ({isSelfDriving, setIsSelfDriving, value, children, side}) => (
  <TouchableOpacity
    style={[
      isSelfDriving === value
        ? {backgroundColor: COLOR.fifth}
        : {backgroundColor: COLOR.secondary},
      side === 'left' ? {borderTopLeftRadius: 34} : {borderTopRightRadius: 34},
    ]}
    onPress={() => setIsSelfDriving(value)}>
    <Row style={styles.buttonContent}>{children}</Row>
  </TouchableOpacity>
);

const SelfDrivingView = () => (
  <View>
    <View>
      <Row style={{alignItems: 'center', marginBottom: 10}}>
        <Icon name="location-dot" color={COLOR.borderColor} size={15} />
        <Text style={{color: COLOR.borderColor, marginLeft: 10}}>Địa điểm</Text>
      </Row>
      <TextInput placeholder="Nhập địa điểm" style={styles.heroInput} />
    </View>
    <View style={{marginBottom: 35}}>
      <Row
        style={{
          alignItems: 'center',
          marginBottom: 10,
          marginTop: 20,
        }}>
        <Icon name="calendar" color={COLOR.borderColor} size={15} />
        <Text style={{color: COLOR.borderColor, marginLeft: 10}}>
          Thời gian thuê
        </Text>
      </Row>
      <TextInput
        placeholder="Nhập thời gian thuê"
        value="21:00, 01/10 - 20:00, 02/10"
        style={[styles.heroInput]}
      />
    </View>
  </View>
);

const DriverView = () => {
  const [tripType, setTripType] = useState('lien-tinh');
  return (
    <View>
      <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 10}}>
        Lộ trình
      </Text>
      <View style={{alignItems: 'center'}}>
        <Radio.Group
          name="myRadioGroup"
          value={tripType}
          onChange={nextValue => {
            setTripType(nextValue);
          }}>
          <HStack space={2} alignItems="center">
            <Radio value="lien-tinh" my="1" size="sm">
              <Text style={{fontSize: 12}}>Liên tỉnh</Text>
            </Radio>
            <Radio value="lien-tinh-1-chieu" my="1" size="sm">
              <Text style={{fontSize: 12}}>Liên tỉnh (1 chiều)</Text>
            </Radio>
            <Radio value="noi-thanh" my="1" size="sm">
              <Text style={{fontSize: 12}}>Nội thành</Text>
            </Radio>
          </HStack>
        </Radio.Group>
      </View>
      <Row style={{alignItems: 'center', marginTop: 10, marginBottom: 10}}>
        <Text style={{marginRight: 5}}>Di chuyển trong thành phố</Text>
        <Icon name="circle-question" color={COLOR.borderColor} size={20} />
      </Row>
      <View>
        <Row style={{alignItems: 'center', marginBottom: 10}}>
          <Icon name="map-pin" color={COLOR.borderColor} size={15} />
          <Text style={{color: COLOR.borderColor, marginLeft: 10}}>
            Điểm đón
          </Text>
        </Row>
        <TextInput placeholder="Nhập điểm đón" style={styles.heroInput} />
      </View>
      <View style={{marginBottom: 15}}>
        <Row
          style={{
            alignItems: 'center',
            marginBottom: 10,
            marginTop: 20,
          }}>
          <Icon name="location-dot" color={COLOR.borderColor} size={15} />
          <Text style={{color: COLOR.borderColor, marginLeft: 10}}>
            Địa điểm
          </Text>
        </Row>
        <TextInput placeholder="Nhập địa điểm" style={[styles.heroInput]} />
      </View>
      <Text style={{fontSize: 16, fontWeight: 'bold'}}>Thời gian</Text>
      <View style={{marginBottom: 35}}>
        <Row
          style={{
            alignItems: 'center',
            marginBottom: 10,
            marginTop: 20,
          }}>
          <Icon name="calendar" color={COLOR.borderColor} size={20} />
          <Text style={{color: COLOR.borderColor, marginLeft: 10}}>
            Thời gian thuê
          </Text>
        </Row>
        <TextInput
          placeholder="Nhập thời gian thuê"
          value="21:00, 01/10 - 20:00, 02/10"
          style={[styles.heroInput]}
        />
      </View>
    </View>
  );
};

export default Booking;

const styles = StyleSheet.create({
  outerContainer: {
    marginTop: -100,
    alignSelf: 'center',
  },
  heroBtns: {
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLOR.black,
    shadowRadius: 4.65,
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 4},
    elevation: 5,
    width: '100%',
  },
  buttonContent: {
    paddingVertical: 23,
    paddingHorizontal: 44,
  },
  contentWrapper: {
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: COLOR.black,
    shadowRadius: 4.65,
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 4},
    elevation: 5,
  },
  alignCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    // backgroundColor: COLOR.black,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 25,
    width: '100%',
    backgroundColor: COLOR.white,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  heroInput: {
    paddingVertical: 10,
    paddingLeft: 25,
    color: COLOR.black,
    fontWeight: 'bold',
    borderBottomColor: COLOR.placeholder10,
    borderBottomWidth: 0.5,
  },
});
