import React, {useState, useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AppContextProvider} from './src/utils/AppContext';
import BottomTabs from './src/navigation/BottomNav';
import Splash from './src/screens/Begin/Splash';
import {NativeBaseProvider} from 'native-base';
import {Text, LogBox, View} from 'react-native';
import {Provider} from 'react-redux';
import {legacy_createStore, applyMiddleware} from 'redux';
import rootReducer from './src/redux/reducers';
import thunk from 'redux-thunk';
import Toast from 'react-native-toast-message';
import {toastConfig} from './src/configs/ToastConfig';
import {CarLocationProvider} from './src/utils/CarLocationContext';
import {ViewedCarsProvider} from './src/utils/ViewedCarContext';
// Tạo store Redux
const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

LogBox.ignoreAllLogs(true);
// Ignore all warning notifications
LogBox.ignoreAllLogs();
LogBox.ignoreLogs(['Require cycle:']);
const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  // return (

  // )
  return (
    <Provider store={store}>
      <AppContextProvider>
        <ViewedCarsProvider>
          <NavigationContainer>
            <NativeBaseProvider>
              <CarLocationProvider>
                {isLoading ? (
                  <Splash setIsLoading={setIsLoading} />
                ) : (
                  <BottomTabs />
                  // <TestVoice/>
                )}
                <Toast
                  ref={ref => Toast.setRef(ref)}
                  config={toastConfig}
                  position="top"
                />
              </CarLocationProvider>
            </NativeBaseProvider>
          </NavigationContainer>
        </ViewedCarsProvider>
      </AppContextProvider>
    </Provider>
  );
};

export default App;
