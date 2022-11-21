import React from 'react';
import { ConsumerMainContext } from '../contexts/consumer';
import { NavigationContainer } from '@react-navigation/native';
import { HomeRoute } from './stackRoutes';

export const Route = () => {
  const { loading } = ConsumerMainContext();

  return (
    <NavigationContainer>{loading ? null : <HomeRoute />}</NavigationContainer>
  );
};
