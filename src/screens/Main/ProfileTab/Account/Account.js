import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLOR, ICON } from '../../../../constants/Theme';
import FastImage from 'react-native-fast-image';
import { appStyle, windowHeight, windowWidth } from '../../../../constants/AppStyle';
import { useNavigation } from '@react-navigation/native';

const Account = (props) => {
  const navigation = useNavigation();
  const { route } = props;

  const defaultName = "Bảo";
  const defaultDob = "01/01/1992";
  const defaultSex = "Nữ";

  const [name, setName] = useState(route.params?.newName || defaultName);
  const [dob, setDob] = useState(route.params?.newDOB || defaultDob);
  const [sex, setSex] = useState(route.params?.newSex || defaultSex);



  useEffect(() => {
    if (route.params?.newName) {
      setName(route.params.newName);
    }
    if (route.params?.newDOB) {
      setDob(route.params.newDOB);
    }
    if (route.params?.newSex) {
      setSex(route.params.newSex);
    }
  }, [route.params?.newName, route.params?.newDOB, route.params?.newSex])
  return (
    <SafeAreaView style={[appStyle.container]}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Profile', {
            newName: name,
          })}>
          <FastImage
            source={ICON.Back}
            style={[appStyle.icon]} />
        </TouchableOpacity>
        <Text style={[appStyle.text20, { fontWeight: '500' }]}>Tài khoản của tôi</Text>
        <TouchableOpacity onPress={() => navigation.navigate('UpdateProfile')}>
          <FastImage
            source={ICON.Edit}
            style={[appStyle.icon, { marginRight: 5 }]} />
        </TouchableOpacity>
      </View>

      <View style={{ width: '100%', alignItems: 'center', padding: 15 }}>
        <FastImage source={require('../../../../assets/image/guide/img_friends.png')} style={[appStyle.avatar, { marginTop: 20 }]}></FastImage>
        <Text style={[appStyle.text24Bold, { marginTop: 12 }]}>{name}</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[appStyle.text12]}>
            Tham gia: 11/09/2023</Text>
        </View>

        <View style={styles.viewEdit}>
          <View style={styles.viewText}>
            <Text style={appStyle.text14}>Ngày sinh</Text>
            <Text style={appStyle.text14}>{dob}</Text>
          </View>
          <View style={[styles.viewText, { marginTop: 8 }]}>
            <Text style={appStyle.text14}>Giới tính</Text>
            <Text style={appStyle.text14}>{sex}</Text>
          </View>
        </View>

        {/* Giấy phép lái xe */}
        <TouchableOpacity
          onPress={() => navigation.navigate('VerifyLicense')}
          style={[styles.viewItem, {
            borderTopWidth: 2,
            borderTopColor: '#efefef',
            marginTop: 12
          }]}>
          <View style={styles.viewChild}>
            <Text style={appStyle.text14}>Giấy phép lái xe</Text>
            <View style={styles.alert}>
              <FastImage
                style={[appStyle.iconSmall]}
                source={ICON.Warning} />
              <Text style={[appStyle.text105, { marginStart: 5 }]}>Chưa xác thực</Text>
            </View>
          </View>
          <View style={styles.link}>
            <Text style={[appStyle.text12Bold, { marginRight: 5 }]}>Xác thực ngay</Text>
            <FastImage
              style={[appStyle.iconSmall, { marginTop: 3 }]}
              source={ICON.Next} />
          </View>
        </TouchableOpacity>

        {/* Số điện thoại */}
        <View style={styles.viewItem}>
          <View style={styles.viewChild}>
            <Text style={appStyle.text14}>Số điện thoại</Text>
            <View style={[styles.alert, { backgroundColor: COLOR.lightGreen }]}>
              <FastImage
                style={[appStyle.iconSmall]}
                source={ICON.Check} />
              <Text style={[appStyle.text105, { marginStart: 5 }]}>Đã xác thực</Text>
            </View>
          </View>
          <View style={styles.link}>
            <FastImage
              style={[appStyle.iconSmall]}
              source={ICON.Next} />
          </View>
        </View>

        {/* Email */}
        <View style={styles.viewItem}>
          <View style={styles.viewChild}>
            <Text style={appStyle.text14}>Email</Text>
            <View style={styles.alert}>
              <FastImage
                style={[appStyle.iconSmall]}
                source={ICON.Warning} />
              <Text style={[appStyle.text105, { marginStart: 5 }]}>Chưa liên kết</Text>
            </View>
          </View>
          <View style={styles.link}>
            <Text style={[appStyle.text12Bold, { marginRight: 5 }]}>Liên kết ngay</Text>
            <FastImage
              style={[appStyle.iconSmall, { marginTop: 3 }]}
              source={ICON.Next} />
          </View>
        </View>

        {/* Facebook */}
        <View style={styles.viewItem}>
          <View style={styles.viewChild}>
            <Text style={appStyle.text14}>Facebook</Text>
            <View style={styles.alert}>
              <FastImage
                style={[appStyle.iconSmall]}
                source={ICON.Warning} />
              <Text style={[appStyle.text105, { marginStart: 5 }]}>Chưa liên kết</Text>
            </View>
          </View>
          <View style={styles.link}>
            <Text style={[appStyle.text12Bold, { marginRight: 5 }]}>Liên kết ngay</Text>
            <FastImage
              style={[appStyle.iconSmall, { marginTop: 3 }]}
              source={ICON.Next} />
          </View>
        </View>

        {/* Google */}
        <View style={styles.viewItem}>
          <View style={styles.viewChild}>
            <Text style={appStyle.text14}>Google</Text>
            <View style={styles.alert}>
              <FastImage
                style={[appStyle.iconSmall]}
                source={ICON.Warning} />
              <Text style={[appStyle.text105, { marginStart: 5 }]}>Chưa liên kết</Text>
            </View>
          </View>
          <View style={styles.link}>
            <Text style={[appStyle.text12Bold, { marginRight: 5 }]}>Liên kết ngay</Text>
            <FastImage
              style={[appStyle.iconSmall, { marginTop: 3 }]}
              source={ICON.Next} />
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
    height: windowHeight * 0.05,
    backgroundColor: COLOR.background,
    // backgroundColor:'blue',    
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignSelf: 'center',
    paddingHorizontal: 10,
    alignItems: 'center',
    paddingTop: 10
  },
  viewEdit: {
    width: '100%',
    height: windowHeight * 0.1,
    backgroundColor: COLOR.gray,
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 50,
    padding: 10
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
    justifyContent: 'space-between'
  },
  link: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
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
    marginLeft: 5
  },
  viewChild: {
    flexDirection: 'row',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
})