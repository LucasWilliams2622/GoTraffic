import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {appStyle, windowHeight} from '../../../../constants/AppStyle';
import {COLOR, ICON} from '../../../../constants/Theme';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import {useNavigation} from '@react-navigation/native';
import {AppContext} from '../../../../utils/AppContext';
import numeral from 'numeral';
import AppHeader from '../../../../components/AppHeader';
import {FlatList} from 'react-native';
import ItemHistoryMoney from '../../../../components/Profile/ItemHistoryMoney';
import {useIsFocused} from '@react-navigation/native';
import AxiosInstance from '../../../../constants/AxiosInstance';

const MyWallet = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const isFocused = useIsFocused();
  const {infoUser, idUser} = useContext(AppContext);
  const [hideSurplus, setHideSurplus] = useState(true);
  const handleButtonPress = () => {
    setHideSurplus(!hideSurplus);
  };

  const getHistoryMoney = async () => {
    try {
      const response = await AxiosInstance().get(
        '/request/api/list-request-by-user?idUser=' + idUser,
      );
      if (response) {
        setData(response);
        console.log(response);
      } else {
        console.log('NETWORK ERROR');
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getHistoryMoney();
  }, [isFocused]);

  return (
    <SafeAreaView style={appStyle.container}>
      <AppHeader title="Ví của tôi" />
      <ScrollView>
        <ImageBackground
          style={styles.imageWallet}
          resizeMode="stretch"
          source={require('../../../../assets/image/bg_wallet.png')}>
          <TouchableOpacity
            style={[appStyle.boxCenter, styles.boxSurplus]}
            onPress={() => handleButtonPress()}>
            <View style={{width: '8%'}} />
            <View style={appStyle.boxCenter}>
              <Text style={appStyle.text14Bold}>TÀI KHOẢN GỐC</Text>
              <Text style={[appStyle.text18Bold, {marginTop: 6}]}>
                {hideSurplus
                  ? '*******'
                  : numeral(infoUser.surplus).format('0,0')}{' '}
                đ
              </Text>
            </View>

            <Image
              style={[appStyle.icon, {marginLeft: 10}]}
              source={
                !hideSurplus
                  ? require('../../../../assets/icon/ic_visible.png')
                  : require('../../../../assets/icon/ic_invisible.png')
              }
              resizeMode="stretch"
            />
          </TouchableOpacity>
          <View
            style={[appStyle.rowBetween, {width: '94%', alignSelf: 'center'}]}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Recharge')}
              style={[
                appStyle.boxCenter,
                appStyle.rowCenter,
                styles.boxSurplus,
                {width: '47.5%', justifyContent: 'center'},
              ]}>
              <Icon
                name="wallet"
                type={IconType.FontAwesome5}
                size={30}
                color={COLOR.primary}
                onPress={() => {}}
              />
              <Text style={[appStyle.text16Bold, {marginLeft: 8}]}>
                Nạp tiền
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('WithdrawRequest')}
              style={[
                appStyle.boxCenter,
                appStyle.rowCenter,
                styles.boxSurplus,
                {width: '47.5%', justifyContent: 'center'},
              ]}>
              <Icon
                name="hand-coin"
                type={IconType.MaterialCommunityIcons}
                size={30}
                color={COLOR.primary}
                onPress={() => {}}
              />
              <Text style={[appStyle.text16Bold, {marginLeft: 8}]}>
                Rút tiền
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
        <FlatList
          style={{marginBottom: 80}}
          data={data}
          renderItem={({item}) => <ItemHistoryMoney data={item} />}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            <View
              style={[appStyle.boxCenter, appStyle.rowCenter, {marginTop: 24}]}>
              <Image
                style={appStyle.logo}
                source={require('../../../../assets/image/logo_go_traffic.png')}
              />
              <Text style={[appStyle.text14, {paddingHorizontal: 8}]}>
                Phiên bản 1.0.0
              </Text>
            </View>
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyWallet;

const styles = StyleSheet.create({
  boxSurplus: {
    backgroundColor: 'white',
    justifyContent: 'space-around',
    flexDirection: 'row',
    width: '94%',
    alignSelf: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    opacity: 0.9,
  },
  imageWallet: {
    height: windowHeight * 0.25,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    justifyContent: 'space-around',
    paddingVertical: 12,
  },
});
