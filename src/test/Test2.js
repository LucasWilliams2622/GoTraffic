import React from 'react';
import { View, Button } from 'react-native';
import { LoginButton, LoginManager,AccessToken } from 'react-native-fbsdk';

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
    </View>
  );
};

export default FacebookLogin;
