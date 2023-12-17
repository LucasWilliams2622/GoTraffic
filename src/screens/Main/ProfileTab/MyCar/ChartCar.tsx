import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {PieChart} from 'react-native-gifted-charts'; // Import the PieChart from react-native-gifted-charts
import axios from 'axios';
import {appStyle, windowWidth} from '../../../../constants/AppStyle';
import AppHeader from '../../../../components/AppHeader';
import {COLOR, ICON} from '../../../../constants/Theme';
import {useNavigation} from '@react-navigation/native';
const numColumns = 2;

const ChartCar = () => {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigation = useNavigation();
  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {
      const response = await axios.get(
        `http://103.57.129.166:3000/car/api/get-most-booked-car-by-user?idUser=1&isMostBooked=false`,
      );
      setData(response.data.car);
      console.log('=============', response.data.car);
    } catch (error) {
      console.log(error);
    }
  };

  const filterData = (data, threshold) => {
    if (!Array.isArray(data)) {
      console.error('Data is not an array');
      return [];
    }

    const colors = [
      '#FFE3BB',
      '#FF9800',
      '#C5FFF8',
      '#E5D4FF',
      '#FAEED1  ',
      '#D2DE32',
      '#FFD1E3',
      '#F6FDC3',
      '#4CB9E7',
      '#F875AA',
      '#E26EE5',
      '#FFB534',
      '#D2E0FB',
      '#B2533E',
      '#F4E869',
      '#5CD2E6',
    ];

    const filteredData = data
      .filter(
        (item, index) =>
          item.numberOfBooked >= threshold ||
          (index < colors.length && item.numberOfBooked > 0),
      )
      .map((item, index) => ({
        ...item,
        color: item.numberOfBooked > 0 ? colors[index] : COLOR.primary,
      }))
      .reverse();

    return filteredData;
  };

  const handleChartPress = (data, index) => {
    const selectedItemInfo = data[index];
    console.log(data);

    setSelectedItem(selectedItemInfo);
  };

  const filteredData = filterData(data, 1);

  // Tạo mảng chú thích
  const legendData = data
    .map(item => `${item.numberOfBooked} chuyến | ${item.numberPlate}`)
    .reverse();

  return (
    <SafeAreaView style={appStyle.container}>
      <AppHeader
        title="Thống kê"
        icon={ICON.location}
        onPressRight={() => navigation.navigate('MapCars')}
      />
      <View style={[appStyle.main,{marginBottom:70}]}>
        <View style={styles.chartContainer}>
          <PieChart
            strokeWidth={2}
            strokeColor="white"
            data={filteredData.map(item => ({
              value: item.numberOfBooked,
              color: item.color,
              text: `${Math.round(
                (item.numberOfBooked / filteredData.length) * 100,
              )}%`,
            }))}
            showText
            fontStyle="normal"
            textBackgroundColor="white"
            textBackgroundRadius={20}
            donut
            innerRadius={30}
            shadow
            shadowWidth={20}
            shadowColor="black"
            textColor="black"
            fontWeight="bold"
            labelsPosition="outward"
            textSize={14}
            onPress={(event, index) => handleChartPress(filteredData, index)}
          />
        </View>
        <ScrollView >
          {selectedItem && (
            <View style={styles.selectedItemContainer}>
              <Text style={styles.selectedItemText}>
                {`${selectedItem.numberOfBooked} chuyến | ${selectedItem.numberPlate}`}
              </Text>
            </View>
          )}
          <View style={styles.legendContainer}>
            {legendData.map((item, index) => (
              <View key={index} style={styles.legendItem}>
                <View
                  style={{
                    backgroundColor:
                      filteredData[index]?.color || `rgba(65, 207, 242, 1)`,
                    width: 10,
                    height: 10,
                    marginRight: 5,
                    borderRadius: 99,
                  }}
                />
                <Text style={appStyle.text14}>{item}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    width: '100%',
    borderWidth: 2,
    alignItems: 'center',
    paddingVertical: 8,
    backgroundColor: '#f6f8fa',
    borderColor: '#e3e3e3',
    borderRadius: 8,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    flexWrap: 'wrap',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: `${100 / numColumns}%`,
    padding: 4,
  },

  selectedItemContainer: {
    backgroundColor: '#fff',
    padding: 10,
    marginTop: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  selectedItemText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ChartCar;
