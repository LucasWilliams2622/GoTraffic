import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image';
import { appStyle } from '../../constants/AppStyle';
import { COLOR } from '../../constants/Theme';

const ItemCard = (props) => {
    // const {data, onPress} = props;
    // const {icon, text} = data || {};
    // console.log(data);

    const {icon, text} = props;
    return (
        <View style={styles.viewCard}>
            <FastImage
                source={icon}
                style={[appStyle.iconBig, { width: 33, height: 22, borderWidth:0.7 }]}
            />
            <Text style={[appStyle.text16, { marginLeft: '3%' }]}>{text}</Text>
        </View>
    )
}

export default ItemCard

const styles = StyleSheet.create({
    viewCard:{
        width: '100%', height: '10%',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: COLOR.borderColor2,
       // backgroundColor: COLOR.gray
    }
})