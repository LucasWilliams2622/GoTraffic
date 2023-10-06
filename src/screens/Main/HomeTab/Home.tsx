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

const Home = () => {
  return (
    <View style={appStyle.container}>
      {/* User name and point */}
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

      <View>
        <Row>
          <TouchableOpacity>
            <Row>
              <Icon name="car" color={COLOR.secondary} size={16}></Icon>
              <Text>Xe tự lái</Text>
            </Row>
          </TouchableOpacity>
          <TouchableOpacity>
            <Row>
              <SteeringWheel color={COLOR.secondary} />
              <Text>Xe có tài xế</Text>
            </Row>
          </TouchableOpacity>
        </Row>

        <View>
          <View>
            <View>
              <Row>
                <Icon
                  name="map-marker"
                  color={COLOR.secondary}
                  size={23}></Icon>
                <Text>Địa điểm</Text>
              </Row>
            </View>
            <AppInput placeholder="Nhập địa điểm" />
          </View>
          <View>
            <View>
              <Row>
                <Icon name="calendar" color={COLOR.secondary} size={23}></Icon>
                <Text>Thời gian thuê</Text>
              </Row>
            </View>
            <AppInput
              placeholder="Nhập thời gian thuê"
              value="21:00, 01/10 - 20:00, 02/10"
            />
          </View>
          <AppButton title="Tìm xe" color={COLOR.secondary} />
        </View>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  headBg: {
    backgroundColor: COLOR.secondary,
    width: '100%',
    height: '30%',
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
