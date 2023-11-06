import { SafeAreaView, StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useState } from 'react'
import { appStyle, windowHeight, windowWidth } from '../../../constants/AppStyle'
import Header from '../../../components/Header'
import { useNavigation } from '@react-navigation/native'
import { ICON } from '../../../constants/Theme'
import StarRating from 'react-native-star-rating';
import FastImage from 'react-native-fast-image'
import AppButton from '../../../components/AppButton'

const RatingTrip = () => {
    const navigation = useNavigation();
    const [selectedStars, setSelectedStars] = useState(0);
    const [comment, setComment] = useState(null);

    const handleRating = () => {
        const feedback = [
            selectedStars,
            comment
        ]
        console.log(feedback);
        navigation.goBack(feedback);
    }

    return (
        <SafeAreaView style={appStyle.container}>
            <Header
                text="Đánh giá chuyến đi"
                icon={ICON.Close}
                onPress={() => navigation.goBack()}
            />
            <View style={{ flex: 1, paddingHorizontal: 15 }}>
                <FastImage source={require('../../../assets/image/guide/img_friends.png')} style={[appStyle.avatar, { marginVertical: 15 }]} />
                
                <View style={{alignItems:'center', height: windowHeight *0.15, justifyContent:'space-evenly'}}>
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
                    onPress={() => handleRating()}
                />
            </View>
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