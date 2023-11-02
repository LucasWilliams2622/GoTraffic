import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { appStyle, windowHeight, windowWidth } from '../../../../constants/AppStyle';
import Header from '../../../../components/Header';
import { COLOR, ICON } from '../../../../constants/Theme';
import AppInput from '../../../../components/AppInput';
import FastImage from 'react-native-fast-image';
import AppButton from '../../../../components/AppButton';

const NewCard = (props) => {
    const { navigation } = props;
    return (
        <SafeAreaView style={appStyle.container}>
            <Header
                icon={ICON.Close}
                text="Liên kết thẻ"
                onPress={() => navigation.navigate('MyCard')}
            />
            <View style={{ padding: 15, width: '100%' }}>
                <View style={{ marginTop: windowHeight * 0.02 }}>
                    <Text style={appStyle.text16Bold}>SỐ THẺ</Text>
                    <AppInput
                        placeholder="XXXX XXXX XXXX XXXX"
                        keyboardType='numeric'
                    />
                </View>
                
                <View style={{ marginTop: windowHeight * 0.05, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View >
                        <Text style={appStyle.text16Bold}>Ngày hết hạn</Text>
                        <AppInput
                            placeholder="mm/yy"
                            width={windowWidth * 0.4}
                            keyboardType='number-pad'
                        />
                    </View>
                    <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={appStyle.text16Bold}>Số CVV</Text>
                            <FastImage source={ICON.Warning} style={[appStyle.iconMedium, { marginLeft: 5 }]}></FastImage>
                        </View>
                        <AppInput
                            placeholder="XXX"
                            width={windowWidth * 0.4}
                            keyboardType='number-pad'
                        />
                    </View>
                </View>

                <View style={styles.note}>
                    <FastImage source={ICON.MasterCard} style={{ width: 60, height: 40 }}></FastImage>
                    <View style={{ width: '75%' }} >
                        <Text style={[appStyle.text14, { textAlign: 'justify' }]}>
                            1.000 sẽ được khấu trừ để xác minh thông tin thẻ. Đừng lo lắng, chúng tôi sẽ hoàn trả lại sau khi hoàn tất
                        </Text>
                    </View>
                </View>

                <AppButton
                    title="Lưu"
                    marginTop={windowHeight * 0.365}
                    onPress={() => navigation.navigate('MyCard')}
                />
            </View>
        </SafeAreaView>
    )
}

export default NewCard

const styles = StyleSheet.create({
    note: {
        width: '100%',
        height: windowHeight * 0.1,
        paddingHorizontal: 15,
        marginTop: 20,
        backgroundColor: COLOR.gray,
        borderRadius: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})