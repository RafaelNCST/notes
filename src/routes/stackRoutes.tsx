import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from '../screens/Home';
import { DetailsEvent } from '../screens/DetailsEvent';
import { RootStackParamList } from './types';

export const HomeRoute: React.FC = () => {
  const RootStack = createStackNavigator<RootStackParamList>();

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="HomeScreen" component={Home} />
      <RootStack.Screen name="DetailsEvent" component={DetailsEvent} />
    </RootStack.Navigator>
  );
};
