import React from 'react';
import MapView, { UrlTile } from 'react-native-maps';
import { API_KEY_VIETMAP } from '@env'; // Đảm bảo bạn đã cài đặt và sử dụng react-native-dotenv để quản lý biến môi trường

const YourMapComponent = () => {
  const urlTemplate = `https://maps.vietmap.vn/api/tf/{z}/{x}/{y}.png?apikey=${API_KEY_VIETMAP}`;

  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: 10.7769, // Thay đổi tọa độ vùng xem ban đầu của bản đồ
        longitude: 106.7009,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      <UrlTile
        urlTemplate={urlTemplate}
        maximumZ={30} // Thay đổi tùy theo nhu cầu của bạn
        flipY={false}
      />
    </MapView>
  );
};

export default YourMapComponent;
