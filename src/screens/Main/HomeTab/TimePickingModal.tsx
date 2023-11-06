import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLOR} from '../../../constants/Theme';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {CalendarList, DateData, LocaleConfig} from 'react-native-calendars';
import {DayProps} from 'react-native-calendars/src/calendar/day';
import {DateRange, MarkedDate} from '../../../types';
import {formatPrice} from '../../../utils/utils';
import {Row} from 'native-base';
import {Picker} from '@react-native-picker/picker';
import Modal from 'react-native-modal';

const BottomBar: React.FC<{
  startDate: string | null;
  endDate: string | null;
}> = ({startDate, endDate}) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
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
      <Row style={{justifyContent: 'space-between', alignItems: 'center'}}>
        <View>
          <Text style={{fontWeight: 'bold'}}>
            {startDate &&
              endDate &&
              `${new Date(startDate).getHours()}h00, ${new Date(
                startDate,
              ).getDate()}/${new Date(startDate).getMonth() + 1} - ${new Date(
                startDate,
              ).getHours()}h00, ${new Date(endDate).getDate()}/${
                new Date(endDate).getMonth() + 1
              }`}
          </Text>
          <Text>
            Số ngày thuê:{' '}
            {startDate &&
              endDate &&
              1 +
                new Date(endDate).getDate() -
                new Date(startDate).getDate()}{' '}
            ngày
          </Text>
        </View>

        <Pressable
          style={{backgroundColor: COLOR.fifth, padding: 15, borderRadius: 8}}
          onPress={() => setIsModalVisible(true)}>
          <Text style={{color: COLOR.white, fontWeight: 'bold'}}>
            Tiếp theo
          </Text>
        </Pressable>
      </Row>
    </View>
  );
};

