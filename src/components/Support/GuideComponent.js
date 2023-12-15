import {
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import FastImage from 'react-native-fast-image';
import {appStyle, windowHeight, windowWidth} from '../../constants/AppStyle';
import {COLOR, ICON} from '../../constants/Theme';

export const GuideType1 = () => {
  return (
    <ScrollView
      style={{marginBottom: 10}}
      shouldRasterizeIOS
      showsVerticalScrollIndicator={false}>
      <FastImage
        resizeMode="stretch"
        style={{width: '100%', height: windowHeight * 0.2, borderRadius: 8}}
        source={require('../../assets/image/bgCar.jpg')}
      />
      <Text style={[appStyle.text14, {marginTop: 5, lineHeight: 18}]}>
        Để chuẩn bị cho chuyến đi sắp tới được diễn ra thuận lợi, GoTraffic xin
        gửi đến bạn một số điểm lưu ý cần chuẩn bị, chi tiết như sau:
      </Text>
      <View style={{marginTop: 20}}>
        <Text style={appStyle.text165}>I. Sau khi đặt xe / Trước ngày đi</Text>
        <Text style={{fontSize: 16, color: COLOR.primary, marginTop: 8}}>
          Liên hệ chủ xe - Chuẩn bị giấy tờ
        </Text>
        <Text style={[appStyle.text14, {textAlign: 'justify', lineHeight: 18}]}>
          • Liên hệ xác nhận lại với chủ xe về lịch trình thuê xe, giấy tờ thuê
          xe, địa điểm giao nhận xe, các phụ phí thuê xe khác (trả xe trễ, phí
          vệ sinh nếu xe bẩn/có mùi).
        </Text>
        <Text style={[appStyle.text14, {textAlign: 'justify', lineHeight: 18}]}>
          • Chuẩn bị đầy đủ giấy tờ thuê xe theo như yêu cầu: GPLX và CCCD gắn
          chip (hoặc Passport); và tài sản thế chấp (tiền mặt/chuyển khoản cho
          chủ xe hoặc Xe máy kèm cà vẹt gốc).
        </Text>
        <Text style={[appStyle.text14, {textAlign: 'justify', lineHeight: 18}]}>
          • Nếu thay đổi kế hoạch thuê xe, bạn vui lòng hủy chuyến trong thời
          gian sớm nhất (trong vòng 1h sau khi đặt cọc hoặc {'>'}7 ngày trước
          chuyến đi) để không bị tính/ giảm phí hủy chuyến.
        </Text>
      </View>

      <View>
        <Text style={[appStyle.text165, {marginTop: 20}]}>II. Nhận xe</Text>
        <Text style={{fontSize: 16, color: COLOR.primary, marginTop: 8}}>
          Kiểm tra xe - Chụp hình hiện trạng - Kí hợp đồng & biên bản nhận xe •
          Nhận xe đúng hẹn.
        </Text>
        <Text style={[appStyle.text14, {textAlign: 'justify', lineHeight: 18}]}>
          • Cùng chủ xe kiểm tra & chụp hình tình trạng xe khi nhận: 10-15 hình
          ảnh nội thất, ngoại thất, công tơ mét, kim xăng... để hạn chế tranh
          chấp phát sinh khi hoàn trả xe.
        </Text>
        <Text style={[appStyle.text14, {textAlign: 'justify', lineHeight: 18}]}>
          • Lưu lại hình ảnh trên điện thoại hoặc lưu trực tiếp trên ứng dụng
          GoTraffic (tại phần Thông tin chuyển → Hình ảnh chuyến).
        </Text>
        <Text style={[appStyle.text14, {textAlign: 'justify', lineHeight: 18}]}>
          • Kí hợp đồng thuê xe.
        </Text>
        <Text style={[appStyle.text14, {textAlign: 'justify', lineHeight: 18}]}>
          • Kí biên bản bàn giao xe (ghi nhận tình trạng xe lúc bàn giao, công
          tơ mét, kim xăng, các vết trầy xước đã có trước đó, thông tin giấy tờ
          bàn giao và tài sản thế chấp).
        </Text>
        <Text style={[appStyle.text14, {textAlign: 'justify', lineHeight: 18}]}>
          • Ki 2 bộ, mỗi bên giữ lại 1 bộ.
        </Text>
      </View>

      <View style={{marginTop: 15}}>
        <Text style={appStyle.text165}>III. Trong lúc thuê</Text>
        <Text style={{fontSize: 16, color: COLOR.primary, marginTop: 8}}>
          Bảo hiểm thuê xe
        </Text>
        <Text style={[appStyle.text14, {textAlign: 'justify', lineHeight: 18}]}>
          • Nếu có sự cố trong quá trình sử dụng xe, bạn vui lòng thông báo sớm
          nhất cho chủ xe & thông báo cho nhà bảo hiểm để ghi nhận sự vụ và được
          hỗ trợ kịp thời (nếu xe có hỗ trợ Bảo hiểm thuê xe).
        </Text>
      </View>

      <View style={{marginTop: 15}}>
        <Text style={appStyle.text165}>IV. Trả xe</Text>
        <Text style={{fontSize: 16, color: COLOR.primary, marginTop: 8}}>
          Kiểm tra xe - Kí biên bản trả xe
        </Text>
        <Text style={[appStyle.text14, {textAlign: 'justify', lineHeight: 18}]}>
          • Trả xe đúng hẹn (nếu cần phải trả xe trễ, bạn nên thông báo sớm với
          chủ xe để thỏa thuận & chủ xe có thể chủ động sắp xếp cho các khách
          hàng sau đó).
        </Text>
        <Text style={[appStyle.text14, {textAlign: 'justify', lineHeight: 18}]}>
          • Kiểm tra tình trjang xe khi hoàn trả và kí biên bản bàn giao đã trả
          xe (khách thuê giữ lại 1 bản). Trường hợp xe gặp sự cố phát sinh phí
          sửa chữa, chủ xe và khách thuê cùng thương lượng và thỏa thuận trên
          tinh thần hợp tác.
        </Text>
      </View>

      <View style={{marginTop: 15}}>
        <Text style={appStyle.text165}>V. Cuối cùng</Text>
        <Text style={{fontSize: 16, color: COLOR.primary, marginTop: 8}}>
          Hỗ trợ khách hàng từ GoTraffic
        </Text>
        <Text style={[appStyle.text14, {textAlign: 'justify', lineHeight: 18}]}>
          • Nếu gặp bất kì khó khăn nào trong suốt quá trình thuê xe, bạn vui
          lòng liên hệ GoTraffic tại 1900 9217 (9AM-9PM), GoTraffic luôn bên
          cạnh để hỗ trợ bạn.
        </Text>
      </View>
    </ScrollView>
  );
};

export const GuideType3 = () => {
  return (
    <ScrollView
      style={{marginBottom: 10}}
      shouldRasterizeIOS
      showsVerticalScrollIndicator={false}>
      <FastImage
        resizeMode="stretch"
        style={{width: '100%', height: windowHeight * 0.2, borderRadius: 8}}
        source={require('../../assets/image/banner-vietqr.png')}
      />
      <Text
        style={[
          {
            fontSize: 24,
            color: COLOR.forth,
            fontWeight: '500',
            marginTop: 20,
            alignSelf: 'center',
          },
        ]}>
        Thanh toán trực tiếp - Ví điện tử
      </Text>
      <Text style={[appStyle.text16, {textAlign: 'left'}]}>
        Bạn cần có tài khoản ví điện tử phía trên để thanh toán bằng hình thức
        này. Các bước thực hiện khá đơn giản: {`\n`}Chọn VNPay - bấm thanh toán
        để chuyển đến ví điện tử - Nhập các thông tin tài khoản hoặc quét mã
        thanh toán.
      </Text>
      <Text
        style={[
          {
            fontSize: 24,
            color: COLOR.forth,
            fontWeight: '500',
            marginTop: 20,
            alignSelf: 'center',
          },
        ]}>
        Nạp tiền vào ví - Đặt cọc dễ dàng
      </Text>
      <FastImage
        resizeMode="stretch"
        style={{
          width: '100%',
          height: windowHeight * 0.27,
          borderRadius: 8,
          marginVertical: 10,
        }}
        source={require('../../assets/image/balance.png')}
      />
      <Text style={[appStyle.text16, {textAlign: 'left'}]}>
        Bạn có thể dễ dàng nạp/rút tiền về tài khoản ngân hàng của mình một cách
        nhanh chóng. Có thể xem lịch sử giao dịch trên ứng dụng để đảm bảo nguồn
        tiền của mình
      </Text>
    </ScrollView>
  );
};

export const GuideType2 = () => {
  return (
    <ScrollView
      style={{marginBottom: 10}}
      shouldRasterizeIOS
      showsVerticalScrollIndicator={false}>
      <View>
        <Text style={{fontSize: 20, color: 'black', fontWeight: '500'}}>
          1. Tìm kiếm xe
        </Text>
        <Text>Bạn có thể tìm xe theo 3 cách sau:</Text>
        <Text style={{fontSize: 16, fontWeight: '500'}}>
          A. Tìm theo địa chỉ bạn nhập ở thanh tìm kiếm
        </Text>
        <FastImage
          resizeMode="stretch"
          style={{
            width: '75%',
            height: windowHeight * 0.35,
            alignSelf: 'center',
          }}
          source={require('../../assets/image/img_find1.png')}
        />
        <Text style={{fontSize: 16, fontWeight: '500'}}>
          B. Tìm theo danh mục các địa điểm nổi bật
        </Text>
        <FastImage
          resizeMode="stretch"
          style={{
            width: '75%',
            height: windowHeight * 0.42,
            alignSelf: 'center',
          }}
          source={require('../../assets/image/img_find2.png')}
        />
      </View>

      <View style={{marginTop: 15}}>
        <Text style={{fontSize: 20, color: 'black', fontWeight: '500'}}>
          2. Gửi yêu cầu thuê xe
        </Text>
        <View>
          <Text style={{fontSize: 18, fontWeight: '500'}}>
            A. Kiểm tra thông tin xe
          </Text>
          <Text style={[appStyle.text16, {lineHeight: 18}]}>
            Hình ảnh xe, số chuyến đi đã thực hiện, đánh giá của các khách thuê,
            mô tả xe và các tính năng liên quan.
          </Text>
        </View>
        <View style={{marginTop: 5}}>
          <Text style={{fontSize: 18, fontWeight: '500'}}>
            B. Kiểm tra yêu cầu giấy tờ thuê xe và xem thông tin chủ xe:
          </Text>
          <Text style={[appStyle.text16, {lineHeight: 18}]}>
            • Khách hàng vui lòng kiểm tra kĩ phần giấy tờ yêu cầu của chủ xe để
            đảm bảo đủ điều kiện thuê xe, hạn chế các trường hợp hủy chuyến sau
            khi đã đặt cọc vì không đáp ứng đủ giấy tờ. {`\n`}• Trường hợp khách
            hàng cần hỗ trợ vui lòng liên hệ bộ phận CSKH của GoTraffic tại 1900
            6432 hoặc nhắn tin Fanpage GoTraffic để được tư vấn.
          </Text>
        </View>
        <View style={{marginTop: 5}}>
          <Text style={{fontSize: 18, fontWeight: '500'}}>
            C. Kiểm tra giá, thời gian thuê, địa điểm giao nhận xe
          </Text>
          <Text style={[appStyle.text16, {lineHeight: 18}]}>
            • Nếu tổng thời gian thuê dưới 24h sẽ làm tròn là 1 ngày. Bạn cần
            điều chỉnh thời gian cho phù hợp để dễ dàng thuê xe bạn nhé.{`\n`}•
            Đọc kỹ các thông tin về phụ phí và giới hạn quãng đường di chuyển để
            kiểm tra giá cho chuyến đi
          </Text>
        </View>
      </View>

      <View style={{marginTop: 15}}>
        <Text style={{fontSize: 20, color: 'black', fontWeight: '500'}}>
          3. Phê duyệt yêu cầu thuê xe
        </Text>
        <Text style={[appStyle.text16, {lineHeight: 18}]}>
          Sau khi gửi yêu cầu thuê xe, chủ xe sẽ nhận thông báo và xem xét yêu
          cầu thuê xe của bạn. Nếu được duyệt bạn sẽ tiến hành bước tiếp theo.
        </Text>
      </View>

      <View style={{marginTop: 15}}>
        <Text style={{fontSize: 20, color: 'black', fontWeight: '500'}}>
          4. Nhận phản hồi 'Yêu cầu thuê xe
        </Text>
        <Text style={[appStyle.text16, {lineHeight: 18}]}>
          Bạn sẽ được nhận thông báo phản hồi yêu cầu thuê xe của bạn có được
          duyệt hay không
        </Text>
      </View>

      <View style={{marginTop: 15}}>
        <Text style={{fontSize: 20, color: 'black', fontWeight: '500'}}>
          5. Tiến hành đặt cọc
        </Text>
        <Text style={[appStyle.text16, {lineHeight: 18}]}>
          Sau khi bạn nhận được phản hồi đồng ý từ chủ xe, bạn vui lòng thanh
          toán đặt cọc 30% tiền thuê xe trong thời gian sớm nhất để hoàn tất quá
          trình đặt xe (phần tiền 70% còn lại bạn sẽ thanh toán trực tiếp cho
          chủ xe khi nhận xe).
        </Text>
      </View>

      <View style={{marginTop: 15}}>
        <Text style={{fontSize: 20, color: 'black', fontWeight: '500'}}>
          6. Hoàn tất đặt xe
        </Text>
      </View>
    </ScrollView>
  );
};

export const GuideType4 = () => {
  return (
    <ScrollView
      style={{marginBottom: 10}}
      shouldRasterizeIOS
      showsVerticalScrollIndicator={false}>
      <View>
        <FastImage
          resizeMode="stretch"
          style={{
            width: '58%',
            height: windowHeight * 0.2,
            alignSelf: 'center',
          }}
          source={require('../../assets/image/logo_go_traffic.png')}
        />
      </View>

      <View style={{marginTop: 15}}>
        <Text
          style={{
            fontSize: 24,
            color: COLOR.primary,
            fontWeight: '500',
            textAlign: 'center',
          }}>
          Chào mừng đến với GoTraffic!
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: COLOR.forth,
            fontWeight: '500',
            textAlign: 'center',
          }}>
          {' '}
          Nơi Kết Nối Thuận Lợi Giữa Người Thuê và Chủ Xe
        </Text>
        <View style={{marginTop: 5}}>
          <Text style={[appStyle.text16, {lineHeight: 18}]}>
            • GoTraffic tự hào là đối tác đáng tin cậy trong lĩnh vực cho thuê
            xe hơi, đem lại trải nghiệm độc đáo và thuận lợi cho cả người thuê
            và chủ xe. Chúng tôi cung cấp một nền tảng hiện đại, nơi mà việc tìm
            kiếm và đăng ký xe trở nên dễ dàng và nhanh chóng.
          </Text>
        </View>
      </View>

      <View style={{marginTop: 15}}>
        <Text style={[appStyle.text16, {lineHeight: 18}]}>
          • Với GoTraffic, người dùng không chỉ có cơ hội tận hưởng những chuyến
          đi thoải mái với các loại xe đa dạng và giá cả hợp lý, mà còn có thể
          trở thành chủ xe thông qua việc đăng ký xe cá nhân. Điều này mở ra cơ
          hội kiếm thêm thu nhập một cách linh hoạt và tiện lợi.
        </Text>
      </View>

      <View style={{marginTop: 15}}>
        <Text style={[appStyle.text16, {lineHeight: 18}]}>
          • Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc và
          hỗ trợ bạn trong mọi chuyến đi. Hãy đồng hành cùng GoTraffic để trải
          nghiệm sự thuận lợi và an toàn trên mỗi hành trình!
        </Text>
      </View>

      <View style={{marginTop: 15}}>
        <Text style={[appStyle.text16, {lineHeight: 18}]}>
          Chào mừng bạn đến với gia đình GoTraffic - Nơi Chất Lượng và Tiện Nghi
          Gặp Gỡ!
        </Text>
      </View>
    </ScrollView>
  );
};

