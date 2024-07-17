/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { Pressable, SafeAreaView, StatusBar, Text } from 'react-native';
import { useColorScheme } from 'nativewind';

function App(): React.JSX.Element {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  console.log('hello');

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black">
      <StatusBar barStyle={colorScheme === 'light' ? 'dark-content' : 'light-content'} />
      <Pressable onPress={toggleColorScheme}>
        <Text className="text-black dark:text-white">Press me</Text>
      </Pressable>
      <Text className="text-black dark:text-white">hello</Text>
    </SafeAreaView>
  );
}

export default App;
