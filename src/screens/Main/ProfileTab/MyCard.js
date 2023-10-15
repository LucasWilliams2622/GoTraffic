import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { appStyle, windowHeight, windowWidth } from '../../../constants/AppStyle'
import Header from '../../../components/Header'
import { COLOR, ICON } from '../../../constants/Theme'
import FastImage from 'react-native-fast-image'
import AppButton from '../../../components/AppButton'
import ItemCard from '../../../components/Profile/ItemCard'
import { FlatList } from 'native-base'

const MyCard = (props) => {
  const { navigation } = props;
  const [hasCard, setHasCard] = useState(true);
  const [card, setCard] = useState([]);

  

  return (
    <SafeAreaView style={appStyle.container}>
      <Header
        text="Thẻ của tôi"
        icon={ICON.Back}
        onPress={() => navigation.navigate('Profile')}
      />

      <View style={{ padding: 10, width: '100%', height: '100%', alignItems: 'center' }}>
        {hasCard ? (
          <View style={{width: '100%', height:'77%'}}>
            <ItemCard
              icon={ICON.Tech}
              text="ATM 3302"
            />
            <ItemCard
              icon={ICON.Tech}
              text="ATM 3302"
            />
            <ItemCard
              icon={ICON.MasterCard}
              text="ATM 3302"
            />
            {/* <FlatList
              style={styles.styleFlat}
              data={card}
              renderItem={({ item }) => <ItemCard data={item} />}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
            /> */}
          </View>
        ) : (
          <FastImage
            source={require('../../../assets/image/guide/img_no_card.png')}
            onLoad={() => console.log('Hình ảnh đã được tải thành công')}
            onError={(error) => console.error('Lỗi khi tải hình ảnh:', error)}
            style={{ width: '80%', height: '77%', alignSelf: 'center', justifyContent: 'center' }}
          />
        )}
        <AppButton
          title="Thêm phương thức thanh toán"
          onPress={() => navigation.navigate('NewCard')}
        />
      </View>
    </SafeAreaView>
  )
}

export default MyCard

const styles = StyleSheet.create({
  styleFlat: {
    marginTop: 20,
    height: '100%',

  },

})