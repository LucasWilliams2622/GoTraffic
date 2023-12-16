import {SafeAreaView, StyleSheet, Text, View, FlatList} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {COLOR, ICON} from '../../../../constants/Theme';
import {
  appStyle,
  windowHeight,
  windowWidth,
} from '../../../../constants/AppStyle';

import ItemCar from '../../../../components/Profile/ItemCar';
import AxiosInstance from '../../../../constants/AxiosInstance';
import {AppContext} from '../../../../utils/AppContext';
import AppHeader from '../../../../components/AppHeader';
import {useIsFocused} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {Dropdown} from 'react-native-element-dropdown';
import {ScrollView} from 'native-base';
import SkeletonItemCar from '../../../../components/SkeletonItemCar';
const data = [
  {label: 'Tất cả', value: '0'},
  {label: 'Chưa duyệt', value: '1'},
  {label: 'Đã duyệt', value: '2'},
  {label: 'Từ chối', value: '3'},
];

const ListCar = props => {
  const {navigation, route} = props;
  const updatedCarInfo = route.params?.updatedCarInfo;
  const [carData, setCarData] = useState([]);
  const {idUser} = useContext(AppContext);
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(true);

  const getCarByIdUser = async () => {
    try {
      const response = await AxiosInstance().get(
        `/car/api/list-by-id-user?idUser=${idUser}`,
      );
      if (response.result) {
        setCarData(response.listCar);
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      } else {
        console.log('Failed to get car');
      }
    } catch (error) {
      console.log('=========>', error);
    }
  };
  const getCarByIdUserByStatus = async status => {
    try {
      const response = await AxiosInstance().get(
        `/car/api/get-car-by-status-of-user?idUser=${idUser}&status=` +
          parseInt(status),
      );
      if (response.result) {
        console.log(response);
        setCarData(response.car);
      } else {
        setCarData([]);
      }
    } catch (error) {
      console.log('=========>', error);
      setCarData([]);
    }
  };
  const [value, setValue] = useState(data[0].value);
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    getCarByIdUser();
  }, [isFocused]);

  return (
    <SafeAreaView style={appStyle.container}>
      <AppHeader
        title="Xe của tôi"
        icon={ICON.Add}
        onPressRight={() => navigation.navigate('BasicInfor')}
      />
      <ScrollView style={{}}>
        <Dropdown
          style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
          placeholderStyle={appStyle.text165}
          selectedTextStyle={appStyle.text16}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          mode="modal"
          containerStyle={{
            width: windowWidth,
            marginTop: windowHeight * 0.5,
            height: windowHeight * 0.5,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            paddingTop: 16,
            paddingHorizontal: 8,
          }}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Tìm xe' : '...'}
          searchPlaceholder="Tìm kiếm"
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
            console.log(item.value);
            getCarByIdUserByStatus(item.value);
          }}
        />
        <Text
          style={[
            appStyle.text145,
            {paddingHorizontal: 20, paddingVertical: 8},
          ]}>
          Số lượng xe: {carData.length}{' '}
          {/* {value == 1
            ? 'chưa duyệt'
            : value == 2
            ? 'đã duyệt'
            : value == 3
            ? 'từ chối'
            : ''} */}
        </Text>
        {loading == true ? (
          <View>
            <SkeletonItemCar />
            <SkeletonItemCar />
            <SkeletonItemCar />
            <SkeletonItemCar />
          </View>
        ) : (
          <>
            <FlatList
              style={{marginBottom: 72, }}
              data={carData}
              renderItem={({item}) => <ItemCar data={item} />}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <View style={{marginTop: 20}}>
                  <FastImage
                    style={styles.imageInvisible}
                    resizeMode={'stretch'}
                    source={require('../../../../assets/image/NoTrip.png')}
                  />
                  <Text
                    style={[
                      appStyle.text16,
                      {
                        textAlign: 'center',
                        marginBottom: 10,
                        fontStyle: 'italic',
                      },
                    ]}>
                    Bạn chưa có xe nào !
                  </Text>
                </View>
              }
            />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ListCar;

const styles = StyleSheet.create({
  imageInvisible: {
    width: 192,
    height: 138,
    alignSelf: 'center',
    marginBottom: 20,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: COLOR.white,
    marginTop: 10,
    marginHorizontal: 14,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
