import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import FastImage from 'react-native-fast-image';
import { appStyle, windowHeight, windowWidth } from '../../constants/AppStyle';
import { COLOR } from '../../constants/Theme';
import Modal from 'react-native-modal';
import AppHeader from '../AppHeader';
import {  GuideType4, GuideType5, GuideType6 } from './GuideComponent';


const ItemInformation = (props) => {
  const { data } = props;
  const { id, title, image } = data;
  const [isVisible, setIsVisible] = useState(false);

  const toggleModal = () => {
    setIsVisible(!isVisible);
  }

  const renderContent = () => {
    switch (id) {
      case 0:
        return <GuideType4 />;
      case 1:
        return <GuideType5 />;
      case 2:
        return <GuideType6 />;
    }
  }
  //===========================| ONPEN FANPAGE |==================
  const openFanpage = () => {
    Linking.openURL(`https://www.facebook.com/profile.php?id=61552015982879`)
      .catch(err => {
        console.error('Không thể mở fanpage:', err);
        // Nếu không thể mở ứng dụng Facebook, mở fanpage trong trình duyệt
        Linking.openURL(`https://www.facebook.com/profile.php?id=100092619379347`)
          .catch(err => console.error('Không thể mở fanpage:', err));
      });
  };

  return (
    <TouchableOpacity style={[styles.boxItem]}
      onPress={() => {
        id == 4 ? openFanpage() : toggleModal();
      }}>
      <FastImage resizeMode='stretch' tintColor={COLOR.primary} style={{ width: 48, height: 48 }} source={image} />
      <Text style={[appStyle.text18, { textAlign: 'center', width: '90%', paddingTop: 8, minHeight: 30, fontWeight: '500', lineHeight: 24 }]} numberOfLines={2}
      >{title}</Text>
      <Modal
        animationType="slide"
        transparent={false}
        visible={isVisible}
        onRequestClose={toggleModal}
        style={{ margin: 0, paddingTop: 8 }}
      >
        <AppHeader
          title=''
          iconLeft={'close'}
          onPressLeft={toggleModal}
        />
        <View style={{ flex: 1, padding: 16 }}>
          {renderContent()}
        </View>
      </Modal>
    </TouchableOpacity>
  )
}

export default ItemInformation

const styles = StyleSheet.create({
  boxItem: {
    width: '48%',
    minHeight: windowHeight * 0.16,
    alignItems: 'center',
    marginBottom: 8,
  },
  modalContainer: {
    backgroundColor: 'white',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [
      { translateX: -windowWidth * 0.45 },
      { translateY: -windowHeight * 0.36 },
    ],
    width: windowWidth * 0.9,
    height: windowHeight * 0.65,
    borderRadius: 12,
    paddingHorizontal: 25,
    paddingBottom: 10,
    alignSelf: 'center',
    alignItems: 'center',
  },
})