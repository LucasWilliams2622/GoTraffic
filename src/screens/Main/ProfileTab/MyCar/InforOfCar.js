import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Checkbox, FlatList, ScrollView } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import { appStyle, windowWidth, windowHeight } from '../../../../constants/AppStyle';
import { COLOR, ICON } from '../../../../constants/Theme';
import axios from 'axios';

import Header from '../../../../components/Header';
import AppInput from '../../../../components/AppInput';
import AppDropdown from '../../../../components/AppDropdown';
import AppButton from '../../../../components/AppButton';
import ItemFeature from '../../../../components/Profile/ItemFeature';
import { features } from '../../../../components/Profile/data/DataCar';

const InforOfCar = (props) => {
  const { navigation, route } = props;
  const updatedCarInfo = route.param?.updatedCarInfo;
  console.log("Infor of car >>>>>>>>>>>>", updatedCarInfo);
  const [carNumber, setCarNumber] = useState('88A-289.09');
  const [description, setDescription] = useState(null);
  const [fuelConsumption, setFuelConsumption] = useState('25');
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  const [openAddress, setOpenAddress] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [wards, setWards] = useState([]);
  const [selectedWard, setSelectedWard] = useState(null);
  const [address, setAddress] = useState(null);
  const [location, setLocation] = useState(null);


  const goBack = () => {
    navigation.goBack('HomeCar');
  };

  const handleAddressClick = () => {
    setOpenAddress(!openAddress);
  };
  const handleAddressSubmit = () => {
    const newAddressString = `${address}, ${selectedWard?.name}, ${selectedDistrict?.name}, ${selectedProvince?.name}`;
    setLocation(newAddressString);
    handleAddressClick();
  };

  // feature
  const handleFeatureSelection = (featureName) => {
    if (selectedFeatures.includes(featureName)) {
      setSelectedFeatures((prevSelectedFeatures) =>
        prevSelectedFeatures.filter((feature) => feature !== featureName)
      );
    } else {
      setSelectedFeatures((prevSelectedFeatures) => [...prevSelectedFeatures, featureName]);
    }
  };


  const handleUpdate = () => {
    const updatedCarInfo = {
      carNumber,
      description,
      fuelConsumption,
      location,
      selectedFeatures
    };

    // In ra thông tin xe đã cập nhật
    console.log('Thông tin xe đã cập nhật:', updatedCarInfo);
  }
  useEffect(() => {
    fetch('https://provinces.open-api.vn/api/p/')
      .then((response) => response.json())
      .then((data) => {
        setProvinces(data);
      })
      .catch((error) => {
        console.error('Lỗi khi lấy dữ liệu từ API: ', error);
      });
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      axios.get(`https://provinces.open-api.vn/api/p/${selectedProvince.code}?depth=2`)
        .then((response) => {
          setDistricts(response.data.districts);
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
          setWards(response.data.wards);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [selectedDistrict]);

  return (
    <SafeAreaView style={appStyle.container}>
      <Header
        icon={ICON.Back}
        text="Thông tin xe"
        onPress={() => navigation.navigate('GeneralInformation')}
      />
      <ScrollView style={appStyle.main}>
        <View style={[appStyle.cardInfo, { marginTop: 10 }]}>
          <View style={appStyle.rowContent}>
            <Text style={appStyle.text165}>Biển số xe</Text>
            <AppInput
              width={windowWidth * 0.35}
              height={windowHeight * 0.05}
              value={carNumber}
              onChangeText={(carNumberNew) => setCarNumber(carNumberNew)}
            />
          </View>
        </View>

        <View style={[appStyle.cardInfo, { marginTop: 10 }]}>
          <View style={appStyle.rowContent}>
            <Text style={appStyle.text165}>Địa chỉ</Text>
            <TouchableOpacity
              style={{
                backgroundColor: COLOR.bgHeader,
                borderRadius: 5,
                paddingHorizontal: 7
              }}
              onPress={() => handleAddressClick()}
            >
              <Text style={[appStyle.text12Bold, { color: COLOR.fifth, margin: 3 }]}>Thay đổi</Text>
            </TouchableOpacity>
          </View>
          <Text>{location ? location : '12 QL51, TT.Phú Mỹ, Tân Thành,Bà Rịa - Vũng Tàu, Việt Nam'}</Text>

          {openAddress && (
            <View style={{ width: '100%', height: windowHeight * 0.4, justifyContent: 'space-evenly', alignItems: 'center' }}>
              <AppDropdown
                width={windowWidth * 0.7}
                height={40}
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
              <AppDropdown
                width={windowWidth * 0.7}
                height={40}
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
              <AppDropdown
                width={windowWidth * 0.7}
                height={40}
                labelField="name"
                valueField="name"
                placeholder="Phường Xã"
                data={wards}
                value={selectedWard?.name}
                onChange={(val) => {
                  setSelectedWard(val);
                }}
              />
              <AppInput
                width={windowWidth * 0.7}
                height={40}
                placeholder="Nhập địa chỉ"
                value={address}
                onChangeText={(text) => setAddress(text)}
              />
              <AppButton
                title="Lưu"
                width={windowWidth * 0.5}
                height={40}
                onPress={() => handleAddressSubmit()}
              />
            </View>
          )}
        </View>

        <View style={appStyle.cardInfo}>
          <Text style={appStyle.text165}>Mô tả xe</Text>
          <AppInput
            height={windowHeight * 0.17}
            marginTop={8}
            placeholder="Mô tả xe của bạn"
            value={description}
            onChangeText={(text) => setDescription(text)}

          />
        </View>

        <View style={appStyle.cardInfo}>
          <View style={appStyle.rowContent}>
            <Text style={appStyle.text165}>Mức tiêu thụ nhiên liệu</Text>
            <View style={appStyle.inputRight}>
              <AppInput
                width={windowWidth * 0.15}
                borderWidth={0}
                value={fuelConsumption}
                onChangeText={(text) => setFuelConsumption(text)}
              />
              <Text>lít/100 km</Text>
            </View>
          </View>
        </View>

        {/* Tính năng */}
        <View style={appStyle.cardInfo}>
          <Text style={appStyle.text165}>Tính năng xe</Text>
          <View style={[styles.featuresContainer, { marginTop: 10 }]}>
            {features.map((feature) => (
              <ItemFeature
                key={feature}
                featureName={feature}
                isSelected={selectedFeatures.includes(feature)}
                onPress={handleFeatureSelection}
              />
            ))}
          </View>
        </View>


        <AppButton
          title="Cập nhật"
          marginBottom={70}
          onPress={() => handleUpdate()}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default InforOfCar;

const styles = StyleSheet.create({
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
