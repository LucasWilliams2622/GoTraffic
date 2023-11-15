import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import FastImage from 'react-native-fast-image'
import { appStyle, windowHeight, windowWidth } from '../../constants/AppStyle';
import { COLOR, ICON } from '../../constants/Theme';
import AppHeader from '../AppHeader';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';

const ItemGuide = (props) => {
    const navigation = useNavigation();
    const { data } = props;
    const { image, keyExtractor, id } = data;
    const [isVisible, setIsVisible] = useState(false);

    const toggleModal = () => {
        setIsVisible(!isVisible);
    }

    return (
        <View>
            <TouchableOpacity style={{ marginRight: id != 5 ? 8 : 32 }} onPress={() => { { toggleModal() } }}>
                <FastImage style={styles.image} resizeMode={'stretch'} source={image} />
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={false}
                visible={isVisible}

            >
                <View style={{ paddingHorizontal: 15, flex: 1 }}>
                    <AppHeader
                        title='Chuẩn bị trước chuyến đi'
                        iconLeft={ICON.Close}
                        onPress={() => navigation.goBack()}
                    />
                   

                </View>

            </Modal>
        </View>


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