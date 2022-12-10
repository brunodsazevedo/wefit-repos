import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import { Repositories } from '../screens/Repositories';
import { Favorites } from '../screens/Favorites';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppTabRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen
        name="Repositórios"
        component={Repositories}
        options={{
          tabBarIcon: (({ size, color }) => (
            <MaterialCommunityIcons
              name="github"
              size={size}
              color={color}
            />
          ))
        }}
      />

      <Screen
        name="Favoritos"
        component={Favorites}
        options={{
          tabBarIcon: (({ size, color }) => (
            <MaterialIcons
              name="star"
              size={size}
              color={color}
            />
          ))
        }}
      />
    </Navigator>
  );
}
