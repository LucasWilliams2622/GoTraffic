import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useMemo, useState} from 'react';
import {COLOR, ICON} from '../../../constants/Theme';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {Car} from '../../../types';
import {Row, TextArea} from 'native-base';
import FastImage from 'react-native-fast-image';
import {CarCardItemStyles} from '../../../components/Home/Home/CarCardItem';
import ShieldIcon from '../../../assets/icon/ic_shield_verified';
import {OwnerInfo} from '../../../components/Home/Detail/OwnerInfo';
import {formatPriceWithUnit} from '../../../utils/utils';
import Modal from 'react-native-modal';
import {
  Collateral,
  Documents,
} from '../../../components/Home/Detail/OtherDetails';
import {CancelModal} from '../../../components/Home/Detail/CancelModal';
import {AppContext} from '../../../utils/AppContext';
import FailModal from '../../../components/Profile/Modal/FailModal';
import {appStyle} from '../../../constants/AppStyle';
import {useNavigation} from '@react-navigation/native';

const PriceRow: React.FC<{
  title: string;
  price: number;
  icon?: boolean;
  style1stRow?: object;
  style2ndRow?: object;
  showDay?: boolean;
  modalTitle?: string;
  modalContent?: string;
}> = ({
  title,
  price,
  icon,
  style1stRow,
  style2ndRow,
  showDay,
  modalTitle,
  modalContent,
}) => {
  const formattedPrice = useMemo(() => formatPriceWithUnit(price), [price]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  return (
    <Row style={{justifyContent: 'space-between', marginTop: 10}}>
      <Row style={{alignItems: 'center'}}>
        <Text style={style1stRow}>{title}</Text>
        {icon && (
          <Pressable onPress={() => setIsModalVisible(!isModalVisible)}>
            <Icon
              name="circle-question"
              size={15}
              color={COLOR.placeholder}
              style={{marginLeft: 5}}
            />
          </Pressable>
        )}
      </Row>
      <TextModal
        title={modalTitle || title}
        content={modalContent || ''}
        isModalVisible={isModalVisible}
        toggle={() => setIsModalVisible(!isModalVisible)}
      />
      <Text style={[{fontWeight: 'bold'}, style2ndRow]}>
        {formattedPrice}
        {showDay ? '/ngày' : ''}
      </Text>
    </Row>
  );
};

const TextModal: React.FC<{
  title: string;
  content: string;
  toggle: any;
  isModalVisible?: boolean;
}> = ({title, content, toggle, isModalVisible}) => {
  const [contentHeight, setContentHeight] = useState(0);

  const onContentLayout = (event: any) => {
    const {height} = event.nativeEvent.layout;
    setContentHeight(height);
  };
  return (
    <Modal
      isVisible={isModalVisible}
      onBackdropPress={toggle}
      onSwipeComplete={toggle}
      swipeDirection="down"
      style={{
        margin: 0,
        justifyContent: 'flex-end',
      }}>
      <View
        onLayout={onContentLayout}
        style={{
          backgroundColor: COLOR.white,
          padding: 20,
          paddingBottom: 50,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}>
        <Pressable onPress={toggle}>
          <Icon name="x" size={20} color={COLOR.borderColor2} />
        </Pressable>
        <Text style={{fontWeight: 'bold', fontSize: 18, marginTop: 20}}>
          {title}
        </Text>
        <Text style={{fontSize: 14, marginTop: 5}}>{content}</Text>
      </View>
    </Modal>
  );
};

const BottomBar = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [modalLicense, setModalLicense] = useState(false);
  const [modalCheckSurplus, setModalCheckSurplus] = useState(false)
  const {infoUser} = useContext(AppContext);
  const navigation = useNavigation();

  const handleBooking = async () => {
    if (!infoUser.isVerifiedDriverLicense) {

      if (infoUser.surplus < 900000) {
        setModalCheckSurplus(true)
      } else {
      }
    } else {
      setModalLicense(true);
    }
  };

  return (
    <View
      style={{
        backgroundColor: COLOR.white,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderTopColor: COLOR.borderColor,
        borderTopWidth: StyleSheet.hairlineWidth,
        paddingBottom: 30,
      }}>
      <Pressable onPress={() => setIsModalVisible(!isModalVisible)}>
        <Row style={{alignItems: 'center'}}>
          <Icon name="circle-check" size={20} color={COLOR.fifth} solid />
          <Text style={{fontSize: 12, fontWeight: 'bold', marginLeft: 5}}>
            Tôi đồng ý với{' '}
            <Text
              style={{
                fontWeight: 'bold',
                color: COLOR.fifth,
                textDecorationLine: 'underline',
              }}>
              Chính sách huỷ chuyến của GoTraffic
            </Text>
          </Text>
        </Row>
      </Pressable>
      <CancelModal
        isModalVisible={isModalVisible}
        toggle={() => {
          setIsModalVisible(!isModalVisible);
        }}
      />
      <TouchableOpacity
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: COLOR.fifth,
          paddingVertical: 15,
          borderRadius: 8,
          marginTop: 20,
        }}
        onPress={() => {
          handleBooking();
        }}>
        <Text style={{color: COLOR.white}}>Gửi yêu cầu thuê xe</Text>
      </TouchableOpacity>

      <Modal animationType="fade" transparent={true} visible={modalLicense}>
        <View style={styles.modalCenteredContainer}>
          <View style={styles.modalSuccessBox}>
            <FastImage style={{width: 60, height: 60}} source={ICON.Ban} />
            <View>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 24,
                  marginTop: 5,
                  fontWeight: '500',
                  color: '#E73030',
                }}>
                Thất bại!
              </Text>
              <Text style={{textAlign: 'center', fontSize: 16, marginTop: 5}}>
                Bạn chưa xác thực bằng lái
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
              }}>
              <TouchableOpacity
                style={{
                  width: '45%',
                  height: 40,
                  backgroundColor: COLOR.warn,
                  borderRadius: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 20,
                }}
                onPress={() => setModalLicense(false)}>
                <Text style={[appStyle.text16Bold, {color: COLOR.textWarn}]}>
                  Hủy
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: '45%',
                  height: 40,
                  backgroundColor: COLOR.blueHeader2,
                  borderRadius: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 20,
                }}
                onPress={() => {
                  navigation.navigate('VerifyLicense');
                }}>
                <Text style={[appStyle.text16Bold, {color: COLOR.blue}]}>
                  Xác thực
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
            animationType="fade"
            transparent={true}
            visible={modalCheckSurplus}
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
                            onPress={()=>setModalCheckSurplus(false)}>
                            <Text style={[appStyle.text16Bold, {color: COLOR.textWarn}]}>Hủy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: '45%', height: 40, backgroundColor: COLOR.blueHeader2, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}
                             onPress={()=>{navigation.navigate('MyWallet')}}>
                            <Text style={[appStyle.text16Bold, {color: COLOR.blue}]}>Kiểm tra ví</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    </View>
  );
};

