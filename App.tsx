import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import Providers from '@/components/Providers.tsx';
import CalendarStack from '@/navigations/CalendarStack.tsx';
import HomeStack from '@/navigations/HomeStack.tsx';
import { RootStackParamList } from '@/types/navigation.ts';

const Tab = createBottomTabNavigator<RootStackParamList>();

const App = (): React.JSX.Element => {
  return (
    <Providers>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Tab.Screen name="HomeStack" component={HomeStack} />
          <Tab.Screen name="CalendarStack" component={CalendarStack} />
        </Tab.Navigator>
      </NavigationContainer>
    </Providers>
  );
};

export default App;
