import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React, {useContext, useEffect, useMemo, useState} from 'react';
import {COLOR} from '../../../constants/Theme';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {Car} from '../../../types';
import {HStack, Heading, Row, Spinner, TextArea} from 'native-base';
import FastImage from 'react-native-fast-image';
import {CarCardItemStyles} from '../../../components/Home/Home/CarCardItem';
import ShieldIcon from '../../../assets/icon/ic_shield_verified';
import {OwnerInfo} from '../../../components/Home/Detail/OwnerInfo';
import {formatDate, formatPriceWithUnit} from '../../../utils/utils';
import Modal, {ReactNativeModal} from 'react-native-modal';
import {
  Collateral,
  Documents,
} from '../../../components/Home/Detail/OtherDetails';
import {CancelModal} from '../../../components/Home/Detail/CancelModal';
import LicenseModal from '../../../components/Profile/Modal/LicenseModal';
import VerifyLicense from '../ProfileTab/Account/VerifyLicense';
import {AppContext} from '../../../utils/AppContext';
import axios from 'axios';
import FailModal from '../../../components/Profile/Modal/FailModal';
import SuccessModal from '../../../components/Profile/Modal/SuccessModal';
import {CarLocationContext} from '../../../utils/CarLocationContext';

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

const BottomBar: React.FC<{
  car: Car;
  deposit: number;
  startDate: Date;
  endDate: Date;
  closeModal: any;
  closeCarDetail?: () => void;
}> = ({car, deposit, startDate, endDate, closeModal, closeCarDetail}) => {
  const [isCancelModalVisible, setIsCancelModalVisible] =
    useState<boolean>(false);
  const [isLicenseModalVisible, setIsLicenseModalVisible] =
    useState<boolean>(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] =
    useState<boolean>(false);

  const {infoUser} = useContext(AppContext);

  const closeModals = () => {
    setIsCancelModalVisible(false);
    setIsLicenseModalVisible(false);
    hideModal();
    closeModal();
    if (closeCarDetail) {
      closeCarDetail();
    }
  };

  const [modalContent, setModalContent] = useState<React.ReactElement<
    any,
    string | React.JSXElementConstructor<any>
  > | null>(null);

  const showModal = (
    content: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
  ) => {
    setModalContent(content);
  };

  const hideModal = () => {
    setModalContent(null);
  };

  const handleConfirm = async () => {
    showModal(
      <ReactNativeModal
        isVisible={true}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}>
        <HStack
          space={2}
          justifyContent="center"
          style={{backgroundColor: 'white', padding: 10, width: 'auto'}}>
          <Spinner accessibilityLabel="Loading posts" />
          <Heading color="primary.500" fontSize="md">
            Loading
          </Heading>
        </HStack>
      </ReactNativeModal>,
    );
    if (infoUser['isVerifiedDriverLicense']) {
      let data = JSON.stringify({
        idUser: infoUser['id'],
        idCar: car.id,
        timeFrom: startDate,
        timeTo: endDate,
        totalMoney: deposit,
      });

      console.log('data: ' + data);

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://103.57.129.166:3000/booking/api/add',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      };

      axios
        .request(config)
        .then(response => {
          console.log(JSON.stringify(response));
          if (response.data.result === true) {
            hideModal();
            showModal(
              <SuccessModal
                isVisible={true}
                onNavigate={closeModals}
                title="Thành công!"
                text="Bạn đã thuê được xe"
              />,
            );
          } else {
            hideModal();
            showModal(
              <FailModal
                isVisible={true}
                onCancel={hideModal}
                title={response.data['message']}
                text={response.data['message']}
                nextStep={'Trở về'}
                onNextStep={closeModals}
              />,
            );
          }
        })
        .catch(error => {
          console.log('Error happened');
          hideModal();
          showModal(
            <FailModal
              isVisible={true}
              onCancel={hideModal}
              title={'Đã có lỗi xảy ra. Vui lòng thử lại sau'}
              text={error.response.data.message}
              nextStep={'Trở về'}
              onNextStep={closeModals}
            />,
          );
          console.log('Error: ' + JSON.stringify(error.response.data));
          console.log('Error: ' + JSON.stringify(error));
        });
    } else {
      console.log('Test');
      setIsLicenseModalVisible(true);
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
      <Modal isVisible={!!modalContent}>{modalContent}</Modal>
      <Pressable onPress={() => setIsCancelModalVisible(!isCancelModalVisible)}>
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
        isModalVisible={isCancelModalVisible}
        toggle={() => {
          setIsCancelModalVisible(!isCancelModalVisible);
        }}
      />
      <Pressable
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: COLOR.fifth,
          paddingVertical: 15,
          borderRadius: 8,
          marginTop: 20,
        }}
        onPress={handleConfirm}>
        <Text style={{color: COLOR.white}}>Gửi yêu cầu thuê xe</Text>
      </Pressable>
      <VerifyLicense
        isVisible={isLicenseModalVisible}
        onClose={() => setIsLicenseModalVisible(false)}
      />
    </View>
  );
};

