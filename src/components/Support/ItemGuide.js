import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image'
import { windowWidth } from '../../constants/AppStyle';

const ItemGuide = (props) => {
    const { data } = props;
    const { image, keyExtractor, id } = data;
    return (
        <TouchableOpacity style={{ marginRight: id != 5 ? 8 : 32 }} onPress={() => { { } }}>
            <FastImage style={styles.image} resizeMode={'stretch'} source={image} />
        </TouchableOpacity>
    )
}

export default ItemGuide

const styles = StyleSheet.create({
    image: {
        width: windowWidth * 0.8,
        height: 200,
        borderRadius: 16
    }
})