import {StyleSheet, FlatList, Text, View, ScrollView} from 'react-native';
import React from 'react';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {appStyle, windowHeight, windowWidth} from '../../../constants/AppStyle';
import {COLOR} from '../../../constants/Theme';
import AppButton from '../../../components/AppButton';
import ItemGuide from '../../../components/Support/ItemGuide';
import call from 'react-native-phone-call';
import ItemInformation from '../../../components/Support/ItemInformation';
import FastImage from 'react-native-fast-image';
import ItemInsurance from '../../../components/Support/ItemInsurance';
import data from '../../data';
import {Linking} from 'react-native';

const Support = () => {
  const openMessengerWithFanpage = () => {
    const fanpageId = '153193171201089';
    const url = `https://m.me/${fanpageId}`;

    Linking.openURL(url)
      .then(() => {
        console.log('Đã mở Messenger');
      })
      .catch(error => {
        console.error('Lỗi khi mở Messenger:', error);
      });
  };
  //=========================| CALL PHONE |==============================
  const handleCall = () => {
    const phoneNumber = '0337744148';
    const args = {
      number: phoneNumber,
      prompt: true,
    };
    call(args).catch(console.error);
  };

  return (
    <ScrollView
      style={[appStyle.container, {borderWidth: 2}]}
      shouldRasterizeIOS
      showsHorizontalScrollIndicator={false}>
      <View style={styles.bgHeader} />
      <View style={{marginHorizontal: 12}}>
        <View style={styles.boxSupport}>
          <Text style={[appStyle.text18, styles.textSupport]}>
            Cần hỗ trợ nhanh, vui lòng gọi 1900 0000 (7AM - 10PM) hoặc gửi tin
            nhắn vào GoTraffic Fanpage
          </Text>

          <View style={[appStyle.rowBetween, {marginTop: 12}]}>
            <AppButton
              title={'Gọi'}
              width={'49%'}
              noShadow
              backgroundColor={COLOR.background}
              textColor={COLOR.titleButton2}
              icon={require('../../../assets/icon/ic_phone_outline.png')}
              iconColor={COLOR.titleButton2}
              onPress={() => {
                handleCall();
              }}
            />
            <AppButton
              title={'Gửi tin nhắn'}
              noShadow
              width={'49%'}
              icon={require('../../../assets/icon/ic_chat_room.png')}
              onPress={() => openMessengerWithFanpage()}
            />
          </View>
        </View>
      </View>

      {/* INSURANCE */}
      <View style={{marginBottom: 24, marginTop: 48}}>
        <Text
          style={[
            appStyle.text18,
            {fontWeight: '600', marginBottom: 12, marginHorizontal: 12},
          ]}>
          Hotline bảo hiểm
        </Text>
        <FlatList
          data={data.DataInsurance}
          shouldRasterizeIOS={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={{paddingHorizontal: 12}}
          horizontal
          renderItem={({item}) => <ItemInsurance data={item} />}
          keyExtractor={item => item.id}
        />
      </View>

      {/* GUIDE */}
      <View style={{marginBottom: 24, marginTop: 24}}>
        <Text
          style={[
            appStyle.text18,
            {fontWeight: '600', marginBottom: 12, marginHorizontal: 12},
          ]}>
          Hướng dẫn
        </Text>
        <FlatList
          data={data.DataGuide}
          shouldRasterizeIOS={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={{paddingHorizontal: 12}}
          horizontal
          snapToAlignment="start"
          snapToInterval={windowWidth * 0.8}
          decelerationRate={'fast'}
          renderItem={({item}) => <ItemGuide data={item} />}
          keyExtractor={item => item.id}
        />
      </View>

      {/* INFORMATION */}
      <View style={styles.boxInfo}>
        <Text style={[appStyle.text18, {fontWeight: '600', marginBottom: 24}]}>
          Thông tin
        </Text>
        <FlatList
          data={data.DataInfo}
          style={{}}
          numColumns={2}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          renderItem={({item}) => <ItemInformation data={item} />}
          keyExtractor={item => item.id}
          ListFooterComponent={
            <View style={[appStyle.boxCenter, appStyle.rowCenter]}>
              <FastImage
                style={appStyle.logo}
                source={require('../../../assets/image/logo_go_traffic.png')}
              />
              <Text style={[appStyle.text14, {paddingHorizontal: 8}]}>
                Phiên bản 1.0.0
              </Text>
            </View>
          }
        />
      </View>
    </ScrollView>
  );
};

export default Support;

const styles = StyleSheet.create({
  bgHeader: {
    backgroundColor: COLOR.bgHeader,
    width: '100%',
    height: windowHeight * 0.18,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  boxSupport: {
    paddingVertical: 14,
    marginTop: -50,
    paddingHorizontal: 14,
    width: '100%',
    borderRadius: 14,
    backgroundColor: COLOR.background,

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.62,
    elevation: 8,
  },
  textSupport: {
    lineHeight: 24,
    fontWeight: '300',
  },
  boxInfo: {
    backgroundColor: '#f7f7f7',
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 20,
    paddingBottom: windowHeight * 0.2,
  },
});
