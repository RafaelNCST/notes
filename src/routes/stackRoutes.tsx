import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from '../screens/Home';
import { DetailsEvent } from '../screens/DetailsEvent';
import { RootStackParamList } from './types';
import { Settings } from '../screens/Settings';
import { Provider } from 'react-redux';
import { Store } from '../store';

export const HomeRoute: React.FC = () => {
  const RootStack = createStackNavigator<RootStackParamList>();
  return (
    <Provider store={Store}>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="HomeScreen" component={Home} />
        <RootStack.Screen name="DetailsEvent" component={DetailsEvent} />
        <RootStack.Screen name="SettingsScreen" component={Settings} />
      </RootStack.Navigator>
    </Provider>
  );
};
