import React, { useEffect, useRef } from 'react';
import { View, TextInput, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const App = () => {


  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
    >
      {/* Các thành phần UI khác ở đây */}
      <View style={{marginTop:700}}>
        <TextInput
          placeholder="Nhập văn bản"
          
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default App;
