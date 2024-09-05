import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Providers from '@/components/Providers/Providers.tsx';
import TabStack from '@/navigations/TabStack.tsx';
import CategoryAdd from '@/screens/Root/CategoryAdd.tsx';
import Guide from '@/screens/Root/Guide.tsx';
import MatrixAdd from '@/screens/Root/MatrixAdd.tsx';
import { RootStackParamList } from '@/types/navigation.ts';
import { getData } from '@/utils/storage.ts';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = (): React.JSX.Element => {
  const [initialRouteName, setInitialRouteName] = useState<keyof RootStackParamList>('Guide');

  const onCheckGuide = async () => {
    const guideKey = await getData('guideKey');

    if (guideKey) {
      setInitialRouteName('Main');
    }
  };

  useEffect(() => {
    onCheckGuide();
  }, []);

  return (
    <Providers>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialRouteName}>
          <Stack.Screen
            name="Guide"
            component={Guide}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="CategoryAdd"
            component={CategoryAdd}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="MatrixAdd"
            component={MatrixAdd}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="Main" component={TabStack} />
        </Stack.Navigator>
      </NavigationContainer>
    </Providers>
  );
};

export default App;