const Confirm: React.FC<{
  closeModal: any;
  car: Car;
  selectedTime: {
    startTime: string;
    endTime: string;
    startDate: string;
    endDate: string;
  };
}> = ({closeModal, car, selectedTime}) => {
  return (
    <View style={{backgroundColor: COLOR.white, flex: 1}}>
      <SafeAreaView>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Pressable
            onPress={closeModal}
            style={[styles.closeBtn, {position: 'absolute', left: 20}]}>
            <Icon name="x" size={20} color={COLOR.black} />
          </Pressable>
          <Text style={{fontSize: 22}}>Xác nhận đặt xe</Text>
        </View>
        <ScrollView style={{paddingHorizontal: 15, marginTop: 30}}>
          <Row>
            <FastImage
              source={{uri: car.image}}
              style={{height: 80, width: 120, borderRadius: 10}}
            />
            <View
              style={{
                marginLeft: 15,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
              <View>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                  {car.name.toUpperCase()}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: COLOR.placeholder,
                    marginTop: 10,
                  }}>
                  Biển số xe: {car.licensePlate}
                </Text>
              </View>

              <Row style={{alignItems: 'center', marginTop: 20}}>
                <Icon name="star" color={COLOR.third} size={12} solid />
                <Text style={[CarCardItemStyles.ratingText, {marginLeft: 5}]}>
                  {car.User.rating}
                </Text>
                <Text
                  style={[
                    CarCardItemStyles.dot,
                    {marginLeft: 5, marginRight: 5},
                  ]}>
                  ·
                </Text>
                <Icon name="suitcase" color={COLOR.fifth} size={12} solid />
                <Text style={[CarCardItemStyles.ratingText, {marginLeft: 5}]}>
                  {car.totalRide} chuyến
                </Text>
              </Row>
            </View>
          </Row>
          <View style={[CarCardItemStyles.separator, {marginTop: 20}]} />
          <Row style={{alignItems: 'center'}}>
            <ShieldIcon color={COLOR.fifth} />
            <Text
              style={{
                marginLeft: 10,
                color: COLOR.fifth,
                fontWeight: 'bold',
                fontSize: 16,
              }}>
              Xe hỗ trợ bảo hiểm bởi MIC
            </Text>
          </Row>
          <View style={[CarCardItemStyles.separator]} />
          <View>
            <Text>Thông tin thuê xe</Text>
            <Row style={{justifyContent: 'space-between', marginTop: 10}}>
              <View>
                <Row style={{alignItems: 'center'}}>
                  <Icon name="calendar" color={COLOR.fifth} size={18} />
                  <Text style={{marginLeft: 10}}>Nhận xe</Text>
                </Row>
                <Text
                  style={{
                    marginLeft: 25,
                    fontWeight: 'bold',
                    fontSize: 15,
                    marginTop: 5,
                  }}>
                  {selectedTime.startTime}, {selectedTime.startDate}
                </Text>
              </View>
              <View>
                <Row style={{alignItems: 'center'}}>
                  <Icon name="calendar" color={COLOR.fifth} size={18} />
                  <Text style={{marginLeft: 10}}>Trả xe</Text>
                </Row>
                <Text
                  style={{
                    marginLeft: 25,
                    fontWeight: 'bold',
                    fontSize: 15,
                    marginTop: 5,
                  }}>
                  {selectedTime.endTime}, {selectedTime.endDate}
                </Text>
              </View>
            </Row>
            <View>
              <Row style={{alignItems: 'center', marginTop: 20}}>
                <Icon name="location-dot" color={COLOR.fifth} size={18} />
                <Text style={{marginLeft: 10}}>Nhận xe tại địa chỉ của xe</Text>
              </Row>
              <Text
                style={{
                  marginLeft: 25,
                  fontWeight: 'bold',
                  fontSize: 15,
                  marginTop: 5,
                }}>
                {car.location}
              </Text>
              <Text
                style={{
                  marginLeft: 25,
                  fontSize: 12,
                  marginTop: 5,
                  color: COLOR.placeholder,
                }}>
                Địa chỉ xe cụ thể sẽ được hiển thị sau khi đặt cọc thành công
                trên ứng dụng
              </Text>
              <Pressable>
                <Row
                  style={{alignItems: 'center', marginLeft: 25, marginTop: 10}}>
                  <Icon name="map" color={COLOR.black} size={15} />
                  <Text
                    style={{
                      marginLeft: 5,
                      textDecorationLine: 'underline',
                      fontWeight: 'bold',
                    }}>
                    Xem bản đồ
                  </Text>
                </Row>
              </Pressable>
            </View>
          </View>
          <View
            style={{
              backgroundColor: COLOR.placeholder10,
              marginLeft: -15,
              marginRight: -15,
              paddingHorizontal: 15,
              paddingVertical: 15,
              marginTop: 20,
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 16}}>Chủ xe</Text>
            <View
              style={{
                backgroundColor: COLOR.white,
                padding: 10,
                borderRadius: 15,
                marginTop: 15,
              }}>
              <OwnerInfo
                owner={car.User}
                rating={car.User.rating}
                totalRide={car.totalRide}
              />
            </View>
          </View>
          <View style={{marginTop: 20}}>
            <Row style={{justifyContent: 'space-between', marginBottom: 10}}>
              <Text>Lời nhắn cho chủ xe</Text>
              <Text style={{fontWeight: 'bold'}}>Gợi ý lời nhắn</Text>
            </Row>
            <TextArea
              placeholder="Nhập nội dung lời nhắn cho chủ xe"
              h={100}
              borderRadius={10}
              style={{
                backgroundColor: COLOR.white,
                padding: 10,
              }}
              autoCompleteType={'off'}
            />
          </View>
          <View
            style={{
              backgroundColor: COLOR.placeholder10,
              marginLeft: -15,
              marginRight: -15,
              paddingHorizontal: 15,
              paddingVertical: 15,
              marginTop: 20,
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 16}}>
              Bảng giá chi tiết
            </Text>
            <View
              style={{
                backgroundColor: COLOR.white,
                padding: 10,
                borderRadius: 15,
                marginTop: 15,
              }}>
              <PriceRow
                title="Đơn giá thuê"
                price={car.price}
                icon={true}
                showDay={true}
                modalTitle="Đơn giá thuê"
                modalContent={
                  'Giá thuê xe được tính theo ngày, thời gian thuê xe ít hơn 24 tiếng sẽ được tính tròn 1 ngày \n- Giá thuê xe không bao gồm tiền xăng/tiền sạc pin. Khi kết thúc chuyến đi, bạn vui lòng đổ xăng/sạc pin về lại mức ban đầu như khi nhận xe, hoặc thanh toán chi phí xăn xe/sạc pin cho chủ xe.'
                }
              />
              <PriceRow
                title="Phí dịch vụ GoTraffic"
                price={0.133 * car.price}
                icon={true}
                showDay={true}
                modalTitle="Phí dịch vụ GoTraffic"
                modalContent="Phí dịch vụ nhằm hỗ trợ GoTraffic duy trì nền tảng ứng dụng và các hoạt động chăm sóc khách hàng một cách tốt nhất."
              />
              <PriceRow
                title="Phí bảo hiểm thuê xe"
                price={0.133 * car.price}
                icon={true}
                showDay={true}
                modalTitle="Phí bảo hiểm thuê xe"
                modalContent="Chuyến đi của bạn được mua gói bảo hiểm vật chất xe ô tô. Trường hợp có sự cố ngoài ý muốn (trong phạm vi bảo hiểm), khách thuê bồi thường tối đa 2.000.000VND/vụ"
              />
              <View style={[CarCardItemStyles.separator, {marginTop: 20}]} />
              <PriceRow
                title="Tổng phí"
                price={car.price + 0.266 * car.price}
                showDay={true}
              />
              <Pressable>
                <Row
                  style={{
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 10,
                    backgroundColor: COLOR.secondary50,
                    borderRadius: 5,
                    marginTop: 10,
                  }}>
                  <Row>
                    <Icon name="ticket" color={COLOR.fifth} size={18} />
                    <Text style={{marginLeft: 10, fontSize: 15}}>
                      Áp dụng mã khuyến mãi
                    </Text>
                  </Row>
                  <Icon
                    name="chevron-right"
                    size={15}
                    color={COLOR.placeholder}
                  />
                </Row>
              </Pressable>
              <View style={[CarCardItemStyles.separator, {marginTop: 20}]} />
              <PriceRow
                title="Tổng cộng"
                price={car.price + 0.266 * car.price}
                style1stRow={{fontWeight: 'bold'}}
                style2ndRow={{color: COLOR.black}}
              />
              <PriceRow
                title="Đặt cọc qua ứng dụng"
                price={0.3 * car.price}
                style1stRow={{fontWeight: 'bold'}}
                style2ndRow={{color: COLOR.fifth}}
                icon={true}
                modalTitle="Đặt cọc qua ứng dụng"
                modalContent="30% giá trị chuyến đi cần được thanh toán trước qua ứng dụng để giữ chỗ."
              />
              <PriceRow
                title="Thanh toán khi nhận xe"
                price={car.price + 0.266 * car.price - 0.3 * car.price}
                style1stRow={{fontWeight: 'bold'}}
                style2ndRow={{color: COLOR.fifth}}
                icon={true}
                modalTitle="Thanh toán khi nhận xe"
                modalContent="Bạn có thể thanh toán 70% giá trị thuê xe còn lại bằng hình thức tiền mặt hoặc chuyển khoản ngân hàng cho chủ xe khi làm thủ tục nhận xe."
              />
            </View>
          </View>
          <View style={{marginTop: 15}}>
            <Documents />
          </View>
          <View style={{marginTop: 15}}>
            <Collateral />
          </View>
          <View style={{height: 150}}></View>
        </ScrollView>
      </SafeAreaView>
      <BottomBar />
    </View>
  );
};

export default Confirm;

const styles = StyleSheet.create({
  closeBtn: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 30,
    width: 40,
    height: 40,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
});
