import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import dayjs from 'dayjs';

import Providers from '@/components/Providers.tsx';
import Calendar from '@/screens/CalendarView';
import Home from '@/screens/Home.tsx';

const Tab = createBottomTabNavigator();
dayjs.locale('ko');

const App = (): React.JSX.Element => {
  return (
    <Providers>
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
    </Providers>
  );
};

export default App;
