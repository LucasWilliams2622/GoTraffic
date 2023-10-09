import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLOR} from '../../../constants/Theme';
import {FlatList, ScrollView} from 'native-base';
import ItemNotification from '../../../components/Support/ItemNotification';

const Notification = () => {
  return (
    <ScrollView>
      <Text style={styles.title}>Thông báo</Text>
      <View style={styles.line1}>
        <Text style={styles.text1}>Mới</Text>
      </View>
      <FlatList
        style={{width: '100%'}}
        data={DATA}
        renderItem={({item}) => <ItemNotification data={item} />}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.line1}>
        <Text style={styles.text1}>Trước đó</Text>
      </View>
      <FlatList
        style={{width: '100%',marginBottom:65}}
        data={DATA}
        renderItem={({item}) => <ItemNotification data={item} />}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
      />
    </ScrollView>
  );
};

export default Notification;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    textAlign: 'center',
    color: COLOR.black,
    fontWeight: 'bold',
    marginBottom:20,
    marginTop:14
  },
  text1: {
    color: COLOR.black,
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
  },
  line1: {
    width: '100%',
    height: 32,
    backgroundColor: '#EFECEC',
    justifyContent: 'center',
  },
});
const DATA = [
  {
    id: 1,
    image: require('../../../assets/image/logo-fb.png'),
    title: 'Welcome to Mioto',
    content:
      'Chào mừng bạn tham gia cộng đồng Mioto, bấm vào đây để xem những kinh nghiệm thuê xe hữu ích',
    time: '17h43, 25/09',
  },
  {
    id: 2,
    image: require('../../../assets/image/logo-fb.png'),
    title: 'Welcome to Mioto',
    content:
      'Chào mừng bạn tham gia cộng đồng Mioto, bấm vào đây để xem những kinh nghiệm thuê xe hữu ích',
    time: '17h43, 25/09',
  },
  {
    id: 3,
    image: require('../../../assets/image/logo-fb.png'),
    title: 'Welcome to Mioto',
    content:
      'Chào mừng bạn tham gia cộng đồng Mioto, bấm vào đây để xem những kinh nghiệm thuê xe hữu ích',
    time: '17h43, 25/09',
  },
];
