import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {COLOR, ICON} from '../../../../constants/Theme';
import FastImage from 'react-native-fast-image';
import {
  appStyle,
  windowHeight,
  windowWidth,
} from '../../../../constants/AppStyle';
import {useNavigation} from '@react-navigation/native';
import {AppContext} from '../../../../utils/AppContext';
import AppHeader from '../../../../components/AppHeader';
import VerifyLicense from './VerifyLicense';

const Account = props => {
  const navigation = useNavigation();
  const {infoUser, idUser} = useContext(AppContext);
  const [isLicenseModalVisible, setIsLicenseModalVisible] = useState(false);

  const handleUpdateProfile = () => {
    navigation.navigate('UpdateProfile');
  };
  const isImageUrlValid = /^https?:\/\/.*\.(png|jpg)$/i.test(infoUser.avatar);

  return (
    <SafeAreaView style={[appStyle.container]}>
      <AppHeader
        title="Tài khoản của tôi"
        icon={ICON.Edit}
        onPressRight={() => handleUpdateProfile()}
      />

      <View style={{width: '100%', alignItems: 'center', padding: 15}}>
        {isImageUrlValid ? (
          <FastImage
            source={{uri: infoUser.avatar}}
            style={[appStyle.avatar, {marginTop: 20}]}
          />
        ) : (
          <FastImage
            source={require('../../../../assets/image/guide/img_friends.png')}
            style={[appStyle.avatar, {marginTop: 20}]}
          />
        )}

        <Text style={[appStyle.text24Bold, {marginTop: 12}]}>
          {infoUser.name}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={[appStyle.text12]}>
            Tham gia: {infoUser.createdAt.slice(0, 10)}
          </Text>
        </View>

        <View style={styles.viewEdit}>
          <View style={styles.viewText}>
            <Text style={appStyle.text14}>Ngày sinh</Text>
            <Text style={appStyle.text14}>{infoUser.dob.slice(0, 10)}</Text>
          </View>
          <View style={[styles.viewText, {marginTop: 8}]}>
            <Text style={appStyle.text14}>Giới tính</Text>
            <Text style={appStyle.text14}>
              {infoUser.gender ? 'Nam' : 'Nữ'}
            </Text>
          </View>
        </View>

        {/* Giấy phép lái xe */}
        <TouchableOpacity
          onPress={() => setIsLicenseModalVisible(true)}
          style={[
            styles.viewItem,
            {borderTopWidth: 2, borderTopColor: '#efefef', marginTop: 12},
          ]}>
          <View style={styles.viewChild}>
            <Text style={appStyle.text14}>Giấy phép lái xe</Text>
            {infoUser.isVerifiedDriverLicense ? (
              <View style={[styles.alert, {backgroundColor: COLOR.lightGreen2}]}>
                <FastImage style={[appStyle.iconSmall]} source={ICON.Check} />
                <Text style={[appStyle.text105, {marginStart: 5}]}>
                  Đã xác thực
                </Text>
              </View>
            ) : (
              <View style={styles.alert}>
                <FastImage style={[appStyle.iconSmall]} source={ICON.Warning} />
                <Text style={[appStyle.text105, {marginStart: 5}]}>
                  Chưa xác thực
                </Text>
              </View>
            )}
          </View>
          <View style={styles.link}>
            <Text style={[appStyle.text12Bold, {marginRight: 5}]}>
              Xác thực ngay
            </Text>
            <FastImage
              style={[appStyle.iconSmall, {marginTop: 3}]}
              source={ICON.Next}
            />
          </View>
        </TouchableOpacity>
        <VerifyLicense
          isVisible={isLicenseModalVisible}
          onClose={() => setIsLicenseModalVisible(false)}
        />

        {/* Số điện thoại */}
        <View style={styles.viewItem}>
          <View style={styles.viewChild}>
            <Text style={appStyle.text14}>Số điện thoại</Text>
            <View style={[styles.alert, {backgroundColor: COLOR.lightGreen2}]}>
              <FastImage style={[appStyle.iconSmall]} source={ICON.Check} />
              <Text style={[appStyle.text105, {marginStart: 5}]}>
                Đã xác thực
              </Text>
            </View>
          </View>
          <View style={styles.link}>
            <FastImage style={[appStyle.iconSmall]} source={ICON.Next} />
          </View>
        </View>

        {/* Email */}
        <View style={styles.viewItem}>
          <View style={styles.viewChild}>
            <Text style={appStyle.text14}>Email</Text>

            {infoUser.isVerifiedEmail ? (
              <View style={[styles.alert, {backgroundColor: COLOR.lightGreen2}]}>
                <FastImage style={[appStyle.iconSmall]} source={ICON.Check} />
                <Text style={[appStyle.text105, {marginStart: 5}]}>
                  Đã xác thực
                </Text>
              </View>
            ) : (
              <View style={styles.alert}>
                <FastImage style={[appStyle.iconSmall]} source={ICON.Warning} />
                <Text style={[appStyle.text105, {marginStart: 5}]}>
                  Chưa xác thực
                </Text>
              </View>
            )}
          </View>
          <View style={styles.link}>
            <Text style={[appStyle.text12Bold, {marginRight: 5}]}>
              Liên kết ngay
            </Text>
            <FastImage
              style={[appStyle.iconSmall, {marginTop: 3}]}
              source={ICON.Next}
            />
          </View>
        </View>

        {/* Facebook */}
        {/* <View style={styles.viewItem}>
          <View style={styles.viewChild}>
            <Text style={appStyle.text14}>Facebook</Text>
            <View style={styles.alert}>
              <FastImage style={[appStyle.iconSmall]} source={ICON.Warning} />
              <Text style={[appStyle.text105, {marginStart: 5}]}>
                Chưa liên kết
              </Text>
            </View>
          </View>
          <View style={styles.link}>
            <Text style={[appStyle.text12Bold, {marginRight: 5}]}>
              Liên kết ngay
            </Text>
            <FastImage
              style={[appStyle.iconSmall, {marginTop: 3}]}
              source={ICON.Next}
            />
          </View>
        </View> */}

        {/* Google */}
        {/* <View style={styles.viewItem}>
          <View style={styles.viewChild}>
            <Text style={appStyle.text14}>Google</Text>
            <View style={styles.alert}>
              <FastImage style={[appStyle.iconSmall]} source={ICON.Warning} />
              <Text style={[appStyle.text105, {marginStart: 5}]}>
                Chưa liên kết
              </Text>
            </View>
          </View>
          <View style={styles.link}>
            <Text style={[appStyle.text12Bold, {marginRight: 5}]}>
              Liên kết ngay
            </Text>
            <FastImage
              style={[appStyle.iconSmall, {marginTop: 3}]}
              source={ICON.Next}
            />
          </View>
        </View> */}
      </View>
    </SafeAreaView>
  );
};

export default Account;

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: windowHeight * 0.05,
    backgroundColor: COLOR.background,
    // backgroundColor:'blue',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignSelf: 'center',
    paddingHorizontal: 10,
    alignItems: 'center',
    paddingTop: 10,
  },
  viewEdit: {
    width: '100%',
    height: windowHeight * 0.1,
    backgroundColor: COLOR.gray,
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 50,
    padding: 10,
  },
  viewText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewItem: {
    width: '100%',
    height: windowHeight * 0.07,
    borderBottomColor: '#efefef',
    borderBottomWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  link: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  alert: {
    width: 'auto',
    height: '35%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLOR.lightYellow,
    borderRadius: 18,
    justifyContent: 'center',
    paddingHorizontal: 5,
    marginLeft: 5,
  },
  viewChild: {
    flexDirection: 'row',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
