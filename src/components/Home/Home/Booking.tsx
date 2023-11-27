import {StyleSheet, Text, View, TouchableOpacity, Platform} from 'react-native';
import React, {useCallback, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {COLOR} from '../../../constants/Theme';
import {Row, Radio} from 'native-base';
import AppButton from '../../AppButton';
import SteeringWheel from '../../../assets/icon/ic_steering_wheel';
import {appStyle} from '../../../constants/AppStyle';
import {timeDateFormat, timeString} from '../../../utils/utils';
import {
  ButtonConfig,
  ButtonProps,
  ButtonSide,
  InputFieldProps,
  RadioButtonProps,
  ViewProps,
} from '../../../types';
import ReactNativeModal from 'react-native-modal';
import LocationPicking from '../../../screens/Main/HomeTab/LocationPicking';
import TimePickingModal from '../../../screens/Main/HomeTab/TimePickingModal';
import FindingCar from '../../../screens/Main/HomeTab/FindingCar';

const Button = ({isSelfDriving, setIsSelfDriving, config}: ButtonProps) => {
  const {value, side, icon, text} = config;
  const isActive = isSelfDriving === value;
  const handlePress = useCallback(
    () => setIsSelfDriving(value),
    [setIsSelfDriving, value],
  );

  return (
    <TouchableOpacity
      style={[
        styles.button,
        isActive ? styles.activeButton : styles.inactiveButton,
        side === ButtonSide.Left ? styles.leftButton : styles.rightButton,
      ]}
      onPress={handlePress}>
      <Row style={styles.buttonContent}>
        {icon(isActive)}
        <Text style={[getTextStyle(isActive), styles.buttonText]}>{text}</Text>
      </Row>
    </TouchableOpacity>
  );
};

const BUTTONS_CONFIG: ButtonConfig[] = [
  {
    value: true,
    side: ButtonSide.Left,
    icon: (isActive: boolean) => (
      <Icon name="car" color={isActive ? COLOR.white : COLOR.forth} size={16} />
    ),
    text: 'Xe tự lái',
  },
  {
    value: false,
    side: ButtonSide.Right,
    icon: (isActive: boolean) => (
      <SteeringWheel color={isActive ? COLOR.white : COLOR.forth} />
    ),
    text: 'Xe có tài xế',
  },
];

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

const Booking = ({
  navigation,
  selectedTime,
  setSelectedTime,
  viewedCars,
  setViewedCars,
}: any) => {
  const [isSelfDriving, setIsSelfDriving] = useState<boolean>(true);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [location, setLocation] = useState<string>('');

  return (
    <View style={styles.outerContainer}>
      <View style={styles.heroBtns}>
        <Row style={styles.alignCenter}>
          {BUTTONS_CONFIG.map(config => (
            <Button
              key={config.text}
              isSelfDriving={isSelfDriving}
              setIsSelfDriving={setIsSelfDriving}
              config={config}
            />
          ))}
        </Row>
      </View>
      <View style={styles.contentWrapper}>
        <View style={styles.contentContainer}>
          {isSelfDriving === true ? (
            <SelfDrivingView
              timeString={timeString}
              navigation={navigation}
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
              setLocation={setLocation}
              location={location}
            />
          ) : (
            <DriverView
              timeString={timeString}
              navigation={navigation}
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
              location={location}
              setLocation={setLocation}
            />
          )}

          <AppButton
            title="Tìm xe"
            backgroundColor={COLOR.fifth}
            onPress={() => setModalVisible(true)}
          />
          <ReactNativeModal
            isVisible={isModalVisible}
            style={{margin: 0, display: 'flex'}}>
            <FindingCar
              location={location}
              setLocation={setLocation}
              close={() => setModalVisible(false)}
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
              viewedCars={viewedCars}
              setViewedCars={setViewedCars}
            />
          </ReactNativeModal>
        </View>
      </View>
    </View>
  );
};

const getTextStyle = (isActive: boolean) =>
  isActive ? {color: COLOR.white} : {color: COLOR.forth};

export const InputField = ({
  iconName,
  placeholderText,
  value,
  selectedTime,
  setSelectedTime,
  setLocation,
  location,
}: InputFieldProps) => {
  const [isLocationModalVisible, setLocationModalVisible] =
    useState<boolean>(false);
  const [isTimeModalVisible, setTimeModalVisible] = useState<boolean>(false);

  return (
    <View style={{marginBottom: 20}}>
      <Row style={{alignItems: 'center', marginBottom: 10}}>
        <Icon name={iconName} color={COLOR.borderColor} size={15} />
        <Text style={{color: COLOR.borderColor, marginLeft: 10}}>
          {placeholderText}
        </Text>
      </Row>
      <TouchableOpacity
        onPress={() => {
          if (value) {
            setTimeModalVisible(true);
          } else {
            setLocationModalVisible(true);
          }
        }}>
        <Text style={styles.heroInput}>
          {value
            ? `${timeDateFormat(selectedTime.startDate)}  - ${timeDateFormat(
                selectedTime.endDate,
              )} `
            : location
            ? location.length > 35
              ? location.slice(0, 35) + '...'
              : location
            : 'Nhập ' + placeholderText.toLowerCase()}
        </Text>
      </TouchableOpacity>

      <ReactNativeModal
        isVisible={isLocationModalVisible}
        style={{margin: 0, display: 'flex'}}>
        <LocationPicking
          close={() => setLocationModalVisible(false)}
          setInputAddress={setLocation}
        />
      </ReactNativeModal>
      <ReactNativeModal
        isVisible={isTimeModalVisible}
        style={{margin: 0}}
        onBackdropPress={() => setTimeModalVisible(false)}>
        <TimePickingModal
          toggle={() => setTimeModalVisible(false)}
          setSelectedTime={setSelectedTime}
        />
      </ReactNativeModal>
    </View>
  );
};

const SelfDrivingView = ({
  timeString,
  navigation,
  selectedTime,
  setSelectedTime,
  setLocation,
  location,
}: ViewProps) => {
  return (
    <View>
      <InputField
        iconName="location-dot"
        placeholderText="Địa điểm"
        navigation={navigation}
        navigateTo="LocationPicking"
        setLocation={setLocation}
        location={location}
      />
      <InputField
        iconName="calendar"
        placeholderText="Thời gian thuê"
        value={timeString}
        navigation={navigation}
        navigateTo="TimePicking"
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
      />
    </View>
  );
};

const RadioButton = ({value, tripType, text}: RadioButtonProps) => (
  <Radio value={value} my="0.5" size="sm">
    <Text
      style={[
        {
          color: tripType === value ? COLOR.black : COLOR.borderColor,
          fontSize: 12,
        },
      ]}>
      {text}
    </Text>
  </Radio>
);

const DriverView = ({
  timeString,
  navigation,
  selectedTime,
  setSelectedTime,
  location,
  setLocation,
}: ViewProps) => {
  const [tripType, setTripType] = useState<string>('lien-tinh');
  const [tripDescription, setTripDescription] = useState<string>(
    'Di chuyển ngoài thành phố, hành trình 2 chiều',
  );
  const [showLocation, setShowLocation] = useState<boolean>(true);
  return (
    <View>
      <Text style={styles.header}>Lộ trình</Text>
      <View style={{alignItems: 'center'}}>
        <Radio.Group
          name="myRadioGroup"
          value={tripType}
          onChange={nextValue => {
            setTripType(nextValue);
            switch (nextValue) {
              case 'lien-tinh':
                setTripDescription(
                  'Di chuyển ngoài thành phố, hành trình 2 chiều',
                );
                setShowLocation(true);
                break;
              case 'lien-tinh-1-chieu':
                setTripDescription(
                  'Di chuyển ngoài thành phố, hành trình 1 chiều',
                );
                setShowLocation(true);
                break;
              case 'noi-thanh':
                setTripDescription('Di chuyển trong thành phố');
                setShowLocation(false);
                break;
              default:
                break;
            }
          }}>
          {/* <HStack space={2} alignItems="center">
            <RadioButton
              value="lien-tinh"
              tripType={tripType}
              text="Liên tỉnh"
            />
            <RadioButton
              value="lien-tinh-1-chieu"
              tripType={tripType}
              text="Liên tỉnh (1 chiều)"
            />
            <RadioButton
              value="noi-thanh"
              tripType={tripType}
              text="Nội thành"
            />
          </HStack> */}
        </Radio.Group>
      </View>

      <Row style={{alignItems: 'center', marginTop: 10, marginBottom: 15}}>
        <Text style={[appStyle.text12, {marginRight: 5}]}>
          {tripDescription}
        </Text>
        <Icon name="circle-question" color={COLOR.borderColor} size={15} />
      </Row>

      <InputField
        iconName="map-pin"
        placeholderText="Điểm đón"
        navigation={navigation}
        navigateTo="LocationPicking"
        location={location}
        setLocation={setLocation}
      />

      {showLocation && (
        <InputField
          iconName="location-dot"
          placeholderText="Địa điểm"
          navigation={navigation}
          navigateTo="LocationPicking"
        />
      )}
      <Text style={styles.header}>Thời gian</Text>
      <InputField
        iconName="calendar"
        placeholderText="Thời gian thuê"
        value={timeString}
        navigation={navigation}
        navigateTo="TimePicking"
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
      />
    </View>
  );
};

export default Booking;

const BUTTON_RADIUS = 34;
const BUTTON_PADDING_VERTICAL = 10;
const BUTTON_PADDING_HORIZONTAL = 20;

const styles = StyleSheet.create({
  outerContainer: {
    marginTop: -130,
    alignSelf: 'center',
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  shadow: {
    shadowColor: COLOR.black,
    shadowRadius: 4.65,
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 4},
    elevation: 5,
  },
  heroBtns: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    shadowColor: COLOR.black,
    shadowRadius: 4.65,
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 4},
    elevation: 5,
    width: '100%',
  },

  button: {
    ...Platform.select({
      android: {
        shadowColor: COLOR.black,
        shadowRadius: 4.65,
        shadowOpacity: 0.3,
        shadowOffset: {width: 0, height: 4},
        elevation: 5,
      },
    }),
    borderTopLeftRadius: BUTTON_RADIUS,
    borderTopRightRadius: BUTTON_RADIUS,
    paddingVertical: BUTTON_PADDING_VERTICAL,
    paddingHorizontal: BUTTON_PADDING_HORIZONTAL,
  },
  activeButton: {
    backgroundColor: COLOR.fifth,
  },
  inactiveButton: {
    backgroundColor: COLOR.secondary,
  },
  leftButton: {
    borderTopLeftRadius: BUTTON_RADIUS,
    borderTopRightRadius: 0,
  },
  rightButton: {
    borderTopRightRadius: BUTTON_RADIUS,
    borderTopLeftRadius: 0,
  },
  buttonContent: {
    paddingVertical: BUTTON_PADDING_VERTICAL,
    paddingHorizontal: BUTTON_PADDING_HORIZONTAL,
  },
  buttonText: {
    marginLeft: 10,
  },
  contentWrapper: {
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: COLOR.black,
    shadowRadius: 4.65,
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 4},
    elevation: 5,
  },
  alignCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    alignSelf: 'center',
    paddingHorizontal: 15,
    paddingVertical: 25,
    width: '100%',
    backgroundColor: COLOR.white,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  heroInput: {
    width: 300,
    paddingVertical: 10,
    paddingLeft: 25,
    color: COLOR.black,
    fontWeight: 'bold',
    borderBottomColor: COLOR.placeholder10,
    borderBottomWidth: 0.5,
  },
});
