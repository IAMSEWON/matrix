import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import dayjs from 'dayjs';

import Calendar from '@/screens/CalendarView';
import Home from '@/screens/Home.tsx';

const Tab = createBottomTabNavigator();
dayjs.locale('ko');

const App = (): React.JSX.Element => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tab.Screen name="Settings" component={Calendar} />
        <Tab.Screen name="Home" component={Home} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
