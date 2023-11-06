import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import AppDropdown from '../AppDropdown';
import { appStyle, windowHeight, windowWidth } from '../../constants/AppStyle';
import { COLOR } from '../../constants/Theme';

const OptionDropdown = ({ options, selectedOption, setSelectedOption }) => {
  return (
    <View style={{ flexDirection: 'row', backgroundColor: COLOR.gray, borderRadius: 8 }}>
      {options.map((option) => (
        <TouchableOpacity
          key={option.value}
          style={[
            {
              marginHorizontal: 0,
              backgroundColor: selectedOption === option.value ? 'black' : 'transparent',
              borderRadius: 8,
              padding: 5,
            },
          ]}
          onPress={() => {
            setSelectedOption(option.value);
          }}
        >
          <Text style={{
            fontSize: 16,
            marginHorizontal: 3,
            color: selectedOption === option.value ? 'white' : 'black',
            fontWeight: selectedOption === option.value ? 'bold' : 'normal'
          }}>{option.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

export default OptionDropdown

const styles = StyleSheet.create({})