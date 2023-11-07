import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext, useState } from 'react';
import { appStyle } from '../../../../constants/AppStyle';
import { COLOR, ICON } from '../../../../constants/Theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import AppHomeCar from '../../../../components/AppHomeCar';
import { AppContext } from '../../../../utils/AppContext';
import numeral from 'numeral';
import { useNavigation } from '@react-navigation/native';

const HomeCar = props => {
  const navigation = useNavigation();
  const { infoUser, idUser } = useContext(AppContext);
  const [hideSurplus, setHideSurplus] = useState(true);
  const handleButtonPress = () => {
    setHideSurplus(!hideSurplus);
  };
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView style={appStyle.container}>
      <FastImage
        style={styles.image}
        source={require('../../../../assets/image/bg_homecar.jpg')}
      />
      <TouchableOpacity onPress={goBack}>
        <FastImage
          source={require('../../../../assets/icon/ic_left.png')}
          style={{
            position: 'absolute',
            left: 10,
            top: 20,
            width: 20,
            height: 20,
          }}
        />
      </TouchableOpacity>
      <View style={styles.viewTitle}>
        <Text style={styles.title}>Xe của tôi</Text>
      </View>
      <View style={{ padding: 14, marginTop: 100 }}>
        <View style={styles.line1}>
          <Text style={[appStyle.text16Bold, { textAlign: 'center' }]}>
            Số dư: {hideSurplus ? '*******' : numeral(infoUser.surplus).format('0,0')}
          </Text>
          <TouchableOpacity onPress={() => handleButtonPress()}>
            <FastImage
              style={[appStyle.icon, { marginLeft: 10 }]}
              source={!hideSurplus ? require('../../../../assets/icon/ic_visible.png') : require('../../../../assets/icon/ic_invisible.png')}
              resizeMode="stretch"
            />
          </TouchableOpacity>
        </View>
        <AppHomeCar
          icon={ICON.Trip}
          title="Danh sách xe"
          text="Quản lí các xe đang cho thuê"
          onPress={() => navigation.navigate('ListCar')}
        />
        <AppHomeCar
          icon={ICON.Wallet}
          title="Ví của tôi"
          text="Theo dõi số dư và lịch sử cho thuê"
          onPress={() => navigation.navigate('MyWallet')}
        />
        <AppHomeCar
          icon={ICON.Wallet}
          title="Hợp đồng mẫu"
          text="Mẫu hợp đồng cho thuê xe"
          onPress={() => navigation.navigate('SampleContract')}
        />
        <AppHomeCar
          icon={ICON.Heart}
          title="Danh sách chuyến"
          text="Lịch sử và trạng thái các chuyến"
          onPress={() => navigation.navigate('TripOfCar')}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeCar;

const styles = StyleSheet.create({
  viewTitle: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '30%',
    position: 'absolute',
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
    backgroundColor: COLOR.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: COLOR.borderColor,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 10,
    borderRadius: 20,
  },
});
