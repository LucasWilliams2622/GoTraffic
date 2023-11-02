import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { appStyle } from '../../../../constants/AppStyle';
import Header from '../../../../components/Header';
import { COLOR, ICON } from '../../../../constants/Theme'
import AppInput from '../../../../components/AppInput'
import AppButton from '../../../../components/AppButton'
import AppDropdown from '../../../../components/AppDropdown'
import axios from 'axios';


const CarAddress = (props) => {
  const { navigation } = props;
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [wards, setWards] = useState([]);
  const [selectedWard, setSelectedWard] = useState(null);
  const [address, setAddress] = useState(null);

  const handleAddressSubmit = (newAddress) => {
    const newAddress = {
      province: selectedProvince?.name,
      district: selectedDistrict?.name,
      ward: selectedWard?.name,
      address: address,
    };

    console.log(newAddress);
    console.log(address,", ",wards,", ",districts,", ",provinces);
    navigation.navigate('DetailsInfor', { newAddress });
  }


  useEffect(() => {
    // Gọi API để lấy danh sách tỉnh/thành phố và set nó vào state 'provinces'
    fetch('https://provinces.open-api.vn/api/p/')
      .then((response) => response.json())
      .then((data) => {
        setProvinces(data);
        //console.log(data);
        // Chọn tỉnh/thành phố mặc định (nếu muốn)
        // setSelectedProvince(data[0]); // Chọn tỉnh/thành phố đầu tiên trong danh sách
      })
      .catch((error) => {
        console.error('Lỗi khi lấy dữ liệu từ API: ', error);
      });
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      axios.get(`https://provinces.open-api.vn/api/p/${selectedProvince.code}?depth=2`)
        .then((response) => {
          //alert(JSON.stringify(response.data));
          // console.log(response.data);
          setDistricts(response.data.districts);
          //setSelectedDistrict(response.data.districts[0]);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      axios.get(`https://provinces.open-api.vn/api/d/${selectedDistrict.code}?depth=2`)
        .then((response) => {
          //console.log(response.data);
          setWards(response.data.wards);
          //setSelectedWard(response.data[0]);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [selectedDistrict]);

  return (
    <SafeAreaView style={appStyle.container}>
      <Header
        icon={ICON.Close}
        text="Chọn địa chỉ"
        onPress={() => navigation.navigate('DetailsInfor')}
      />
      <View style={{ paddingHorizontal: 20 }}>
        <View>
          <Text style={[appStyle.text18, { fontWeight: '500', marginVertical: 10 }]}>Tỉnh/Thành phố</Text>
          <AppDropdown
            placeholderStyle={{ fontSize: 14 }}
            fontSize={16}
            labelField="name"
            valueField="name"
            placeholder="Tỉnh/Thành phố"
            data={provinces}
            value={selectedProvince?.name}
            onChange={(val) => {
              setSelectedProvince(val);
              setSelectedDistrict(null);
              setSelectedWard(null);
            }}
          />
        </View>

        <View>
          <Text style={[appStyle.text18, { fontWeight: '500', marginVertical: 10 }]}>Quận Huyện</Text>
          <AppDropdown
            placeholderStyle={{ fontSize: 14 }}
            fontSize={16}
            labelField="name"
            valueField="name"
            placeholder="Quận Huyện"
            data={districts}
            value={selectedDistrict?.name}
            onChange={(val) => {
              setSelectedDistrict(val);
              setSelectedWard(null);
            }}
          />
        </View>

        <View>
          <Text style={[appStyle.text18, { fontWeight: '500', marginVertical: 10 }]}>Phường Xã</Text>
          <AppDropdown
            labelField="name"
            valueField="name"
            placeholder="Phường Xã"
            data={wards}
            value={selectedWard?.name}
            onChange={(val) => {
              setSelectedWard(val);
            }}
          />
        </View>

        <View>
          <Text style={[appStyle.text18, { fontWeight: '500', marginVertical: 10 }]}>Địa chỉ</Text>
          <AppInput
            placeholder="Nhập tên cho địa chỉ"
            placeholderStyle={{ fontSize: 14 }}
            value={address}
            onChangeText={(text) => setAddress(text)}
          />
        </View>

        <AppButton
          title="Xác nhận"
          marginTop={60}
          onPress={() => handleAddressSubmit()}
        />
      </View>

    </SafeAreaView>
  )
}

export default CarAddress

const styles = StyleSheet.create({})