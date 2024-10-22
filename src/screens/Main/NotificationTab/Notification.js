import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLOR} from '../../../constants/Theme';
import {FlatList, ScrollView} from 'native-base';
import ItemNotification from '../../../components/Support/ItemNotification';
import {appStyle} from '../../../constants/AppStyle';
const Notification = () => {
  return (
    <SafeAreaView style={appStyle.container}>
      <View style={styles.viewTitle}>
        <Text style={styles.title}>Thông báo</Text>
      </View>
      <ScrollView>
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
          style={{width: '100%', marginBottom: 65}}
          data={DATA}
          renderItem={({item}) => <ItemNotification data={item} />}
          keyExtractor={item => item._id}
          showsVerticalScrollIndicator={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Notification;

const styles = StyleSheet.create({
  viewTitle: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.23,
    shadowRadius: 11.27,
    elevation: 14,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    color: COLOR.black,
    fontWeight: '400',
    marginBottom: 20,
    marginTop: 14,
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
    poster: require('../../../assets/image/poster.jpg'),
  },
  {
    id: 2,
    image: require('../../../assets/image/logo-fb.png'),
    title: 'Welcome to Mioto',
    content:
      'Chào mừng bạn tham gia cộng đồng Mioto, bấm vào đây để xem những kinh nghiệm thuê xe hữu ích',
    time: '17h43, 25/09',
    poster: require('../../../assets/image/poster.jpg'),
  },
  {
    id: 3,
    image: require('../../../assets/image/logo-fb.png'),
    title: 'Welcome to Mioto',
    content:
      'Chào mừng bạn tham gia cộng đồng Mioto, bấm vào đây để xem những kinh nghiệm thuê xe hữu ích',
    time: '17h43, 25/09',
    poster: require('../../../assets/image/poster.jpg'),
  },
];
