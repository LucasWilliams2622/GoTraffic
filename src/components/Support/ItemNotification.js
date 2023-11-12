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
  const isImageUrlValid = /^https?:\/\/.*\.(png|jpg)$/i.test(data.image);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <TouchableOpacity style={styles.container} onPress={toggleModal}>
      <View style={[{alignSelf: 'flex-start'}]}>
        {!isImageUrlValid ? (
          <FastImage
            style={styles.image}
            resizeMode="stretch"
            source={require('../../assets/image/logo-fb.png')}
          />
        ) : (
          <FastImage
            style={styles.logo}
            resizeMode={'stretch'}
            source={{uri: data?.image}}
          />
        )}
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
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <FastImage
              style={styles.imageInModal}
              resizeMode={'stretch'}
              source={require('../../assets/image/poster.jpg')}
            />
            <Text
              style={[
                appStyle.text16Bold,
                {width: '90%', textAlign: 'center', marginTop: 10},
              ]}>
              ⚡️ {title}
            </Text>
            <View style={styles.line} />
            <Text
              style={[
                [appStyle.text14, {lineHeight: 30, paddingHorizontal: 20}],
              ]}>
              {content}
            </Text>
            <Text
              style={[
                [appStyle.text14, {lineHeight: 30, paddingHorizontal: 20}],
              ]}>
              Hi vọng bạn sẽ có nhiều trải nghiệp tuyệt vời cùng Go Traffic
            </Text>
            <Text
              style={[
                [appStyle.text14, {lineHeight: 30, paddingHorizontal: 20,marginTop:50,fontStyle:'italic',color:COLOR.red}],
              ]}>
              Cảm ơn bạn đã đồng hành cùng chúng tôi !
            </Text>
            <Pressable
              style={styles.buttonClose}
              onPress={() => setModalVisible(!isModalVisible)}>
              <Text
                style={{fontSize: 15, textAlign: 'center', color: COLOR.black}}>
                X
              </Text>
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
    height: '40%',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  modalView: {
    justifyContent:'space-evenly',
    width: '100%',
    height: '80%',
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
  buttonClose: {
    borderRadius: 50,
    backgroundColor: COLOR.gray,
    width: 20,
    height: 20,
    position: 'absolute',
    top: 5,
    right: 5,
  },
});
