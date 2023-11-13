import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {appStyle, windowHeight, windowWidth} from '../../../constants/AppStyle';
import {COLOR} from '../../../constants/Theme';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {Row} from 'native-base';

const Suggestion = props => {
  const navigation = useNavigation();
  const {data} = props;
  const {display} = data;
  return (
    <TouchableOpacity
      onPress={() => {
        props.setInputAddress(display);
        props.close();
      }}
      style={{
        marginTop: 5,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: COLOR.borderColor,
        paddingVertical: 10,
      }}>
      <Row style={{alignItems: 'center'}}>
        <Icon
          name="location-dot"
          size={20}
          color={COLOR.textHintColor}
          style={{marginRight: 10}}
        />
        <Text style={appStyle.text14}>{display}</Text>
      </Row>
    </TouchableOpacity>
  );
};

export default Suggestion;

const styles = StyleSheet.create({});
