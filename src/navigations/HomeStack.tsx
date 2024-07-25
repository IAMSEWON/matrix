import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Category from '@/screens/Category.tsx';
import Home from '@/screens/Home.tsx';
import { HomeStackParamList } from '@/types/navigation.ts';

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Category" component={Category} />
    </Stack.Navigator>
  );
};

export default HomeStack;
