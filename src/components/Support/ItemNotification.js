import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {COLOR} from '../../constants/Theme';
import {Code} from 'native-base';
import {appStyle} from '../../constants/AppStyle';

const ItemNotification = props => {
  const {data} = props;
  const {image, title, content, time, id} = data;
  return (
    <TouchableOpacity style={styles.container}>
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
    </TouchableOpacity>
  );
};

export default ItemNotification;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ecfff8',
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
});
