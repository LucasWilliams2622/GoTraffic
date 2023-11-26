// SignatureScreen.js
import React, { createRef } from 'react';
import { View, Button, Alert } from 'react-native';
import SignatureCapture from 'react-native-signature-capture';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { SafeAreaView } from 'react-native';
import RNFS from 'react-native-fs';

const SignatureScreen = () => {
  const sign = createRef();

  const saveSign = async () => {
    const signature = sign.current;
    signature.saveImage();

    // Đợi một khoảng thời gian để đảm bảo hình ảnh chữ ký đã được lưu
    setTimeout(() => {
      convertToPDF(signature);
    }, 500); // Giả sử sau 500ms, bạn có thể điều chỉnh thời gian theo yêu cầu của bạn
  };

  const convertToPDF = async (signature) => {
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

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ borderWidth: 2 }}>
        <SignatureCapture
          style={{ height: 500, width: 400 }}
          ref={sign}
          onSaveEvent={(result) => console.log(result)}
          onDragEvent={() => console.log('drag')}
          saveImageFileInExtStorage={false}
          showNativeButtons={true}
          showTitleLabel={false}
          viewMode={'portrait'}
          minStrokeWidth={14}
          maxStrokeWidth={20}
          strokeColor={'#000000'}
          showBorder
        />
      </View>

      <Button
        title="Lưu chữ ký và Tạo PDF"
        onPress={() => {
          saveSign();
        }}
      />
    </SafeAreaView>
  );
};

export default SignatureScreen;
