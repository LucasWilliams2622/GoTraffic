import { StyleSheet, TouchableOpacity, Text, View, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import FastImage from 'react-native-fast-image'
import { appStyle, windowWidth } from '../../constants/AppStyle';
import { BottomSheet } from 'react-native-btr';
import ItemInsuranceHotline from './ItemInsuranceHotline';
import { COLOR } from '../../constants/Theme';
import dataSample from '../../screens/data'

const ItemInsurance = (props) => {
    const { data } = props;
    const { id, image,  } = data;
    const [isVisible, setIsVisible] = useState(false);

    const toggleBottomSheet = () => {
        setIsVisible(!isVisible);
    };

    return (
        <View>
            <TouchableOpacity style={{ marginRight: id != 3 ? 10 : 32, borderWidth: .5, borderRadius: 6, borderColor: '#787878' }}
                onPress={() => { { toggleBottomSheet() } }}>
                <FastImage style={styles.image} resizeMode={'stretch'} source={image} />
            </TouchableOpacity>

            <BottomSheet
                visible={isVisible}
                onBackButtonPress={() => toggleBottomSheet()}
                onBackdropPress={() => toggleBottomSheet()}
            >
                <View style={appStyle.modalContentBottom}>
                    <TouchableOpacity onPress={() => toggleBottomSheet()}>
                        <FastImage style={[appStyle.iconSmall, { marginBottom: 20 }]} source={require('../../assets/icon/ic_close.png')} />
                    </TouchableOpacity>

                    <FlatList
                        data={dataSample.DataInsurance}
                        shouldRasterizeIOS={true}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => <ItemInsuranceHotline data={item} />}
                        keyExtractor={item => item.id}
                    />
                </View>
            </BottomSheet>
        </View>
    )
}

export default ItemInsurance

const styles = StyleSheet.create({
    image: {
        width: windowWidth * 0.32,
        height: 120,
        borderRadius: 20
    }
})