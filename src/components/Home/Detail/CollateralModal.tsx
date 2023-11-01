import React, {useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {COLOR} from '../../../constants/Theme';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {FlatList, Row} from 'native-base';

export const CollateralModal: React.FC = ({isModalVisible, toggle}: any) => {
  const [contentHeight, setContentHeight] = useState<number>(0);

  const onContentLayout = (event: any) => {
    const {height} = event.nativeEvent.layout;
    setContentHeight(height);
  };
  return (
    <Modal
      isVisible={isModalVisible}
      onBackdropPress={toggle}
      style={{
        margin: 0,
        justifyContent: 'flex-end',
      }}>
      <View
        onLayout={onContentLayout}
        style={{
          backgroundColor: COLOR.white,
          padding: 20,
          paddingBottom: 50,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}>
        <Pressable onPress={toggle}>
          <Icon name="x" size={20} color={COLOR.borderColor2} />
        </Pressable>
        <Text style={{marginTop: 20, fontSize: 20, fontWeight: 'bold'}}>
          Tài sản thế chấp
        </Text>
        <FlatList
          data={[
            {
              key: 'Bạn sẽ để lại tài sản thế chấp (tiền mặt/ chuyển khoản hoặc xe máy kèm cà vẹt gốc) cho chủ xe khi làm thủ tục nhận xe.',
            },
            {
              key: 'Chủ xe sẽ gửi lại tài sản thế chấp khi bạn hoàn trả xe theo như nguyên trạng ban đầu lúc nhận xe.',
            },
          ]}
          renderItem={({item}) => (
            <Row
              style={{
                marginTop: 10,
                alignItems: 'flex-start',
              }}>
              <Icon
                name="circle"
                size={10}
                color={COLOR.black}
                style={{marginTop: 3}}
              />
              <Text style={{marginLeft: 10}}>{item.key}</Text>
            </Row>
          )}
        />
      </View>
    </Modal>
  );
};
