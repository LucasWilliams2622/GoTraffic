import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'
import { appStyle } from '../../../../../constants/AppStyle'
import { ICON } from '../../../../../constants/Theme'
import Header from '../../../../../components/Header'

const HandOverReport = (props) => {
    const { navigation } = props;
    return (
        <SafeAreaView style={appStyle.container}>
            <Header
                text="Biên bản bàn giao xe"
                icon={ICON.Back}
                onPress={() => navigation.navigate('SampleContract')}
            />
            <View style={{ width: '100%', padding: 15 }}>

            </View>
        </SafeAreaView>
    )
}

export default HandOverReport

const styles = StyleSheet.create({})