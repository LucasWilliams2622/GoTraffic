import React, {memo, useCallback, useState, useEffect, useContext} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  appStyle,
  windowHeight,
  windowWidth,
} from '../../../../constants/AppStyle';
import AppHeader from '../../../../components/AppHeader';
import AppButton from '../../../../components/AppButton';
import {MoneyText, showToastMessage} from '../../../../utils/utils';
import {useNavigation} from '@react-navigation/native';
import {BottomSheet} from 'react-native-btr';
import {useIsFocused} from '@react-navigation/native';
import DismissKeyboard from '../../../../components/DismissKeyboard';
import {COLOR} from '../../../../constants/Theme';
import FastImage from 'react-native-fast-image';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import axios from 'axios';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AppInput from '../../../../components/AppInput';
import {AppContext} from '../../../../utils/AppContext';

const WithdrawRequest = () => {
  const {infoUser, idUser} = useContext(AppContext);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [selectedBank, setSelectedBank] = useState(null);
  const [surplusMoney, setSurplusMoney] = useState(infoUser.surplus);
  const [modalVisible, setModalVisible] = useState(false);
  const [accountNumber, setAccountNumber] = useState('');

  const [money, setMoney] = useState('');
  const [data, setData] = useState([
    {value: '50000', isSelected: false},
    {value: '100000', isSelected: false},
    {value: '200000', isSelected: false},
    {value: '500000', isSelected: false},
    {value: '1000000', isSelected: false},
    {value: '2000000', isSelected: false},
  ]);

  const [optionBank, setOptionsBank] = useState([]);
  const init = async () => {
    try {
      const response = await axios.get('https://api.vietqr.io/v2/banks');

      setOptionsBank(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    init();
  }, [isFocused]);

  const setValue = useCallback((item, index) => {
    if (item?.value > surplusMoney) {
      showToastMessage('error', 'Số dư không đủ, vui lòng chọn lại');
      return;
    }
    setData(prevData =>
      prevData.map((v, i) => ({
        ...v,
        isSelected: index === i,
      })),
    );
    setMoney(item.value);
  });

  const handleMaxPress = useCallback(() => {
    setMoney(surplusMoney.toString());
    // setValue(surplusMoney, '');
  }, [surplusMoney]);

  const renderBankItem = ({item}) => (
    <TouchableOpacity
      style={[
        styles.boxBank,
        selectedBank === item && {
          borderColor: COLOR.primary,
          borderWidth: 2,
          borderRadius: 8,
        },
      ]}
      onPress={() => {
        setSelectedBank(item), setModalVisible(false);
      }}>
      <View style={[appStyle.rowCenter, {width: '90%'}]}>
        <FastImage source={{uri: item.logo}} style={styles.icBank} />
        <View style={{marginLeft: 24}}>
          <Text
            style={[appStyle.text16, {fontWeight: '600'}]}
            numberOfLines={1}>
            {item.shortName}
          </Text>
          <Text
            style={[
              appStyle.text14,
              {color: COLOR.textGray, marginTop: 4, width: '80%'},
            ]}
            numberOfLines={1}>
            {item.name}
          </Text>
        </View>
      </View>
      {selectedBank === item && (
        <Icon
          name="checkmark-circle"
          type={IconType.Ionicons}
          size={24}
          style={{top: -25, left: 14}}
          color={COLOR.primary}
        />
      )}
    </TouchableOpacity>
  );

  const handleWithdraw = async () => {
    try {
      if (/^[0-9]+$/.test(accountNumber)) {
        if (accountNumber.length > 10) {
          if (/^[0-9]+$/.test(money)) {
            if (parseFloat(money) > 0) {
              if (parseFloat(money) <= infoUser.surplus) {
                if (parseFloat(money) <= 2000000) {
                  if (selectedBank) {
                    const response = await axios.post(
                      'http://103.57.129.166:3000/request/api/add',
                      {
                        idUser: idUser,
                        bankName: selectedBank.shortName,
                        bankNumber: accountNumber.toString(),
                        amount: parseInt(money),
                      },
                    );
                    console.log(response.data);
                    if (response.data.result) {
                      showToastMessage(
                        '',
                        'Yêu cầu đã được gửi, bạn sẽ được duyệt sau 72 giờ',
                      );
                      navigation.goBack();
                    } else {
                      showToastMessage(
                        'error',
                        'Gửi yêu cầu rút tiền thất bại',
                      );
                    }
                  } else {
                    showToastMessage(
                      'error',
                      'Bạn chưa chọn ngân hàng tiền rút ,vui lòng chọn lại',
                    );
                  }
                } else {
                  showToastMessage('error', 'Số tiền rút tối đa là 2.000.000đ');
                  return;
                }
              } else {
                showToastMessage('error', 'Tài khoản không đủ tiền');
              }
            } else {
              showToastMessage('error', 'Vui lòng kiểm tra số tiền muốn rút');
              return;
            }
          } else {
            showToastMessage('error', 'Vui lòng nhập đúng số tiền');
          }
        } else {
          showToastMessage(
            'error',
            'Vui lòng kiểm tra số tài khoản ,hãy nhập lại',
          );
        }
      } else {
        showToastMessage('error', 'Tài khoản không hợp lệ');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={appStyle.container}>
      <AppHeader title="Rút tiền" />

      <DismissKeyboard>
        <>
          <FastImage
            resizeMode="stretch"
            source={require('../../../../assets/image/banner_transfer.png')}
            style={{
              width: windowWidth,
              height: windowHeight * 0.2,
              marginBottom: 24,
            }}
          />
          <View style={appStyle.main}>
            <View style={{flex: 1}}>
              <AppInput
                placeholder={'Vui lòng nhập số tài khoản'}
                keyboardType={'number-pad'}
                value={accountNumber}
                onChangeText={text => setAccountNumber(text)}
              />
              <View style={{marginBottom: 36, marginTop: 24}}>
                <View
                  style={[
                    appStyle.rowBetween,
                    {
                      backgroundColor: COLOR.lightGray,
                      paddingHorizontal: 10,
                      paddingVertical: 4,
                      borderRadius: 12,
                    },
                  ]}>
                  <View style={{width: '10%'}} />
                  <View style={[appStyle.rowCenter, {}]}>
                    <TextInput
                      value={money}
                      style={[
                        appStyle.text20,
                        {
                          marginHorizontal: 4,
                          borderWidth: 2,
                          borderColor: COLOR.lightGray,
                        },
                      ]}
                      keyboardType="number-pad"
                      onChangeText={text => setMoney(text)}
                    />
                    <Text style={[appStyle.text20, {}]}>₫</Text>
                  </View>

                  <AppButton
                    title="MAX"
                    width="20%"
                    containerStyle={{paddingVertical: 2}}
                    onPress={() => {
                      handleMaxPress();
                    }}
                    noShadow
                  />
                </View>
                <Text
                  style={[appStyle.text14, {marginTop: 10, color: '#787878'}]}>
                  Mức rút tối đa là 2,000,000₫
                </Text>
              </View>

              <>
                <Text
                  style={[
                    appStyle.text14SemiBold,
                    {color: '#787878', marginBottom: 14},
                  ]}>
                  Nhập nhanh
                </Text>
                <View
                  style={{
                    height: windowHeight * 0.15,
                    width: '100%',
                  }}>
                  <FlatList
                    numColumns={3}
                    columnWrapperStyle={{justifyContent: 'space-between'}}
                    data={data}
                    renderItem={({item, index}) => (
                      <TouchableOpacity
                        onPress={() => {
                          setValue(item, index);
                        }}
                        style={{
                          borderRadius: 8,
                          padding: 10,
                          width: windowWidth * 0.3,
                          alignItems: 'center',
                          backgroundColor: '#F5F5F5',
                          marginBottom: 14,
                          borderWidth: 2,
                          borderColor:
                            item.isSelected == true ? COLOR.primary : '#F5F5F5',
                        }}>
                        <Text style={appStyle.text14}>
                          {MoneyText(item.value)} ₫
                        </Text>
                      </TouchableOpacity>
                    )}
                    // keyExtractor={(e, i) => e.toString()}
                  />
                </View>
              </>
              {selectedBank && (
                <TouchableOpacity
                  onPress={() => setModalVisible(true)}
                  style={[appStyle.rowCenter, styles.boxBank, {}]}>
                  <FastImage
                    source={{uri: selectedBank.logo}}
                    style={styles.icBank}
                  />
                  <View style={{marginLeft: 24}}>
                    <Text
                      style={[appStyle.text16, {fontWeight: '600'}]}
                      numberOfLines={1}>
                      {selectedBank.shortName}
                    </Text>
                    <Text
                      style={[
                        appStyle.text14,
                        {color: COLOR.textGray, marginTop: 4, width: '80%'},
                      ]}
                      numberOfLines={1}>
                      {selectedBank.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
              {!selectedBank && (
                <View style={{marginBottom: 24}}>
                  <AppButton
                    title="Chọn ngân hàng"
                    containerStyle={{}}
                    onPress={() => setModalVisible(true)}
                  />
                </View>
              )}

              <AppButton
                title="Rút"
                containerStyle={{}}
                onPress={() => handleWithdraw()}
              />
            </View>
          </View>
        </>
      </DismissKeyboard>

      <BottomSheet
        visible={modalVisible}
        onBackButtonPress={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}>
        <View
          style={[appStyle.modalContentBottom, {height: windowHeight * 0.65}]}>
          <FlatList
            data={optionBank}
            renderItem={renderBankItem}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default WithdrawRequest;

const styles = StyleSheet.create({
  boxBank: {
    padding: 26,
    backgroundColor: '#F7F7F7',
    borderRadius: 8,
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: windowWidth - 24,
  },
  icBank: {
    width: 70,
    borderRadius: 8,
    alignItems: 'center',
    height: 35,
  },
});
