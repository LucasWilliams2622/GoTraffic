import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {COLOR, ICON} from '../../../../constants/Theme';
import {
  appStyle,
  windowHeight,
  windowWidth,
} from '../../../../constants/AppStyle';
import TopNav from '../../../../components/TopNav';
import {Car} from '../../../../components/Profile/data/DataCar';
import ItemCar from '../../../../components/Profile/ItemCar';
import AxiosInstance from '../../../../constants/AxiosInstance';
import {AppContext} from '../../../../utils/AppContext';
import AppHeader from '../../../../components/AppHeader';
import {useIsFocused} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {Dropdown} from 'react-native-element-dropdown';
const ListCar = props => {
  const {navigation, route} = props;
  const updatedCarInfo = route.params?.updatedCarInfo;
  const [carData, setCarData] = useState([]);
  const {setIsLogin, infoUser, idUser} = useContext(AppContext);
  const isFocused = useIsFocused();

  const getCarByIdUser = async () => {
    try {
      const response = await AxiosInstance().get(
        `/car/api/list-by-id-user?idUser=${idUser}`,
      );
      if (response.result) {
        setCarData(response.listCar);
      } else {
        console.log('Failed to get car');
      }
    } catch (error) {
      console.log('=========>', error);
    }
  };
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const data = [
    {label: 'Chưa duyệt', value: '1'},
    {label: 'Đã duyệt', value: '2'},
    {label: 'Từ chối', value: '3'},
  ];
  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && {color: 'blue'}]}>
          Dropdown label
        </Text>
      );
    }
    return null;
  };
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
      <View
        style={{
          height: '20%',
          width: '100%',
          padding: 10,
          backgroundColor: '#eff7fb',
          borderTopColor: COLOR.fifth,
          borderTopWidth: 1,
        }}>
        <Text style={[appStyle.text185, {color: '#023047'}]}>Quản lý xe</Text>
        <Dropdown
          style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
          placeholderStyle={appStyle.text165}
          selectedTextStyle={appStyle.text16}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
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
          }}
          // renderLeftIcon={() => (
          //   <AntDesign
          //     style={styles.icon}
          //     color={isFocus ? 'blue' : 'black'}
          //     name="Safety"
          //     size={20}
          //   />
          // )}
        />
      </View>
      <Text
        style={[
          appStyle.text14,
          {marginLeft: 20, fontStyle: 'italic', marginTop: 10},
        ]}>
        Danh sách xe của tôi:
      </Text>

      <FlatList
        style={{marginBottom: 72}}
        data={carData}
        renderItem={({item}) => <ItemCar data={item} />}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View>
            <FastImage
              style={styles.imageInvisible}
              resizeMode={'stretch'}
              source={require('../../../../assets/image/NoTrip.png')}
            />
            <Text
              style={[
                appStyle.text16,
                {textAlign: 'center', marginBottom: 10, fontStyle: 'italic'},
              ]}>
              Bạn chưa có xe nào !
            </Text>
          </View>
        }
      />
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
