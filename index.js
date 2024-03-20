/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {MenuProvider} from 'react-native-popup-menu';

export const App1 = () => (
  <MenuProvider>
    <App />
  </MenuProvider>
);

AppRegistry.registerComponent(appName, () => App1);
