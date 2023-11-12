import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import axios from 'axios';
import {REACT_APP_GOOGLE_MAPS_API_KEY} from '@env';
import Geolib from 'geolib';

const MapScreen = () => {
  const [markerPosition, setMarkerPosition] = useState(null);
  const [address, setAddress] = useState('');

  const handleGetLocation = async () => {
    if (markerPosition) {
      const {latitude, longitude} = markerPosition;
      const apiKey = REACT_APP_GOOGLE_MAPS_API_KEY;
      const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
      console.log(latitude, longitude);

      try {
        convertCoordinatesToAddress(latitude, longitude);
      } catch (error) {
        console.error('Lỗi khi gọi API:', error.message);
      }
    }
  };
  const convertCoordinatesToAddress = (latitude, longitude) => {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const address = data.display_name;
        console.log(address);
      })
      .catch(error => {
        console.error(error);
      });
  };
  const handleMarkerPress = event => {
    const {coordinate} = event.nativeEvent;
    setMarkerPosition(coordinate);
  };

  return (
    <View style={{flex: 1}}>
      <MapView style={{flex: 1}} onPress={event => handleMarkerPress(event)}>
        {markerPosition && <Marker coordinate={markerPosition} />}
      </MapView>
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 16,
          alignSelf: 'center',
          padding: 12,
          backgroundColor: 'blue',
          borderRadius: 8,
        }}
        onPress={handleGetLocation}>
        <Text style={{color: 'white'}}>Lấy địa chỉ</Text>
      </TouchableOpacity>
      {address !== '' && (
        <View
          style={{
            position: 'absolute',
            bottom: 80,
            alignSelf: 'center',
            padding: 12,
            backgroundColor: 'white',
            borderRadius: 8,
          }}>
          <Text>{address}</Text>
        </View>
      )}
    </View>
  );
};

export default MapScreen;
