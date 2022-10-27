import React from 'react';
import { Route } from './routes';
import { ThemeProvider } from 'styled-components/native';
import light from './styles/themes/light';
import { StatusBarApp } from './components/StatusBar';
import dark from './styles/themes/dark';
import { MainContextProvider } from './contexts';
import { MainContext } from './contexts';
import { Platform, UIManager } from 'react-native';

export const App: React.FC = () => {
  if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  return (
    <MainContextProvider>
      <MainContext.Consumer>
        {value => (
          <ThemeProvider theme={value.theme === false ? dark : light}>
            <StatusBarApp />
            <Route />
          </ThemeProvider>
        )}
      </MainContext.Consumer>
    </MainContextProvider>
  );
};
