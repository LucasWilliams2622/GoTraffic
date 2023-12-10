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

const ListCar = props => {
  const {navigation, route} = props;
  const updatedCarInfo = route.params?.updatedCarInfo;
  const [carData, setCarData] = useState([]);
  const {setIsLogin, infoUser, idUser} = useContext(AppContext);
  const isFocused = useIsFocused();

  const getCarByIdUser = async () => {
    try {
      const response = await AxiosInstance().get(
        '/car/api/list-by-id-user?idUser='+idUser,
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
      <FlatList
        style={{marginBottom: 100}}
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
});
