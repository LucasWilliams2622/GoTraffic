import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useContext, useEffect, useState, useRef} from 'react';
import {
  appStyle,
  windowHeight,
  windowWidth,
} from '../../../../constants/AppStyle';
import AppHeader from '../../../../components/AppHeader';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import axios from 'axios';
import MapView, {Marker} from 'react-native-maps';
import {AppContext} from '../../../../utils/AppContext';
import {COLOR} from '../../../../constants/Theme';
import AppDropdown from '../../../../components/AppDropdown';

const MapCars = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const {idUser} = useContext(AppContext);
  const [dataLocation, setDataLocation] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const mapRef = useRef(null);
  const [showList, setShowList] = useState(false);

  const init = async () => {
    try {
      const response = await axios.get(
        `http://103.57.129.166:3000/car/api/get-all-location-car-by-user?idUser=${idUser}`,
      );
    //   console.log(response.data.location);
      if (response.data.result) {
        setDataLocation(response.data.location);
      } else {
        console.log('Error');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    init();
  }, [isFocused]);

  const handleMarkerPress = marker => {
    setSelectedMarker(marker);
    mapRef.current.animateToRegion({
      latitude: marker.latitude,
      longitude: marker.longitude,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    });
  };

  const renderListItem = ({item}) => (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => handleMarkerPress(item)}>
      <Text>{item.numberPlate}</Text>
    </TouchableOpacity>
  );
  const toggleList = () => {
    setShowList(!showList);
  };

  const classifyLocations = locations => {
    const northernLocations = [];
    const southernLocations = [];

    locations.forEach(location => {
      // Dùng điểm kinh độ (longitude) để phân loại vào từng vùng
      if (location.longitude <= 106.6) {
        northernLocations.push(location);
      } else {
        southernLocations.push(location);
      }
    });

    return {northernLocations, southernLocations};
  };

  const {northernLocations, southernLocations} =
    classifyLocations(dataLocation);

  return (
    <SafeAreaView style={appStyle.container}>
      <AppHeader title="Bản đồ xe" />

      <View style={{flex: 1, flexDirection: 'row'}}>
        {/* MapView và FlatList đều nằm trong một View cha */}
        <View style={{flex: 1}}>
          <MapView
            ref={mapRef}
            style={{flex: 1}}
            initialRegion={{
              latitude: 21.0278,
              longitude: 105.834,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}>
            {dataLocation.map(location => (
              <Marker
                key={location.id}
                coordinate={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                }}
                title={location.numberPlate}
                description={location.locationCar}
              />
            ))}
          </MapView>
        </View>

        {/* View chứa danh sách (nếu đang hiển thị) */}
        {showList && (
          <View style={styles.listContainer}>
            <Text style={styles.listTitle}>
              Danh sách xe (SL: {dataLocation.length})
            </Text>

            {northernLocations.length > 0 && (
              <View>
                <Text style={styles.listSubTitle}>
                  Bắc ({northernLocations.length}/{dataLocation.length})
                </Text>
                <FlatList
                  data={northernLocations}
                  renderItem={renderListItem}
                  keyExtractor={item => item.id.toString()}
                />
              </View>
            )}

            {southernLocations.length > 0 && (
              <View>
                <Text style={styles.listSubTitle}>
                  Nam ({southernLocations.length}/{dataLocation.length})
                </Text>
                <FlatList
                  data={southernLocations}
                  renderItem={renderListItem}
                  keyExtractor={item => item.id.toString()}
                />
              </View>
            )}
          </View>
        )}
      </View>
      <TouchableOpacity style={styles.toggleButton} onPress={toggleList}>
        <Text style={styles.toggleButtonText}>
          {showList ? 'Ẩn danh sách' : 'Hiện danh sách'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default MapCars;

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 10,
    width: windowWidth * 0.3,
    height: windowHeight * 0.75,
    
  },
  listTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  listSubTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  listItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  toggleButton: {
    position: 'absolute',
    bottom: 80,
    alignSelf: 'center',
    width: windowWidth * 0.3,
    backgroundColor: COLOR.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  toggleButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
});
