import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import { COLOR } from '../constants/Theme';
import FastImage from 'react-native-fast-image';
import { appStyle, windowHeight } from '../constants/AppStyle';

const Header = (props) => {
    const { text, icon, onPress, backgroundColor } = props;
    return (
        <View style={[styles.header,{
            backgroundColor: backgroundColor == null ? COLOR.background : backgroundColor
        }]}>
            <TouchableOpacity onPress={onPress}>
                <FastImage
                    source={icon}
                    style={[appStyle.icon]}
                />
            </TouchableOpacity>
            <View style={styles.textContainer}>
                <Text style={[appStyle.text20, { fontWeight: '500'}]}>
                    {text}
                </Text>
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: windowHeight * 0.05,
        backgroundColor: COLOR.background,
    //  backgroundColor:'blue',
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingTop: 10,
        alignItems: 'center',
    },
    textContainer: {
        flex: 1,
        alignItems: 'center'
    },
})
