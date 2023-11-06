// import React from 'react';
// import { View, Button, Image } from 'react-native';
// import { LoginButton, LoginManager, AccessToken } from 'react-native-fbsdk';
// import StarRating from 'react-native-star-rating';

// const FacebookLogin = () => {
//   const handleFacebookLogin = async () => {
//     try {
//       const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
//       if (result.isCancelled) {
//         console.log('Đăng nhập Facebook đã bị hủy');
//       } else {
//         const data = await AccessToken.getCurrentAccessToken();
//         if (data) {
//           console.log('Đăng nhập Facebook thành công');
//           console.log('Access Token:', data.accessToken);
//         }
//       }
//     } catch (error) {
//       console.log('Lỗi đăng nhập Facebook:', error);
//     }
//   };

//   return (
//     <View>
//       <LoginButton
//         onLoginFinished={(error, result) => {
//           if (error) {
//             console.log('Lỗi đăng nhập Facebook:', error);
//           } else if (result.isCancelled) {
//             console.log('Đăng nhập Facebook đã bị hủy');
//           } else {
//             console.log('Đăng nhập Facebook thành công');
//             AccessToken.getCurrentAccessToken().then(data => {
//               console.log('Access Token:', data.accessToken);
//             });
//           }
//         }}
//         onLogoutFinished={() => console.log('Đăng xuất Facebook thành công')}
//       />
//       <Button title="Đăng nhập Facebook" onPress={handleFacebookLogin} />
//       <StarRating
//         disabled={false} // true nếu bạn muốn người dùng không thể thay đổi đánh giá
//         maxStars={5} // số lượng sao tối đa
//         rating={3} // giá trị đánh giá hiện tại

//         fullStar={require('../assets/icon/ic_star.png')}
//         emptyStar={require('../assets/icon/ic_star.png')}
//         halfStar={require('../assets/icon/ic_star.png')}
//         selectedStar={(rating) => console.log(rating)} // hàm được gọi khi người dùng chọn một số sao
//       />
//     </View>
//   );
// };

// export default FacebookLogin;

import { Modal, SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import AppButton from '../components/AppButton';
import { COLOR, ICON } from '../constants/Theme';
import FastImage from 'react-native-fast-image';
import { appStyle } from '../constants/AppStyle';
import SuccessModal from '../components/Profile/Modal/SuccessModal'
import FailModal from '../components/Profile/Modal/FailModal'


const Test2 = (props) => {
    const navigation = useNavigation();
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
    const [isFailModalVisible, setIsFailModalVisible] = useState(false);

    const handleSuccess = () => {
        //navigation.navigate('');
        setIsSuccessModalVisible(false);
    };

    const handleCancel = () => {
        //navigation.navigate('');

        setIsFailModalVisible(false);
        
    };
    
    const handleCheckBalance = () => {
        //navigation.navigate('');

        setIsFailModalVisible(false);
    };
    return (
        <SafeAreaView style={appStyle.container}>
            <View style={{ justifyContent: 'space-evenly', flex: 1 }}>
                <AppButton
                    title="test"
                    onPress={() => navigation.goBack()}
                />
                <AppButton
                    title="Success"
                    onPress={() => setIsSuccessModalVisible(true)}
                />
                <AppButton
                    title="Fail"
                    onPress={() => setIsFailModalVisible(true)}
                />
            </View>

            <SuccessModal
                isVisible={isSuccessModalVisible}
                onClose={() => setIsSuccessModalVisible(false)}
                onNavigate={handleSuccess}
            />

            <FailModal
                isVisible={isFailModalVisible}
                onCancel={handleCancel}
                onCheckBalance={handleCheckBalance}
            />
        </SafeAreaView>

    )
}

export default Test2

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: 'white',
        position: 'absolute',
        alignSelf: 'center',
        width: '100%',
        height: 125,
        bottom: 0,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        paddingHorizontal: 10,
        paddingBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalCenteredContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalSuccessBox: {
        backgroundColor: 'white',
        width: '80%',
        padding: 20,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
