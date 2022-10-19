import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from '../screens/Home';
import { MultiUtils } from '../screens/MultiUtils';
import { RootStackParamList } from './types';

export const HomeRoute: React.FC = () => {
  const RootStack = createStackNavigator<RootStackParamList>();

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="HomeScreen" component={Home} />
      <RootStack.Screen name="MultiUtils" component={MultiUtils} />
    </RootStack.Navigator>
  );
};
