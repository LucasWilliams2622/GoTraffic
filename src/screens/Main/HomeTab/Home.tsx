import {
  Image,
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import AutoHeightImage from 'react-native-auto-height-image';
import {COLOR, ICON} from '../../../constants/Theme';
import {appStyle} from '../../../constants/AppStyle';
import {Row, Column} from 'native-base';
import AppInput from '../../../components/AppInput';
import AppButton from '../../../components/AppButton';
import SteeringWheel from '../../../assets/icon/ic_steering_wheel';
import Booking from '../../../components/Booking';

const Home = () => {
  return (
    <View style={appStyle.container}>
      <View style={[styles.headBg]}>
        <Row style={{alignItems: 'center', marginTop: 100, marginLeft: 15}}>
          <Column style={[styles.iconBG, {marginRight: 10}]}>
            <Icon name="user" color={COLOR.forth} size={23}></Icon>
          </Column>
          <Column>
            <Text style={appStyle.text16Bold}>Lê Hoàng Gia Khánh</Text>
            <Row style={{alignItems: 'center'}}>
              <Icon
                name="star"
                color={COLOR.third}
                style={{marginRight: 5}}></Icon>
              <Text style={appStyle.text12Bold}>Điểm thưởng</Text>
            </Row>
          </Column>
        </Row>
      </View>
      <Booking />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  headBg: {
    backgroundColor: COLOR.secondary,
    width: '100%',
    height: '35%',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },

  iconBG: {
    backgroundColor: COLOR.white,
    width: 40,
    height: 40,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
