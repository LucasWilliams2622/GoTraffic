import React, {useState} from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {carDetailData} from './data/data';
import Carousel from 'react-native-snap-carousel';

const CarDetail = ({route}: any) => {
  const [index, setIndex] = useState(0);
  const {car_id} = route.params;
  const car = carDetailData.find(x => x.id == car_id);
  const itemWidth = Dimensions.get('window').width;
  const snapToInterval = itemWidth + 10;

  const renderItem = ({item}: any) => (
    <Image
      source={{uri: item}}
      style={{width: Dimensions.get('window').width, height: 200}}
    />
  );

  return (
    <View>
      {car ? (
        <View>
          <Carousel
            data={car.images}
            renderItem={renderItem}
            sliderWidth={Dimensions.get('window').width}
            itemWidth={itemWidth}
            snapToInterval={snapToInterval}
            onSnapToItem={(index: number) => setIndex(index)}
          />
          <View style={styles.indexContainer}>
            <Text style={styles.indexText}>{`${index + 1}/${
              car.images.length
            }`}</Text>
          </View>
          <Text>{car.title}</Text>
        </View>
      ) : (
        <Text>Car not found</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  indexContainer: {
    position: 'absolute',
    bottom: 25,
    right: 7,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  indexText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CarDetail;
