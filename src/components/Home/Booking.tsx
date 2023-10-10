import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Pressable,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { COLOR } from '../../constants/Theme';
import { Row, Radio, HStack } from 'native-base';
import AppButton from '../AppButton';
import SteeringWheel from '../../assets/icon/ic_steering_wheel';
import { appStyle, windowHeight, windowWidth } from '../../constants/AppStyle';

<<<<<<< HEAD
interface ButtonProps {
  isSelfDriving: boolean;
  setIsSelfDriving: React.Dispatch<React.SetStateAction<boolean>>;
  value: boolean;
  children: React.ReactNode;
  side: string;
}

const Booking = ({ navigation }: any) => {
=======
const Booking = ({navigation}: any) => {
>>>>>>> b64aa3d (update Component UI)
  const [isSelfDriving, setIsSelfDriving] = useState<boolean>(true);

  const [currentDay, setCurrentDay] = useState<Date>(new Date());
  const [tomorrow, setTomorrow] = useState<Date>(new Date());

  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setTomorrow(tomorrow);
  }, []);
  const currentDayString = `${currentDay.getHours()}:00, ${currentDay.getDate()}/${currentDay.getMonth() + 1
    }`;
  const tomorrowString = `${tomorrow.getHours() + 1
    }:00, ${tomorrow.getDate()}/${tomorrow.getMonth() + 1}`;
  const timeString = `${currentDayString} - ${tomorrowString}`;

  return (
    <View style={styles.outerContainer}>
      <View style={styles.heroBtns}>
        <View style={appStyle.rowBetween}>
          <Button
            isSelfDriving={isSelfDriving}
            setIsSelfDriving={setIsSelfDriving}
            value={true}
            side="left">
            <View style={[appStyle.rowCenter, { justifyContent: 'center',}]}>
              <Icon
                name="car"
                color={isSelfDriving === true ? COLOR.white : COLOR.forth}
                size={16}
              />
              <Text
                style={[getTextStyle(isSelfDriving === true), { marginLeft: 10 }]}>
                Xe tự lái
              </Text>
            </View>
          </Button>

          <Button
            isSelfDriving={isSelfDriving}
            setIsSelfDriving={setIsSelfDriving}
            value={false}
            side="right">
            <View style={[appStyle.rowCenter, { justifyContent: 'center' }]}>
              <SteeringWheel
                color={isSelfDriving === false ? COLOR.white : COLOR.forth}
              />
              <Text
                style={[getTextStyle(isSelfDriving === false), { marginLeft: 10 }]}>
                Xe có tài xế
              </Text>
            </View>
          </Button>
        </View>
      </View>

      <View style={styles.contentWrapper}>
        <View style={styles.contentContainer}>
          {isSelfDriving === true ? (
            <SelfDrivingView timeString={timeString} navigation={navigation} />
          ) : (
            <DriverView timeString={timeString} navigation={navigation} />
          )}

          <AppButton title="Tìm xe" />
        </View>
      </View>
    </View>
  );
};

const getTextStyle = (isActive: boolean) =>
  isActive ? { color: COLOR.white } : { color: COLOR.forth };

interface ButtonProps {
  isSelfDriving: boolean;
  setIsSelfDriving: React.Dispatch<React.SetStateAction<boolean>>;
  value: boolean;
  children: React.ReactNode;
  side: string;
}

const Button = ({
  isSelfDriving,
  setIsSelfDriving,
  value,
  children,
  side,
}: ButtonProps) => (
  <TouchableOpacity
    style={[
      isSelfDriving === value
        ? { backgroundColor: COLOR.primary, justifyContent: 'center', alignItems: 'center' }
        : { backgroundColor: COLOR.sixth, justifyContent: 'center', alignItems: 'center' },
      side === 'left' ? { borderTopLeftRadius: 16 } : { borderTopRightRadius: 16 },

    ]}
    onPress={() => setIsSelfDriving(value)}>
    <Row style={styles.buttonContent}>{children}</Row>
  </TouchableOpacity>
);

interface ViewProps {
  timeString: string;
  navigation?: any;
}

const SelfDrivingView = ({ timeString, navigation }: ViewProps) => {
  return (
    <View>
      <View>
        <Row style={{ alignItems: 'center', marginBottom: 10 }}>
          <Icon name="location-dot" color={COLOR.borderColor} size={15} />
          <Text style={{ color: COLOR.borderColor, marginLeft: 10 }}>
            Địa điểm
          </Text>
        </Row>
        <TextInput
          placeholder="Nhập địa điểm"
          style={styles.heroInput}
          onPressIn={() => navigation.navigate('LocationPicking')}
        />
      </View>
      <View style={{ marginBottom: 35 }}>
        <Row
          style={{
            alignItems: 'center',
            marginBottom: 10,
            marginTop: 20,
          }}>
          <Icon name="calendar" color={COLOR.borderColor} size={15} />
          <Text style={{ color: COLOR.borderColor, marginLeft: 10 }}>
            Thời gian thuê
          </Text>
        </Row>
        <TextInput
          placeholder="Nhập thời gian thuê"
          value={timeString}
          style={[styles.heroInput]}
          onPressIn={() => navigation.navigate('TimePicking')}
        />
      </View>
    </View>
  );
};

