import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import FastImage from 'react-native-fast-image'
import { appStyle, windowHeight, windowWidth } from '../../constants/AppStyle';
import { COLOR, ICON } from '../../constants/Theme';


export const GuideType1 = () => {
    return (
        
        <ScrollView
            style={{ marginBottom: 10 }}
            shouldRasterizeIOS
            showsVerticalScrollIndicator={false}>
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
    )
}

export const GuideType3 = () => {
    return (
        <ScrollView
            style={{ marginBottom: 10 }}
            shouldRasterizeIOS
            showsVerticalScrollIndicator={false}>
            <FastImage resizeMode='stretch' style={{ width: '100%', height: windowHeight * 0.2, borderRadius: 8 }} source={require('../../assets/image/banner-vietqr.png')} />
            <Text style={[{ fontSize: 24, fontWeight: '500', marginTop: 20, alignSelf: 'center' }]}>Thanh toán trực tiếp - Ví điện tử</Text>
            <Text style={{ fontSize: 16, textAlign: 'left' }}>
                Bạn cần có tài khoản ví điện tử phía trên để thanh toán bằng hình thức
                này. Các bước thực hiện khá đơn giản: {`\n`}Chọn VNPay - bấm thanh toán
                để chuyển đến ví điện tử - Nhập các thông tin tài khoản hoặc quét mã thanh toán.
            </Text>
        </ScrollView>
    )
}

export const GuideType2 = () => {
    return (
        <ScrollView
            style={{ marginBottom: 10 }}
            shouldRasterizeIOS
            showsVerticalScrollIndicator={false}>
            <View>
                <Text style={{ fontSize: 20, color: 'black', fontWeight: '500' }}>1. Tìm kiếm xe</Text>
                <Text>Bạn có thể tìm xe theo 3 cách sau:</Text>
                <Text style={{ fontSize: 16, fontWeight: '500' }}>A. Tìm theo địa chỉ bạn nhập ở thanh tìm kiếm</Text>
                <FastImage resizeMode='stretch' style={{ width: '75%', height: windowHeight * 0.35, alignSelf: 'center' }} source={require('../../assets/image/img_find1.png')} />
                <Text style={{ fontSize: 16, fontWeight: '500' }}>B. Tìm theo danh mục các địa điểm nổi bật</Text>
                <FastImage resizeMode='stretch' style={{ width: '75%', height: windowHeight * 0.42, alignSelf: 'center' }} source={require('../../assets/image/img_find2.png')} />
            </View>

            <View style={{ marginTop: 15 }}>
                <Text style={{ fontSize: 20, color: 'black', fontWeight: '500' }}>2. Gửi yêu cầu thuê xe</Text>
                <View>
                    <Text style={{ fontSize: 16, fontWeight: '500' }}>A. Kiểm tra thông tin xe</Text>
                    <Text style={{ fontSize: 16 }}>
                        Hình ảnh xe, số chuyến đi đã thực hiện, đánh giá của các khách thuê, mô tả
                        xe và các tính năng liên quan.
                    </Text>
                </View>
                <View style={{ marginTop: 5 }}>
                    <Text style={{ fontSize: 16, fontWeight: '500' }}>B. Kiểm tra yêu cầu giấy tờ thuê xe và xem thông tin chủ xe:</Text>
                    <Text style={{ fontSize: 16 }}>
                        • Khách hàng vui lòng kiểm tra kĩ phần giấy tờ yêu cầu của chủ xe để đảm bảo đủ điều kiện
                        thuê xe, hạn chế các trường hợp hủy chuyến sau khi đã đặt cọc vì không đáp ứng đủ giấy tờ. {`\n`}
                        • Trường hợp khách hàng cần hỗ trợ vui lòng liên hệ bộ phận CSKH của GoTraffic tại 1900 6432
                        hoặc nhắn tin Fanpage GoTraffic để được tư vấn.
                    </Text>
                </View>
                <View style={{ marginTop: 5 }}>
                    <Text style={{ fontSize: 16, fontWeight: '500' }}>C. Kiểm tra giá, thời gian thuê, địa điểm giao nhận xe</Text>
                    <Text style={{ fontSize: 16 }}>
                        • Nếu tổng thời gian thuê dưới 24h sẽ làm tròn là 1 ngày. Bạn cần điều chỉnh thời gian cho phù hợp
                        để dễ dàng thuê xe bạn nhé.{`\n`}
                        • Đọc kỹ các thông tin về phụ phí và giới hạn quãng đường di chuyển để kiểm tra giá cho chuyến đi
                    </Text>
                </View>

            </View>

            <View style={{ marginTop: 15 }}>
                <Text style={{ fontSize: 20, color: 'black', fontWeight: '500' }}>3. Phê duyệt yêu cầu thuê xe</Text>
                <Text style={{ fontSize: 16 }}>
                    Sau khi gửi yêu cầu thuê xe, chủ xe sẽ nhận thông báo và xem xét yêu cầu thuê xe của bạn.
                    Nếu được duyệt bạn sẽ tiến hành bước tiếp theo.
                </Text>
            </View>

            <View style={{ marginTop: 15 }}>
                <Text style={{ fontSize: 20, color: 'black', fontWeight: '500' }}>4. Nhận phản hồi 'Yêu cầu thuê xe</Text>
                <Text style={{ fontSize: 16 }}>Bạn sẽ được nhận thông báo phản hồi yêu cầu thuê xe của bạn có được duyệt hay không</Text>
            </View>

            <View style={{ marginTop: 15 }}>
                <Text style={{ fontSize: 20, color: 'black', fontWeight: '500' }}>5. Tiến hành đặt cọc</Text>
                <Text>
                    Sau khi bạn nhận được phản hồi đồng ý từ chủ xe, bạn vui lòng thanh toán đặt cọc 30%
                    tiền thuê xe trong thời gian sớm nhất để hoàn tất quá trình đặt xe (phần tiền 70%
                    còn lại bạn sẽ thanh toán trực tiếp cho chủ xe khi nhận xe).
                </Text>
            </View>

            <View style={{ marginTop: 15 }}>
                <Text style={{ fontSize: 20, color: 'black', fontWeight: '500' }}>6. Hoàn tất đặt xe</Text>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({})