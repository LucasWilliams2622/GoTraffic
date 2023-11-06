import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLOR } from '../constants/Theme';
import FastImage from 'react-native-fast-image';
import { appStyle, windowHeight } from '../constants/AppStyle';
import { useNavigation } from '@react-navigation/native';


const TopNav = (props) => {
    const { text, iconLeft, iconRight, screenLeft, screenRight, backgroundColor, onPressRight } = props;
    const navigation = useNavigation();
    return (
        <View style={[styles.header, {
            backgroundColor: backgroundColor == null ? COLOR.background : backgroundColor
        }]}>
            <TouchableOpacity
                onPress={() => navigation.navigate(screenLeft)}>
                <FastImage
                    source={iconLeft}
                    style={[appStyle.icon]} />
            </TouchableOpacity>
            <Text style={[appStyle.text20, { fontWeight: '500' }]}>{text}</Text>
            <TouchableOpacity
                onPress={() => navigation.navigate(screenRight)}>
                <FastImage
                    source={iconRight}
                    style={[appStyle.icon, { marginRight: 5 }]}
                />
            </TouchableOpacity>
        </View>
    )
}

export default TopNav

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: windowHeight * 0.05,
        backgroundColor: COLOR.background,
        // backgroundColor:'blue',    
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignSelf: 'center',
        paddingHorizontal: 10,
        alignItems: 'center',
        paddingTop: 10
    },
})