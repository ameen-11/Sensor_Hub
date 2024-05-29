/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import RootNavigation from './app/navigation/Index';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import Colors from './app/constants/Colors';
import 'react-native-gesture-handler';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.background,
  },
};

const App = () => {
  return (
    <NavigationContainer theme={theme}>
      <RootNavigation />
    </NavigationContainer>
  );
};

export default App;
