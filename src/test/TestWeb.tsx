import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';

const MyWebView = () => {
  const [currentUrl, setCurrentUrl] = useState('');

  const handleNavigationStateChange = navState => {
    // Lấy đường dẫn hiện tại từ trạng thái dẫn hướng
    const url = navState.url;
    setCurrentUrl(url);

    // Kiểm tra xem đường dẫn có thay đổi hay không và xử lý một số logic tùy thuộc vào đường dẫn mới.
    // if (url.includes('example.com')) {
    // Xử lý khi chuyển đến trang có chứa 'example.com'
    console.log('Đã chuyển đến trang có chứa ' + url);
    checkLink(url);
    // }
  };
  const checkLink = url => {
    if (url.includes('success')) {
      console.log('asdasdasd');
    } else {
      console.log('===============>no');
    }
  };
  return (
    <View style={styles.container}>
      <WebView
        source={{uri: 'http://103.57.129.166:3000/'}}
        onNavigationStateChange={handleNavigationStateChange}
        style={styles.webview}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});

export default MyWebView;
