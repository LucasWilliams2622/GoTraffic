import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {
  appStyle,
  windowHeight,
  windowWidth,
} from '../../../../constants/AppStyle';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import {COLOR} from '../../../../constants/Theme';

const Recharge = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={appStyle.container}>
      <View style={styles.viewTitle}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FastImage
            source={require('../../../../assets/icon/ic_left.png')}
            style={{
              position: 'absolute',
              left: 10,
              top: 20,
              width: 20,
              height: 20,
            }}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Nạp tiền</Text>
        <TouchableOpacity></TouchableOpacity>
      </View>
      <View style={{borderWidth: 0}}>
        <FastImage
          style={{width: windowWidth, height: windowHeight * 0.8}}
          source={require('../../../../assets/image/bank.png')}
        />
        <Text style={[appStyle.text16,{textAlign:'center',marginTop:8}]}>Ví tiền sẽ được cập nhật sau 12h</Text>
      </View>
    </SafeAreaView>
  );
};

export default Recharge;

const styles = StyleSheet.create({
  viewTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
  },
  image: {
    width: '100%',
    height: '30%',
    position: 'absolute',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    color: COLOR.black,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 14,
  },
});
