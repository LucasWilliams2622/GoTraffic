import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLOR, ICON } from '../../../constants/Theme';
import FastImage from 'react-native-fast-image';
import { appStyle } from '../../../constants/AppStyle';

const Account = (props) => {
  const { navigation, route } = props;

  const defaultName = "Bảo";
  const defaultDob = "01/01/1992";
  const defaultSex = "Nữ";

  const [name, setName] = useState(route.params?.newName || defaultName);
  const [dob, setDob] = useState(route.params?.newDOB || defaultDob);
  const [sex, setSex] = useState(route.params?.newSex || defaultSex);

  // const updateNewName = (newName) => {
  //   setName(newName); // Cập nhật giá trị name trong trang "Account"
  //   navigation.setParams({ newName }); // Cập nhật newName trên trang "Profile"
  // };

  useEffect(() => {
    if (route.params?.newName) {
      setName(route.params.newName);
    }
    if (route.params?.newDob) {
      setDob(route.params.newDob);
    }
    if (route.params?.sex) {
      setSex(route.params.sex);
    }
  }, [route.params?.newName, route.params?.newDob, route.params?.sex])
  return (
    <SafeAreaView style={[appStyle.container, { alignItems: 'center', padding: 15 }]}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Profile',{
            newName: name,
          })}>
          <FastImage
            source={ICON.Back}
            style={[appStyle.iconBig]} />
        </TouchableOpacity>
        <Text style={[appStyle.text20,]}>Tài khoản của tôi</Text>
        <TouchableOpacity onPress={() => navigation.navigate('UpdateProfile')}>
          <FastImage
            source={ICON.Edit}
            style={[appStyle.iconBig, { marginRight: 5 }]} />
        </TouchableOpacity>
      </View>

      <FastImage source={require('../../../assets/image/guide/img_book.jpg')} style={[appStyle.avatar]}></FastImage>
      <Text style={[appStyle.text20, { marginTop: 10 }]}>{name}</Text>
      <View style={{ flexDirection: 'row' }}>
        <Text style={[appStyle.text14]}>
          Tham gia vào 11/09/2023 -
        </Text>
        <Text style={[appStyle.text14, { fontWeight: 'bold' }]}> 2 chuyến</Text>
      </View>
      <View style={styles.viewEdit}>
        <View style={styles.viewText}>
          <Text style={appStyle.text16}>Ngày sinh</Text>
          <Text style={appStyle.text16}>{dob}</Text>
        </View>
        <View style={[styles.viewText, { marginTop: 10 }]}>
          <Text style={appStyle.text16}>Giới tính</Text>
          <Text style={appStyle.text16}>{sex}</Text>
        </View>
      </View>

      {/* Giấy phép lái xe */}
      <View style={styles.viewItem}>
        <Text style={appStyle.text16}>Giấy phép lái xe</Text>
        <View>
          <View style={styles.link}>
            <Text style={appStyle.text14}>Xác thực ngay</Text>
            <FastImage
              style={[appStyle.iconSmall, { marginTop: 3 }]}
              source={ICON.Next} />
          </View>
          <View style={styles.alert}>
            <FastImage
              style={[appStyle.iconSmall]}
              source={ICON.Warning} />
            <Text style={[appStyle.text12, { marginStart: 5 }]}>Chưa xác thực</Text>
          </View>
        </View>
      </View>

      {/* Số điện thoại */}
      <View style={styles.viewItem}>
        <Text style={appStyle.text16}>Số điện thoại</Text>
        <View>
          <View style={styles.link}>
            <Text style={appStyle.text14}>Thay đổi</Text>
            <FastImage
              style={[appStyle.iconSmall]}
              source={ICON.Next} />
          </View>
          <View style={[styles.alert, { backgroundColor: COLOR.lightGreen }]}>
            <FastImage
              style={[appStyle.iconSmall]}
              source={ICON.Check} />
            <Text style={[appStyle.text12, { marginStart: 5 }]}>Đã xác thực</Text>
          </View>
        </View>
      </View>

      {/* Email */}
      <View style={styles.viewItem}>
        <Text style={appStyle.text16}>Email</Text>
        <View>
          <View style={styles.link}>
            <Text style={appStyle.text14}>Xác thực ngay</Text>
            <FastImage style={[appStyle.iconSmall, { marginTop: 3 }]} source={ICON.Next}></FastImage>
          </View>
          <View style={styles.alert}>
            <FastImage
              style={[appStyle.iconSmall]}
              source={ICON.Warning} />
            <Text style={[appStyle.text12, { marginStart: 5 }]}>Chưa xác thực</Text>
          </View>
        </View>
      </View>

      {/* Facebook */}
      <View style={styles.viewItem}>
        <Text style={appStyle.text16}>Facebook</Text>
        <View>
          <View style={styles.link}>
            <Text style={appStyle.text14}>Liên kết ngay</Text>
            <FastImage
              style={[appStyle.iconSmall, { marginTop: 3 }]}
              source={ICON.Next}></FastImage>
          </View>
        </View>

      </View>

      {/* Google */}
      <View style={styles.viewItem}>
        <Text style={appStyle.text16}>Google</Text>
        <View>
          <View style={styles.link}>
            <Text style={appStyle.text14}>Liên kết ngay</Text>
            <FastImage
              style={[appStyle.iconSmall, { marginTop: 3 }]}
              source={ICON.Next}></FastImage>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Account

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 50,
    backgroundColor: COLOR.background,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  viewEdit: {
    width: 345,
    height: 82,
    backgroundColor: '#F8F7F4',
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 10,
    padding: 10
  },
  viewText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewItem: {
    width: 345,
    height: 66,
    borderBottomColor: COLOR.borderColor,
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  link: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  alert: {
    width: 'auto',
    height: 23,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLOR.lightYellow,
    borderRadius: 18,
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  }
})