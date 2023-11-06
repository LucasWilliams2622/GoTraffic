import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppDropdown from '../AppDropdown';
import { appStyle, windowHeight, windowWidth } from '../../constants/AppStyle';

const Year = ({ selectedYear, setSelectedYear }) => {
    const productionYears = [];
    for (let year = 2008; year <= 2023; year++) {
        productionYears.push({ label: year.toString(), value: year.toString() });
    }

    return (
        <View style={[appStyle.cardInfo]}>
            <View style={appStyle.rowContent}>
                <Text style={appStyle.text165}>Năm sản xuất</Text>
                <AppDropdown
                    width={windowWidth * 0.3}
                    height={windowHeight * 0.04}
                    borderWidth={0}
                    labelField="label"
                    valueField="value"
                    data={productionYears}
                    value={selectedYear}
                    onChange={(year) => {
                        setSelectedYear(year.value);
                    }}
                />
            </View>
        </View>
    );
}

export default Year

const styles = StyleSheet.create({})