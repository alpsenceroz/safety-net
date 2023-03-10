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
import Login from './src/screens/Home';
import MainNavigation from './src/MainNavigation';

import { Provider as PaperProvider } from 'react-native-paper';
import ParentNavigation from './src/ParentNavigation';

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';


  return (
    <PaperProvider>
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

