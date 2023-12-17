import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {appStyle, windowWidth} from '../../../../constants/AppStyle';
import AppHeader from '../../../../components/AppHeader';
import {PieChart} from 'react-native-chart-kit';
import axios from 'axios';
import {COLOR} from '../../../../constants/Theme';
const numColumns = 2;

const ChartCar = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {
      const response = await axios.get(
        `http://103.57.129.166:3000/car/api/get-most-booked-car-by-user?idUser=1&isMostBooked=false`,
      );
      setData(response.data.car);
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
      '#F9F9E0',
      '#3559E0',
      '#820300',
      '#FFD1E3',
      '#FF5733',
      '#4CB9E7',
      '#33FF57',
      '#E26EE5',
      '#FFB534',
    ];
  
    const filteredData = data
      .filter(
        (item, index) =>
          item.numberOfBooked >= threshold ||
          (index < colors.length && item.numberOfBooked > 0),
      )
      .map((item, index) => ({
        ...item,
        color: item.numberOfBooked > 0 ? colors[index] : '#008000', // Màu xanh nếu số chuyến = 0
      }))
      .reverse(); // Đảo ngược lại mảng để giữ nguyên thứ tự của mảng màu sắc
  
    return filteredData;
  };

  const filteredData = filterData(data, 1);

  // Tạo mảng chú thích
  const legendData = data.map(
    item => `${item.numberOfBooked} chuyến | ${item.numberPlate}`,
  );
  return (
    <SafeAreaView style={appStyle.container}>
      <AppHeader title="Thống kê" />
      <View style={[appStyle.main, {marginBottom: 70}]}>
        <View
          style={{
            alignSelf: 'center',
            // borderWidth: 2,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'gray',
          }}>
          <PieChart
            data={filteredData}
            width={windowWidth}
            height={windowWidth * 0.6}
            chartConfig={{
              backgroundGradientFrom: COLOR.primary,
              backgroundGradientTo: COLOR.third,
              color: (opacity = 1, index) =>
                filteredData[index]?.color || `rgba(65, 207, 242, 1)`,
            }}
            accessor="numberOfBooked"
            backgroundColor="transparent"
            paddingLeft={windowWidth * 0.25}
            absolute
            hasLegend={false}
            // Hiển thị số phần trăm
            fromZero
            formatValues={(value, index) =>
              `${Math.round(
                (value /
                  filteredData.reduce(
                    (acc, cur) => acc + cur.numberOfBooked,
                    0,
                  )) *
                  100,
              )}%`
            }
          />
        </View>
        <ScrollView>
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
                    borderRadius:99 
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

export default ChartCar;

const styles = StyleSheet.create({
  legendContainer: {
    flexDirection: 'row', // Chia chú thích thành 2 cột
    justifyContent: 'space-between', // Canh giữa giữa các cột
    alignItems: 'center',
    marginTop: 10,
    flexWrap: 'wrap', // Cho phép các phần tử chuyển sang dòng mới khi không đủ không gian
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10, // Khoảng cách giữa các hàng
    width: `${100 / numColumns}%`, // Chiếm 50% chiều rộng của mỗi cột
  },
});
