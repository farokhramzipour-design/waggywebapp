import React from 'react';
import { AppRegistry, Platform } from 'react-native';
import ReactDOM from 'react-dom/client';
import AppNavigator from './src/navigation/AppNavigator';

// For React Native mobile
AppRegistry.registerComponent('wagywebapp', () => AppNavigator);

// For React Native Web
if (Platform.OS === 'web') {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <AppNavigator />
    </React.StrictMode>
  );
}
