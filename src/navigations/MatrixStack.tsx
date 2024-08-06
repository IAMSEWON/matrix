import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MatrixAdd from '@/screens/MatrixAdd.tsx';
import { MatrixStackParamList } from '@/types/navigation.ts';

const Stack = createNativeStackNavigator<MatrixStackParamList>();

const MatrixStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MatrixAdd"
        component={MatrixAdd}
        options={{
          presentation: 'transparentModal',
        }}
      />
    </Stack.Navigator>
  );
};

export default MatrixStack;
