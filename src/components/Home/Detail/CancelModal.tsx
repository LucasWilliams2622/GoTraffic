import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {COLOR} from '../../../constants/Theme';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {Row} from 'native-base';

const Cell: React.FC<{
  text: string;
  iconName: string;
  iconColor?: string;
}> = ({text, iconName, iconColor}) => (
  <View style={{alignItems: 'center'}}>
    <Icon
      name={iconName}
      size={20}
      color={iconColor}
      solid
      style={{marginBottom: 10}}
    />
    <Text style={{textAlign: 'center'}}>{text}</Text>
  </View>
);

export const CancelModal: React.FC = ({isModalVisible, toggle}: any) => {
  const [contentHeight, setContentHeight] = useState(0);

  const onContentLayout = (event: any) => {
    const {height} = event.nativeEvent.layout;
    setContentHeight(height);
  };

  const data = [
    [
      <Text style={{fontWeight: 'bold'}}>Thời Điểm Hủy Chuyến</Text>,
      <Text style={{fontWeight: 'bold', textAlign: 'center'}}>
        Khách Thuê Hủy Chuyến
      </Text>,
      <Text style={{fontWeight: 'bold', textAlign: 'center'}}>
        Chủ Xe Hủy Chuyến
      </Text>,
    ],
    [
      <Text>Trong Vòng 1h Sau Đặt Cọc</Text>,
      <Cell
        text="Hoàn tiền 100%"
        iconName="circle-check"
        iconColor={COLOR.green}
      />,
      <Cell
        text="Không đền cọc (Đánh giá hệ thống 3*)"
        iconName="circle-check"
        iconColor={COLOR.green}
      />,
    ],
    [
      <Text>Trước Chuyến Đi {'>'}7 Ngày</Text>,
      <Cell
        text="Hoàn tiền 70%"
        iconName="circle-check"
        iconColor={COLOR.green}
      />,
      <Cell
        text="Đền cọc 30% (Đánh giá hệ thống 3*)"
        iconName="circle-check"
        iconColor={COLOR.green}
      />,
    ],
    [
      <Text>Trong Vòng 7 Ngày Trước Chuyến Đi</Text>,
      <Cell
        text="Không hoàn tiền"
        iconName="circle-xmark"
        iconColor={COLOR.red}
      />,
      ,
      <Cell
        text="Đền cọc 100% (Đánh giá hệ thống 2*)"
        iconName="circle-xmark"
        iconColor={COLOR.red}
      />,
    ],
  ];

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
          Chính sách huỷ chuyến
        </Text>
        <View style={styles.table}>
          {data.map((row, i) => (
            <View key={i} style={styles.row}>
              {row.map((cell, j) => (
                <View key={j} style={styles.cell}>
                  {cell}
                </View>
              ))}
            </View>
          ))}
        </View>
        <Row style={{alignItems: 'center'}}>
          <Icon name="circle-info" size={20} color={COLOR.black} />
          <Text style={{marginLeft: 10, fontSize: 20, fontWeight: 'bold'}}>
            Lưu ý:
          </Text>
        </Row>
        <Text style={{marginTop: 10, fontSize: 16}}>
          * Khách thuê không nhận xe sẽ không được hoàn cọc
        </Text>
        <Text style={{marginTop: 10, fontSize: 16}}>
          * Chủ xe không giao xe sẽ đền 100% tiền cọc
        </Text>
        <Text style={{marginTop: 10, fontSize: 16}}>
          * Tiền cọc sẽ được hoàn trả trong vòng 1-3 ngày làm việc
        </Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  table: {
    marginTop: 20,
    marginBottom: 20,
    borderWidth: 0.6,
    borderRadius: 20,
    overflow: 'hidden',
    borderColor: COLOR.borderColor,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    borderWidth: 0.3,
    padding: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: COLOR.borderColor,
  },
});
