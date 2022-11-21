import React from 'react';
import { useTheme } from 'styled-components';
import { ConsumerMainContext } from '../../contexts/consumer';
import { StatusBar } from 'react-native';

export const StatusBarApp = () => {
  const theme = useTheme();
  const { loading } = ConsumerMainContext();

  return (
    <>
      {loading ? null : (
        <StatusBar
          backgroundColor={theme.colors.BackGround}
          barStyle={theme.title === 'light' ? 'dark-content' : 'light-content'}
        />
      )}
    </>
  );
};
