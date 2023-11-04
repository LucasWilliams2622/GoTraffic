import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {Checkbox, FlatList, ScrollView} from 'native-base';
import {SafeAreaView} from 'react-native-safe-area-context';
import {appStyle} from '../../../../constants/AppStyle';
import {COLOR} from '../../../../constants/Theme';
import FastImage from 'react-native-fast-image';
import ItemListCar from '../../../../components/Support/ItemListCar';
import ItemTrip from '../../../../components/Support/ItemTrip';

const InforOfCar = props => {
  const {navigation} = props;
  const goBack = () => {
    navigation.goBack('HomeCar');
  };
  return (
    <SafeAreaView style={appStyle.container}>
      <View style={styles.viewTitle}>
        <TouchableOpacity onPress={goBack}>
          <FastImage
            source={require('../../../../assets/icon/ic_left.png')}
            style={{
              position: 'absolute',
              left: 10,
              top: 20,
              width: 20,
              height: 20,
            }}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Thông tin xe</Text>
        <TouchableOpacity>
          <FastImage
            source={require('../../../../assets/icon/ic_add.png')}
            style={{
              position: 'absolute',
              right: 10,
              top: 20,
              width: 20,
              height: 20,
            }}
          />
        </TouchableOpacity>
      </View>
      <ScrollView style={appStyle.main}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <Text style={appStyle.text14}>Biển số xe</Text>
          <Text style={appStyle.text14}>59LD-30909</Text>
        </View>
        <View
          style={{
            width: '100%',
            height: 0.5,
            backgroundColor: COLOR.borderColor2,
            marginBottom: 10,
            marginTop: 10,
          }}
        />
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <Text style={[appStyle.text14]}>Địa chỉ</Text>
            <Text style={[appStyle.text14]}>Thay đổi {'>'}</Text>
          </View>
          <Text numberOfLines={1} style={[appStyle.text12, {marginTop: 10}]}>
            12 QL51, TT.Phú Mỹ, Tân Thành,Bà Rịa - Vũng Tàu, Việt Nam
          </Text>
        </View>
        <View
          style={{
            width: '100%',
            height: 0.5,
            backgroundColor: COLOR.borderColor2,
            marginBottom: 10,
            marginTop: 10,
          }}
        />
        <View>
          <Text style={appStyle.text16Bold}>MÔ TẢ XE</Text>
          <TextInput style={styles.textInput} placeholder="fghk" />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={appStyle.text14}>Mức tiêu thụ nhiên liệu</Text>
            <Text style={appStyle.text14}>0.0 lít/100km</Text>
          </View>
          <View
            style={{
              width: '100%',
              height: 0.5,
              backgroundColor: COLOR.borderColor2,
              marginBottom: 10,
              marginTop: 10,
            }}
          />
        </View>
        <View>
          <Text style={appStyle.text16Bold}>TÍNH NĂNG XE</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
            }}>
            <Checkbox>
              <Text style={[appStyle.text14, {width: 70}]}>Bản đồ</Text>
            </Checkbox>
            <Checkbox>
              <Text style={[appStyle.text14, {width: 70}]}>Bluetooth</Text>
            </Checkbox>
            <Checkbox>
              <Text style={[appStyle.text14, {width: 70}]}>Camera 360</Text>
            </Checkbox>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <Checkbox>
              <Text style={[appStyle.text14, {width: 70}]}>Camera cập lề</Text>
            </Checkbox>
            <Checkbox>
              <Text style={[appStyle.text14, {width: 70}]}>
                Camera hành trình
              </Text>
            </Checkbox>
            <Checkbox>
              <Text style={[appStyle.text14, {width: 70}]}>Camera lùi</Text>
            </Checkbox>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <Checkbox>
              <Text style={[appStyle.text14, {width: 70}]}>Cảm biến lốp</Text>
            </Checkbox>
            <Checkbox>
              <Text style={[appStyle.text14, {width: 70}]}>
                Cảm biến va chạm
              </Text>
            </Checkbox>
            <Checkbox>
              <Text style={[appStyle.text14, {width: 70}]}>
                Cảnh báo tốc độ
              </Text>
            </Checkbox>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <Checkbox>
            <Text style={[appStyle.text14, {width: 70}]}>Cửa sổ trời</Text>
          </Checkbox>
          <Checkbox>
            <Text style={[appStyle.text14, {width: 70}]}>Định vị GPS</Text>
          </Checkbox>
          <Checkbox>
            <Text style={[appStyle.text14, {width: 70}]}>Ghế trẻ em</Text>
          </Checkbox>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <Checkbox>
            <Text style={[appStyle.text14, {width: 70}]}>Khe cắm USB</Text>
          </Checkbox>
          <Checkbox>
            <Text style={[appStyle.text14, {width: 70}]}>Lốp dự phòng</Text>
          </Checkbox>
          <Checkbox>
            <Text style={[appStyle.text14, {width: 70}]}>Màn hình DVD</Text>
          </Checkbox>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <Checkbox>
            <Text style={[appStyle.text14, {width: 74}]}>
              Nắp thùng xe bán tải
            </Text>
          </Checkbox>
          <Checkbox style={{marginTop:5}}>
            <Text style={[appStyle.text14, {width: 70}]}>ETC</Text>
          </Checkbox>
          <Checkbox>
            <Text style={[appStyle.text14, {width: 70}]}>Túi khí an toàn</Text>
          </Checkbox>
        </View>
        <TouchableOpacity style={styles.btn}>
          <Text
            style={[
              appStyle.text16Bold,
              {color: COLOR.white, textAlign: 'center'},
            ]}>
            CẬP NHẬT
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default InforOfCar;

const styles = StyleSheet.create({
  viewTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
  },
  image: {
    width: '100%',
    height: '30%',
    position: 'absolute',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    color: COLOR.black,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 14,
  },
  textInput: {
    width: '100%',
    height: 200,
    borderWidth: 0.5,
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    justifyContent: 'flex-start',
    paddingVertical: 0,
  },
  btn: {
    backgroundColor: COLOR.primary,
    height: 50,
    borderRadius: 10,
    alignContent: 'center',
    justifyContent: 'center',
    marginBottom: 70,
    marginTop: 20,
  },
});
const DATA = [
  {
    id: 1,
    image: require('../../../../assets/image/car.jpg'),
    time: '21/09/2023 | 20:30',
    name: 'KIA MORNING 2022',
    timeStart: '21h00,17/10/2023',
    timeEnd: '21h00,18/10/2023',
    price: '1.600.666đ',
  },
  {
    id: 2,
    image: require('../../../../assets/image/car.jpg'),
    time: '21/09/2023 | 20:30',
    name: 'KIA MORNING 2022',
    timeStart: '21h00,17/10/2023',
    timeEnd: '21h00,18/10/2023',
    price: '1.600.666đ',
  },
  
];