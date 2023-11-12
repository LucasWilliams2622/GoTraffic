import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Alert, StyleSheet} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import {REACT_APP_GOOGLE_MAPS_API_KEY} from '@env'

const YourMapComponent = () => {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState('');

  useEffect(() => {
    // Lấy vị trí hiện tại
  
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setLocation({latitude, longitude});
        convertCoordinatesToAddress(latitude, longitude);
        console.log(latitude, longitude);
        
      },
      error => console.log('Error getting location:', error),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );

    
  }, []);
 
  const convertCoordinatesToAddress = (latitude, longitude) => {
    Geolocation.setRNConfiguration({ skipPermissionRequests: true });
  
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
  
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${REACT_APP_GOOGLE_MAPS_API_KEY}`)
          .then(response => response.json())
          .then(responseJson => {
            const addressArrow = responseJson.results[0].formatted_address;
            console.log("addressArrow",addressArrow);
            setAddress(addressArrow)
          })
          .catch(error => {
            console.error(error);
          });
      },
      error => {
        console.error(error);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };
  
  const handleGetLocation = () => {
    if (location) {
      Alert.alert('Selected Location', address || 'Address not available');
    }
  };
  return (
    <View style={styles.container}>
      {location && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Marker coordinate={location} title="Your Location" />
        </MapView>
      )}

      <View
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          marginLeft: -15,
          marginTop: -30,
          zIndex: 2,
        }}>
        <Icon name="arrow-downward" size={30} color="black" />
      </View>

      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 16,
          left: 16,
          right: 16,
          backgroundColor: 'blue',
          padding: 16,
          borderRadius: 8,
          alignItems: 'center',
        }}
        onPress={handleGetLocation}>
        <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
          Select Location
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default YourMapComponent;
