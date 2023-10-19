import {Radio, Row} from 'native-base';
import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {appStyle} from '../../../constants/AppStyle';
import {COLOR} from '../../../constants/Theme';
import {currentDateString, returnDateString} from '../../../utils/utils';

type TimeAndPlacePickupProps = {
  navigation: any;
  location: string;
};

export const TimeAndPlacePickup = ({
  navigation,
  location,
}: TimeAndPlacePickupProps) => {
  const [receiveCarLocation, setReceiveCarLocation] =
    useState<string>('atCarLocation');
  return (
    <View>
      <View style={styles.timeAndPlacePickupContainer}>
        <Text style={[appStyle.text16Bold, {marginBottom: 20}]}>
          Thời gian thuê xe
        </Text>
        <Pressable
          style={styles.timeAndPlacePickupPressable}
          onPress={() => navigation.navigate('TimePicking')}>
          <Row style={{justifyContent: 'space-evenly'}}>
            <View>
              <Text style={{color: COLOR.borderColor, marginBottom: 5}}>
                Nhận xe
              </Text>
              <Text style={{fontSize: 13.5, fontWeight: 'bold'}}>
                {currentDateString}
              </Text>
            </View>
            <View>
              <Text style={{color: COLOR.borderColor, marginBottom: 5}}>
                Trả xe
              </Text>
              <Text style={{fontSize: 13.5, fontWeight: 'bold'}}>
                {returnDateString}
              </Text>
            </View>
          </Row>
        </Pressable>
        <Text style={[appStyle.text16Bold, {marginBottom: 20}]}>
          Địa điểm giao nhận xe
        </Text>
        <Radio.Group
          name="receiveCarLocation"
          value={receiveCarLocation}
          onChange={nextValue => {
            setReceiveCarLocation(nextValue);
          }}>
          <Pressable
            onPress={() => setReceiveCarLocation('atCarLocation')}
            style={styles.timeAndPlacePickupPressable}>
            <Row style={{alignItems: 'flex-start'}}>
              <Radio
                value={'atCarLocation'}
                my="1"
                size="sm"
                style={{marginRight: 10}}
              />
              <View style={{flex: 1}}>
                <Row
                  style={{
                    marginTop: 3,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text>Tôi tự đến lấy xe</Text>
                  <Text
                    style={{
                      marginRight: 10,
                      fontSize: 15,
                      color: COLOR.fifth,
                    }}>
                    Miễn phí
                  </Text>
                </Row>
                <Text style={[appStyle.text14Bold, {marginTop: 10}]}>
                  {location}
                </Text>
                <Text style={{color: COLOR.placeholder, marginTop: 10}}>
                  Địa chỉ xe cụ thể sẽ được hiển thị sau khi đặt cọc thành công
                  trên ứng dụng
                </Text>
              </View>
            </Row>
          </Pressable>
          <Pressable
            onPress={() => setReceiveCarLocation('atUserLocation')}
            style={styles.timeAndPlacePickupPressable}>
            <Row style={{alignItems: 'flex-start'}}>
              <Radio
                value={'atUserLocation'}
                my="1"
                size="sm"
                style={{marginRight: 10}}
              />
              <View style={{flex: 1}}>
                <Row
                  style={{
                    marginTop: 3,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text>Tôi muốn được giao xe tận nơi</Text>
                </Row>
                <Text style={{color: COLOR.placeholder, marginTop: 10}}>
                  Chủ xe sẽ giao và nhận xe đến địa chỉ cụ thể mà bạn lựa chọn
                </Text>
              </View>
            </Row>
          </Pressable>
        </Radio.Group>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  timeAndPlacePickupContainer: {
    backgroundColor: COLOR.grayBackGround,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 15,
  },
  timeAndPlacePickupPressable: {
    backgroundColor: COLOR.white,
    padding: 10,
    borderRadius: 10,
    flex: 1,
    width: '100%',
    marginTop: 15,
  },
});
