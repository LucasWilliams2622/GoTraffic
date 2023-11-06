import { StyleSheet, Text, View, TouchableOpacity, Modal, ScrollView } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image';
import { COLOR, ICON } from '../../../constants/Theme';
import { appStyle, windowHeight, windowWidth } from '../../../constants/AppStyle';
import AppButton from '../../AppButton';

const LicenseModal = ({ isVisible, onClose }) => {
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
            <View style={[appStyle.modalContainerCam, { padding: 15, alignItems: 'flex-start', height: windowHeight * 0.7 }]}>
                <ScrollView style={{ flex: 1 }}>
                    <FastImage source={ICON.Close} resizeMode='stretch' style={[appStyle.iconMedium, { marginBottom: 5 }]} />
                    <FastImage source={ICON.Poster} resizeMode='stretch' style={{ width: '100%', height: windowHeight * 0.2 }} />
                    <Text style={[appStyle.text165, { marginTop: 20 }]}>Xin chào quý khách hàng,</Text>
                    <Text style={{ marginTop: 5 }}>
                        Nhằm tiếp tục nâng cao chất lượng cộng đồng, cũng như bảo vệ quyền lợi của tất
                        cả các thành viên Mioto khi có sự cố ngoài ý muốn phát sinh trong quá trình thuê
                        xe. BQL Mioto xin thông báo về việc triển khai tính năng Xác thực GPLX. Các bước
                        xác thực được thực hiện online qua app/website Mioto, thời gian thao tác từ 1 - 2
                        phút, chúng tôi rất mong bạn vui lòng dành ít thời gian dể hoàn tất bước xác thực
                        này (thành viên cần xác thực Số điện thoại + GPLX để có thể gửi yêu cầu đặt xe qua Mioto).
                    </Text>
                    <Text style={[appStyle.text165, { marginTop: 20 }]}>Hướng dẫn</Text>
                    <Text style={{ marginTop: 5 }}>
                        Vào trang Cá nhân {'>'} Tài khoản {'>'} GPLX: {`\n`}
                        - Nhập số GPLX và ngày tháng năm sinh {`\n`}
                        - Tải hình chụp GPLX lên hệ thống và bấm "Xác thực"
                    </Text>
                    <View style={styles.viewNote}>
                        <Text style={[appStyle.text165]}>Ghi chú</Text>
                        <Text style={{ marginTop: 5 }}>
                            - Chỉ yêu cầu xác thực GPLX cho lần đặt xe đầu tiên {`\n`}
                            - Chỉ có chr xe có thể nhìn thấy thông tin GPLX khi bạn đang thuê xe  {`\n`}
                            - Thông tin được bảo mật tuyệt đối bởi Mioto
                        </Text>
                    </View>
                    <Text style={{ marginTop: 20 }}>
                        Rất mong nhận được sự hợp tác từ bạn, vui lòng liên hệ
                        <Text style={appStyle.text14Bold}> Mioto</Text> qua
                        <Text style={appStyle.text14Bold}> Mioto Fanpage</Text>
                        hoặc hotline <Text style={appStyle.text14Bold}> 19009217 </Text>
                        (7AM - 10PM) nếu bạn cần hỗ trợ. {`\n`}Xin chân thành cảm ơn,
                        {`\n`}{`\n`} <Text style={appStyle.text14Bold}> Mioto </Text>
                    </Text>
                    <AppButton
                        marginTop={30}
                        title="Xác thực ngay"
                        onPress={onClose}
                    />
                </ScrollView>
            </View>
        </Modal>
    )
}

export default LicenseModal

const styles = StyleSheet.create({
    viewNote: {
        marginTop: 20,
        width: '100%',
        height: 'auto',
        backgroundColor: COLOR.blueHeader2,
        padding: 10,
        borderRadius: 10
    }
})