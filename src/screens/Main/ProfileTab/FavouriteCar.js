import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, {useState, useEffect} from 'react'
import { appStyle } from '../../../constants/AppStyle'
import Header from '../../../components/Header'
import { ICON } from '../../../constants/Theme'
import FastImage from 'react-native-fast-image'

const FavouriteCar = (props) => {
  const { navigation } = props;
  const [hasFavouriteCars, sethasFavouriteCars] = useState(false);
  useEffect(() => {
    // Xử lý state xe yêu thích
    const hasFavouriteCars = false;
    sethasFavouriteCars(hasFavouriteCars);
  }, [])
  return (
    <SafeAreaView style={[appStyle.container, { padding: 15 }]}>
      <Header
        icon={ICON.Back}
        text="Xe yêu thích"
        marginLeft={98}
        onPress={() => navigation.navigate('Profile')}
      />
      {hasFavouriteCars ? (
        // Hiển thị danh sách xe yêu thích 
        <View>
          <Text>Danh sách xe yêu thích sẽ ở đây</Text>
        </View>
      ) : (
        // Hiển thị hình ảnh khi không có xe yêu thích
        <FastImage
          source={require('../../../assets/image/guide/img_favourite_car.png')}
          style={{ width: '80%', height: '75%', alignSelf: 'center', justifyContent:'center' }}
        />
      )}
    </SafeAreaView>
  )
}

export default FavouriteCar

const styles = StyleSheet.create({})