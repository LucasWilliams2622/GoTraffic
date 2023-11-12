import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {appStyle} from '../../../../constants/AppStyle';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLOR} from '../../../../constants/Theme';
import FastImage from 'react-native-fast-image';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {CalendarList} from 'react-native-calendars';
import AppHeader from '../../../../components/AppHeader';

const CalendarOfCar = props => {
  const {navigation} = props;
  const goBack = () => {
    navigation.goBack('DetailInListCar');
  };
  const [selected, setSelected] = useState('');

  return (
    <SafeAreaView style={appStyle.container}>
      <AppHeader title="LỊCH XE"  />
      <CalendarList
        // Callback which gets executed when visible months change in scroll view. Default = undefined
        onVisibleMonthsChange={months => {
          console.log('now these months are visible', months);
        }}
        pastScrollRange={0}
        futureScrollRange={2}
        // Enable or disable scrolling of calendar list
        scrollEnabled={true}
        // Enable or disable vertical scroll indicator. Default = false
        showScrollIndicator={true}
        style={{marginBottom: 100}}
        theme={{
          'stylesheet.calendar.header': {
            dayTextAtIndex5: {
              color: COLOR.orange,
            },
            dayTextAtIndex6: {
              color: COLOR.orange,
            },
          },
        }}
      />
    </SafeAreaView>
  );
};

export default CalendarOfCar;

const styles = StyleSheet.create({
  viewTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 70,
    borderBottomWidth: 0.5,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    color: COLOR.black,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 14,
  },
  line1: {
    width: '100%',
    height: '30%',
    padding: 14,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginBottom: 10,
    backgroundColor: COLOR.black,
  },
});
