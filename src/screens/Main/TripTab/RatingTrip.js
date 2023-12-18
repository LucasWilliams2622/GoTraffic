import {SafeAreaView, StyleSheet, Text, View, TextInput} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import {appStyle, windowHeight, windowWidth} from '../../../constants/AppStyle';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Header from '../../../components/Header';
import {useNavigation} from '@react-navigation/native';
import {ICON} from '../../../constants/Theme';
import StarRating from 'react-native-star-rating';
import FastImage from 'react-native-fast-image';
import AppButton from '../../../components/AppButton';
import AxiosInstance from '../../../constants/AxiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppContext} from '../../../utils/AppContext';
import Toast from 'react-native-toast-message';
import {showToastMessage} from '../../../utils/utils';
import axios from 'axios';
import moment from 'moment';

const RatingTrip = props => {
  const {id} = props?.route?.params;
  const navigation = useNavigation();
  const {infoUser, idUser} = useContext(AppContext);
  const [selectedStars, setSelectedStars] = useState(0);
  const [comment, setComment] = useState(null);

  const sendFeedback = async () => {
    try {
      if (selectedStars < 1) {
        showToastMessage('error', 'Vui lòng chọn số sao');
      } else {
        console.log(comment);
        const response = await axios.post(
          'http://103.57.129.166:3000/review/api/add',
          {
            idBooking: id,
            timeReview: moment().format('YYYY/MM/DD:hh:mm:ss'),
            content: comment ? comment : '',
            rating: selectedStars,
          },
        );
        console.log(response);
        if (response.data.result) {
          console.log(response);
          setSelectedStars(response.rating);
          setComment(response.content);
          showToastMessage('', 'Đánh giá thành công ');
          navigation.navigate('HistoryTrip');
        } else {
          showToastMessage('', 'Đánh giá thất bại ', ICON.cancelWhite);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const checkFeedback = async () => {
    try {
      const response = await AxiosInstance().get(
        '/review/api/get-by-id-booking?idBooking=' + id,
      );
      if (response.result) {
        console.log(response.review[0].user.id);
        if (response.review[0].user.id == idUser) {
          navigation.navigate('HistoryTrip');
          showToastMessage('error', 'Bạn đã đánh giá rồi ');
        } else {
          console.log('chua co danh gia');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    checkFeedback();
  }, []);

  return (
    <SafeAreaView style={[appStyle.container, {marginBottom: 72}]}>
      <Header
        text="Đánh giá chuyến đi"
        icon={ICON.Close}
        onPress={() => navigation.goBack()}
      />
      <KeyboardAwareScrollView
        style={appStyle.main}
        shouldRasterizeIOS
        showsVerticalScrollIndicator={false}>
        <FastImage
          source={require('../../../assets/image/guide/img_friends.png')}
          style={[appStyle.avatar, {marginVertical: 15}]}
        />

        <View
          style={{
            alignItems: 'center',
            height: windowHeight * 0.15,
            justifyContent: 'space-evenly',
          }}>
          <Text style={[appStyle.text18Bold]}>Tên chủ xe</Text>
          <Text style={[appStyle.text20Bold]}>
            Đánh giá dịch vụ cho thuê của chủ xe
          </Text>
          <Text style={[appStyle.text16]}>
            Bạn thấy dịch vụ này như thế nào?
          </Text>
        </View>

        <View
          style={{
            alignSelf: 'center',
            marginTop: 20,
            width: '70%',
          }}>
          <StarRating
            disabled={false}
            maxStars={5}
            rating={selectedStars}
            // fullStar={ICON.Star}
            // emptyStar={ICON.UnStar}
            fullStar={ICON.star}
            emptyStar={ICON.staro}
            starSize={34}
            selectedStar={rating => {
              setSelectedStars(rating);
              console.log(rating);
            }}
            animation="bounce"
          />
        </View>

        <TextInput
          onChangeText={text => setComment(text)}
          multiline
          value={comment}
          style={[
            styles.input,
            {
              height: windowHeight * 0.25,
              textAlignVertical: 'top',
              width: '100%',
            },
          ]}
          placeholder="Viết đánh giá"></TextInput>
      </KeyboardAwareScrollView>
      <AppButton
        title="Đánh giá"
        width="94%"
        onPress={() => sendFeedback()}
        icon={ICON.star}
      />
    </SafeAreaView>
  );
};

export default RatingTrip;

const styles = StyleSheet.create({
  input: {
    width: '95%',
    height: 45,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#8C8C8C',
    marginTop: 20,
    fontSize: 16,
    color: 'black',
    paddingHorizontal: 10,
  },
});
