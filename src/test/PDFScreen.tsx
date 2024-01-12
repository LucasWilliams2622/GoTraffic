// PDFViewerScreen.js
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Pdf from 'react-native-pdf';

const PDFViewerScreen = ({ route }) => {
  const { pdfPath } = route.params;

  return (
    <View style={styles.container}>
      <Pdf
        source={{ uri: pdfPath, cache: true }}
        onLoadComplete={(numberOfPages,filePath)=>{
          console.log(`number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page,numberOfPages)=>{
          console.log(`current page: ${page}`);
        }}
        onError={(error)=>{
          console.log(error);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
});

export default PDFViewerScreen;
