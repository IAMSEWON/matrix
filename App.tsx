import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Calendar, Home, SquarePlus } from 'lucide-react-native';

import Providers from '@/components/Providers.tsx';
import CalendarStack from '@/navigations/CalendarStack.tsx';
import HomeStack from '@/navigations/HomeStack.tsx';
import useMatrixStore from '@/stores/matrix.ts';
import { RootStackParamList } from '@/types/navigation.ts';
import { getContrastYIQ } from '@/utils/color.ts';

const Tab = createBottomTabNavigator<RootStackParamList>();

const App = (): React.JSX.Element => {
  const { matrix } = useMatrixStore();

  return (
    <Providers>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarStyle: {
              backgroundColor: matrix?.categoryBackgroundColor,
            },
            tabBarIconStyle: {
              top: 14,
            },
            headerShown: false,
            tabBarLabel: '',
            tabBarIcon: ({ size }) => {
              let iconComponent: React.ReactNode;

              if (route.name === 'HomeStack') {
                iconComponent = (
                  <Home size={size} className="font-semibold" color={getContrastYIQ(matrix?.categoryBackgroundColor)} />
                );
              } else if (route.name === 'Post') {
                iconComponent = (
                  <SquarePlus
                    size={28}
                    className="font-semibold"
                    color={getContrastYIQ(matrix?.categoryBackgroundColor)}
                  />
                );
              } else if (route.name === 'CalendarStack') {
                iconComponent = (
                  <Calendar
                    size={size}
                    className="font-semibold"
                    color={getContrastYIQ(matrix?.categoryBackgroundColor)}
                  />
                );
              }

              return iconComponent;
            },
          })}
        >
          <Tab.Screen name="CalendarStack" component={CalendarStack} />
          <Tab.Screen name="HomeStack" component={HomeStack} />
          <Tab.Screen
            name="Post"
            listeners={({ navigation }) => ({
              tabPress: (e) => {
                e.preventDefault();
                navigation.navigate('MatrixAdd');
              },
            })}
          >
            {() => null}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    </Providers>
  );
};

export default App;
