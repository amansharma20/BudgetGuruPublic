/* eslint-disable prettier/prettier */
import React from 'react';
import ApplicationNavigator from './src/navigation/ApplicationNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import RootStore from './src/persistence/stores/RootStore';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import CommonLoading from './src/components/loading/CommonLoading';
import { Text, TextInput } from 'react-native';

export default function App() {

  if (Text.defaultProps == null) {Text.defaultProps = {};}
  Text.defaultProps.allowFontScaling = false;

  // TextInput.defaultProps = TextInput.defaultProps || {};
  // TextInput.defaultProps.allowFontScaling = false;

  return (
    <Provider store={RootStore}>
      <SafeAreaProvider>
        <NavigationContainer>
          <ApplicationNavigator />
        </NavigationContainer>
        <Toast ref={ref => Toast.setRef(ref)} />
        <CommonLoading ref={ref => CommonLoading.setRef(ref)} />
      </SafeAreaProvider>
    </Provider>
  );
}

