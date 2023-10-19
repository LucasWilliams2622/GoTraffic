import {Row} from 'native-base';
import React from 'react';
import {Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {appStyle} from '../../../constants/AppStyle';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {COLOR} from '../../../constants/Theme';
import {CarCardItemStyles} from '../Home/CarCardItem';

export type Owner = {
  avatar: string;
  name: string;
  rating: number;
  responseRate: string;
  acceptRate: string;
  responseIn: number;
};

interface OwnerInfoProps {
  owner: Owner;
  rating: number;
  totalRide: number;
}

export const OwnerInfo: React.FC<OwnerInfoProps> = ({
  owner,
  rating,
  totalRide,
}) => {
  return (
    <>
      <Row style={{marginTop: 10}}>
        <View style={{marginRight: 10}}>
          <FastImage source={{uri: owner.avatar}} style={appStyle.avatar} />
        </View>
        <View style={{flex: 1, width: '100%'}}>
          <Text>{owner.name}</Text>
          <Row style={{alignItems: 'center'}}>
            <Icon name="star" color={COLOR.third} size={12} solid />
            <Text style={[CarCardItemStyles.ratingText, {marginLeft: 5}]}>
              {rating}
            </Text>
            <Text
              style={[CarCardItemStyles.dot, {marginLeft: 5, marginRight: 5}]}>
              ·
            </Text>
            <Icon name="suitcase" color={COLOR.fifth} size={12} solid />
            <Text style={[CarCardItemStyles.ratingText, {marginLeft: 5}]}>
              {totalRide} chuyến
            </Text>
          </Row>
          <Text>
            Thông tin liên hệ sẽ hiển thị sau khi đặt cọc trên ứng dụng
          </Text>
        </View>
      </Row>
      <View style={[CarCardItemStyles.separator, {marginTop: 20}]} />
      <Row style={{justifyContent: 'space-evenly'}}>
        <View>
          <Text>Tỉ lệ phản hồi</Text>
          <Text style={{color: COLOR.black, fontWeight: 'bold', marginTop: 5}}>
            {owner.responseRate}
          </Text>
        </View>
        <View>
          <Text>Tỉ lệ đồng ý</Text>
          <Text style={{color: COLOR.black, fontWeight: 'bold', marginTop: 5}}>
            {owner.acceptRate}
          </Text>
        </View>
        <View>
          <Text>Phản hồi trong vòng</Text>
          <Text style={{color: COLOR.black, fontWeight: 'bold', marginTop: 5}}>
            {owner.responseIn} phút
          </Text>
        </View>
      </Row>
    </>
  );
};
