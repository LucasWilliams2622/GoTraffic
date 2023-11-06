import {
  View,
  Text,
  Pressable,
  StyleProp,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from 'react-native';
import React from 'react';
import {CarCardItemStyles} from '../Home/CarCardItem';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {Row} from 'native-base';
import {COLOR} from '../../../constants/Theme';
import {SectionTitle} from '../../../screens/Main/HomeTab/CarDetail';
import {IDModal} from './IDModal';
import {CollateralModal} from './CollateralModal';
import {FeeModal} from './FeeModal';
import {CancelModal} from './CancelModal';
import {
  otherRules,
  otherRulesFull,
} from '../../../screens/Main/HomeTab/data/data';

const TitleWithQuestion: React.FC<{
  title: string;
  style?: StyleProp<ViewStyle | TextStyle | ImageStyle>;
  Modal?: any;
}> = ({title, style, Modal}) => {
  const [isModalVisible, setModalVisible] = React.useState<boolean>(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <Row style={{alignItems: 'center'}}>
      <SectionTitle title={title} style={style} />
      <Pressable onPress={toggleModal}>
        <Icon
          name="circle-question"
          size={18}
          color={COLOR.black}
          style={{marginLeft: 10}}
        />
      </Pressable>
      {Modal && <Modal isModalVisible={isModalVisible} toggle={toggleModal} />}
    </Row>
  );
};

export const SectionWithModal: React.FC<{
  title: string;
  style?: StyleProp<ViewStyle | TextStyle | ImageStyle>;
  Modal?: any;
  children?: React.ReactNode;
}> = ({title, style, Modal, children}) => {
  const [isModalVisible, setModalVisible] = React.useState<boolean>(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <View>
      <SectionTitle title={title} style={style} />
      {children}
      <Pressable onPress={toggleModal}>
        <Row style={{alignItems: 'center'}}>
          <Text style={{fontWeight: 'bold', marginRight: 10}}>Xem thêm</Text>
          <Icon name="chevron-right" size={15} />
        </Row>
      </Pressable>
      <Modal isModalVisible={isModalVisible} toggle={toggleModal} />
    </View>
  );
};

export const Documents: React.FC = () => (
  <View>
    <TitleWithQuestion title="Giấy tờ thuê xe" Modal={IDModal} />
    <Text style={{marginTop: 15, marginBottom: 15, fontWeight: 'bold'}}>
      Chọn 1 trong 2 hình thức
    </Text>
    <View>
      <Row style={{alignItems: 'center'}}>
        <Icon name="id-card" size={20} style={{marginRight: 10, margin: 5}} />
        <Text>GPLX & CCCD gắn chip (đối chiếu)</Text>
      </Row>
      <Row style={{alignItems: 'center'}}>
        <Icon name="passport" size={20} style={{marginRight: 10, margin: 5}} />
        <Text>GPLX (đối chiếu) & Passport (giữ lại)</Text>
      </Row>
    </View>
  </View>
);

export const Collateral: React.FC = () => (
  <View>
    <TitleWithQuestion title="Tài sản thế chấp" Modal={CollateralModal} />
    <Text style={{marginTop: 15}}>Miễn thế chấp</Text>
  </View>
);

const OtherDetails: React.FC = () => {
  const [isShowMore, setShowMore] = React.useState<boolean>(false);

  return (
    <View>
      <Documents />

      <View
        style={[CarCardItemStyles.separator, {marginTop: 20, marginBottom: 20}]}
      />

      <Collateral />
      <View
        style={[CarCardItemStyles.separator, {marginTop: 20, marginBottom: 20}]}
      />

      <SectionTitle title="Điều khoản" style={{marginBottom: 15}} />
      <Text>Quy định khác:</Text>
      {isShowMore ? (
        otherRulesFull.map((rule, index) => (
          <Text key={index} style={{marginTop: 5}}>
            {`\u2022 ${rule}`}
          </Text>
        ))
      ) : (
        <View>
          {otherRules.map((rule, index) => (
            <Text key={index} style={{marginTop: 5}}>
              {`\u2022 ${rule}`}
            </Text>
          ))}
          <Pressable style={{marginTop: 10}} onPress={() => setShowMore(true)}>
            <Row style={{alignItems: 'center'}}>
              <Text style={{fontWeight: 'bold', marginRight: 10}}>
                Xem thêm
              </Text>
              <Icon name="chevron-right" size={15} />
            </Row>
          </Pressable>
        </View>
      )}
      {isShowMore && (
        <Text style={{marginTop: 5}}>
          Trân trọng cảm ơn, chúc quý khách hàng có những chuyến đi tuyệt vời !
        </Text>
      )}

      <View
        style={[CarCardItemStyles.separator, {marginTop: 20, marginBottom: 20}]}
      />

      <SectionWithModal
        title="Phụ phí có thể phát sinh"
        Modal={FeeModal}
        style={{marginBottom: 15}}
        children={
          <View>
            <Row
              style={{
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 15,
              }}>
              <Text style={{fontWeight: 'bold'}}>Phí vượt giới hạn</Text>
              <Text style={{fontWeight: 'bold'}}>Không tính phí</Text>
            </Row>
            <Text style={{fontWeight: 'bold', marginBottom: 10}}>
              Phụ phí khác
            </Text>
            <Text style={{marginBottom: 10}}>
              Phụ phí phát sinh nếu trả xe trễ, xe không đảm bảo vệ sinh hoặc bị
              ám mùi
            </Text>
          </View>
        }
      />

      <View
        style={[CarCardItemStyles.separator, {marginTop: 20, marginBottom: 20}]}
      />
      <SectionWithModal
        title="Chính sách huỷ chuyến"
        Modal={CancelModal}
        children={
          <Text style={{marginTop: 15, marginBottom: 15}}>
            Miễn phí hủy chuyến trong vòng 1 giờ sau khi đặt cọc
          </Text>
        }
      />
      <View
        style={[CarCardItemStyles.separator, {marginTop: 20, marginBottom: 20}]}
      />
      <Row style={{alignItems: 'center'}}>
        <Icon name="flag" size={20} style={{marginRight: 10, margin: 5}} />
        <Text style={{fontWeight: 'bold', textDecorationLine: 'underline'}}>
          Báo cáo xe này
        </Text>
      </Row>
    </View>
  );
};

export default OtherDetails;
