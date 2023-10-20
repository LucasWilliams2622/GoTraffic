import {Row} from 'native-base';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {COLOR} from '../../../constants/Theme';
import MapView, {Circle} from 'react-native-maps';
import {CarLocationProps} from '../../../types';

export const CarLocation: React.FC<CarLocationProps> = ({
  location,
  carCoordinates,
}) => {
  return (
    <>
      <Row style={{marginTop: 15, marginBottom: 10}}>
        <Icon name="location-dot" size={20} color={COLOR.borderColor} />
        <Text style={{marginLeft: 10}}>{location}</Text>
      </Row>
      <View style={styles.container}>
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            region={{
              latitude: carCoordinates.lat,
              longitude: carCoordinates.lng,
              latitudeDelta: 0.04,
              longitudeDelta: 0.015,
            }}
            pitchEnabled={false}
            rotateEnabled={false}
            scrollEnabled={false}
            zoomEnabled={false}>
            <Circle
              center={{
                latitude: carCoordinates.lat,
                longitude: carCoordinates.lng,
              }}
              radius={1500}
              strokeWidth={1}
              strokeColor={'#1a66ff'}
              fillColor={'rgba(26, 102, 255, 0.3)'}
            />
          </MapView>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 10,
    overflow: 'hidden',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
