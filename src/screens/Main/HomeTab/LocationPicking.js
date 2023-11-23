import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {appStyle, windowWidth} from '../../../constants/AppStyle';
import Header from '../../../components/Header';
import {useNavigation} from '@react-navigation/native';
import {COLOR, ICON} from '../../../constants/Theme';
import AppInput from '../../../components/AppInput';
import FastImage from 'react-native-fast-image';
import ItemOption from '../../../components/Profile/ItemOption';
import ItemAddress from '../../../components/Profile/ItemAddress';
import Suggestion from '../../../components/Home/Home/Suggestion';
import axios from 'axios';
import {AppContext} from '../../../utils/AppContext';
import GetLocation from 'react-native-get-location';
import {getCurrentLocation} from '../../../utils/utils';

const LocationPicking = props => {
  const navigation = useNavigation();
  const {idUser} = useContext(AppContext);
  const [locationPicking, setLocationPicking] = useState('');
  const [searchText, setSearchText] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [defaultAddress, setDefaultAddress] = useState('');
  const [location, setLocation] = useState({
    name: '',
    ward: {
      name: '',
      id: '',
    },
    district: {
      name: '',
      id: '',
    },
    city: {
      name: '',
      id: '',
    },
    lat: '',
    lng: '',
  });

  const apikey = 'c3d0f188ff669f89042771a20656579073cffec5a8a69747';

  const autoComplete = async text => {
    try {
      const response = await axios.get(
        `https://maps.vietmap.vn/api/autocomplete/v3?apikey=${apikey}&text=${text}&cityId=${location.city.id}&distId=${location.district.id}&wardId=${location.ward.id}`,
      );
      if (response.status === 200) {
        setSuggestions(response.data);
      } else {
        console.log('error');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getDefault = async () => {
    try {
      const response = await axios.get(
        `http://103.57.129.166:3000/address/api/get-default-address?idUser=${idUser}`,
      );
      setDefaultAddress(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCurrentLocation();
    getDefault();
  }, []);

  const handleInputChange = text => {
    setSearchText(text);
    autoComplete(text);
  };

  const setDetailLocation = async location => {
    const boundaries = location.boundaries;
    const name = location.name;
    const lat = location.lat;
    const lng = location.lng;
    let wardData = {name: '', id: ''};
    let districtData = {name: '', id: ''};
    let cityData = {name: '', id: ''};
    if (boundaries.length > 0) {
      boundaries.forEach(item => {
        if (item.type === 2) {
          wardData.name = item.name;
          wardData.id = item.id;
        } else if (item.type === 1) {
          districtData.name = item.name;
          districtData.id = item.id;
        } else if (item.type === 0) {
          cityData.name = item.name;
          cityData.id = item.id;
        }
      });
      console.log(
        'ward: ' +
          JSON.stringify(wardData.name) +
          ' district: ' +
          JSON.stringify(districtData.name) +
          ' city: ' +
          JSON.stringify(cityData),
      );

      setLocation({
        name: name,
        ward: wardData,
        district: districtData,
        city: cityData,
        lat: lat,
        lng: lng,
      });

      props.setInputAddress(
        'Phường ' +
          wardData.name +
          ', ' +
          districtData.name +
          ', ' +
          cityData.name,
      );
    } else {
      Alert.alert('Chỉ hỗ trợ địa điểm trong lãnh thổ Việt Nam');
    }
  };

  useEffect(() => {
    getCurrentLocation().then(location => setDetailLocation(location));
  }, []);

  return (
    <SafeAreaView style={appStyle.container}>
      {/* <Text onPress={() => navigation.pop()}>LocationPicking</Text> */}
      <Header text="Địa điểm" icon={ICON.Back} onPress={props.close} />
      <View style={appStyle.viewContainer}>
        <View>
          <AppInput
            isLocation
            justifyContent={'flex-start'}
            placeholder="Nhập địa điểm"
            value={searchText}
            onChangeText={handleInputChange}
          />
          <FlatList
            data={suggestions.slice(0, 5)}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <Suggestion
                data={item}
                setInputAddress={props.setInputAddress}
                close={props.close}
              />
            )}
          />
        </View>

        <TouchableOpacity
          style={appStyle.card}
          onPress={() => {
            getCurrentLocation().then(location => setDetailLocation(location));
            props.close();
          }}>
          <FastImage source={ICON.Location} style={appStyle.iconBig} />
          <Text style={[appStyle.text165, {marginLeft: 5}]}>
            Vị trí hiện tại
          </Text>
        </TouchableOpacity>

        {/* Navigate qua sổ địa chỉ của user  */}
        <TouchableOpacity style={[appStyle.rowBetween, {marginTop: 10}]}>
          <Text style={appStyle.text14}>Địa chỉ của tôi </Text>
          <FastImage
            source={ICON.Next}
            resizeMode="stretch"
            style={appStyle.iconMedium}
          />
        </TouchableOpacity>

        {/* Địa chỉ mặc định của user */}
        {defaultAddress && defaultAddress.data && (
          <TouchableOpacity
            onPress={() => {
              const {address, ward, district, city} = defaultAddress.data;
              const fullAddress = `${address}, ${ward}, ${district}, ${city}`;
              props.setInputAddress(fullAddress);
              props.close();
            }}>
            <View style={styles.container}>
              <View style={styles.content}>
                <FastImage
                  style={[appStyle.iconBig, {alignSelf: 'center'}]}
                  source={ICON.Home}
                />
                <View style={{marginLeft: 16}}>
                  <View
                    style={{
                      width: windowWidth * 0.35,
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <Text style={[appStyle.text16, {fontWeight: '600'}]}>
                      {defaultAddress.data.note}
                    </Text>
                    <View>
                      <Text
                        style={[
                          appStyle.text14,
                          {
                            backgroundColor: COLOR.bgHeader,
                            marginLeft: 10,
                            borderRadius: 15,
                            padding: 8,
                          },
                        ]}>
                        Mặc định
                      </Text>
                    </View>
                  </View>
                  <Text style={[appStyle.text14]}>
                    {defaultAddress.data.address}, {defaultAddress.data.ward},{' '}
                    {defaultAddress.data.district}, {defaultAddress.data.city}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}

        <View
          style={{
            marginTop: 10,
            paddingVertical: 8,
            borderBottomWidth: 0.5,
            borderBottomColor: COLOR.borderColor,
          }}>
          <Text style={appStyle.text14}>Đưa đón sân bay </Text>
          <FlatList
            style={{width: '100%', marginVertical: 10}}
            data={plane}
            renderItem={({item}) => (
              <ItemOption
                data={item}
                setInputAddress={props.setInputAddress}
                close={props.close}
              />
            )}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View style={{marginTop: 10}}>
          <Text style={appStyle.text14}>Tìm kiếm gần đây</Text>
          <FlatList
            style={{width: '100%', marginVertical: 10}}
            data={locationViewed}
            renderItem={({item}) => (
              <ItemAddress
                data={item}
                setInputAddress={props.setInputAddress}
                close={props.close}
              />
            )}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LocationPicking;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.background,
    width: '100%',
    height: 'auto',
    alignSelf: 'center',
    borderBottomColor: COLOR.borderColor,
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 8,
    marginTop: 10,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

const plane = [
  {
    id: 1,
    text: 'Tân Sơn Nhất',
  },
  {
    id: 2,
    text: 'Nội Bài',
  },
  {
    id: 3,
    text: 'Đà Nẵng',
  },
  {
    id: 4,
    text: 'Cam Ranh',
  },
  {
    id: 5,
    text: 'Phú Quốc',
  },
  {
    id: 6,
    text: 'Liên Khương',
  },
];

const locationViewed = [
  {
    id: 1,
    name: 'Phường 1',
    address: '123 Đường A, Phường 1, Quận A, Thành phố X',
  },
  {
    id: 2,
    name: 'Phường 2',
    address: '456 Đường B, Phường 2, Quận B, Thành phố Y',
  },
  {
    id: 3,
    name: 'Phường 3',
    address: '789 Đường C, Phường 3, Quận C, Thành phố Z',
  },
];
