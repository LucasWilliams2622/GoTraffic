import {StyleSheet, Text, View, TouchableOpacity, Modal} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {COLOR, ICON} from '../../../constants/Theme';
import {appStyle} from '../../../constants/AppStyle';

const SuccessModal = ({isVisible, onNavigate}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View style={styles.modalCenteredContainer}>
        <View style={styles.modalSuccessBox}>
          <FastImage style={{width: 60, height: 60}} source={ICON.Done} />
          <View>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 24,
                marginTop: 5,
                fontWeight: '500',
                color: '#0E3B65',
              }}>
              Thành công!
            </Text>
            <Text style={{textAlign: 'center', fontSize: 16, marginTop: 5}}>
              Bạn đã thuê được xe
            </Text>
          </View>
          <TouchableOpacity
            style={{
              width: '90%',
              height: 40,
              backgroundColor: COLOR.lightBlue,
              borderRadius: 8,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}
            onPress={onNavigate}>
            <Text style={appStyle.text16}>Đóng</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SuccessModal;

const styles = StyleSheet.create({
  modalCenteredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalSuccessBox: {
    backgroundColor: 'white',
    width: '80%',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
