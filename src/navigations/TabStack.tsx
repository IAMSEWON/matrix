import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Calendar, Home } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';

import CalendarStack from '@/navigations/CalendarStack.tsx';
import HomeStack from '@/navigations/HomeStack.tsx';
import MatrixAdd from '@/screens/MatrixAdd.tsx';
import { TabStackParamList } from '@/types/navigation.ts';

const Tab = createBottomTabNavigator<TabStackParamList>();

const TabStack = () => {
  const { colorScheme } = useColorScheme();

  const color = colorScheme === 'light' ? '#fff' : '#1E1F23';
  const iconColor = colorScheme === 'light' ? '#1E1F23' : '#fff';
  const tabBorderColor = colorScheme === 'light' ? '#d9d9d9' : '#313237';

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: color,
          borderTopColor: tabBorderColor,
        },
        tabBarIconStyle: {
          top: Platform.OS === 'android' ? 8 : 14,
        },
        headerShown: false,
        tabBarLabel: '',
        tabBarIcon: ({ size }) => {
          let iconComponent: React.ReactNode;

          if (route.name === 'HomeStack') {
            iconComponent = <Home size={size} color={iconColor} />;
          } else if (route.name === 'CalendarStack') {
            iconComponent = <Calendar size={size} color={iconColor} />;
          }

          return iconComponent;
        },
      })}
    >
      <Tab.Screen name="HomeStack" component={HomeStack} />
      <Tab.Screen
        name="MatrixAdd"
        options={{
          tabBarButton: () => {
            return <MatrixAdd />;
          },
          tabBarIconStyle: {
            top: Platform.OS === 'android' ? 10 : 14,
          },
        }}
      >
        {() => null}
      </Tab.Screen>
      <Tab.Screen name="CalendarStack" component={CalendarStack} />
    </Tab.Navigator>
  );
};

export default TabStack;
