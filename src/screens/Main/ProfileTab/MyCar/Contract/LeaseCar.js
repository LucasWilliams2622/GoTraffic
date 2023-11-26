import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import React from 'react';
import {
  appStyle,
  windowHeight,
  windowWidth,
} from '../../../../../constants/AppStyle';
import AppHeader from '../../../../../components/AppHeader';
import {WebView} from 'react-native-webview';
import {showToastMessage} from '../../../../../utils/utils';
import RNFetchBlob from 'rn-fetch-blob';
import {useNavigation} from '@react-navigation/native';
const LeaseCar = props => {
  const navigation = useNavigation();
  const fileUrl =
    'https://docs.google.com/document/d/1omMjX-nd3M9GyglMSuccaDt_tQm_OOYL/edit?usp=sharing&ouid=114108272420378053946&rtpof=true&sd=true';

  const handleDownloadPdf = async () => {
    try {
      const {config, fs} = RNFetchBlob;
      const DownloadDir = fs.dirs.DownloadDir;

      const options = {
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path: `${DownloadDir}/hop_dong_mau.docx`,
        },
      };

      config(options)
        .fetch('GET', fileUrl)
        .then(res => {
          showToastMessage('', 'Tải thành công');
          navigation.goBack();
        })
        .catch(error => {
          // Xử lý lỗi khi tải về file
          showToastMessage('error', 'Tải thất bại');
        });
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <SafeAreaView style={appStyle.container}>
      <AppHeader
        title="Hợp đồng mẫu"
        icon={'download'}
        onPressRight={handleDownloadPdf}
      />
      <WebView source={{uri: fileUrl}} style={{flex: 1, borderWidth: 2}} />
    </SafeAreaView>
  );
};

export default LeaseCar;

const styles = StyleSheet.create({});
