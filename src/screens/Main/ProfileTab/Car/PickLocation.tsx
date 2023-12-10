import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, PermissionsAndroid} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import {COLOR} from '../../../../constants/Theme';
import {appStyle} from '../../../../constants/AppStyle';
import AppButton from '../../../../components/AppButton';
import {useNavigation} from '@react-navigation/native';

const MapScreen = () => {
  const navigation = useNavigation();
  const [mapRef, setMapRef] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [address, setAddress] = useState('');

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Đồng ý cho phép truy cập vị trí',
          message: 'Hãy cấp quyền cho GoTraffic',
          buttonNeutral: 'Hỏi tôi sau',
          buttonNegative: 'Hủy',
          buttonPositive: 'Đồng ý',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getCurrentLocation();
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setMarkerPosition({latitude, longitude});
        convertCoordinatesToAddress(latitude, longitude);
      },
      error => {
        console.error('Error getting location:', error);
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };

  const convertCoordinatesToAddress = (latitude, longitude) => {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const address = data.display_name;
        console.log(address);
        setAddress(address);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleGetLocation = () => {
    getCurrentLocation();
  };

  const handleMarkerPress = event => {
    const {coordinate} = event.nativeEvent;
    setMarkerPosition(coordinate);
    convertCoordinatesToAddress(coordinate.latitude, coordinate.longitude);
  };

  const handleLogAddress = () => {
    console.log('Selected Address:', address);
  };
  const handleAddressPress = () => {
    if (markerPosition && mapRef) {
      const {latitude, longitude} = markerPosition;
      const region = {
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
      mapRef.animateToRegion(region, 1000); // Adjust the duration as needed
    }
  };

  return (
    <View style={{flex: 1}}>
      <MapView
        ref={ref => {
          setMapRef(ref);
          console.log('Map reference set:', ref);
        }}
        style={{flex: 1}}
        initialRegion={{
          latitude: markerPosition?.latitude || 10.7769,
          longitude: markerPosition?.longitude || 106.7009,
          latitudeDelta: 0.3,
          longitudeDelta: 0.3,
        }}
        showsUserLocation={true}
        followsUserLocation={true}
        onPress={event => handleMarkerPress(event)}>
        {markerPosition && <Marker coordinate={markerPosition} />}
      </MapView>
      <Icon
        name="arrow-back-circle-outline"
        type={IconType.Ionicons}
        size={40}
        color={COLOR.primary}
        style={{position: 'absolute', top: 10, left: 10}}
        onPress={() => {
          navigation.goBack();
        }}
      />

      {address !== '' && (
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 60,
            alignSelf: 'center',
            padding: 12,
            backgroundColor: 'white',
            borderRadius: 8,
          }}
          onPress={handleAddressPress}>
          <Text style={appStyle.text12Bold}>{address}</Text>
        </TouchableOpacity>
      )}
      <View
        style={[
          appStyle.rowBetween,
          {
            bottom: 80,
            position: 'absolute',
            alignSelf: 'center',
            width: '94%',
          },
        ]}>
        <AppButton
          width={'48%'}
          onPress={handleGetLocation}
          containerStyle={{}}
          title="Lấy vị trí hiện tại"
        />
        <AppButton
          width={'48%'}
          backgroundColor="white"
          textColor={COLOR.primary}
          onPress={handleLogAddress}
          containerStyle={{}}
          title="Lấy địa chỉ"
        />
      </View>
    </View>
  );
};

export default MapScreen;
