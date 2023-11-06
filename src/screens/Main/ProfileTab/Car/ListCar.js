import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
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

const ListCar = props => {
  const {navigation, route} = props;
  const updatedCarInfo = route.params?.updatedCarInfo;
  const [carData, setCarData] = useState([]);
  const {setIsLogin, infoUser, idUser} = useContext(AppContext);

  console.log('ListCar info ====', updatedCarInfo);

  // const addCar = () => {
  //     if (updatedCarInfo) {
  //       const { carInfo, price,provinces,wards } = updatedCarInfo;
  //       const newCar = {
  //         selectedModel: carInfo.selectedModel,
  //         selectedBrand: carInfo.selectedBrand,
  //         selectedYear: carInfo.selectedYear,
  //         price: price,
  //         provinces: provinces,
  //         wards: wards,
  //       };
  //       setCarData((prevCarData) => [...prevCarData, newCar]);
  //       navigation.navigate('BasicInfor')
  //     }
  //   };
  const getCarByIdUser = async () => {
    try {
      const response = await AxiosInstance().get(
        '/car/api/list-by-id-user?idUser='+idUser,
      );
      if (response.result) {
        console.log(response.listCar);
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
    const updatedCarInfo = updatedCarInfo || [];
    if (updatedCarInfo.length > 0) {
      setCarData([...carData, ...updatedCarInfo]);
    }
  }, [props.route.params]);

  return (
    <SafeAreaView style={appStyle.container}>
      <TopNav
        iconLeft={ICON.Back}
        screenLeft="HomeCar"
        text="Xe của tôi"
        iconRight={ICON.Add}
        screenRight="BasicInfor"
        //onPressRight={() => addCar()}
      />
      <FlatList
        style={{marginBottom: 50}}
        data={carData}
        renderItem={({item}) => <ItemCar data={item} />}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default ListCar;

const styles = StyleSheet.create({});