const TimePickingModal: React.FC<{
  price: number;
  toggle: any;
}> = ({price, toggle}) => {
  const currentDate = new Date().toISOString().slice(0, 10);
  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  const tomorrowDateString = tomorrowDate.toISOString().slice(0, 10);

  const [startDate, setStartDate] = useState<string | null>(currentDate);
  const [endDate, setEndDate] = useState<string | null>(tomorrowDateString);
  const [markedDates, setMarkedDates] = useState<{[key: string]: MarkedDate}>(
    {},
  );

  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [startTime, setStartTime] = useState('00:00');
  const [endTime, setEndTime] = useState('00:30');

  const times = [];
  for (let i = 0; i < 24; i++) {
    for (let j = 0; j < 60; j += 30) {
      const time = (i < 10 ? '0' + i : i) + ':' + (j === 0 ? '00' : j);
      times.push(time);
    }
  }

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const onDayPress = (day: DateData) => {
    if (!startDate) {
      setStartDate(day.dateString);
      setMarkedDates(prevState => ({
        ...prevState,
        [day.dateString]: {
          startingDay: true,
          color: COLOR.primary,
          textColor: 'white',
        },
      }));
    } else if (!endDate) {
      let dates = getDates({startDate, endDate: day.dateString});
      let newMarkedDates: {[key: string]: MarkedDate} = {};
      dates.forEach((date, index) => {
        if (index === 0) {
          newMarkedDates[date] = {
            startingDay: true,
            color: COLOR.primary,
            textColor: 'white',
          };
        } else if (index === dates.length - 1) {
          newMarkedDates[date] = {
            endingDay: true,
            color: COLOR.primary,
            textColor: 'white',
          };
        } else {
          newMarkedDates[date] = {color: COLOR.sixth, textColor: 'black'};
        }
      });
      setEndDate(day.dateString);
      setMarkedDates(prevState => ({...prevState, ...newMarkedDates}));
    } else {
      setStartDate(day.dateString);
      setEndDate(null);
      setMarkedDates({
        [day.dateString]: {
          startingDay: true,
          color: COLOR.primary,
          textColor: 'white',
        },
      });
    }
  };

  const getDates = ({startDate, endDate}: DateRange) => {
    let dateArray = [];
    let currentDate = new Date(startDate);
    while (currentDate <= new Date(endDate)) {
      dateArray.push(currentDate.toISOString().split('T')[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dateArray;
  };

  const renderDay = ({date, state}: DayProps & {date?: DateData}) => {
    let dayPrice = price;
    if (date) {
      const day = new Date(date.timestamp).getDay();
      if (day === 0 || day === 6) {
        dayPrice *= 1.1;
      }
    }
    const priceText = useMemo(() => formatPrice(dayPrice), [dayPrice]);
    const isDateSelected = date && markedDates[date.dateString];
    const backgroundColor = isDateSelected
      ? markedDates[date.dateString].color
      : 'white';
    const textColor = isDateSelected
      ? markedDates[date.dateString].textColor
      : 'black';

    const borderRadiusStyle =
      startDate === date?.dateString
        ? {borderTopLeftRadius: 10, borderBottomLeftRadius: 10}
        : endDate === date?.dateString
        ? {borderTopRightRadius: 10, borderBottomRightRadius: 10}
        : {};

    return (
      <TouchableWithoutFeedback onPress={() => date && onDayPress(date)}>
        <View
          style={{
            backgroundColor,
            ...borderRadiusStyle,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
            width: 55,
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: state === 'disabled' ? 'gray' : textColor,
              fontWeight: 'bold',
            }}>
            {date?.day}
          </Text>
          <Text
            style={{
              textAlign: 'center',
              color: state === 'disabled' ? 'gray' : textColor,
              fontSize: 10,
              marginTop: 3,
            }}>
            {priceText}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  useEffect(() => {
    console.log('startDate', startDate);
  }, [startDate]);

  useEffect(() => {
    console.log('endDate', endDate);
  }, [endDate]);

  LocaleConfig.locales['vn'] = {
    monthNames: [
      'Tháng 1',
      'Tháng 2',
      'Tháng 3',
      'Tháng 4',
      'Tháng 5',
      'Tháng 6',
      'Tháng 7',
      'Tháng 8',
      'Tháng 9',
      'Tháng 10',
      'Tháng 11',
      'Tháng 12',
    ],
    monthNamesShort: [
      'Th 1',
      'Th 2',
      'Th 3',
      'Th 4',
      'Th 5',
      'Th 6',
      'Th 7',
      'Th 8',
      'Th 9',
      'Th 10',
      'Th 11',
      'Th 12',
    ],
    dayNames: [
      'Chủ nhật',
      'Thứ 2',
      'Thứ 3',
      'Thứ 4',
      'Thứ 5',
      'Thứ 6',
      'Thứ 7',
    ],
    dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
    today: 'Hôm nay',
  };
  LocaleConfig.defaultLocale = 'vn';

  return (
    <SafeAreaView style={{backgroundColor: COLOR.white, flex: 1}}>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Pressable
          onPress={toggle}
          style={[styles.closeBtn, {position: 'absolute', left: 20}]}>
          <Icon name="x" size={20} color={COLOR.black} />
        </Pressable>
        <Text style={{fontSize: 22}}>Thời gian</Text>
      </View>
      <CalendarList
        minDate={currentDate}
        current={currentDate}
        firstDay={1}
        pastScrollRange={0}
        futureScrollRange={3}
        scrollEnabled={true}
        showScrollIndicator={false}
        onDayPress={onDayPress}
        horizontal={true}
        pagingEnabled={true}
        markingType={'period'}
        markedDates={markedDates}
        dayComponent={renderDay}
      />
      <Modal isVisible={isTimePickerVisible}>
        <View style={{marginTop: 22, backgroundColor: COLOR.white}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Picker
              selectedValue={startTime}
              onValueChange={itemValue => setStartTime(itemValue)}
              style={{flex: 0.5}}>
              {times.map(time => (
                <Picker.Item key={time} label={time} value={time} />
              ))}
            </Picker>

            <Picker
              selectedValue={endTime}
              onValueChange={itemValue => setEndTime(itemValue)}
              style={{flex: 0.5}}>
              {times.map(time => (
                <Picker.Item key={time} label={time} value={time} />
              ))}
            </Picker>
          </View>

          <Pressable onPress={hideTimePicker}>
            <Text>OK</Text>
          </Pressable>
        </View>
      </Modal>
      <Pressable onPress={showTimePicker}>
        <Text>Chọn giờ</Text>
      </Pressable>
      <BottomBar startDate={startDate} endDate={endDate} />
    </SafeAreaView>
  );
};

export default TimePickingModal;

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
