import React, { useEffect, useState } from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
import ContextMenu from 'react-native-context-menu-view';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FlashList } from '@shopify/flash-list';
import { Plus, Settings } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';

import CategoryForm from '@/components/CategoryForm.tsx';
import HeaderRightIcons from '@/components/Layout/HeaderIcon.tsx';
import Layout from '@/components/Layout/Layout.tsx';
import useMatrixStore from '@/stores/matrix.ts';
import { MatrixType } from '@/types/matrix.ts';
import { HomeStackParamList } from '@/types/navigation.ts';

const MatrixItem = ({ count = 0, type }: { count: number; type: 'doit' | 'schedule' | 'delegate' | 'eliminate' }) => {
  return (
    <View className="flex-row items-center rounded bg-white px-2 py-1" style={{ gap: 8 }}>
      <View className="items-center justify-center" style={{ gap: 4 }}>
        <View className="flex-row gap-1">
          <View
            className="h-2 w-2 rounded-sm bg-[#007bff]"
            style={{
              backgroundColor: type === 'doit' ? '#007bff' : '#e0f3ff',
            }}
          />
          <View
            className="h-2 w-2 rounded-sm bg-gray-300"
            style={{
              backgroundColor: type === 'schedule' ? '#007bff' : '#e0f3ff',
            }}
          />
        </View>
        <View className="flex-row gap-1">
          <View
            className="h-2 w-2 rounded-sm bg-gray-300"
            style={{
              backgroundColor: type === 'delegate' ? '#007bff' : '#e0f3ff',
            }}
          />
          <View
            className="h-2 w-2 rounded-sm bg-gray-300"
            style={{
              backgroundColor: type === 'eliminate' ? '#007bff' : '#e0f3ff',
            }}
          />
        </View>
      </View>
      <Text>{count}</Text>
    </View>
  );
};

const CategoryItem = ({
  selectId,
  item,
  onSelect,
  onModify,
  onDelete,
  darkMode,
}: {
  selectId: number | undefined;
  item: MatrixType;
  onSelect: (id: number) => void;
  onModify: (id: number) => void;
  onDelete: (id: number) => void;
  darkMode?: boolean;
}) => {
  return (
    <ContextMenu
      className="mx-2"
      actions={[{ title: '수정' }, { title: '삭제' }]}
      onPress={(e) => {
        const title = e.nativeEvent.name;

        if (title === '삭제') {
          if (selectId === item.categoryId) {
            Alert.alert('알림', '선택된 카테고리는 삭제할 수 없습니다.');
            return;
          }

          onDelete(item.categoryId);
        }

        if (title === '수정') {
          onModify(item.categoryId);
        }
      }}
    >
      <Pressable
        onPress={() => onSelect(item.categoryId)}
        className="my-2 h-28 w-full flex-1 justify-between rounded-xl px-3 py-2"
        style={{ backgroundColor: darkMode ? '#333' : '#f1f3f5' }}
      >
        <Text style={{ color: darkMode ? 'white' : 'black' }} className="text-2xl">
          {item.categoryName}
        </Text>

        <View className="flex-row" style={{ gap: 12 }}>
          <MatrixItem count={item.matrixs.filter((todo) => todo.importance === 'doit').length} type="doit" />
          <MatrixItem count={item.matrixs.filter((todo) => todo.importance === 'schedule').length} type="schedule" />
          <MatrixItem count={item.matrixs.filter((todo) => todo.importance === 'delegate').length} type="delegate" />
          <MatrixItem count={item.matrixs.filter((todo) => todo.importance === 'eliminate').length} type="eliminate" />
        </View>
      </Pressable>
    </ContextMenu>
  );
};

type CategoryNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'Category'>;

const Category = ({ navigation }: { navigation: CategoryNavigationProp }) => {
  const { colorScheme } = useColorScheme();

  const { matrix, matrixs, selectedMatrix, deletedMatrix } = useMatrixStore();

  const [isCategoryForm, setIsCategoryForm] = useState<boolean>(false);

  const [updateCategoryId, setUpdateCategoryId] = useState<number>(0);

  const iconColor = colorScheme === 'light' ? '#1E1F23' : '#fff';

  const onSelectMatrix = (id: number) => {
    selectedMatrix(id);
    navigation.goBack();
  };

  const onModifyMatrix = (id: number) => {
    setUpdateCategoryId(id);
    setIsCategoryForm(true);
  };
  // 임시 eslint 처리 후 제거 예정

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderRightIcons
          icons={[
            {
              name: '카테고리',
              icon: <Plus size={23} color={iconColor} />,
              onPress: () => setIsCategoryForm(true),
            },
            {
              name: '설정',
              icon: <Settings size={23} color={iconColor} />,
              onPress: () => console.log('Icon pressed'),
            },
          ]}
        />
      ),
    });
  }, [navigation, matrix]);

  return (
    <Layout>
      <View className="flex-1">
        <FlashList
          data={matrixs}
          contentInsetAdjustmentBehavior="automatic"
          keyExtractor={(item) => `${item.categoryId}-${item.categoryName}`}
          renderItem={({ item }) => (
            <CategoryItem
              item={item}
              selectId={matrix?.categoryId}
              onSelect={onSelectMatrix}
              onModify={onModifyMatrix}
              onDelete={deletedMatrix}
              darkMode={colorScheme === 'dark'}
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
