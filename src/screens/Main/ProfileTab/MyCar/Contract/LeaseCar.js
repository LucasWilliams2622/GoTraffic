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
import {COLOR, ICON} from '../../../../../constants/Theme';
import Header from '../../../../../components/Header';
import Pdf from 'react-native-pdf';
import AppHeader from '../../../../../components/AppHeader';

const LeaseCar = props => {
  const pdfUrl = 'http://samples.leanpub.com/thereactnativebook-sample.pdf';

  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Quyền Ghi Tệp',
          message: 'Ứng dụng cần quyền ghi tệp để tải tệp PDF.',
          buttonNeutral: 'Để sau',
          buttonNegative: 'Hủy bỏ',
          buttonPositive: 'Đồng ý',
        },
      );

      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Quyền ghi tệp bị từ chối.');
        return false;
      }

      console.log('Đã cấp quyền ghi tệp.');
      return true;
    } catch (error) {
      console.error('Lỗi khi yêu cầu quyền ghi tệp:', error);
      return false;
    }
  };

  const handleDownloadPdf = async () => {
    try {
      if (!(await requestStoragePermission())) {
        return;
      }

      const {config, fs} = RNFetchBlob;
      const downloadDest = `${fs.dirs.DocumentDir}/sample.pdf`;

      console.log('File path before download:', downloadDest);

      const res = await config({
        fileCache: true,
        appendExt: 'pdf',
        path: downloadDest,
      }).fetch('GET', pdfUrl);

      console.log('File downloaded to:', res.path());
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

      <View
        style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
        <Pdf
          source={{uri: pdfUrl, cache: true}}
          trustAllCerts={false}
          spacing={30}
          onPageChanged={(page, totalPages) => console.log(`${totalPages}`)}
          style={{flex: 1, width: windowWidth, backgroundColor: COLOR.gray}}
        />
      </View>
    </SafeAreaView>
  );
};

export default LeaseCar;

const styles = StyleSheet.create({});
