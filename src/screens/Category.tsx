import React, { useState } from 'react';
import { FlatList, Pressable, View } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Plus, Settings } from 'lucide-react-native';

import CategoryForm from '@/components/CategoryForm.tsx';
import Header from '@/components/Header.tsx';
import Layout from '@/components/Layout.tsx';
import Text from '@/components/Text.tsx';
import useMatrixStore from '@/stores/matrix.ts';
import { MatrixType } from '@/types/matrix.ts';
import { HomeStackParamList } from '@/types/navigation.ts';
import { getContrastYIQ } from '@/utils/color.ts';

const CategoryItem = ({ item, onSelect }: { item: MatrixType; onSelect: (id: number) => void }) => {
  return (
    <Pressable
      className="my-2 h-28 w-full flex-1 rounded p-2"
      onPress={() => onSelect(item.id)}
      style={{ backgroundColor: item.categoryBackgroundColor }}
    >
      <Text style={{ color: getContrastYIQ(item.categoryBackgroundColor) }} className="text-2xl">
        {item.category}
      </Text>
    </Pressable>
  );
};

type CategoryNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'Category'>;

const Category = ({ navigation }: { navigation: CategoryNavigationProp }) => {
  const [isCategoryForm, setIsCategoryForm] = useState<boolean>(false);

  const { matrix, matrixs, selectMatrix } = useMatrixStore();

  const onSelectMatrix = (id: number) => {
    selectMatrix(id);
    navigation.goBack();
  };

  return (
    <Layout>
      <Header
        title="카테고리"
        icons={[
          {
            name: '카테고리',
            icon: <Plus size={23} color={getContrastYIQ(matrix?.categoryBackgroundColor)} />,
            onPress: () => setIsCategoryForm(true),
          },
          {
            name: '설정',
            icon: <Settings size={23} color={getContrastYIQ(matrix?.categoryBackgroundColor)} />,
            onPress: () => console.log('Icon pressed'),
          },
        ]}
      />
      <View className="my-2 flex-1">
        <FlatList
          data={matrixs}
          keyExtractor={(item) => `${item.id}-${item.category}`}
          renderItem={({ item }) => <CategoryItem item={item} onSelect={onSelectMatrix} />}
          // estimatedItemSize={20}
        />
      </View>

      <CategoryForm open={isCategoryForm} onClose={() => setIsCategoryForm(false)} />
    </Layout>
  );
};

export default Category;
