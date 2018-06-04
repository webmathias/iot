/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Button,
  View,
  StatusBar,
  NativeModules,
  DeviceEventEmitter
} from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';

import Sensores  from './Sensores'
const App = StackNavigator({
  Home: { screen: Sensores },
  // Profile: { screen: ProfileScreen },
});
export default App