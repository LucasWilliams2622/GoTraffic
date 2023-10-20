import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ImageView from 'react-native-image-viewing';
import {ImageViewComponentProps} from '../../../types';

export const ImageViewComponent = ({
  images,
  imageIndex,
  modalVisible,
  handleClose,
}: ImageViewComponentProps) => (
  <ImageView
    images={images}
    imageIndex={imageIndex}
    visible={modalVisible}
    onRequestClose={handleClose}
    swipeToCloseEnabled={false}
    FooterComponent={({imageIndex}) => (
      <View style={styles.indexContainer}>
        <Text style={styles.indexText}>{`${imageIndex + 1}/${
          images.length
        }`}</Text>
      </View>
    )}
  />
);

const styles = StyleSheet.create({
  indexContainer: {
    position: 'absolute',
    top: 265,
    right: 7,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  indexText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
