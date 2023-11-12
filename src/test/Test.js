import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';

const YourComponent = () => {
  const [query, setQuery] = useState('');
  const [data, setData] = useState([]);

  const handleInputChange = async text => {
    setQuery(text);

    try {
      const apiKey = 'c3d0f188ff669f89042771a20656579073cffec5a8a69747';
      const cityId = 12;
      const circleCenter = '10.758867051669924,106.6755666901197';
      const circleRadius = 200;

      const apiUrl = `https://maps.vietmap.vn/api/autocomplete/v3?apikey=${apiKey}&cityId=${cityId}&text=${text}&circle_center=${circleCenter}&circle_radius=${circleRadius}&layers=POI`;
      const response = await axios.get(apiUrl);
      const result = response.data;

      console.log(result);

      setData(result);
    } catch (error) {
      console.error('Error fetching autocomplete data:', error);
    }
  };

  const handleItemPress = item => {
    setQuery(item.address); // Hiển thị địa chỉ đầy đủ khi chọn một mục
  };

  return (
    <View>
      <View style={{ borderWidth: 2 }}>
        <TextInput value={query} onChangeText={txt => handleInputChange(txt)} />
      </View>
      <FlatList
        data={data}
        style={{ borderWidth: 2, height: 300, }}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleItemPress(item)}>
            <Text>{item.address}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default YourComponent;
