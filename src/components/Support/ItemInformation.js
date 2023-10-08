import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image';
import { appStyle, windowHeight } from '../../constants/AppStyle';
import { COLOR } from '../../constants/Theme';

const ItemInformation = (props) => {
  const { data } = props;
  const { id, title, image } = data;
  
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
        id == 4 ? openFanpage() : {}
      }}>
      <FastImage resizeMode='stretch' tintColor={COLOR.primary} style={{ width: 48, height: 48 }} source={image} />
      <Text style={[appStyle.text18, { textAlign: 'center', width: '90%', paddingTop: 8, minHeight: 30, fontWeight: '500', lineHeight: 24 }]} numberOfLines={2}
      >{title}</Text>
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
  }
})