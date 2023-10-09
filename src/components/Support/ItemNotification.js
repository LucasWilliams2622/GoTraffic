import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import { COLOR } from '../../constants/Theme';
import { Code } from 'native-base';

const ItemNotification = props => {
  const {data} = props;
  const {image, title, content, time, id} = data;
  return (
    <TouchableOpacity style={styles.container}>
      <FastImage style={styles.logo} resizeMode={'stretch'} source={image} />
      <View style={{marginLeft: 10, width: '80%'}}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.content}>{content}</Text>
        <Text style={styles.time}>{time}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ItemNotification;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ecfff8',
    height: 108,
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.borderColor,
  },
  logo: {
    width: 36,
    height: 31,
    alignSelf: 'flex-start',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLOR.black,
    marginTop:-4
  },
  content: {
    fontSize: 12,
    color: COLOR.black,
    lineHeight:18
  },
  time: {
    position: 'absolute',
    bottom: 1,
    fontSize: 12,
  },
});
