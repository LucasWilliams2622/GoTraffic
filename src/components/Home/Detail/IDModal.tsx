import React, {useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {COLOR} from '../../../constants/Theme';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {Row} from 'native-base';

export const IDModal: React.FC = ({isModalVisible, toggle}: any) => {
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
          Giấy tờ thuê xe
        </Text>
        <View>
          <Text style={{marginTop: 20, fontSize: 16, fontWeight: 'bold'}}>
            Bạn đã có CCCD gắn chip
          </Text>
          <Text style={{marginTop: 5, fontSize: 16}}>
            Giấy tờ thuê xe gồm có: {'\n'}- Giấy phép lái xe & CCCD (chủ xe đối
            chiếu và gửi lại bạn)
          </Text>
        </View>
        <View>
          <Text style={{marginTop: 20, fontSize: 16, fontWeight: 'bold'}}>
            Bạn chưa có CCCD gắn chip
          </Text>
          <Text style={{marginTop: 5, fontSize: 16}}>
            Giấy tờ thuê xe gồm có: {'\n'}- Giấy phép lái xe (chủ xe đối chiếu
            và gửi lại bạn) {'\n'}- Passport (chủ xe đối chiếu, giữ lại và hoàn
            trả khi bạn trả xe)
          </Text>
        </View>

        <Row style={{width: '100%', flexWrap: 'wrap'}}>
          <Text style={{marginTop: 20, fontSize: 16}}>
            <Text style={{fontWeight: 'bold'}}>Lưu ý:</Text> Khách thuê vui lòng
            chuẩn bị đầy đủ
            <Text style={{textDecorationLine: 'underline'}}> BẢN GỐC</Text> tất
            cả giây tờ thuê xe khi làm thủ tục nhận xe.
          </Text>
        </Row>
      </View>
    </Modal>
  );
};
