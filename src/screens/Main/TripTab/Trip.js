import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {appStyle} from '../../../constants/AppStyle';
import {FlatList, ScrollView} from 'native-base';
import {COLOR} from '../../../constants/Theme';
import ItemTrip from '../../../components/Support/ItemTrip';
import FastImage from 'react-native-fast-image';

const Trip = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <SafeAreaView style={appStyle.container}>
      <View style={styles.viewTitle}>
        <Text style={styles.title}>Chuyến của tôi</Text>
        <FastImage
          style={styles.logo}
          resizeMode={'stretch'}
          source={require('../../../assets/image/logoTrip.png')}
        />
      </View>

      <ScrollView style={appStyle.main}>
        <Text style={styles.text1}>Hiện tại</Text>
        {isLoading ? (
          <View>
            <FastImage
              style={styles.imageInvisible}
              resizeMode={'stretch'}
              source={require('../../../assets/image/NoTrip.png')}
            />
            <Text
              style={[
                appStyle.text16,
                {textAlign: 'center', marginBottom: 10, fontStyle: 'italic'},
              ]}>
              Hiện tại chưa trong chuyến
            </Text>
          </View>
        ) : (
          <View>
            <FastImage
              style={styles.imageInvisible}
              resizeMode={'stretch'}
              source={require('../../../assets/image/NoTrip.png')}
            />
            <Text
              style={[
                appStyle.text16,
                {textAlign: 'center', marginBottom: 10, fontStyle: 'italic'},
              ]}>
              Hiện tại chưa trong chuyến
            </Text>
          </View>
        )}

        <Text style={styles.text1}>Đã thuê</Text>
        <FlatList
          style={{width: '100%', marginBottom: 65}}
          data={DATA}
          renderItem={({item}) => <ItemTrip data={item} />}
          keyExtractor={item => item._id}
          showsVerticalScrollIndicator={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Trip;

const styles = StyleSheet.create({
  viewTitle: {
    flexDirection: 'row',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.23,
    shadowRadius: 11.27,
    elevation: 14,
  },
  imageInvisible: {
    width: 192,
    height: 138,
    alignSelf: 'center',
    marginBottom: 20,
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
    marginBottom: 20,
  },
  line1: {
    width: '100%',
    height: 32,
    backgroundColor: '#EFECEC',
    justifyContent: 'center',
  },
  logo: {
    width: 24,
    height: 24,
    position: 'absolute',
    alignSelf: 'center',
    right: 10,
  },
});

const DATA = [
  {
    id: 1,
    image: require('../../../assets/image/logoPerson.png'),
    time: '21/09/2023 | 20:30',
    name: 'KIA MORNING 2022',
    bienSo: '50LD - 74953',
    address: 'Quận Gò Vấp, Hồ Chí Minh',
    price: '599K',
  },
  {
    id: 2,
    image: require('../../../assets/image/logoPerson.png'),
    time: '21/09/2023 | 20:30',
    name: 'KIA MORNING 2022',
    bienSo: '50LD - 74953',
    address: 'Quận Gò Vấp, Hồ Chí Minh',
    price: '599K',
  },
  {
    id: 3,
    image: require('../../../assets/image/logo-fb.png'),
    time: '21/09/2023 | 20:30',
    name: 'KIA MORNING 2022',
    bienSo: '50LD - 74953',
    address: 'Quận Gò Vấp, Hồ Chí Minh',
    price: '599K',
  },
];