export const GuideType5 = () => {
  return (
    <ScrollView
      style={{marginBottom: 10}}
      shouldRasterizeIOS
      showsVerticalScrollIndicator={false}>
      <Text style={{fontSize: 24, color: COLOR.fifth, fontWeight: '500'}}>
        Chính Sách và Qui Định của GoTraffic
      </Text>
      <View>
        <Text style={{fontSize: 20, color: 'black', fontWeight: '500'}}>
          1. Bảo Mật và Quyền Riêng Tư:
        </Text>
        <Text
          style={[
            appStyle.text16,
            {lineHeight: 20, marginHorizontal: 10, textAlign: 'justify'},
          ]}>
          Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn. Mọi dữ liệu cá
          nhân sẽ được quản lý chặt chẽ và chỉ sử dụng với mục đích cung cấp
          dịch vụ và nâng cao trải nghiệm người dùng.
        </Text>
      </View>

      <View style={{marginTop: 15}}>
        <Text style={{fontSize: 20, color: 'black', fontWeight: '500'}}>
          2. Chính Sách Hủy Đặt:
        </Text>
        <Text
          style={[
            appStyle.text16,
            {lineHeight: 20, marginHorizontal: 10, textAlign: 'justify'},
          ]}>
          Chính sách hủy đặt của chúng tôi được xây dựng để đảm bảo sự linh hoạt
          và công bằng cho cả người thuê và chủ xe. Bạn có thể tìm hiểu chi tiết
          về chính sách hủy đặt trên trang web của chúng tôi.
        </Text>
      </View>

      <View style={{marginTop: 15}}>
        <Text style={{fontSize: 20, color: 'black', fontWeight: '500'}}>
          3. An Toàn và Bảo Hiểm:
        </Text>
        <Text
          style={[
            appStyle.text16,
            {lineHeight: 20, marginHorizontal: 10, textAlign: 'justify'},
          ]}>
          Chúng tôi chú trọng đến an toàn. Cả người thuê và chủ xe đều được
          khuyến khích thực hiện các biện pháp an toàn và tuân thủ các quy tắc
          giao thông. Ngoài ra, chúng tôi cung cấp các tùy chọn bảo hiểm để đảm
          bảo mọi bên đều được bảo vệ.
        </Text>
      </View>

      <View style={{marginTop: 15}}>
        <Text style={{fontSize: 20, color: 'black', fontWeight: '500'}}>
          4. Chấp Nhận và Điều Kiện Sử Dụng:
        </Text>
        <Text
          style={[
            appStyle.text16,
            {lineHeight: 20, marginHorizontal: 10, textAlign: 'justify'},
          ]}>
          Để sử dụng dịch vụ của chúng tôi, vui lòng đọc và hiểu rõ các điều
          kiện sử dụng. Việc sử dụng dịch vụ của chúng tôi đồng nghĩa với việc
          bạn chấp nhận và tuân thủ theo những điều kiện này.
        </Text>
      </View>

      <View style={{marginTop: 15}}>
        <Text style={[appStyle.text16, {lineHeight: 20}]}>
          Chúng tôi luôn lắng nghe và hoan nghênh mọi phản hồi từ bạn để cải
          thiện dịch vụ. Hãy liên hệ với chúng tôi nếu bạn có bất kỳ câu hỏi
          hoặc đề xuất nào.
        </Text>
      </View>

      <View style={{marginTop: 15}}>
        <Text style={{fontSize: 20, color: 'black', fontWeight: '500'}}>
          Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của GoTraffic!
        </Text>
      </View>
    </ScrollView>
  );
};

