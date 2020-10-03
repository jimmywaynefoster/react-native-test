/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 */

import React from 'react';
import { StatusBar } from 'expo-status-bar';

import Router from 'router';
import LanguageProvider from 'components/LanguageProvider';

import { translationMessages } from './app/i18n';

const App: React.FC = () => {
  return (
    <>
      <StatusBar style="auto" />
      <LanguageProvider locale="en" messages={translationMessages}>
        <Router />
      </LanguageProvider>
    </>
  );
};

export default App;
