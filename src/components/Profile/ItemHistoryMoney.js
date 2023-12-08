import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {COLOR, ICON} from '../../constants/Theme';
import {appStyle, windowHeight, windowWidth} from '../../constants/AppStyle';
import {useNavigation} from '@react-navigation/native';
import {formatPrice} from '../../utils/utils';

const ItemCar = props => {
  const navigation = useNavigation();
  const {data} = props;

  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.carContainer}>
        <FastImage
          source={require('../../assets/image/noti.png')}
          style={{height: 30, width: 30, borderRadius: 30, borderWidth: 0.5}}
        />
        <View style={{marginLeft: 30, width: '60%'}}>
          <Text style={[appStyle.text16Bold, {paddingHorizontal: 10}]}>
            {data.status}
          </Text>
          <Text style={[appStyle.text14, {paddingHorizontal: 10}]}>
            {data.from}
          </Text>
          <Text style={[appStyle.text14, {paddingHorizontal: 10}]}>
            {data.time}
          </Text>
        </View>

        <Text style={[appStyle.text16, {color: COLOR.green}]}>
          -đ{data.price}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ItemCar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  carContainer: {
    width: '90%',
    height: 'auto',
    backgroundColor: COLOR.white,
    borderColor: COLOR.borderColor,
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 0.4,
    marginTop: 10,
  },
});
