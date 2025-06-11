import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { ToastProvider } from 'react-native-toast-notifications';

export default function App() {
  return (
    <NavigationContainer>
      <ToastProvider placement="top">
        <AppNavigator />
      </ToastProvider>
    </NavigationContainer>
  );
}