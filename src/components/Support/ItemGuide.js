import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import FastImage from 'react-native-fast-image'
import { appStyle, windowHeight, windowWidth } from '../../constants/AppStyle';
import { COLOR, ICON } from '../../constants/Theme';
import AppHeader from '../AppHeader';
import { useNavigation } from '@react-navigation/native';
import { BottomSheet } from 'react-native-btr';
import Modal from 'react-native-modal';
import GuideComponent, { GuideType1, GuideType2, GuideType3 } from '../Support/GuideComponent';

const ItemGuide = (props) => {
    const navigation = useNavigation();
    const { data } = props;
    const { image, keyExtractor, id } = data;
    const [isVisible, setIsVisible] = useState(false);

    const toggleModal = () => {
        setIsVisible(!isVisible);
    }

    const renderContent = () => {
        switch (id) {
            case 1:
                return <GuideType1 />;
            case 2:
                return <GuideType2 />;
            case 3:
                return <GuideType3 />;
            default:
                return null;
        }
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
                onRequestClose={toggleModal}
                style={{ margin: 0, paddingTop: 8 }}
            >
                <AppHeader
                    title=''
                    iconLeft={'close'}
                    onPressLeft={toggleModal}
                />
                <View style={{ flex: 1, padding: 16 }}>
                    {renderContent()}
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