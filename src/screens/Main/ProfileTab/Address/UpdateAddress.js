import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState, useEffect, useContext, useRoute } from 'react';
import { appStyle, windowWidth } from '../../../../constants/AppStyle';
import Header from '../../../../components/Header';
import { COLOR, ICON } from '../../../../constants/Theme';
import ButtonSelected from '../../../../components/ButtonSelected';
import AppInput from '../../../../components/AppInput';
import SwitchToggle from 'react-native-switch-toggle';
import AppButton from '../../../../components/AppButton';
import AppDropdown from '../../../../components/AppDropdown';
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AxiosInstance from '../../../../constants/AxiosInstance';
import { AppContext } from '../../../../utils/AppContext';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import AppHeader from '../../../../components/AppHeader';
import SuccessModal from '../../../../components/Profile/Modal/SuccessModal';
import { showToastMessage } from '../../../../utils/utils';
import FailModal from '../../../../components/Profile/Modal/FailModal';

const UpdateAddress = ({ route }) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { addressInfo } = route.params;
  //console.log(addressInfo);
  const { infoUser, idUser } = useContext(AppContext);
  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);

  const [isSelected, setIsSelected] = useState(null);
  const [onSwitch, setOnSwitch] = useState(false);
  const [nickName, setNickName] = useState(null);

  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [wards, setWards] = useState([]);
  const [selectedWard, setSelectedWard] = useState(null);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    if (addressInfo) {
      setIsSelected(addressInfo.street);
      setNickName(addressInfo.note);
      setSelectedProvince(addressInfo.city);
      setSelectedDistrict(addressInfo.district);
      setSelectedWard(addressInfo.ward);
      setAddress(addressInfo.address);
      setOnSwitch(addressInfo.isDefault);
    }
  }, [addressInfo]);

  useEffect(() => {
    setSelectedDistrict(addressInfo?.district);
  }, [addressInfo?.district]);
  
  useEffect(() => {
    setSelectedWard(addressInfo?.ward);
  }, [addressInfo?.ward]);

  const updateAddress = async () => {
    try {
      const updatedAddress = {
        idUser: idUser,
        id: addressInfo.id, // ID của địa chỉ cần cập nhật
        
        city: selectedProvince?.name,
        district: selectedDistrict?.name,
        ward: selectedWard?.name,
        street: isSelected, // Lựa chọn của loại địa chỉ
        
        number: null,

        note: nickName,
        address: address,
        isDefault: onSwitch,
      };

      const response = await axios.put(
        'http://103.57.129.166:3000/address/api/update-address-by-id',
        updatedAddress,
      );
      console.log("responseaaa", response.data);
      if (response.status === 200) {
        navigation.goBack();
        showToastMessage('', 'Cập nhật địa chỉ thành công');
      } else {
        showToastMessage('error', 'Cập nhật địa chỉ thất bại');

      }
    } catch (error) {
      console.error('Lỗi khi cập nhật địa chỉ: ', error);
    }
  };

  useEffect(() => {
    const getAddress = async () => {
      try {
        if (isFocused) {
          const response = await axios.get(
            `/address/api/get-address-by-id-user?idUser=${idUser}`,
          );
          //setAddresses(response.data);
          console.log('>>>>>>>>>> get list update');
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAddress();
  }, [isFocused, idUser]);

  const deleteAddress = async () => {
    try {
      if (addressInfo) {
        const response = await axios.delete(
          `http://103.57.129.166:3000/address/api/delete-address-by-id?id=${addressInfo.id}`,
        );
        if (response.status === 200) {
          console.log('>>>>>>>>>>>>> Xóa rồi');
          setSuccessModalVisible(true);
          navigation.goBack();
        } else {
          console.log('Lỗi xóa địa chỉ');
        }
      }
    } catch (error) {
      console.error('Lỗi khi xóa địa chỉ: ', error);
    }
  };

  useEffect(() => {
    // Gọi API để lấy danh sách tỉnh/thành phố và set nó vào state 'provinces'
    fetch('https://provinces.open-api.vn/api/p/')
      .then(response => response.json())
      .then(data => {
        setProvinces(data);
      })
      .catch(error => {
        console.error('Lỗi khi lấy dữ liệu từ API: ', error);
      });
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      axios
        .get(
          `https://provinces.open-api.vn/api/p/${selectedProvince.code}?depth=2`,
        )
        .then(response => {
          setDistricts(response.data.districts);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      axios
        .get(
          `https://provinces.open-api.vn/api/d/${selectedDistrict.code}?depth=2`,
        )
        .then(response => {
          setWards(response.data.wards);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [selectedDistrict]);

  const handleSwitchToggle = () => {
    setOnSwitch(!onSwitch);
  };

  const handleButtonPress = buttonName => {
    setIsSelected(buttonName);
  };

  return (
    <SafeAreaView style={[appStyle.container]}>
      <AppHeader title="Chi tiết địa chỉ" />
      <KeyboardAwareScrollView behavior="padding">
        <View style={{ width: '100%', padding: 15 }}>
          <Text style={[appStyle.text18, { fontWeight: '600' }]}>
            Loại địa chỉ
          </Text>
          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <ButtonSelected
              text="Nhà riêng"
              icon={ICON.Home}
              isSelected={isSelected === 'Nhà riêng'}
              onPress={() => handleButtonPress('Nhà riêng')}
            />
            <ButtonSelected
              text="Công ty"
              icon={ICON.Company}
              isSelected={isSelected === 'Công ty'}
              onPress={() => handleButtonPress('Công ty')}
            />
            <ButtonSelected
              text="Khác"
              icon={ICON.Other}
              isSelected={isSelected === 'Khác'}
              onPress={() => handleButtonPress('Khác')}
            />
          </View>

          <View>
            <Text style={[appStyle.text18, { fontWeight: '500', marginTop: 10 }]}>
              Tên gợi nhớ
            </Text>
            <AppInput
              placeholder="Nhập tên cho địa chỉ"
              placeholderStyle={{ fontSize: 14 }}
              value={nickName}
              onChangeText={text => setNickName(text)}
            />
          </View>

          <View>
            <Text style={[appStyle.text18, { fontWeight: '500', marginTop: 10 }]}>
              Tỉnh/Thành phố
            </Text>
            <AppDropdown
              placeholderStyle={{ fontSize: 14 }}
              fontSize={16}
              labelField="name"
              valueField="name"
              placeholder="Tỉnh/Thành phố"
              data={provinces}
              value={selectedProvince}
              onChange={val => {
                setSelectedProvince(val);
                // setSelectedDistrict(null);
                // setSelectedWard(null);
              }}
            />
          </View>

          <View>
            <Text style={[appStyle.text18, { fontWeight: '500', marginTop: 10 }]}>
              Quận Huyện
            </Text>
            <AppDropdown
              placeholderStyle={{ fontSize: 14 }}
              fontSize={16}
              labelField="name"
              valueField="name"
              placeholder="Quận Huyện"
              data={districts}
              value={selectedDistrict} // Đặt giá trị mặc định từ state
              onChange={val => {
                setSelectedDistrict(val);
                setSelectedWard(null);
              }}
            />
          </View>

          <View>
            <Text style={[appStyle.text18, { fontWeight: '500', marginTop: 10 }]}>
              Phường Xã
            </Text>
            <AppDropdown
              labelField="name"
              valueField="name"
              placeholder="Phường Xã"
              data={wards}
              value={selectedWard}
              onChange={val => {
                setSelectedWard(val);
              }}
            />
          </View>

          <View>
            <Text style={[appStyle.text18, { fontWeight: '500', marginTop: 10 }]}>
              Địa chỉ
            </Text>
            <AppInput
              placeholder="Nhập tên cho địa chỉ"
              placeholderStyle={{ fontSize: 14 }}
              value={address}
              onChangeText={text => setAddress(text)}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              justifyContent: 'space-between',
            }}>
            <Text style={[appStyle.text14, { fontWeight: '500' }]}>
              Đặt làm địa chỉ mặc định
            </Text>
            <SwitchToggle
              switchOn={onSwitch}
              onPress={handleSwitchToggle}
              circleColorOff={COLOR.background}
              circleColorOn={COLOR.background}
              backgroundColorOn={COLOR.primary}
              backgroundColorOff="#C4C4C4"
              containerStyle={{
                width: 42,
                height: 24,
                borderRadius: 25,
                padding: 2,
              }}
              circleStyle={{
                width: 21,
                height: 20,
                borderRadius: 20,
              }}
            />
            {/* <Switch switchOn={onSwitch} onPress={handleSwitchToggle}/> */}
          </View>

          <TouchableOpacity
            onPress={() => setSuccessModalVisible(true)}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: windowWidth * 0.28,
              marginTop: 10,
            }}>
            <FastImage
              source={ICON.Delete}
              tintColor={COLOR.red}
              style={[appStyle.iconBig]}
            />
            <Text style={[appStyle.text165, { color: COLOR.red }]}>
              Xóa địa chỉ
            </Text>
          </TouchableOpacity>

          <AppButton
            title="Lưu"
            marginTop={60}
            onPress={() => updateAddress()}
          />
        </View>
      </KeyboardAwareScrollView>

      <FailModal
        title="Xóa địa chỉ"
        text="Bạn chắc chắn xóa địa chỉ này?"
        nextStep="Xóa"
        isVisible={isSuccessModalVisible}
        onCheckBalance={() => deleteAddress()}
        onCancel={() => setSuccessModalVisible(false)}
      />

    </SafeAreaView>
  );
};

export default UpdateAddress;

const styles = StyleSheet.create({});
