import { SafeAreaView, StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useState, useContext } from 'react'
import { appStyle, windowHeight, windowWidth } from '../../../constants/AppStyle'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Header from '../../../components/Header'
import { useNavigation } from '@react-navigation/native'
import { ICON } from '../../../constants/Theme'
import StarRating from 'react-native-star-rating';
import FastImage from 'react-native-fast-image'
import AppButton from '../../../components/AppButton'
import AxiosInstance from '../../../constants/AxiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppContext } from '../../../utils/AppContext';
import Toast from 'react-native-toast-message'

const RatingTrip = (props) => {
    const { id } = props?.route?.params;
    const navigation = useNavigation();
    const { infoUser, idUser } = useContext(AppContext);
    const [selectedStars, setSelectedStars] = useState(0);
    const [comment, setComment] = useState(null);


    const sendFeedback = async () => {
        try {
            const response = await AxiosInstance().post('/review/api/add', {
                idBooking: id,
                content: comment,
                rating: selectedStars,
            });

            if (response.result) {
                console.log(response);
                setSelectedStars(response.rating);
                setComment(response.content);
                Toast.show({
                    type: 'success',
                    text1: 'Gửi đánh giá thành công',
                    visibilityTime: 2000,
                    autoHide: true,
                    topOffset: 30,
                    bottomOffset: 40,
                });
                navigation.navigate('Home');
            } else {
                Toast.show({
                    type: 'fail',
                    text1: 'Gửi đánh giá thất bại',
                    visibilityTime: 2000,
                    autoHide: true,
                    topOffset: 30,
                    bottomOffset: 40,
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <SafeAreaView style={appStyle.container}>
            <Header
                text="Đánh giá chuyến đi"
                icon={ICON.Close}
                onPress={() => navigation.goBack()}
            />
            <KeyboardAwareScrollView behavior='padding'>
                <View style={{ flex: 1, paddingHorizontal: 15 }}>
                    <FastImage source={require('../../../assets/image/guide/img_friends.png')} style={[appStyle.avatar, { marginVertical: 15 }]} />

                    <View style={{ alignItems: 'center', height: windowHeight * 0.15, justifyContent: 'space-evenly' }}>
                        <Text style={[appStyle.text18Bold]} >Tên chủ xe</Text>
                        <Text style={[appStyle.text20Bold]}>Đánh giá dịch vụ cho thuê của chủ xe</Text>
                        <Text style={[appStyle.text16]}>Bạn thấy dịch vụ này như thế nào?</Text>
                    </View>

                    <View style={{ width: windowWidth * 0.7, alignSelf: 'center', marginTop: 20 }}>
                        <StarRating
                            disabled={false}
                            maxStars={5}
                            rating={selectedStars}
                            fullStar={ICON.Star}
                            emptyStar={ICON.UnStar}
                            starSize={34}
                            selectedStar={(rating) => {
                                setSelectedStars(rating);
                                console.log(rating);
                            }}
                        />
                    </View>

                    <TextInput onChangeText={text => setComment(text)}
                        value={comment}
                        style={[styles.input, { height: 130, textAlignVertical: 'top' }]}
                        placeholder="Viết đánh giá">
                    </TextInput>

                    <AppButton
                        title="Đánh giá"
                        marginTop={50}
                        onPress={() => sendFeedback()}
                    />
                </View>
            </KeyboardAwareScrollView>

        </SafeAreaView>
    )
}

export default RatingTrip

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
})