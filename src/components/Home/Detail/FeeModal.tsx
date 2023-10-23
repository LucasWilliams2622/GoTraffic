import React, {useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {COLOR} from '../../../constants/Theme';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {FlatList, Row} from 'native-base';
import {FeeData} from '../../../screens/Main/HomeTab/data/data';

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
