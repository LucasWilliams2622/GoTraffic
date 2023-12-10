import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import FastImage from 'react-native-fast-image';
import {COLOR, ICON} from '../../constants/Theme';
import {Code} from 'native-base';
import {appStyle, windowHeight, windowWidth} from '../../constants/AppStyle';
import Modal from 'react-native-modal';
import Moment from 'moment';
const ItemNotification = props => {
  const {data, handleRead, imagelogo} = props;
  const {image, title, content, time, poster, id} = data;
  const [isModalVisible, setModalVisible] = useState(false);
  const isImageUrlValid = /^https?:\/\/.*\.(png|jpg)$/i.test(data.image);
  const toggleModal = () => {
    handleRead(data.id);
    setModalVisible(!isModalVisible);
  };
  let color;
  if (data.isRead == 0) {
    color = '#f0faff';
  } else {
    color = 'white';
  }

  return (
    <TouchableOpacity
      style={[styles.container, {backgroundColor: color}]}
      onPress={toggleModal}>
      <View style={[{alignSelf: 'flex-start'}]}>
        <FastImage
          style={styles.logo}
          resizeMode={'stretch'}
          source={imagelogo}
        />
      </View>
      <View
        style={{
          justifyContent: 'space-between',
          width: '90%',
          paddingLeft: 12,
        }}
        numberOfLines={2}>
        <View style={{flex: 1}}>
          <Text style={appStyle.text16Bold}>{title}</Text>
          <Text style={[appStyle.text12, {lineHeight: 20}]} numberOfLines={2}>
            {content}
          </Text>
        </View>
        <View style={{height: 15}}>
          <Text style={[appStyle.text12, {color: '#787878', marginTop: 0}]}>
            {Moment(data.createdAt).format('HH:mm, DD/MM ')}
          </Text>
        </View>
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
              source={{uri: data.image}}
            />
            <Text
              style={[
                appStyle.text16Bold,
                {width: '90%', textAlign: 'center', marginTop: 10},
              ]}>
              ⚡️ {title.toUpperCase()}
            </Text>
            <View style={styles.line} />
            <Text
              style={[
                [appStyle.text16, {lineHeight: 30, paddingHorizontal: 10}],
              ]}>
              {content}
            </Text>
            <Text
              style={[
                [appStyle.text14, {lineHeight: 30, paddingHorizontal: 10}],
              ]}>
              Hi vọng bạn sẽ có nhiều trải nghiệp tuyệt vời cùng Go Traffic
            </Text>
            <View
              style={{
                height: 50,
                width: '100%',
                backgroundColor: '#d2eaf5',
                justifyContent: 'center',
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
              }}>
              <Text
                style={[
                  [
                    appStyle.text14,
                    {
                      lineHeight: 30,
                      paddingHorizontal: 20,
                      fontStyle: 'bold',
                      color: '#219EBC',
                      textAlign: 'center',
                    },
                  ],
                ]}>
                Cảm ơn đã sử dụng dịch vụ GoTraffic
              </Text>
            </View>

            <Pressable
              style={styles.buttonClose}
              onPress={() => setModalVisible(!isModalVisible)}>
              <FastImage
                source={ICON.Close}
                style={[appStyle.iconMedium, {marginTop: 7}]}
                tintColor={COLOR.white}
              />
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
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin:-21,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding:20
  },
  modalView: {
    justifyContent: 'space-between',
    width: '100%',
    height: windowHeight * 0.65,
   
    marginTop: 80,
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
    borderRadius: 10,
  },
  line: {
    height: 2,
    width: '40%',
    backgroundColor: COLOR.fifth,
    marginBottom: 16,
    marginTop: 16,
  },
  buttonClose: {
    borderRadius: 50,
    backgroundColor: '#8e8e8e',
    width: 32,
    height: 32,
    position: 'absolute',
    top: 5,
    right: 5,
    alignItems: 'center',
  },
});
