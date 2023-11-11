import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image';
import { COLOR, ICON } from '../../constants/Theme';
import { appStyle, windowHeight, windowWidth } from '../../constants/AppStyle';

const CameraImageSection = ({ title, imageType, onEdit, imageURI, cameraModal }) => {
  return (
    <View>
      <View style={[appStyle.columnCenter, { marginTop: 10, height: windowHeight*0.2 }]}>
        <View style={{ width: windowWidth * 0.9, alignItems: 'center' }}>
          <View style={appStyle.rowBetween}>
            <Text style={appStyle.text16}>{imageType}</Text>
            <TouchableOpacity style={{marginTop: 10}} onPress={() => onEdit(imageType)}>
              <FastImage source={ICON.Edit} style={appStyle.iconMedium} />
            </TouchableOpacity>
          </View>
          {imageURI ? (
            <FastImage source={{ uri: imageURI }} style={styles.imgCar} />
          ) : (
            <TouchableOpacity  style={styles.upLoadImage} onPress={() => cameraModal(imageType)}>
              <Text style={{ textAlign: 'center' }}>{title}</Text>
              <FastImage style={{ width: 30, height: 30, marginTop: 10 }} source={ICON.Picture} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  )
}

export default CameraImageSection

const styles = StyleSheet.create({
    upLoadImage: {
        height: 120,
        width: 174,
        borderWidth: 0.5,
        borderRadius: 10,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
      },
    
      imgCar: {
        width: 250,
        height: 150,
        marginTop: 20
      }
})