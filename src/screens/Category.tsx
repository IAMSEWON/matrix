import React, { useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { Plus, Settings } from 'lucide-react-native';

import CategoryForm from '@/components/CategoryForm.tsx';
import Header from '@/components/Header.tsx';
import Layout from '@/components/Layout.tsx';
import useMatrixStore from '@/stores/matrix.ts';
import { MatrixType } from '@/types/matrix.ts';

// type HomeNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'Category'>;

const CategoryItem = ({ item }: { item: MatrixType }) => {
  return (
    <View className="my-2 h-28 w-full flex-1 rounded p-2" style={{ backgroundColor: item.categoryBackgroundColor }}>
      <Text className="text-2xl">{item.category}</Text>
    </View>
  );
};

const Category = () => {
  const [isCategoryForm, setIsCategoryForm] = useState<boolean>(false);

  const { matrixs } = useMatrixStore();

  return (
    <Layout>
      <Header
        title="카테고리"
        icons={[
          {
            name: '카테고리',
            icon: <Plus size={23} color="black" />,
            onPress: () => setIsCategoryForm(true),
          },
          {
            name: '설정',
            icon: <Settings size={23} color="black" />,
            onPress: () => console.log('Icon pressed'),
          },
        ]}
      />
      <View className="my-2 flex-1">
        <FlatList
          data={matrixs}
          keyExtractor={(item) => `${item.id}-${item.category}`}
          renderItem={CategoryItem}
          // estimatedItemSize={20}
        />
      </View>

      <CategoryForm open={isCategoryForm} onClose={() => setIsCategoryForm(false)} />
    </Layout>
  );
};

export default Category;