const Confirm: React.FC<{
  closeModal: any;
  car: Car;
  selectedTime: {
    startTime: string;
    endTime: string;
    startDate: Date;
    endDate: Date;
  };
  totalCost: number;
  closeCarDetail?: () => void;
}> = ({closeModal, car, selectedTime, totalCost, closeCarDetail}) => {
  const carLocationContext = useContext(CarLocationContext);
  if (!carLocationContext) {
    throw new Error(
      'TimeAndPlacePickup must be used within a CarLocationProvider',
    );
  }
  const {receiveCarLocation} = carLocationContext;

  const deposit: number = 0.3 * totalCost;

  const deliveryFee: number =
    receiveCarLocation === 'atUserLocation' ? car.deliveryFee : 0;

  const totalFee: number = car.price + 0.266 * car.price + deliveryFee;

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
              source={{uri: car.imageThumbnail}}
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
                  Biển số xe: {car.numberPlate}
                </Text>
              </View>

              {car.owner && (
                <Row style={{alignItems: 'center', marginTop: 20}}>
                  <Icon name="star" color={COLOR.third} size={12} solid />
                  <Text style={[CarCardItemStyles.ratingText, {marginLeft: 5}]}>
                    {car.owner.rating}
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
              )}
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
                    fontSize: 14,
                    marginTop: 5,
                  }}>
                  {`${selectedTime.startDate?.getHours()}h ${selectedTime.startDate?.getMinutes()}`}
                  , {formatDate(selectedTime.startDate)}
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
                    fontSize: 14,
                    marginTop: 5,
                  }}>
                  {`${selectedTime.endDate?.getHours()}h ${selectedTime.endDate?.getMinutes()}`}
                  , {formatDate(selectedTime.endDate)}
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
          {car.owner && (
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
                  owner={car.owner}
                  rating={car.owner.rating}
                  totalRide={car.totalRide}
                />
              </View>
            </View>
          )}
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
              maxLength={200}
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
              {receiveCarLocation === 'atUserLocation' && (
                <PriceRow
                  title="Phí giao xe"
                  price={car.deliveryFee}
                  icon={true}
                  showDay={true}
                  modalTitle="Phí giao xe"
                  modalContent="Phí giao xe được tính theo km, khoảng cách từ địa điểm nhận xe đến địa điểm trả xe."
                />
              )}
              <View style={[CarCardItemStyles.separator, {marginTop: 20}]} />
              <PriceRow title="Tổng phí" price={totalFee} showDay={true} />
              {/* <Pressable>
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
              </Pressable> */}
              <View style={[CarCardItemStyles.separator, {marginTop: 20}]} />
              <PriceRow
                title="Tổng cộng"
                price={totalCost + 0.266 * totalCost + deliveryFee}
                style1stRow={{fontWeight: 'bold'}}
                style2ndRow={{color: COLOR.black}}
              />
              <PriceRow
                title="Đặt cọc qua ứng dụng"
                price={deposit}
                style1stRow={{fontWeight: 'bold'}}
                style2ndRow={{color: COLOR.fifth}}
                icon={true}
                modalTitle="Đặt cọc qua ứng dụng"
                modalContent="30% giá trị chuyến đi cần được thanh toán trước qua ứng dụng để giữ chỗ."
              />
              <PriceRow
                title="Thanh toán khi nhận xe"
                price={totalCost + 0.266 * totalCost - 0.3 * totalCost}
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
      <BottomBar
        car={car}
        deposit={deposit}
        startDate={selectedTime.startDate}
        endDate={selectedTime.endDate}
        closeModal={closeModal}
        closeCarDetail={closeCarDetail}
      />
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
});
