import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import FastImage from 'react-native-fast-image';
import {COLOR} from '../../constants/Theme';
import {Code} from 'native-base';
import {appStyle} from '../../constants/AppStyle';
import Modal from 'react-native-modal';

const ItemNotification = props => {
  const {data} = props;
  const {image, title, content, time, poster, id} = data;
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <TouchableOpacity style={styles.container} onPress={toggleModal}>
      <View style={[{alignSelf: 'flex-start'}]}>
        <FastImage style={styles.logo} resizeMode={'stretch'} source={image} />
      </View>
      <View
        style={{
          justifyContent: 'space-between',
          width: '80%',
          paddingLeft: 12,
        }}
        numberOfLines={2}>
        <Text style={appStyle.text16Bold}>{title}</Text>
        <Text style={[appStyle.text12, {paddingVertical: 8}]} numberOfLines={2}>
          {content}
        </Text>
        <Text style={[appStyle.text12, {color: '#787878'}]}>{time}</Text>
      </View>
      <Modal animationType="slide" transparent={true} visible={isModalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <FastImage
              style={styles.imageInModal}
              resizeMode={'stretch'}
              source={poster}
            />
            <Text
              style={[
                appStyle.text16Bold,
                {width: '90%', textAlign: 'center', marginTop: 10},
              ]}>
              ⚡️GIẢM 300K CHO LẦN ĐẦU THUÊ XE 7 CHỖ TẠI MIOTO
            </Text>
            <View style={styles.line} />
            <Text style={[[appStyle.text14,{lineHeight:30,paddingHorizontal:20}]]}>
              🚘Cần tìm chân ái để cả nhà mình di chuyển thoải mái? {'\n'}
              📲Mở Mioto,thuê ngay xe 7 chỗ rộng rãi. Nhà bao nhiêu người, Mioto
              cũng chiều đúng ý.{'\n'} 🌟Đặc biệt, Mioto tung ưu đãi giảm 300k
              cho lần đầu thuê xe 7 chỗ trên ứng dụng. Ưu đãi được áp dụng đến
              hết tháng 10. {'\n'}👨‍👩‍👧‍👦Mở Mioto chớp ngay ưu đãi. Thuê liền xe,
              rong chơi không cần nghĩ ngợi!
            </Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!isModalVisible)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </TouchableOpacity>
  );
};

export default ItemNotification;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0faff',
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: COLOR.borderColor,
  },
  logo: {
    width: 36,
    height: 36,
    alignSelf: 'flex-start',
  },
  imageInModal: {
    width: '100%',
    height: '30%',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  modalView: {
    width: '100%',
    height: '98%',
    margin: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 0,
    elevation: 5,
  },
  line: {
    height: 2,
    width: '30%',
    backgroundColor: COLOR.primary,
    marginBottom: 16,
    marginTop: 16,
  },
});
