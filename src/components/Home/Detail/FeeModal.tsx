import React, {useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {COLOR} from '../../../constants/Theme';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {FlatList, Row} from 'native-base';

const FeeItem: React.FC<{
  fee_name: string;
  fee_amount: string;
  fee_description: string;
}> = ({fee_name, fee_amount, fee_description}) => {
  return (
    <View style={{marginTop: 20}}>
      <Row style={{justifyContent: 'space-between'}}>
        <Text style={{fontWeight: 'bold'}}>{fee_name}</Text>
        <Text style={{fontWeight: 'bold'}}>{fee_amount}</Text>
      </Row>
      <Text style={{marginTop: 5}}>{fee_description}</Text>
    </View>
  );
};

const FeeData = [
  {
    fee_name: 'Phí vượt giới hạn',
    fee_amount: '5 000đ/km',
    fee_description:
      'Phụ phí phát sinh nếu lộ trình di chuyển vượt quá 400km khi thuê xe 1 ngày',
  },
  {
    fee_name: 'Phí quá giờ',
    fee_amount: '70 000đ/giờ',
    fee_description:
      'Phụ phí phát sinh nếu hoàn trả xe trễ giờ. Trường hợp trễ quá 5 giờ, phụ phí thêm 1 ngày thuê',
  },
  {
    fee_name: 'Phí vệ sinh',
    fee_amount: '80 000đ',
    fee_description:
      'Phụ phí phát sinh khi xe hoàn trả không đảm bảo vệ sinh (nhiêu vêt bẩn, bùn cát, sinh lây ...)',
  },
  {
    fee_name: 'Phí khử mùi',
    fee_amount: '200 000đ',
    fee_description:
      'Phụ phí phát sinh khi xe hoàn trả bị ám mùi khó chịu (mùi thuốc lá, thực phẩm nặng mùi...)',
  },
];

export const FeeModal: React.FC = ({isModalVisible, toggle}: any) => {
  const [contentHeight, setContentHeight] = useState(0);

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
          Phụ phí có thể phát sinh
        </Text>
        <FlatList
          data={FeeData}
          renderItem={({item}) => (
            <FeeItem
              fee_name={item.fee_name}
              fee_amount={item.fee_amount}
              fee_description={item.fee_description}
            />
          )}
        />
      </View>
    </Modal>
  );
};
