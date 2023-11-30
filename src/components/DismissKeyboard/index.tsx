import {TouchableWithoutFeedback, Keyboard} from 'react-native';
import React from 'react';

const DismissKeyboard = ({children}: any) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );
};
export default DismissKeyboard;
