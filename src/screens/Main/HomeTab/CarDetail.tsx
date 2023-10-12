import React, {useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {carDetailData} from './data/data';

const CarDetail = ({route}: any) => {
  const [index, setIndex] = useState(0);
  const {car_id} = route.params;
  const car = carDetailData.find(x => x.id == car_id);
  const viewabilityConfig = useRef({viewAreaCoveragePercentThreshold: 50});

  const onViewableItemsChanged = useRef(({viewableItems}) => {
    if (viewableItems.length > 0) {
      setIndex(viewableItems[0].index);
    }
  });

  return (
    <View>
      <Text>{car?.title}</Text>
      <FlatList
        data={car?.images}
        keyExtractor={item => item}
        pagingEnabled={true}
        renderItem={({item}) => (
          <Image
            source={{uri: item}}
            style={{width: Dimensions.get('window').width, height: 200}}
          />
        )}
        horizontal={true}
        snapToInterval={Dimensions.get('window').width}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={viewabilityConfig.current}
      />
      <Text>{`${index + 1}/${car?.images.length}`}</Text>
    </View>
  );
};

export default CarDetail;

const styles = StyleSheet.create({});
