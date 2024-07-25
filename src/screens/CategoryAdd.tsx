import React from 'react';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { X } from 'lucide-react-native';

import Header from '@/components/Header.tsx';
import Layout from '@/components/Layout.tsx';
import { HomeStackParamList } from '@/types/navigation.ts';

type HomeNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'CategoryAdd'>;

const CategoryAdd = ({ navigation }: { navigation: HomeNavigationProp }) => {
  return (
    <Layout>
      <Header
        title="카테고리등록"
        back
        icons={[
          {
            name: '취소',
            icon: <X size={23} color="black" />,
            onPress: () => navigation.goBack(),
          },
        ]}
      />
    </Layout>
  );
};

export default CategoryAdd;
