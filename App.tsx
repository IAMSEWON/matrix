import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import Calendar from '@/screens/Calendar.tsx';

import Home from '@/screens/Home.tsx';

const Tab = createBottomTabNavigator();

const App = (): React.JSX.Element => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Settings" component={Calendar} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
