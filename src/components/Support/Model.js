import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppDropdown from '../AppDropdown';
import { listModal } from '../Profile/data/DataCar';
import { appStyle, windowHeight, windowWidth } from '../../constants/AppStyle';

const Model = ({ selectedBrand, selectedModel, setSelectedModel }) => {
    return (
        <View style={[appStyle.cardInfo]}>
            <View style={appStyle.rowContent}>
                <Text style={appStyle.text165}>Mẫu xe</Text>
                <AppDropdown
                    width={windowWidth * 0.3}
                    height={windowHeight * 0.04}
                    borderWidth={0}
                    labelField="label"
                    valueField="value"
                    data={listModal[selectedBrand] || []}
                    value={selectedModel}
                    onChange={(model) => {
                        setSelectedModel(model.value);
                    }}
                />
            </View>
        </View>
    )
}

export default Model

const styles = StyleSheet.create({})