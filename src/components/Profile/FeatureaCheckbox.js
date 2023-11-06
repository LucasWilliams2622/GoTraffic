import { StyleSheet, Text, View } from 'react-native'
import React,{useState} from 'react'
import { Checkbox } from 'native-base';
import { appStyle } from '../../constants/AppStyle';
import { features } from './data/DataCar';

const FeatureaCheckbox = ({ features, selectedFeatures, onCheckboxChange }) => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <View style={{
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    }}>
      {features.map((feature, index) => (
        <View key={index}>
          <Checkbox
            onValueChange={value => onCheckboxChange(feature, value)}
            value={selectedFeatures.includes(feature)}
          >
            <Text style={[appStyle.text14, { width: 70 }]}>{feature}</Text>
          </Checkbox>
        </View>
      ))}
    </View>
  );
}

export default FeatureaCheckbox

const styles = StyleSheet.create({})