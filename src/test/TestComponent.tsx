import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import ImagePickerComponent from '../components/ImagePickerComponent';

const TestComponent = () => {
  const [selectedImagePath, setSelectedImagePath] = useState(null);

  const handleImageSelected = path => {
    // Handle the image path in the parent component
    setSelectedImagePath(path);
  };
  return (
    <View>
      <ImagePickerComponent onImageSelected={handleImageSelected}/>
    </View>
  );
};

export default TestComponent;

const styles = StyleSheet.create({});
