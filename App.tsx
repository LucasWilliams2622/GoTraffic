import React, { useState, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppContextProvider } from './src/utils/AppContext';
import BottomTabs from './src/navigation/BottomNav';
import Icon from 'react-native-vector-icons/FontAwesome';
import Splash from './src/screens/Begin/Splash';
import { NativeBaseProvider } from 'native-base';
import Test2 from './src/test/Test2'
import { Text, LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Require cycle:',
]);
const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  // return(
  //   <Test2/>
  // )
  return (
    <AppContextProvider>
      <NavigationContainer>
        <NativeBaseProvider>
          {isLoading ? <Splash setIsLoading={setIsLoading} /> : <BottomTabs />}
        </NativeBaseProvider>
      </NavigationContainer>
    </AppContextProvider>
  );
};

export default App;
