import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import FastImage from 'react-native-fast-image'
import { appStyle, windowHeight, windowWidth } from '../../constants/AppStyle';
import { COLOR, ICON } from '../../constants/Theme';

const GuideComponent = () => {
  return (
    <View>
      <Text>GuideComponent</Text>
    </View>
  )
}

export default GuideComponent

export const GuideType1 = ()=>{
    <ScrollView
    style={{ marginBottom: 10 }}
    shouldRasterizeIOS
    showsHorizontalScrollIndicator={false}>
    <FastImage resizeMode='stretch' style={{ width: '100%', height: windowHeight * 0.2, borderRadius: 8 }} source={require('../../assets/image/bgCar.jpg')} />
    <Text style={{ fontSize: 14, marginTop: 5 }}>
        Để chuẩn bị cho chuyến đi sắp tới được diễn ra thuận lợi,
        GoTraffic xin gửi đến bạn một số điểm lưu ý cần chuẩn bị, chi tiết như sau:
    </Text>
    <View style={{ marginTop: 20 }}>
        <Text style={appStyle.text165}>I. Sau khi đặt xe / Trước ngày đi</Text>
        <Text style={{ fontSize: 16, color: COLOR.primary, marginTop: 8 }}>Liên hệ chủ xe - Chuẩn bị giấy tờ</Text>
        <Text style={{ textAlign: 'justify' }}>
            • Liên hệ xác nhận lại với chủ xe về lịch trình thuê xe, giấy tờ thuê xe, địa điểm giao nhận xe,
            các phụ phí thuê xe khác (trả xe trễ, phí vệ sinh nếu xe bẩn/có mùi).
        </Text>
        <Text style={{ textAlign: 'justify' }}>
            • Chuẩn bị đầy đủ giấy tờ thuê xe theo như yêu cầu: GPLX và CCCD gắn chip (hoặc Passport);
            và tài sản thế chấp (tiền mặt/chuyển khoản cho chủ xe hoặc Xe máy kèm cà vẹt gốc).

        </Text>
        <Text style={{ textAlign: 'justify' }}>
            • Nếu thay đổi kế hoạch thuê xe, bạn vui lòng hủy chuyến trong thời gian sớm nhất
            (trong vòng 1h sau khi đặt cọc hoặc {'>'}7 ngày trước chuyến đi) để không bị tính/ giảm phí hủy chuyến.

        </Text>
    </View>

    <View>
        <Text style={appStyle.text165}>II. Nhận xe</Text>
        <Text style={{ fontSize: 16, color: COLOR.primary, marginTop: 8 }}>
            Kiểm tra xe - Chụp hình hiện trạng - Kí hợp đồng & biên bản nhận xe • Nhận xe đúng hẹn.

        </Text>
        <Text style={{ textAlign: 'justify' }}>
            • Cùng chủ xe kiểm tra & chụp hình tình trạng xe khi nhận: 10-15 hình ảnh nội thất,
            ngoại thất, công tơ mét, kim xăng... để hạn chế tranh chấp phát sinh khi hoàn trả xe.

        </Text>
        <Text style={{ textAlign: 'justify' }}>
            •  Lưu lại hình ảnh trên điện thoại hoặc lưu trực tiếp trên ứng dụng GoTraffic
            (tại phần Thông tin chuyển → Hình ảnh chuyến).

        </Text>
        <Text style={{ textAlign: 'justify' }}>
            • Kí hợp đồng thuê xe.
        </Text>
        <Text style={{ textAlign: 'justify' }}>
            • Kí biên bản bàn giao xe (ghi nhận tình trạng xe lúc bàn giao, công
            tơ mét, kim xăng, các vết trầy xước đã có trước đó, thông tin giấy tờ
            bàn giao và tài sản thế chấp).
        </Text>
        <Text style={{ textAlign: 'justify' }}>
            •  Ki 2 bộ, mỗi bên giữ lại 1 bộ.
        </Text>
    </View>

    <View style={{ marginTop: 15 }}>
        <Text style={appStyle.text165}>III. Trong lúc thuê</Text>
        <Text style={{ fontSize: 16, color: COLOR.primary, marginTop: 8 }}>Bảo hiểm thuê xe</Text>
        <Text style={{ textAlign: 'justify' }}>
            • Nếu có sự cố trong quá trình sử dụng xe, bạn vui lòng thông báo
            sớm nhất cho chủ xe & thông báo cho nhà bảo hiểm để ghi nhận sự vụ và được hỗ trợ kịp thời (nếu xe có hỗ trợ Bảo hiểm thuê xe).
        </Text>
    </View>

    <View style={{ marginTop: 15 }}>
        <Text style={appStyle.text165}>IV. Trả xe</Text>
        <Text style={{ fontSize: 16, color: COLOR.primary, marginTop: 8 }}>Kiểm tra xe - Kí biên bản trả xe</Text>
        <Text style={{ textAlign: 'justify' }}>
            • Trả xe đúng hẹn (nếu cần phải trả xe trễ, bạn nên thông báo sớm với chủ
            xe để thỏa thuận & chủ xe có thể chủ động sắp xếp cho các khách hàng sau đó).
        </Text>
        <Text style={{ textAlign: 'justify' }}>
            • Kiểm tra tình trjang xe khi hoàn trả và kí biên bản bàn giao đã trả xe
            (khách thuê giữ lại 1 bản). Trường hợp xe gặp sự cố phát sinh phí sửa chữa, chủ xe và khách thuê
            cùng thương lượng và thỏa thuận trên tinh thần hợp tác.
        </Text>
    </View>

    <View style={{ marginTop: 15 }}>
        <Text style={appStyle.text165}>V. Cuối cùng</Text>
        <Text style={{ fontSize: 16, color: COLOR.primary, marginTop: 8 }}>Hỗ trợ khách hàng từ GoTraffic</Text>
        <Text style={{ textAlign: 'justify' }}>
            • Nếu gặp bất kì khó khăn nào trong suốt quá trình thuê xe, bạn vui lòng liên hệ GoTraffic tại 1900 9217 (9AM-9PM),
            GoTraffic luôn bên cạnh để hỗ trợ bạn.
        </Text>
    </View>
</ScrollView>
}

const styles = StyleSheet.create({})