import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  useWindowDimensions,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import FastImage from 'react-native-fast-image';
import {appStyle} from '../../../../constants/AppStyle';
import {COLOR, ICON} from '../../../../constants/Theme';
import AppProfile from '../../../../components/AppProfile';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import AppInput from '../../../../components/AppInput';
import Modal from 'react-native-modal';
import {useNavigation} from '@react-navigation/native';
import AxiosInstance from '../../../../constants/AxiosInstance';
import AppHeader from '../../../../components/AppHeader';

const DetailInListCar = props => {
  const navigation = useNavigation();
  const {id} = props.route.params;
  const [data, setData] = useState('');
  const goBack = () => {
    navigation.goBack('Profile');
  };
  const goInfor = () => {
    navigation.navigate('GeneralInformation');
  };
  const layout = useWindowDimensions();
  const FirstRoute = () => (
    <View style={{flex: 1, padding: 10}}>
      <AppProfile
        icon={ICON.Trip}
        text="Giá cho thuê"
        onPress={() => navigation.navigate('RentCost')}
      />
      <AppProfile
        icon={ICON.Calendar}
        text="Lịch xe"
        onPress={() => navigation.navigate('CalendarOfCar')}
      />
      <AppProfile
        icon={ICON.Heart}
        text="Giao xe tận nơi"
        onPress={() => navigation.navigate('CarDelivery')}
      />
      <AppProfile
        icon={ICON.Card}
        text="Phụ phí"
        onPress={() => navigation.navigate('Surcharge')}
      />
    </View>
  );
  //api getDetail
  const getDetailCarByIdUser = async () => {
    try {
      const response = await AxiosInstance().get(
        '/car/api/get-by-id-car?idCar=' + id,
      );
      if (response.result) {
        console.log(response.car);
        setData(response.car);
      } else {
        console.log('Failed to get car');
      }
    } catch (error) {
      console.log('=========>', error);
    }
  };
  // api delete car
  const deleteCarById = async () => {
    try {
      const response = await AxiosInstance().delete(
        '/car/api/delete?idCar=' + id,
      );
      if (response.result) {
        ToastAndroid.show('Xóa xe thành công', ToastAndroid.SHORT);
        goBack();
      } else {
        ToastAndroid.show('Xóa xe thất bại', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(id);
    getDetailCarByIdUser();
  }, []);

  const SecondRoute = () => (
    <View
      style={[appStyle.main, {marginTop: 20, justifyContent: 'space-evenly'}]}>
      <AppInput placeholder={'Nhập tên của bạn'} />

      <AppInput placeholder={'Nhập CCCD'} />

      <AppInput placeholder={'Nhập sdt'} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 20,
        }}>
        <View style={styles.upLoadImage}>
          <Text style={{textAlign: 'center'}}>
            Vui lòng chụp mặt trước của bằng lái
          </Text>
          <FastImage
            style={{width: 30, height: 30, marginTop: 10}}
            source={ICON.Picture}
          />
        </View>
        <View style={styles.upLoadImage}>
          <Text style={{textAlign: 'center'}}>
            Vui lòng chụp mặt sau của bằng lái
          </Text>
          <FastImage
            style={{width: 30, height: 30, marginTop: 10}}
            source={ICON.Picture}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.btn}>
        <Text
          style={[
            appStyle.text16Bold,
            {color: COLOR.white, textAlign: 'center'},
          ]}>
          ĐĂNG KÝ
        </Text>
      </TouchableOpacity>
    </View>
  );
  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'XE TỰ LÁI'},
    {key: 'second', title: 'XE CÓ TÀI XẾ'},
  ]);
  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: COLOR.primary}}
      style={{backgroundColor: COLOR.white}}
      labelStyle={{color: COLOR.black}}
    />
  );
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={appStyle.container}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={appStyle.text16Bold}>Xác nhận xóa xe</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
              }}>
              <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                <Text style={[appStyle.text14, {color: COLOR.red}]}>Hủy</Text>
              </TouchableOpacity>
              <View
                style={{
                  width: 1,
                  height: 20,
                  backgroundColor: COLOR.borderColor2,
                }}
              />
              <TouchableOpacity onPress={() => deleteCarById()}>
                <Text style={[appStyle.text14, {color: COLOR.green}]}>
                  Đồng ý
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <FastImage
        style={styles.image}
        source={require('../../../../assets/image/bg2.jpg')}
      />
      <AppHeader title={data.name} icon={ICON.Gift} onPressRight={() => setModalVisible(true)}/>
      <View style={{padding: 14}}>
        <View style={styles.line1}>
          <FastImage
            style={styles.imageCar}
            source={{uri: data.imageThumbnail}}></FastImage>
          <View style={{marginLeft: 10}}>
            <Text style={[appStyle.text16Bold]}>{data.name}</Text>
            <TouchableOpacity
              onPress={() =>
                //  onPress={goInfor}
                navigation.navigate('GeneralInformation', {data: data})
              }>
              <Text
                style={[
                  appStyle.text14Bold,
                  {marginTop: 10, color: COLOR.primary},
                ]}>
                Thông tin chung {'>'}{' '}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <TabView
        navigationState={{index, routes}}
        renderTabBar={renderTabBar}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
      />
    </SafeAreaView>
  );
};

export default DetailInListCar;

const styles = StyleSheet.create({
  viewTitle: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 70,
  },
  imageCar: {
    height: 80,
    width: 80,
    borderRadius: 50,
  },
  image: {
    width: '100%',
    height: '18%',
    position: 'absolute',
    top: 70,
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
  line1: {
    width: '100%',
    height: 100,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 10,
  },
  upLoadImage: {
    height: 120,
    width: 174,
    borderWidth: 0.5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  btn: {
    backgroundColor: COLOR.primary,
    height: 50,
    borderRadius: 10,
    alignContent: 'center',
    justifyContent: 'center',
    marginBottom: 70,
    marginTop: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    backgroundColor: COLOR.borderColor3,
    borderRadius: 20,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
