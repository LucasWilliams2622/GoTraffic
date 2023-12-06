import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MapView, {Marker} from 'react-native-maps';

import {SafeAreaView} from 'react-native-safe-area-context';
import AppHeader from '../../../../components/AppHeader';
import {appStyle} from '../../../../constants/AppStyle';

const GPSMarker = props => {
  const {data} = props.route.params;
  const marker = {
    latitude: data.latitude,
    longitude: data.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
    name: 'Location car',
  };
  return (
    <SafeAreaView style={appStyle.container}>
      <AppHeader title="GPS của xe" />
      <MapView
        style={{flex: 1}}
        initialRegion={{
          latitude: data.latitude,
          longitude: data.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation>
        <Marker coordinate={marker}></Marker>
      </MapView>
    </SafeAreaView>
  );
};

export default GPSMarker;

const styles = StyleSheet.create({});
