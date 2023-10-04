import React from 'react';
import { View, Button, Image } from 'react-native';
import { LoginButton, LoginManager, AccessToken } from 'react-native-fbsdk';
import StarRating from 'react-native-star-rating';

const FacebookLogin = () => {
  const handleFacebookLogin = async () => {
    try {
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
      if (result.isCancelled) {
        console.log('Đăng nhập Facebook đã bị hủy');
      } else {
        const data = await AccessToken.getCurrentAccessToken();
        if (data) {
          console.log('Đăng nhập Facebook thành công');
          console.log('Access Token:', data.accessToken);
        }
      }
    } catch (error) {
      console.log('Lỗi đăng nhập Facebook:', error);
    }
  };

  return (
    <View>
      <LoginButton
        onLoginFinished={(error, result) => {
          if (error) {
            console.log('Lỗi đăng nhập Facebook:', error);
          } else if (result.isCancelled) {
            console.log('Đăng nhập Facebook đã bị hủy');
          } else {
            console.log('Đăng nhập Facebook thành công');
            AccessToken.getCurrentAccessToken().then(data => {
              console.log('Access Token:', data.accessToken);
            });
          }
        }}
        onLogoutFinished={() => console.log('Đăng xuất Facebook thành công')}
      />
      <Button title="Đăng nhập Facebook" onPress={handleFacebookLogin} />
      <StarRating
        disabled={false} // true nếu bạn muốn người dùng không thể thay đổi đánh giá
        maxStars={5} // số lượng sao tối đa
        rating={3} // giá trị đánh giá hiện tại
       
        fullStar={require('../assets/icon/ic_star.png')}
        emptyStar={require('../assets/icon/ic_star.png')}
        halfStar={require('../assets/icon/ic_star.png')}
        selectedStar={(rating) => console.log(rating)} // hàm được gọi khi người dùng chọn một số sao
      />
    </View>
  );
};

export default FacebookLogin;
