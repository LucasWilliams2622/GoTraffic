import { StyleSheet, FlatList, Text, View } from 'react-native'
import React from 'react'
import { getStatusBarHeight } from "react-native-status-bar-height";
import { appStyle } from '../../../constants/AppStyle';
import { COLOR } from '../../../constants/Theme';
import AppButton from '../../../components/AppButton';
import ItemGuide from '../../../components/Support/ItemGuide';
import call from 'react-native-phone-call';

const DATA = [
  {
    id: 1,
    keyExtractor: "prepare",
    image: require('../../../assets/image/guide/img_prepare.jpg')
  },
  {
    id: 2,
    keyExtractor: "askAndAnswer",
    image: require('../../../assets/image/guide/img_ask_ans.jpg')
  },
  {
    id: 3,
    keyExtractor: "general",
    image: require('../../../assets/image/guide/img_general.jpg')
  },
  {
    id: 4,
    keyExtractor: "book",
    image: require('../../../assets/image/guide/img_book.jpg')
  },
  {
    id: 5,
    keyExtractor: "pay",
    image: require('../../../assets/image/guide/img_pay.jpg')
  },
]


const Support = () => {
  //CALL PHONE
  const handleCall = () => {
    const phoneNumber = '0337744148';
    const args = {
      number: phoneNumber,
      prompt: true,
    };
    call(args).catch(console.error);
  };
  return (
    <View style={appStyle.container}>
      <View style={styles.bgHeader} />
      <View style={{ marginHorizontal: 12 }}>
        <View style={styles.boxSupport}>
          <Text style={[appStyle.text18, styles.textSupport]}>Cần hỗ trợ nhanh, vui lòng gọi 1900 0000 (7AM - 10PM) hoặc gửi tin nhắn vào GoTraffic Fanpage</Text>

          <View style={[appStyle.rowBetween, { marginTop: 12, }]}>
            <AppButton title={"Gọi"} width={'49%'} backgroundColor={COLOR.background} textColor={COLOR.titleButton2} icon={require('../../../assets/icon/ic_phone_outline.png')} iconColor={COLOR.titleButton2}
            onPress={()=>{handleCall()}} />
            <AppButton title={"Gửi tin nhắn"} width={'49%'} icon={require('../../../assets/icon/ic_chat_room.png')} />
          </View>
        </View>
      </View>

      {/* GUIDE */}
      <View style={{ marginBottom: 12, marginTop: 32, }}>
        <Text style={[appStyle.text16, { fontWeight: '500', marginBottom: 12, marginHorizontal: 12 }]}>Hướng dẫn</Text>
        <FlatList
          data={DATA}
          shouldRasterizeIOS={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={{ paddingHorizontal: 12, }}
          horizontal
          renderItem={({ item }) => <ItemGuide data={item} />}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  )
}

export default Support

const styles = StyleSheet.create({
  bgHeader: {
    backgroundColor: '#aaeafa',
    width: '100%',
    height: '25%',
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

    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.20,
    shadowRadius: 5.62,
    elevation: 8
  },
  textSupport: {
    lineHeight: 24,
    fontWeight: '300'

  }
})