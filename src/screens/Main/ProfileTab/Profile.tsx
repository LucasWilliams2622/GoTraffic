import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Modal,
  ToastAndroid,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {appStyle, windowHeight, windowWidth} from '../../../constants/AppStyle';
import {COLOR, ICON} from '../../../constants/Theme';
import FastImage from 'react-native-fast-image';
import AppProfile from '../../../components/AppProfile';
import {AppContext} from '../../../utils/AppContext';
import AppButton from '../../../components/AppButton';
import AxiosInstance from '../../../constants/AxiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation ,useIsFocused} from '@react-navigation/native';

const Profile = props => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const { route} = props;
  const {setIsLogin, infoUser, idUser} = useContext(AppContext);

  const [name, setName] = useState(infoUser.name);
  const [isModalVisible, setModalVisible] = useState(false);
  console.log(infoUser.avatar);

  const toggleModal = async () => {
    try {
      const response = await AxiosInstance().delete(
        '/user/api/delete?id=' + idUser,
      );
      if (response.result) {
        setModalVisible(!isModalVisible);
        await AsyncStorage.removeItem('userInfo');
        setIsLogin(false);
        ToastAndroid.show('Xóa tài khoản thành công', ToastAndroid.SHORT);
      } else {
        ToastAndroid.show('Đăng nhập thất bại', ToastAndroid.SHORT);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const LogOut = async () => {
    try {
      await AsyncStorage.removeItem('userInfo');
      setIsLogin(false);
      console.log('Thông tin người dùng đã được xóa thành công!');
    } catch (error) {
      console.log('Đã xảy ra lỗi khi xóa thông tin người dùng:', error);
    }
  };
  const onDelete = async () => {
    try {
      const response = await AxiosInstance().delete('user/api/delete', {});
      console.log(response);
      if (response.result) {
        setIsLogin(false);
        ToastAndroid.show('Xóa tài khoản thành công', ToastAndroid.SHORT);
      } else {
        ToastAndroid.show('Xóa thất bại', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isFocused) {
    }
  }, [isFocused]);

 
  return (
    <SafeAreaView style={[appStyle.container, {backgroundColor: COLOR.gray}]}>
      <ScrollView
        style={{
          flex: 1,
          width: '100%',
          height: '80%',
          marginBottom: windowHeight * 0.1,
        }}
        showsVerticalScrollIndicator={false}>
        <View style={styles.headBg}>
          <View style={[appStyle.boxCenter, {marginTop: windowHeight * 0.12}]}>
            <FastImage
              source={
                infoUser.avatar
                  ? {uri: infoUser.avatar}
                  : require('../../../assets/image/logo_go_traffic.png')
              }
              style={[appStyle.avatar]}></FastImage>
            <Text
              style={[
                appStyle.text24Bold,
                {textAlign: 'center', marginTop: 12},
              ]}>
              {infoUser.name}
            </Text>
          </View>
        </View>

        <View style={[styles.viewGroup, {marginTop: windowHeight * 0.12}]}>
          <AppProfile
            icon={ICON.Profile}
            text="Tài khoản của tôi"
            onPress={() => navigation.navigate('Account',)}
          />

          <AppProfile
            icon={ICON.Heart}
            text="Xe yêu thích"
            onPress={() => navigation.navigate('FavouriteCar')}
          />

          <AppProfile
            icon={ICON.Address}
            text="Địa chỉ của tôi"
            onPress={() => navigation.navigate('MyAddress')}
          />

          <AppProfile
            icon={ICON.Wallet}
            text="Thẻ của tôi"
            borderBottomWidth={0}
            onPress={() => navigation.navigate('MyCard')}
          />
        </View>

        <View style={[styles.viewGroup, {marginTop: 35}]}>
          <AppProfile
            icon={ICON.Share}
            text="Giới thiệu bạn bè"
            onPress={() => navigation.navigate('ShareWithFriend')}
          />

          <AppProfile
            icon={ICON.Trip}
            text="Xe của tôi"
            borderBottomWidth={0}
            onPress={() => navigation.navigate('HomeCar')}
          />
        </View>

        <View style={[styles.viewGroup, {marginTop: 35}]}>
          <AppProfile
            icon={ICON.Key}
            text="Đổi mật khẩu"
            onPress={() => navigation.navigate('ChangePassword')}
          />
          <AppProfile
            icon={ICON.Delete}
            text="Yêu cầu xóa tài khoản"
            borderBottomWidth={0}
            onPress={() => toggleModal()}
          />
        </View>

        <TouchableOpacity
          onPress={() => {
            LogOut();
          }}>
          <View
            style={{flexDirection: 'row', alignSelf: 'center', marginTop: 20}}>
            <FastImage source={ICON.Exit} style={[appStyle.iconBig]} />
            <Text
              style={[
                appStyle.text20,
                {color: COLOR.exit, marginLeft: 10, fontWeight: '500'},
              ]}>
              Đăng xuất
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
      <Modal animationType="fade" transparent={true} visible={isModalVisible}>
        <TouchableOpacity style={styles.modalBackdrop} onPress={toggleModal} />
        <View style={styles.modalContainer}>
          <Text style={[appStyle.text20Bold, {marginVertical: 20}]}>
            CẢNH BÁO
          </Text>
          <Text
            style={[
              appStyle.text14,
              {
                textAlign: 'center',
                lineHeight: 20,
                letterSpacing: 0,
              },
            ]}>
            Khi xóa tài khoản, các thông tin sau (nếu có) sẽ bị xóa trên hệ
            thống: {'\n'}- Thông tin cá nhân {'\n'}- Thông tin lịch sử chuyến và
            danh sách xe {'\n\n'}
            Tiền ví và điểm thưởng sẽ được thanh toán theo quy định của chính
            sách hiện hành của Mioto {'\n\n'} Việc đồng ý xóa tài khoản là bạn
            đã chấp nhận điều khoản chính sách xóa tài khoản của Mioto. {'\n\n'}{' '}
            Yêu cầu xóa tài khoản sẽ được xử lý trong 15 ngày làm việc. Mioto sẽ
            liên hệ trực tiếp với bạn qua Email hoặc số điện thoại bạn đã cung
            cấp. {'\n\n'} Mọi thắc mắc xin liên hệ Fanpage của Mioto hoặc
            hotline <Text style={{fontWeight: 'bold'}}>1900 9217</Text> để được
            hỗ trợ
          </Text>

          <AppButton title="Hủy" marginTop={50} onPress={() => toggleModal()} />
          <TouchableOpacity onPress={() => onDelete()}>
            <Text style={[appStyle.text14Bold, {marginTop: 15}]}>Xác nhận</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  headBg: {
    backgroundColor: COLOR.bgHeader,
    width: '100%',
    height: windowHeight * 0.15,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },

  viewGroup: {
    marginHorizontal: 15,
    height: 'auto',
    width: 'auto',
    borderRadius: 10,
    borderWidth: 2,
    paddingHorizontal: 10,
    borderColor: COLOR.background,
    backgroundColor: COLOR.background,
  },
  modalContainer: {
    backgroundColor: 'white',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [
      {translateX: -windowWidth * 0.45},
      {translateY: -windowHeight * 0.36},
    ],
    width: windowWidth * 0.9,
    height: windowHeight * 0.72,
    borderRadius: 12,
    paddingHorizontal: 25,
    paddingBottom: 10,
    alignSelf: 'center',
    alignItems: 'center',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background color
    justifyContent: 'center',
    alignItems: 'center',
  },
});
