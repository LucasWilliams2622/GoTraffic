import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Geolocation from '@react-native-community/geolocation';

const YourMapComponent = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    // Lấy vị trí hiện tại
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      },
      error => console.log('Error getting location:', error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, []);

  const handleGetLocation = () => {
    if (location) {
      console.log('Address:', 'TODO: Get address from coordinates');
      console.log('Coordinates:', location);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: location ? location.latitude : 0,
          longitude: location ? location.longitude : 0,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {location && <Marker coordinate={location} title="Your Location" />}
      </MapView>

      <View style={styles.centerMarkerContainer}>
        <Icon name="arrow-downward" size={30} color="black" />
      </View>


      <TouchableOpacity style={styles.selectButton} onPress={handleGetLocation}>
        <Text style={styles.buttonText}>Select Location</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  centerMarkerContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -15, // width/2
    marginTop: -30, // height/2
    zIndex: 2,
  },
  selectButton: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: 'blue',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default YourMapComponent;
