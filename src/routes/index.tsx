import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { HomeRoute } from './stackRoutes';

export const Route = () => {
  return (
    <NavigationContainer>
      <HomeRoute />
    </NavigationContainer>
  );
};
