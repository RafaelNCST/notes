import React from 'react';
import { Route } from './routes';
import { ThemeProvider } from 'styled-components/native';
import light from './styles/themes/light';
import { StatusBarApp } from './components';
import dark from './styles/themes/dark';
import { MainContextProvider } from './contexts';
import { MainContext } from './contexts';

export const App: React.FC = () => {
  return (
    <MainContextProvider>
      <MainContext.Consumer>
        {value => (
          <ThemeProvider theme={value.theme === -2 ? dark : light}>
            <StatusBarApp />
            <Route />
          </ThemeProvider>
        )}
      </MainContext.Consumer>
    </MainContextProvider>
  );
};
