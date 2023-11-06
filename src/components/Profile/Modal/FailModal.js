import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image';
import { COLOR, ICON } from '../../../constants/Theme';
import { appStyle } from '../../../constants/AppStyle';

const FailModal = ({ isVisible, onCancel, onCheckBalance }) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
        >
            <View style={styles.modalCenteredContainer}>
                <View style={styles.modalSuccessBox}>
                    <FastImage style={{ width: 60, height: 60 }} source={ICON.Ban} />
                    <View >
                        <Text style={{ textAlign: 'center', fontSize: 24, marginTop: 5, fontWeight: '500', color: '#E73030' }}>Thất bại!</Text>
                        <Text style={{ textAlign: 'center', fontSize: 16, marginTop: 5 }}>Số dư ví của bạn không đủ</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent:'space-between', width:'100%' }}>
                        <TouchableOpacity style={{ width: '45%', height: 40, backgroundColor: COLOR.warn, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}
                            onPress={onCancel}>
                            <Text style={[appStyle.text16Bold, {color: COLOR.textWarn}]}>Hủy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: '45%', height: 40, backgroundColor: COLOR.blueHeader2, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}
                             onPress={onCheckBalance}>
                            <Text style={[appStyle.text16Bold, {color: COLOR.blue}]}>Kiểm tra ví</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default FailModal

const styles = StyleSheet.create({
    modalCenteredContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    modalSuccessBox: {
        backgroundColor: 'white',
        width: '80%',
        borderRadius: 8,
        padding: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

})