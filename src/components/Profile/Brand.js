import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppDropdown from '../AppDropdown';
import { listBrand } from './data/DataCar';
import { appStyle, windowHeight, windowWidth } from '../../constants/AppStyle';

const Brand = ({ selectedBrand, setSelectedBrand }) => {
  return (
    <View style={[appStyle.cardInfo]}>
      <View style={appStyle.rowContent}>
        <Text style={appStyle.text165}>Hãng xe</Text>
        <AppDropdown
          width={windowWidth * 0.3}
          height={windowHeight * 0.04}
          borderWidth={0}
          labelField="label"
          valueField="value"
          data={listBrand}
          value={selectedBrand}
          onChange={(brand) => {
            setSelectedBrand(brand.value);
            //setSelectedModel(null);
          }}
        />
      </View>
    </View>
  );
}

export default Brand

const styles = StyleSheet.create({})