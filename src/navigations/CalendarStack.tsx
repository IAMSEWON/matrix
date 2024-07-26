import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CalendarView from '@/screens/CalendarView.tsx';
import { CalendarStackParamList } from '@/types/navigation.ts';

const Stack = createNativeStackNavigator<CalendarStackParamList>();

const CalendarStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Main" component={CalendarView} />
    </Stack.Navigator>
  );
};

export default CalendarStack;
