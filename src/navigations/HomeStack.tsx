import React from 'react';
import { HeaderBackButtonProps } from '@react-navigation/elements';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ChevronLeft } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';

import HeaderIcon from '@/components/Layout/HeaderIcon.tsx';
import SwipeText from '@/components/SwipeText.tsx';
import Category from '@/screens/Category.tsx';
import Home from '@/screens/Home.tsx';
import MatrixAdd from '@/screens/MatrixAdd.tsx';
import MatrixTodo from '@/screens/MatrixTodo.tsx';
import Setting from '@/screens/Setting.tsx';
import useMatrixStore from '@/stores/matrix.ts';
import { HomeStackParamList } from '@/types/navigation.ts';

const Stack = createNativeStackNavigator<HomeStackParamList>();

type HomeStackProps = {
  navigation: NativeStackNavigationProp<HomeStackParamList>;
};

const matrixTitle = {
  doit: '긴급하고 중요한',
  schedule: '긴급하지 않지만 중요한',
  delegate: '긴급하지만 중요하지 않은',
  eliminate: '긴급하지도 중요하지도 않은',
} as const;

const HomeStack = ({ navigation }: HomeStackProps) => {
  const { matrix, matrixs, selectedMatrix } = useMatrixStore();
  const { colorScheme } = useColorScheme();

  const color = colorScheme === 'light' ? '#fff' : '#1E1F23';
  const iconColor = colorScheme === 'light' ? '#1E1F23' : '#fff';

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {
          color: iconColor,
        },
        headerTitleAlign: 'center',
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: color,
        },
        headerBackTitleVisible: false,
        headerTintColor: iconColor,
        // 임시 경고 처리
        headerLeft: (props: HeaderBackButtonProps) => {
          const { canGoBack } = props;

          if (!canGoBack || navigation.getState().index === 0) return null;

          return (
            <HeaderIcon
              icons={[
                {
                  name: '카테고리',
                  icon: <ChevronLeft size={23} color={iconColor} />,
                  onPress: () => navigation.goBack(),
                },
              ]}
            />
          );
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: () => (
            <SwipeText
              value={matrix?.categoryName || '카테고리'}
              texts={matrixs.map((item) => item.categoryName)}
              onScroll={(index) => selectedMatrix(matrixs[index].categoryId)}
              onPress={() => navigation.navigate('Category')}
              darkMode={colorScheme === 'dark'}
            />
          ),
        }}
      />
      <Stack.Screen
        name="MatrixTodo"
        component={MatrixTodo}
        options={({ route }) => ({
          title: matrixTitle[route.params.matrixType as keyof typeof matrixTitle],
        })}
      />
      <Stack.Screen
        name="MatrixAdd"
        component={MatrixAdd}
        options={{
          headerShown: false,
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="Category"
        component={Category}
        options={{
          title: '카테고리',
        }}
      />
      <Stack.Screen
        name="Setting"
        component={Setting}
        options={{
          title: '설정',
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
