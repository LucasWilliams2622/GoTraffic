import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLOR } from '../../../constants/Theme'
import { appStyle } from '../../../constants/AppStyle'

const Home = () => {
    return (
        <View style={appStyle.container}>
            <View style={styles.headBg}>

            </View>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    headBg: {
        backgroundColor: COLOR.secondary,
        width:'100%',
        height:'40%',
        borderBottomLeftRadius:12,
        borderBottomRightRadius:12,

    }
})