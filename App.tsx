import React, { useState, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppContextProvider } from './src/utils/AppContext';
import BottomTabs from './src/navigation/BottomNav';
import Icon from 'react-native-vector-icons/FontAwesome';
import Splash from './src/screens/Begin/Splash';
import { NativeBaseProvider } from 'native-base';
import { Text, LogBox } from 'react-native';
import { Provider } from 'react-redux';
import { legacy_createStore, applyMiddleware} from 'redux';
import rootReducer from './src/redux/reducers'
import thunk from 'redux-thunk';

// Tạo store Redux
const store = legacy_createStore(rootReducer, applyMiddleware(thunk));


LogBox.ignoreLogs([
  'Require cycle:',
]);
const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  // return(
  //   <Test2/>
  // )
  return (
    <Provider store={store}>
      <AppContextProvider>
        <NavigationContainer>
          <NativeBaseProvider>
            {isLoading ? <Splash setIsLoading={setIsLoading} /> : <BottomTabs />}
          </NativeBaseProvider>
        </NavigationContainer>
      </AppContextProvider>
    </Provider>

  );
};

export default App;
