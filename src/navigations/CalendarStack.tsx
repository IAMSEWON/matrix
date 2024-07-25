import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CalendarView from '@/screens/CalendarView.tsx';

const Stack = createNativeStackNavigator();

const CalendarStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Calendar" component={CalendarView} />
    </Stack.Navigator>
  );
};

export default CalendarStack;
