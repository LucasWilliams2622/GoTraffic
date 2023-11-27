import {
  StyleSheet,
  SafeAreaView,
  Button,
  Alert,
  ScrollView,
  View,
} from 'react-native';
import React, {createRef} from 'react';
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
import SignatureCapture from 'react-native-signature-capture';
import RNFS from 'react-native-fs';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import AppButton from '../../../../../components/AppButton';

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
  const sign = createRef();

  const saveSign = async () => {
    const signature = sign.current;
    signature.saveImage();

    // Đợi một khoảng thời gian để đảm bảo hình ảnh chữ ký đã được lưu
    setTimeout(() => {
      convertToPDF(signature);
    }, 500); // Giả sử sau 500ms, bạn có thể điều chỉnh thời gian theo yêu cầu của bạn
  };

  const convertToPDF = async signature => {
    const htmlContent = `<div style="width: 100%; height: 100%;">${signature.encoded}</div>`;
    const options = {
      html: htmlContent,
      fileName: 'signature',
      directory: 'Documents',
    };

    try {
      const pdf = await RNHTMLtoPDF.convert(options);

      // Lưu file PDF vào thư mục Documents của ứng dụng
      const destPath = `${RNFS.DocumentDirectoryPath}/${pdf.fileName}.pdf`;
      await RNFS.moveFile(pdf.filePath, destPath);

      Alert.alert('Thông báo', 'Đã lưu chữ ký và tạo PDF thành công.');
      console.log('PDF Path:', destPath);
    } catch (error) {
      console.error('Error creating or saving PDF:', error);
    }
  };
  const remove = () => {
    const signature = sign.current;
    signature.resetImage();
  };
  return (
    <SafeAreaView style={appStyle.container}>
      <AppHeader
        title="Hợp đồng mẫu"
        icon={'download'}
        onPressRight={handleDownloadPdf}
      />

      <WebView source={{uri: fileUrl}} style={{flex: 1, borderWidth: 2}} />
      <View style={{borderTopWidth:1,borderColor:'#787878'}}>
        <SignatureCapture
          style={{height: windowHeight * 0.2, width: windowWidth}}
          ref={sign}
          onSaveEvent={result => console.log(result)}
          onDragEvent={() => console.log('drag')}
          saveImageFileInExtStorage={false}
          showNativeButtons={false}
          showTitleLabel={false}
          viewMode={'portrait'}
          minStrokeWidth={14}
          maxStrokeWidth={20}
          strokeColor={'#000000'}
          showBorder
        />
        <View style={appStyle.rowBetween}>
          <AppButton
            containerStyle={{marginBottom: 100}}
            width="46%"
            title="Xóa"
            onPress={() => {
              remove();
            }}
          />
          <AppButton
            containerStyle={{marginBottom: 100}}
            width="46%"
            title="Lưu chữ ký và Tạo PDF"
            onPress={() => {
              saveSign();
            }}
          />
        </View>
        <View style={{height: 90}} />
      </View>
    </SafeAreaView>
  );
};

export default LeaseCar;

const styles = StyleSheet.create({});