<<<<<<< HEAD
const DriverView = ({ timeString, navigation }: ViewProps) => {
  const [tripType, setTripType] = useState('lien-tinh');
=======
const DriverView = ({timeString, navigation}: ViewProps) => {
  const [tripType, setTripType] = useState<string>('lien-tinh');
  const [tripDescription, setTripDescription] = useState<string>(
    'Di chuyển ngoài thành phố, hành trình 2 chiều',
  );
  const [showLocation, setShowLocation] = useState<boolean>(true);
>>>>>>> b64aa3d (update Component UI)
  return (
    <View>
      <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>
        Lộ trình
      </Text>
      <View style={{ alignItems: 'center' }}>
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
          <HStack space={2} alignItems="center">
            <Radio value="lien-tinh" my="1" size="sm">
<<<<<<< HEAD
              <Text style={{ fontSize: 12 }}>Liên tỉnh</Text>
            </Radio>
            <Radio value="lien-tinh-1-chieu" my="1" size="sm">
              <Text style={{ fontSize: 12 }}>Liên tỉnh (1 chiều)</Text>
            </Radio>
            <Radio value="noi-thanh" my="1" size="sm">
              <Text style={{ fontSize: 12 }}>Nội thành</Text>
=======
              <Text
                style={{
                  fontSize: 12,
                  color:
                    tripType === 'lien-tinh' ? COLOR.black : COLOR.borderColor,
                }}>
                Liên tỉnh
              </Text>
            </Radio>
            <Radio value="lien-tinh-1-chieu" my="1" size="sm">
              <Text
                style={{
                  fontSize: 12,
                  color:
                    tripType === 'lien-tinh-1-chieu'
                      ? COLOR.black
                      : COLOR.borderColor,
                }}>
                Liên tỉnh (1 chiều)
              </Text>
            </Radio>
            <Radio value="noi-thanh" my="1" size="sm">
              <Text
                style={{
                  fontSize: 12,
                  color:
                    tripType === 'noi-thanh' ? COLOR.black : COLOR.borderColor,
                }}>
                Nội thành
              </Text>
>>>>>>> b64aa3d (update Component UI)
            </Radio>
          </HStack>
        </Radio.Group>
      </View>
<<<<<<< HEAD
      <Row style={{ alignItems: 'center', marginTop: 10, marginBottom: 10 }}>
        <Text style={{ marginRight: 5 }}>Di chuyển trong thành phố</Text>
        <Icon name="circle-question" color={COLOR.borderColor} size={20} />
      </Row>
      <View>
        <Row style={{ alignItems: 'center', marginBottom: 10 }}>
=======
      <Row style={{alignItems: 'center', marginTop: 5, marginBottom: 15}}>
        <Text style={{marginRight: 5, fontSize: 12}}>{tripDescription}</Text>
        <Icon name="circle-question" color={COLOR.borderColor} size={15} />
      </Row>
      <View style={{marginBottom: 15}}>
        <Row style={{alignItems: 'center'}}>
>>>>>>> b64aa3d (update Component UI)
          <Icon name="map-pin" color={COLOR.borderColor} size={15} />
          <Text style={{ color: COLOR.borderColor, marginLeft: 10 }}>
            Điểm đón
          </Text>
        </Row>
        <TextInput
          placeholder="Nhập điểm đón"
          style={styles.heroInput}
          onPressIn={() => navigation.navigate('LocationPicking')}
        />
      </View>
<<<<<<< HEAD
      <View style={{ marginBottom: 15 }}>
        <Row
          style={{
            alignItems: 'center',
            marginBottom: 10,
            marginTop: 20,
          }}>
          <Icon name="location-dot" color={COLOR.borderColor} size={15} />
          <Text style={{ color: COLOR.borderColor, marginLeft: 10 }}>
            Địa điểm
          </Text>
        </Row>
        <Pressable onPress={() => navigation.navigate('LocationPicking')}>
          <TextInput placeholder="Nhập địa điểm" style={[styles.heroInput]} />
        </Pressable>
      </View>
      <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Thời gian</Text>
      <View style={{ marginBottom: 35 }}>
=======
      {showLocation && (
        <View style={{marginBottom: 15}}>
          <Row
            style={{
              alignItems: 'center',
            }}>
            <Icon name="location-dot" color={COLOR.borderColor} size={15} />
            <Text style={{color: COLOR.borderColor, marginLeft: 10}}>
              Địa điểm
            </Text>
          </Row>
          <Pressable onPress={() => navigation.navigate('LocationPicking')}>
            <TextInput placeholder="Nhập địa điểm" style={[styles.heroInput]} />
          </Pressable>
        </View>
      )}
      <Text style={{fontSize: 16, fontWeight: 'bold'}}>Thời gian</Text>
      <View style={{marginBottom: 20}}>
>>>>>>> b64aa3d (update Component UI)
        <Row
          style={{
            alignItems: 'center',
            marginTop: 15,
          }}>
          <Icon name="calendar" color={COLOR.borderColor} size={20} />
          <Text style={{ color: COLOR.borderColor, marginLeft: 10 }}>
            Thời gian thuê
          </Text>
        </Row>
        <Pressable onPress={() => navigation.navigate('TimePicking')}>
          <TextInput
            placeholder="Nhập thời gian thuê"
            value={timeString}
            style={[styles.heroInput]}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default Booking;

const styles = StyleSheet.create({
  outerContainer: {
    marginTop: -windowHeight*0.2,
    alignSelf: 'center',
    width: windowWidth,
    paddingHorizontal: 14,
  },
  heroBtns: {
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLOR.black,
    shadowRadius: 4.65,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
    width: '100%',

  },
  buttonContent: {
    paddingVertical: 20,
    width: '50%',

  },
  contentWrapper: {
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    shadowColor: COLOR.black,
    shadowRadius: 4.65,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  alignCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    // backgroundColor: COLOR.black,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 25,
    width: '100%',
    backgroundColor: COLOR.white,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  heroInput: {
    paddingVertical: 5,
    paddingLeft: 25,
    color: COLOR.black,
    fontWeight: 'bold',
    borderBottomColor: COLOR.placeholder10,
    borderBottomWidth: 0.5,
  },
});
