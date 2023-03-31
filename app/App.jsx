/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */


import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Login from './src/screens/HomeScreen/Home';
import MainNavigation from './src/MainNavigation';

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import ParentNavigation from './src/ParentNavigation';

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';


  return (
    <PaperProvider
    theme={theme}>
      <ParentNavigation/>
    </PaperProvider>

  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    // accent: "#FCEDEE",
    // background: "#FCEDEE",
    // surface: "#FCEDEE",
    // disabled: "#FCEDEE",
    // placeholder: "#FCEDEE",
    // backdrop: "#FCEDEE",
    secondaryContainer: 'transparent', // Use transparent to disable the little highlighting oval
  },
};

