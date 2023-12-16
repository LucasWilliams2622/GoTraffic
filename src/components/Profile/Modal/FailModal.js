import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image';
import { COLOR, ICON } from '../../../constants/Theme';
import { appStyle, windowHeight, windowWidth } from '../../../constants/AppStyle';

const FailModal = ({ isVisible, onCancel, onCheckBalance, title, text, nextStep }) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
        >
            <TouchableOpacity style={styles.modalBackdrop} onPress={onCancel} />

            <View style={styles.modalContainer}>
                <FastImage style={{ width: 60, height: 60 }} source={ICON.Ban} />
                <View >
                    <Text style={{ textAlign: 'center', fontSize: 24, marginTop: 5, fontWeight: '500', color: '#E73030' }}>{title}</Text>
                    <Text style={{ textAlign: 'center', fontSize: 16, marginTop: 5 }}>{text}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                    <TouchableOpacity style={{ width: '45%', height: 40, backgroundColor: COLOR.warn, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}
                        onPress={onCancel}>
                        <Text style={[appStyle.text16Bold, { color: COLOR.textWarn }]}>Hủy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: '45%', height: 40, backgroundColor: COLOR.blueHeader2, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}
                        onPress={onCheckBalance}>
                        <Text style={[appStyle.text16Bold, { color: COLOR.blue }]}>{nextStep}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default FailModal

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: 'white',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [
          {translateX: -windowWidth * 0.45},
          {translateY: -windowHeight * 0.14},
        ],
        width: windowWidth * 0.9,
        height: windowHeight * 0.28,
        borderRadius: 12,
        paddingHorizontal: 25,
        paddingBottom: 10,
        alignSelf: 'center',
        alignItems: 'center',
        paddingTop: 30
      },
      modalBackdrop: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background color
        justifyContent: 'center',
        alignItems: 'center',
      },

})