export const GuideType6 = () => {
  return (
    <SafeAreaView>
      <ScrollView
        style={{marginBottom: 10}}
        shouldRasterizeIOS
        showsVerticalScrollIndicator={false}>
        <FastImage
          resizeMode="stretch"
          style={{width: '100%', height: windowHeight * 0.2, borderRadius: 8}}
          source={require('../../assets/image/bgCar2.jpg')}
        />

        <Text
          style={{
            fontSize: 24,
            color: COLOR.fifth,
            fontWeight: '500',
            marginTop: 10,
          }}>
          Câu hỏi thường gặp
        </Text>
        <Text
          style={[
            appStyle.text16,
            {lineHeight: 20, margin: 10, textAlign: 'justify'},
          ]}>
          Chào mừng bạn đến với trang Câu Hỏi và Trả Lời của GoTraffic! Dưới đây
          là một số câu hỏi phổ biến mà chúng tôi đã tổng hợp để giúp bạn hiểu
          rõ hơn về dịch vụ của chúng tôi.
        </Text>
        <View>
          <Text style={{fontSize: 20, color: 'black', fontWeight: '500'}}>
            1. Làm thế nào để thuê xe trên GoTraffic?
          </Text>
          <Text
            style={[
              appStyle.text16,
              {lineHeight: 20, marginHorizontal: 10, textAlign: 'justify'},
            ]}>
            Để thuê xe, bạn có thể tải ứng dụng GoTraffic, đăng ký tài khoản,
            sau đó tìm kiếm và đặt xe theo nhu cầu của bạn.
          </Text>
        </View>

        <View style={{marginTop: 15}}>
          <Text style={{fontSize: 20, color: 'black', fontWeight: '500'}}>
            2. Làm thế nào để đăng ký xe cho thuê?
          </Text>
          <Text
            style={[
              appStyle.text16,
              {lineHeight: 20, marginHorizontal: 10, textAlign: 'justify'},
            ]}>
            Chủ xe có thể đăng ký xe trên ứng dụng GoTraffic bằng cách cung cấp
            thông tin chi tiết về xe và tuân thủ các yêu cầu về an toàn và chất
            lượng.
          </Text>
        </View>

        <View style={{marginTop: 15}}>
          <Text style={{fontSize: 20, color: 'black', fontWeight: '500'}}>
            3. Làm thế nào để đảm bảo an toàn khi sử dụng dịch vụ?
          </Text>
          <Text
            style={[
              appStyle.text16,
              {lineHeight: 20, marginHorizontal: 10, textAlign: 'justify'},
            ]}>
            GoTraffic có các biện pháp an toàn như kiểm tra độ an toàn của xe,
            hỗ trợ đường trực tuyến, và tùy chọn bảo hiểm cho cả người thuê và
            chủ xe.
          </Text>
        </View>

        <View style={{marginTop: 15}}>
          <Text style={{fontSize: 20, color: 'black', fontWeight: '500'}}>
            4. Làm thế nào để hủy đặt xe đã đặt?
          </Text>
          <Text
            style={[
              appStyle.text16,
              {lineHeight: 20, marginHorizontal: 10, textAlign: 'justify'},
            ]}>
            Bạn có thể hủy đặt xe thông qua ứng dụng GoTraffic theo chính sách
            hủy đặt của chúng tôi. Vui lòng kiểm tra trang web hoặc ứng dụng để
            biết thêm chi tiết.
          </Text>
        </View>

        <View style={{marginTop: 15}}>
          <Text style={{fontSize: 20, color: 'black', fontWeight: '500'}}>
            {' '}
            5. Tôi cần hỗ trợ, làm thế nào để liên hệ với đội ngũ GoTraffic?
          </Text>
          <Text
            style={[
              appStyle.text16,
              {lineHeight: 20, marginHorizontal: 10, textAlign: 'justify'},
            ]}>
            Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng giúp đỡ bạn. Bạn có thể
            liên hệ qua phần Hỗ Trợ trong ứng dụng hoặc trực tiếp qua trang web
            của chúng tôi.
          </Text>
        </View>

        <View style={{marginTop: 15}}>
          <Text style={[appStyle.text16, {lineHeight: 20}]}>
            Nếu bạn có thêm bất kỳ câu hỏi nào khác, đừng ngần ngại liên hệ với
            chúng tôi. Chúng tôi sẽ luôn cố gắng hết sức để đảm bảo bạn có một
            trải nghiệm thuê xe tốt nhất trên GoTraffic!
          </Text>
        </View>

        <View style={{marginTop: 15}}>
          <Text style={{fontSize: 20, color: 'black', fontWeight: '500'}}>
            Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của GoTraffic!
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
