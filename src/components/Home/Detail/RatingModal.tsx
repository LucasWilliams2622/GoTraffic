import React from 'react';
import {Dimensions, Pressable, ScrollView, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {COLOR} from '../../../constants/Theme';
import {Row} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {RatingItem} from './Rating';
import {RatingModalProps} from '../../../types';

export const RatingModal: React.FC<RatingModalProps> = ({
  isRatingModalVisible,
  toggleModal,
  rating,
}) => {
  return (
    <Modal
      isVisible={isRatingModalVisible}
      onSwipeComplete={toggleModal}
      swipeDirection="down"
      style={{
        margin: 0,
        justifyContent: 'flex-end',
      }}>
      <View
        style={{
          backgroundColor: COLOR.white,
          height: Dimensions.get('window').height * 0.9,
          width: '100%',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          padding: 10,
        }}>
        <Row
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 20,
            marginTop: 30,
          }}>
          <Pressable
            style={{
              padding: 10,
              width: 40,
              height: 40,
              borderRadius: 50,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 0.5,
              borderColor: COLOR.borderColor,
              position: 'absolute',
              top: 10,
              left: 10,
            }}
            onPress={toggleModal}>
            <Icon name="x" size={20} color={COLOR.borderColor2} />
          </Pressable>
          <Text style={{marginTop: 20, fontSize: 20, fontWeight: 'bold'}}>
            Đánh giá
          </Text>
        </Row>
        <ScrollView style={{flex: 1}}>
          {rating.map(item => (
            <RatingItem key={item.username} item={item} />
          ))}
        </ScrollView>
      </View>
    </Modal>
  );
};
