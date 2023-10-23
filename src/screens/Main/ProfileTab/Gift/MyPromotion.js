import { StyleSheet, SafeAreaView, Text, View } from 'react-native'
import React from 'react'
import { ICON } from '../../../../constants/Theme';
import Header from '../../../../components/Header';
import { appStyle } from '../../../../constants/AppStyle';

const MyPromotion = (props) => {
    const { navigation } = props;
    return (
        <SafeAreaView style={appStyle.container}>
            <Header
                text="Quà tặng"
                icon={ICON.Back}
                onPress={() => navigation.navigate('Profile')}
            />
        </SafeAreaView>
    )
}

export default MyPromotion

const styles = StyleSheet.create({})