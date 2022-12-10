import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AppTabRoutes } from './app.tab.routes';
import { Details } from '../screens/Details';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppStackRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen
        name="Home"
        component={AppTabRoutes}
      />

      <Screen
        name="Details"
        component={Details}
      />
    </Navigator>
  );
}
