import React from 'react';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Plus, Settings } from 'lucide-react-native';

import Header from '@/components/Header.tsx';
import Layout from '@/components/Layout.tsx';
import { HomeStackParamList } from '@/types/navigation.ts';

type HomeNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'Category'>;

// parameter 로 네비게이션 오브젝트 받고싶어
const Category = ({ navigation }: { navigation: HomeNavigationProp }) => {
  return (
    <Layout>
      <Header
        title="카테고리"
        icons={[
          {
            name: '카테고리',
            icon: <Plus size={23} color="black" />,
            onPress: () => navigation.navigate('CategoryAdd'),
          },
          {
            name: '설정',
            icon: <Settings size={23} color="black" />,
            onPress: () => console.log('Icon pressed'),
          },
        ]}
      />
    </Layout>
  );
};

export default Category;
