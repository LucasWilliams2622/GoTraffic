import { StyleSheet, LogBox, Text, View } from 'react-native'
import React, { useState, useRef } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { AppContextProvider } from './src/utils/AppContext'
import BottomTabs from './src/navigation/BottomNav';
import Icon from 'react-native-vector-icons/FontAwesome';
import Splash from './src/screens/Begin/Splash';
import Test2 from './src/test/Test2'
LogBox.ignoreLogs([
  'Require cycle:',
]);
const App = () => {
  const [isLoading, setIsLoading] = useState(true);
return(
  <Test2/>
)
  return (
    <AppContextProvider>
      <NavigationContainer>

        {isLoading ? <Splash setIsLoading={setIsLoading} /> : <BottomTabs />}

      </NavigationContainer>
    </AppContextProvider>
  )
}

export default App

const styles = StyleSheet.create({})