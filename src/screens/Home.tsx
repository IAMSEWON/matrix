import React from 'react';
import { View } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Folder, Settings } from 'lucide-react-native';

import Header from '@/components/Header.tsx';
import Layout from '@/components/Layout.tsx';
import MatrixLayout from '@/components/MatrixLayout.tsx';
import useMatrixStore from '@/stores/matrix.ts';
import { HomeStackParamList } from '@/types/navigation.ts';
import { getContrastYIQ } from '@/utils/color.ts';

type HomeNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'Home'>;

const Home = ({ navigation }: { navigation: HomeNavigationProp }) => {
  const { matrix } = useMatrixStore();

  return (
    <Layout>
      <Header
        title={matrix?.category || '카테고리를 선택해주세요'}
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
      <View className="flex-1 px-0 py-2">
        <MatrixLayout
          doit={{
            onPress: () => console.log('doit'),
          }}
          schedule={{
            onPress: () => console.log('schedule'),
          }}
          delegate={{
            onPress: () => console.log('delegate'),
          }}
          eliminate={{
            onPress: () => console.log('eliminate'),
          }}
        />
      </View>
    </Layout>
  );
};

export default Home;
