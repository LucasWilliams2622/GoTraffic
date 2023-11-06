import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native'
import React from 'react'
import { COLOR } from '../../../constants/Theme';
import { appStyle } from '../../../constants/AppStyle';
import AppButton from '../../AppButton';

const CameraModal = ({ isVisible, onClose, onRequestCameraPermission, onChooseImage }) => {
    return (
        <Modal
            animationType='slide'
            transparent={true}
            visible={isVisible}
        >
            <TouchableOpacity
                style={appStyle.modalBackdrop}
                onPress={onClose}
            />
            <View style={appStyle.modalContainerCam}>
                <AppButton
                    title="Chụp ảnh"
                    marginTop={5}
                    onPress={onRequestCameraPermission}
                />
                <AppButton
                    title="Chọn ảnh"
                    marginTop={15}
                    backgroundColor={COLOR.background}
                    textColor={COLOR.primary}
                    onPress={onChooseImage}
                />
            </View>
        </Modal>
    )
}

export default CameraModal

const styles = StyleSheet.create({})