import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import CategoryForm from '@/components/CategoryForm.tsx';
import Layout from '@/components/Layout/Layout.tsx';
import useMatrixStore from '@/stores/matrix.ts';
import { RootStackParamList } from '@/types/navigation.ts';

type CategoryAddNavigationProp = NativeStackNavigationProp<RootStackParamList, 'CategoryAdd'>;

const CategoryAdd = ({ navigation }: { navigation: CategoryAddNavigationProp }) => {
  const { matrixs } = useMatrixStore();
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Layout style={{ gap: 12, alignItems: 'center', justifyContent: 'center', flex: 1, marginTop: 40 }}>
        <View className="mb-8 items-center gap-8">
          <Text className="text-3xl font-bold dark:text-white">새로운 카테고리 시작</Text>
          <Text className="text-xl font-semibold text-[#d9d9d9]">명확하고 간단한 단어를 입력하세요.</Text>
        </View>
        <CategoryForm matrixs={matrixs} onClose={() => navigation.navigate('MatrixAdd')} />
      </Layout>
    </SafeAreaView>
  );
};

export default CategoryAdd;
