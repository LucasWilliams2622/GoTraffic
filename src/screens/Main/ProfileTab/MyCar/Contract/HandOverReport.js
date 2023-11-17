import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'
import { appStyle } from '../../../../../constants/AppStyle'
import { ICON } from '../../../../../constants/Theme'
import Header from '../../../../../components/Header'
import AppHeader from '../../../../../components/AppHeader'

const HandOverReport = (props) => {
    const { navigation } = props;
    return (
        <SafeAreaView style={appStyle.container}>
            <AppHeader
                title='Biên bản giao xe'
            />
            <View style={{ width: '100%', padding: 15 }}>

            </View>
        </SafeAreaView>
    )
}

export default HandOverReport

const styles = StyleSheet.create({})