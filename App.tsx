import React, {useState, useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AppContextProvider} from './src/utils/AppContext';
import BottomTabs from './src/navigation/BottomNav';
import Icon from 'react-native-vector-icons/FontAwesome';
import Splash from './src/screens/Begin/Splash';
import {NativeBaseProvider} from 'native-base';
import {Text, LogBox,View} from 'react-native';
import {Provider} from 'react-redux';
import {legacy_createStore, applyMiddleware} from 'redux';
import rootReducer from './src/redux/reducers';
import thunk from 'redux-thunk';
import Toast from 'react-native-toast-message';
import {toastConfig} from './src/configs/ToastConfig';
import Test2 from './src/test/TestMultiPicker';
import TestComponent from './src/test/TestComponent';

import {WebView} from 'react-native-webview';
import ImagePickerComponent from './src/components/ImagePickerComponent';
// Tạo store Redux
const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

LogBox.ignoreLogs(['Require cycle:']);
const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  // return (
  //   <TestComponent/>
  // )
 
  return (
    <Provider store={store}>
      <AppContextProvider>
        <NavigationContainer>
          <NativeBaseProvider>
            {isLoading ? (
              <Splash setIsLoading={setIsLoading} />
            ) : (
              <BottomTabs />
            )}
            <Toast
              ref={ref => Toast.setRef(ref)}
              config={toastConfig}
              position="top"
            />
          </NativeBaseProvider>
        </NavigationContainer>
      </AppContextProvider>
    </Provider>
    // <Infor/>
  );
};

export default App;
