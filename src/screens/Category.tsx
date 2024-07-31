import React, { useState } from 'react';
import { Alert, Pressable, View } from 'react-native';
import ContextMenu from 'react-native-context-menu-view';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FlashList } from '@shopify/flash-list';
import { Plus, Settings } from 'lucide-react-native';

import CategoryForm from '@/components/CategoryForm.tsx';
import Header from '@/components/Header.tsx';
import Layout from '@/components/Layout.tsx';
import Text from '@/components/Text.tsx';
import useMatrixStore from '@/stores/matrix.ts';
import { MatrixType } from '@/types/matrix.ts';
import { HomeStackParamList } from '@/types/navigation.ts';
import { getContrastYIQ } from '@/utils/color.ts';

const CategoryItem = ({
  selectId,
  item,
  onSelect,
  onModify,
  onDelete,
}: {
  selectId: number | undefined;
  item: MatrixType;
  onSelect: (id: number) => void;
  onModify: (id: number) => void;
  onDelete: (id: number) => void;
}) => {
  return (
    <ContextMenu
      className="mx-2"
      actions={[{ title: '수정' }, { title: '삭제' }]}
      onPress={(e) => {
        const title = e.nativeEvent.name;

        if (title === '삭제') {
          if (selectId === item.id) {
            Alert.alert('알림', '선택된 카테고리는 삭제할 수 없습니다.');
            return;
          }

          onDelete(item.id);
        }

        if (title === '수정') {
          onModify(item.id);
        }
      }}
    >
      <Pressable
        onPress={() => onSelect(item.id)}
        className="my-2 h-28 w-full flex-1 rounded p-2"
        style={{ backgroundColor: item.categoryBackgroundColor }}
      >
        <Text style={{ color: getContrastYIQ(item.categoryBackgroundColor) }} className="text-2xl">
          {item.category}
        </Text>
      </Pressable>
    </ContextMenu>
  );
};

type CategoryNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'Category'>;

const Category = ({ navigation }: { navigation: CategoryNavigationProp }) => {
  const [isCategoryForm, setIsCategoryForm] = useState<boolean>(false);

  const { matrix, matrixs, selectMatrix, deleteMatrix } = useMatrixStore();

  const [updateCategoryId, setUpdateCategoryId] = useState<number>(0);

  const onSelectMatrix = (id: number) => {
    selectMatrix(id);
    navigation.goBack();
  };

  const onModifyMatrix = (id: number) => {
    setUpdateCategoryId(id);
    setIsCategoryForm(true);
  };

  return (
    <Layout containerClassName="px-0">
      <Header
        headerClassName="px-2"
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
        <FlashList
          data={matrixs}
          keyExtractor={(item) => `${item.id}-${item.category}`}
          renderItem={({ item }) => (
            <CategoryItem
              item={item}
              selectId={matrix?.id}
              onSelect={onSelectMatrix}
              onModify={onModifyMatrix}
              onDelete={deleteMatrix}
            />
          )}
          estimatedItemSize={20}
        />
      </View>

      <CategoryForm
        updateId={updateCategoryId}
        matrixs={matrixs}
        open={isCategoryForm}
        onClose={() => setIsCategoryForm(false)}
      />
    </Layout>
  );
};

export default Category;
