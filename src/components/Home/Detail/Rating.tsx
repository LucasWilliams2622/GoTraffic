import {Row} from 'native-base';
import React from 'react';
import {appStyle} from '../../../constants/AppStyle';
import FastImage from 'react-native-fast-image';
import {Pressable, Text, View} from 'react-native';
import {COLOR} from '../../../constants/Theme';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {CarCardItemStyles} from '../Home/CarCardItem';

export type RatingItem = {
  avatar: string;
  username: string;
  date: string;
  rating: number;
  description?: string;
};

interface RatingProps {
  rating: RatingItem[];
  toggleModal: () => void;
}

interface RatingItemProps {
  item: RatingItem;
}

export const RatingItem: React.FC<RatingItemProps> = ({item}) => {
  return (
    <Row
      key={item.username}
      style={{
        flex: 1,
        width: '100%',
        justifyContent: 'space-between',
        padding: 10,
        borderColor: COLOR.borderColor,
        borderWidth: 0.5,
        borderRadius: 10,
        marginTop: 10,
      }}>
      <Row style={{alignItems: 'center'}}>
        <FastImage source={{uri: item.avatar}} style={appStyle.avatar} />
        <View style={{marginLeft: 10}}>
          <Text style={{color: COLOR.black}}>{item.username}</Text>
          <Text style={{color: COLOR.borderColor}}>{item.date}</Text>
        </View>
      </Row>
      <Row style={{alignItems: 'center'}}>
        <Icon name="star" color={COLOR.third} size={12} solid />
        <Text style={[CarCardItemStyles.ratingText, {marginLeft: 5}]}>
          {item.rating}
        </Text>
      </Row>
    </Row>
  );
};

export const Rating: React.FC<RatingProps> = ({rating, toggleModal}) => {
  return (
    <>
      {rating.slice(0, 2).map(item => (
        <RatingItem item={item} />
      ))}
      <Pressable
        onPress={toggleModal}
        style={{
          flex: 1,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 1,
          borderColor: COLOR.black,
          padding: 10,
          borderRadius: 10,
          marginTop: 10,
        }}>
        <Text style={{color: COLOR.black, fontWeight: 'bold', fontSize: 18}}>
          Xem thêm
        </Text>
      </Pressable>
    </>
  );
};
