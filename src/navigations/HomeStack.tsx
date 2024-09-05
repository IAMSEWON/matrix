import React from 'react';
import { HeaderBackButtonProps } from '@react-navigation/elements';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ChevronLeft, Folder, Moon, Settings, Sun } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';

import HeaderIcon from '@/components/Layout/HeaderIcon.tsx';
import Category from '@/screens/Category.tsx';
import Home from '@/screens/Home.tsx';
import MatrixAdd from '@/screens/MatrixAdd.tsx';
import MatrixTodo from '@/screens/MatrixTodo.tsx';
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
  dont: '긴급하지도 중요하지도 않은',
} as const;

const HomeStack = ({ navigation }: HomeStackProps) => {
  const { matrix } = useMatrixStore();
  const { colorScheme, toggleColorScheme } = useColorScheme();

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
        headerTintColor: iconColor,
        // 임시 경고 처리

        headerLeft: (props: HeaderBackButtonProps) => {
          const { canGoBack } = props;

          if (!canGoBack) return null;

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
          title: matrix?.category || '카테고리를 선택해주세요',
          // 임시 경고 처리

          headerRight: () => (
            <HeaderIcon
              icons={[
                {
                  name: '카테고리',
                  icon: <Folder size={23} color={iconColor} />,
                  onPress: () => navigation.navigate('Category'),
                },
                {
                  name: '설정',
                  icon: <Settings size={23} color={iconColor} />,
                  onPress: () => console.log('Icon pressed'),
                },
                {
                  name: '다크모드',
                  icon:
                    colorScheme === 'light' ? (
                      <Moon size={23} color={iconColor} />
                    ) : (
                      <Sun size={23} color={iconColor} />
                    ),
                  onPress: () => toggleColorScheme(),
                },
              ]}
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
    </Stack.Navigator>
  );
};

export default HomeStack;
