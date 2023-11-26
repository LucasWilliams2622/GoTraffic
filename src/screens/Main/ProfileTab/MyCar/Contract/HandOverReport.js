import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React from 'react';
import {appStyle} from '../../../../../constants/AppStyle';
import AppHeader from '../../../../../components/AppHeader';
import {WebView} from 'react-native-webview';
import {showToastMessage} from '../../../../../utils/utils';
import RNFetchBlob from 'rn-fetch-blob';
import {useNavigation} from '@react-navigation/native';

const HandOverReport = props => {
  const navigation = useNavigation();
  const fileUrl =
    'https://docs.google.com/document/d/1vKmtAkK2cyLFkZ4WHv8UV52LOMY-5QVV/edit?usp=drive_link&ouid=114108272420378053946&rtpof=true&sd=true';

  const handleDownloadPdf = async () => {
    try {
      const {config, fs} = RNFetchBlob;
      const DownloadDir = fs.dirs.DownloadDir;

      const options = {
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path: `${DownloadDir}/bien_ban_giao_xe.docx`,
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
        title="Biên bản giao xe"
        icon={'download'}
        onPressRight={handleDownloadPdf}
      />
      <WebView source={{uri: fileUrl}} style={{flex: 1, borderWidth: 2}} />
    </SafeAreaView>
  );
};

export default HandOverReport;

const styles = StyleSheet.create({});
