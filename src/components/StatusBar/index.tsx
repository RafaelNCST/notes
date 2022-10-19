import React from 'react';
import { useTheme } from 'styled-components';
import { StatusBar } from 'react-native';

export const StatusBarApp = () => {
  const theme = useTheme();

  return (
    <StatusBar
      backgroundColor={theme.colors.BackGround}
      barStyle={theme.title === 'light' ? 'dark-content' : 'light-content'}
    />
  );
};
