import React from 'react';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Folder, Settings } from 'lucide-react-native';

import HeaderRightIcons from '@/components/Layout/HeaderRightIcons.tsx';
import Category from '@/screens/Category.tsx';
import Home from '@/screens/Home.tsx';
import MatrixAdd from '@/screens/MatrixAdd.tsx';
import useMatrixStore from '@/stores/matrix.ts';
import { HomeStackParamList } from '@/types/navigation.ts';
import { getContrastYIQ } from '@/utils/color.ts';

const Stack = createNativeStackNavigator<HomeStackParamList>();

type HomeStackProps = {
  navigation: NativeStackNavigationProp<HomeStackParamList>;
};

const HomeStack = ({ navigation }: HomeStackProps) => {
  const { matrix } = useMatrixStore();

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {
          color: getContrastYIQ(matrix?.categoryBackgroundColor),
        },
        headerStyle: {
          backgroundColor: matrix?.categoryBackgroundColor,
        },
        headerLargeTitle: true,
        headerLargeTitleShadowVisible: true,
        headerTransparent: false,
        headerBackTitleVisible: false,
        headerTintColor: getContrastYIQ(matrix?.categoryBackgroundColor),
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerLargeTitle: false,
          title: matrix?.category || '카테고리를 선택해주세요',
          // 임시 경고 처리
          // eslint-disable-next-line react/no-unstable-nested-components
          headerRight: () => (
            <HeaderRightIcons
              icons={[
                {
                  name: '카테고리',
                  icon: <Folder size={23} color={getContrastYIQ(matrix?.categoryBackgroundColor)} />,
                  onPress: () => navigation.navigate('Category'),
                },
                {
                  name: '설정',
                  icon: <Settings size={23} color={getContrastYIQ(matrix?.categoryBackgroundColor)} />,
                  onPress: () => console.log('Icon pressed'),
                },
              ]}
            />
          ),
        }}
      />
      <Stack.Screen
        name="MatrixAdd"
        component={MatrixAdd}
        options={{
          title: '안녕하세요!',
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
