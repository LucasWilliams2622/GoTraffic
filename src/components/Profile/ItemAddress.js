import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import { COLOR, ICON } from '../../constants/Theme';
import { appStyle, windowHeight, windowWidth } from '../../constants/AppStyle';
import { useNavigation } from '@react-navigation/native';

const ItemAddress = props => {
  const navigation = useNavigation();
  const { data } = props;
  const { name, address, onPress } = data;
  const goHome = () => {
    navigation.navigate('Home', { id: data.id });
  };

  return (
    <TouchableOpacity
      onPress={() => {
        props.setInputAddress(address);
        props.close();
      }}>
      <View style={styles.container}>
        <View style={styles.content}>
          <FastImage
            style={[appStyle.iconBig, { alignSelf: 'center' }]}
            source={ICON.Location}
          />
          <View style={{ marginLeft: 16 }}>
            <View
              style={{
                width: windowWidth * 0.35,
                justifyContent: 'flex-start',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <Text style={[appStyle.text16, { fontWeight: '600' }]}>{name}</Text>
            </View>
            <Text style={[appStyle.text14]}>{address}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ItemAddress;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.background,
    width: '100%',
    height: 'auto',
    alignSelf: 'center',
    borderBottomColor: COLOR.borderColor,
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 8,
    marginTop: 10,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
