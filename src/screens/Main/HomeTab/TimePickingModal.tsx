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
import moment from 'moment';

const BottomBar: React.FC<{
  startDate: Date | null;
  endDate: Date | null;
  startTime: string;
  endTime: string;
  toggle: any;
  setSelectedTime: any;
}> = ({startDate, endDate, startTime, endTime, toggle, setSelectedTime}) => {
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
              `${startDate.getHours()}h ${startDate.getMinutes()}, ${startDate.getDate()}/${
                startDate.getMonth() + 1
              } - ${endDate.getHours()}h ${endDate.getMinutes()}, ${endDate.getDate()}/${
                endDate.getMonth() + 1
              }`}
          </Text>
          <Text>
            Số ngày thuê:{' '}
            {startDate && endDate && endDate.getDate() - startDate.getDate()}{' '}
            ngày
          </Text>
        </View>

        <Pressable
          style={{backgroundColor: COLOR.fifth, padding: 15, borderRadius: 8}}
          onPress={() => {
            setSelectedTime({startTime, endTime, startDate, endDate});
            toggle();
          }}>
          <Text style={{color: COLOR.white, fontWeight: 'bold'}}>
            Tiếp theo
          </Text>
        </Pressable>
      </Row>
    </View>
  );
};

const TimePickingModal: React.FC<{
  price?: number;
  toggle: any;
  setSelectedTime: any;
}> = ({price, toggle, setSelectedTime}) => {
  const currentDate = new Date();
  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);

  const [startDate, setStartDate] = useState<Date | null>(currentDate);
  const [endDate, setEndDate] = useState<Date | null>(tomorrowDate);
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
    const selectedDate = moment.utc(day.dateString).toDate();
    if (!startDate) {
      setStartDate(selectedDate);
      setMarkedDates(prevState => ({
        ...prevState,
        [day.dateString]: {
          startingDay: true,
          color: COLOR.primary,
          textColor: 'white',
        },
      }));
    } else if (!endDate) {
      let dates = getDates({startDate, endDate: selectedDate});
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
      setEndDate(selectedDate);
      setMarkedDates(prevState => ({...prevState, ...newMarkedDates}));
    } else {
      setStartDate(selectedDate);
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
    let dayPrice = price !== undefined ? price : 0;
    if (dayPrice !== undefined && date) {
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

    const startDateString = startDate
      ? startDate.toISOString().split('T')[0]
      : null;
    const endDateString = endDate ? endDate.toISOString().split('T')[0] : null;

    const borderRadiusStyle =
      startDateString === date?.dateString
        ? {borderTopLeftRadius: 10, borderBottomLeftRadius: 10}
        : endDateString === date?.dateString
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
          {price && (
            <Text
              style={{
                textAlign: 'center',
                color: state === 'disabled' ? 'gray' : textColor,
                fontSize: 10,
                marginTop: 3,
              }}>
              {priceText}
            </Text>
          )}
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

  const onTimeChange = (
    itemValue: string,
    setDate: Function,
    setSelectedTime: Function,
  ) => {
    const [hours, minutes] = itemValue.split(':');
    setDate((prevDate: Date | null) => {
      if (prevDate) {
        const newDate = new Date(prevDate);
        newDate.setHours(parseInt(hours));
        newDate.setMinutes(parseInt(minutes));
        return newDate;
      }
      return prevDate;
    });
    setSelectedTime(itemValue); // Update the selected time state
  };

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
        <View
          style={{
            marginTop: 22,
            backgroundColor: COLOR.white,
            padding: 20,
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flex: 0.5}}>
              <Text>Nhận xe</Text>
              <Picker
                selectedValue={startTime}
                onValueChange={itemValue =>
                  onTimeChange(itemValue, setStartDate, setStartTime)
                }>
                {times.map(time => (
                  <Picker.Item key={time} label={time} value={time} />
                ))}
              </Picker>
            </View>

            <View style={{flex: 0.5}}>
              <Text>Trả xe</Text>
              <Picker
                selectedValue={endTime}
                onValueChange={itemValue =>
                  onTimeChange(itemValue, setEndDate, setEndTime)
                }>
                {times.map(time => (
                  <Picker.Item key={time} label={time} value={time} />
                ))}
              </Picker>
            </View>
          </View>

          <Pressable
            onPress={() => {
              hideTimePicker();
              setSelectedTime({startTime, endTime, startDate, endDate});
            }}
            style={{
              backgroundColor: COLOR.fifth,
              alignItems: 'center',
              paddingVertical: 10,
              borderRadius: 10,
              marginTop: 15,
            }}>
            <Text style={{color: COLOR.white}}>Lưu</Text>
          </Pressable>
        </View>
      </Modal>
      <Row
        style={{
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          marginTop: 50,
        }}>
        <Pressable
          onPress={showTimePicker}
          style={{
            padding: 10,
            borderColor: COLOR.black,
            borderWidth: StyleSheet.hairlineWidth,
            borderRadius: 10,
            flex: 1,
            marginRight: 5,
          }}>
          <Text>Nhận xe</Text>
          <Row style={{alignItems: 'center', justifyContent: 'space-between'}}>
            <Text style={{fontWeight: 'bold', color: COLOR.black}}>
              {startTime}
            </Text>
            <Icon name="chevron-down" size={10} color={COLOR.black} />
          </Row>
        </Pressable>
        <Pressable
          onPress={showTimePicker}
          style={{
            padding: 10,
            borderColor: COLOR.black,
            borderWidth: StyleSheet.hairlineWidth,
            borderRadius: 10,
            flex: 1,
            marginLeft: 5,
          }}>
          <Text>Trả xe</Text>
          <Row style={{alignItems: 'center', justifyContent: 'space-between'}}>
            <Text style={{fontWeight: 'bold', color: COLOR.black}}>
              {endTime}
            </Text>
            <Icon name="chevron-down" size={10} color={COLOR.black} />
          </Row>
        </Pressable>
      </Row>
      <BottomBar
        startDate={startDate}
        endDate={endDate}
        startTime={startTime}
        endTime={endTime}
        setSelectedTime={setSelectedTime}
        toggle={toggle}
      />
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
