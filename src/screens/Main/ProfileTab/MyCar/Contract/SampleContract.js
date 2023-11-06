import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'
import { appStyle } from '../../../../../constants/AppStyle'
import { ICON } from '../../../../../constants/Theme'
import Header from '../../../../../components/Header'
import AppProfile from '../../../../../components/AppProfile'

const SampleContract = (props) => {
    const { navigation } = props;
    return (
        <SafeAreaView style={appStyle.container}>
            <Header
                text="Hợp đồng mẫu"
                icon={ICON.Back}
                onPress={() => navigation.navigate('HomeCar')}
            />
            <View style={{ width: '100%', padding: 15 }}>
                <AppProfile
                    icon={ICON.Trip}
                    text="Hợp đồng cho thuê"
                    onPress={() => navigation.navigate('LeaseCar')}
                />
                <AppProfile
                    icon={ICON.Trip}
                    text="Biên bản bàn giao xe"
                    onPress={() => navigation.navigate('HandOverReport')}
                />
            </View>
        </SafeAreaView>
    )
}

export default SampleContract

const styles = StyleSheet.create({})