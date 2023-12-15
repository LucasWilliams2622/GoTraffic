import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import { COLOR, ICON } from '../../../constants/Theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { appStyle, windowHeight, windowWidth } from '../../../constants/AppStyle';

const SuccessModal = ({ isVisible, onNavigate, title, text }) => {
  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <TouchableOpacity style={styles.modalBackdrop} onPress={onNavigate} />
        <View style={styles.modalContainer}>
          {/* <FastImage style={{ width: 60, height: 60 }} source={ICON.Done} /> */}
          <AntDesign name='checkcircle' size={60} color={COLOR.fifth}/>
          <View>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 24,
                marginTop: 5,
                fontWeight: '500',
                color: '#0E3B65',
              }}>
              {title}
            </Text>
            <Text style={{ textAlign: 'center', fontSize: 16, marginTop: 5 }}>
              {text}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              width: '90%',
              height: 40,
              backgroundColor: COLOR.fifth,
              borderRadius: 8,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}
            onPress={onNavigate}>
            <Text style={[appStyle.text16, {color:'white'}]}>Đóng</Text>
          </TouchableOpacity>
        </View>
    </Modal>
  );
};

export default SuccessModal;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [
      {translateX: -windowWidth * 0.45},
      {translateY: -windowHeight * 0.14},
    ],
    width: windowWidth * 0.9,
    height: windowHeight * 0.28,
    borderRadius: 12,
    paddingHorizontal: 25,
    paddingBottom: 10,
    alignSelf: 'center',
    alignItems: 'center',
    paddingTop: 30
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background color
    justifyContent: 'center',
    alignItems: 'center',
  },
});
