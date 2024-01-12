import React, {useReducer,us} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';
import {Itemlist} from './ItemList'; // Assuming the correct filename is 'Itemlist'

const TestList = () => {
  const data = new Array(20).fill(0).map((_, index) => ({id: index}));
  const viewableItems = useSharedValue<ViewToken[]>([]);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        contentContainerStyle={{paddingTop: 40}}
        decelerationRate={'fast'}
        onViewableItemsChanged={({viewableItems: vItems}) => {
          viewableItems.value = vItems;
        }}
        bounces={false}
        renderItem={({item}) => {
          return <Itemlist item={item} viewableItems={viewableItems} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default TestList;
