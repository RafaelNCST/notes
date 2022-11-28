import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './types';

import { Home, Settings, DetailsEvent, CalendarScreen } from '../screens';

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
        <RootStack.Screen name="CalendarScreen" component={CalendarScreen} />
      </RootStack.Navigator>
    </Provider>
  );
};
