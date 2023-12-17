import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  useWindowDimensions,
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
import {showToastMessage} from '../../../../utils/utils';
import FailModal from '../../../../components/Profile/Modal/FailModal';
import CheckBox from '@react-native-community/checkbox';
import SwitchToggle from 'react-native-switch-toggle';

const DetailInListCar = props => {
  const navigation = useNavigation();
  const {id, price, status} = props.route.params;
  const [data, setData] = useState('');
  const goBack = () => {
    navigation.goBack('Profile');
  };
  const layout = useWindowDimensions();
  const [isSelected, setSelection] = useState(false);
  //api getDetail
  const getDetailCarByIdUser = async () => {
    try {
      const response = await AxiosInstance().get(
        '/car/api/get-by-id-car?idCar=' + id,
      );
      if (response.result) {
        // console.log(response.car);
        // console.log(response.car.Booking[0] == null);

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
        showToastMessage('', 'Xóa xe thành công');
        goBack();
      } else {
        showToastMessage('', 'Xóa xe thất bại', ICON.cancelWhite);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(id);
    getDetailCarByIdUser();
  }, []);

  const [modalVisible, setModalVisible] = useState(false);
  const isImageUrlValid = /^https?:\/\/.*\.(png|jpg)$/i.test(
    data.imageThumbnail,
  );
  return (
    <SafeAreaView style={appStyle.container}>
      <FailModal
        title="Xóa xe"
        text="Bạn chắc chắn xóa xe này?"
        nextStep="Xóa"
        isVisible={modalVisible}
        onCheckBalance={() => deleteCarById()}
        onCancel={() => setModalVisible(false)}
      />
      <FastImage
        style={styles.image}
        source={require('../../../../assets/image/bg2.jpg')}
      />
      <AppHeader
        title={'Chi tiết xe'}
        icon={ICON.Delete}
        onPressRight={() => setModalVisible(true)}
      />
      <View style={{padding: 14}}>
        <View style={styles.line1}>
          {!isImageUrlValid ? (
            <FastImage
              style={styles.imageCar}
              resizeMode="stretch"
              source={require('../../../../assets/image/bgCar.jpg')}
            />
          ) : (
            <FastImage
              style={styles.imageCar}
              resizeMode={'stretch'}
              source={{uri: data.imageThumbnail}}
            />
          )}
          <View style={{marginLeft: 20, justifyContent: 'space-evenly'}}>
            <Text style={[appStyle.text16Bold]}>{data.name}</Text>
            <View style={styles.checkboxContainer}>
              <SwitchToggle
                onPress={() => setSelection(!isSelected)}
                switchOn={isSelected}
                circleColorOff={COLOR.background}
                circleColorOn={COLOR.background}
                backgroundColorOn={COLOR.primary}
                backgroundColorOff="#C4C4C4"
                containerStyle={{
                  width: 42,
                  height: 24,
                  borderRadius: 25,
                  padding: 2,
                  marginTop: 6,
                }}
                circleStyle={{
                  width: 21,
                  height: 20,
                  borderRadius: 20,
                }}
              />
              <Text style={styles.label}>Cho thuê xe</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={{flex: 1, padding: 10, marginTop: 22}}>
        <View style={{flex: 1}}>
          <AppProfile
            icon={ICON.car}
            text="Giao xe tận nơi"
            onPress={() => navigation.navigate('CarDelivery', {id: id})}
          />
          <AppProfile
            icon={ICON.like1}
            text="Giá xe"
            onPress={() =>
              navigation.navigate('RentCost', {price: data.price, id: data.id})
            }
          />
          <AppProfile
            icon={ICON.wallet}
            text="Phụ phí"
            onPress={() => navigation.navigate('Surcharge', {id: id})}
          />
          <AppProfile
            icon={ICON.infocirlce}
            text="Thông tin xe"
            onPress={() => navigation.navigate('InforOfCar', {data: data})}
          />
          <AppProfile
            icon={ICON.document}
            text="Giấy tờ xe & Bảo hiểm"
            onPress={() => navigation.navigate('ExhibitOfCar', {id: data.id})}
          />
          <AppProfile
            icon={ICON.location}
            text="GPS"
            onPress={() => navigation.navigate('GPSMarker', {data: data})}
            borderBottomWidth={0}
          />
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            height: 120,
          }}>
          <Text style={appStyle.text165}>Trạng thái</Text>
          {status == 1 ? (
            <View style={styles.statusContainer}>
              <Text style={styles.statusText}>Chờ duyệt</Text>
            </View>
          ) : status == 2 ? (
            <View
              style={[styles.statusContainer, {backgroundColor: COLOR.green}]}>
              <Text style={styles.statusText}>Đã duyệt</Text>
            </View>
          ) : status == 3 ? (
            <View
              style={[styles.statusContainer, {backgroundColor: COLOR.red}]}>
              <Text style={styles.statusText}>Từ chối duyệt</Text>
            </View>
          ) : null}
        </View>
      </View>
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
  statusContainer: {
    backgroundColor: 'rgba(65, 207, 242, 0.8)',
    borderRadius: 8,
    padding: 5,
    justifyContent: 'center',
    height: 30,
    width: 100,
  },
  statusText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginLeft: -4,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
    color: COLOR.fifth,
    fontStyle: 'italic',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
