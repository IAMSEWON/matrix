import React, { useEffect } from 'react';
import { Pressable, Text, View } from 'react-native';
import ContextMenu from 'react-native-context-menu-view';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import dayjs from 'dayjs';
import { useColorScheme } from 'nativewind';

import FadeInFadeOut from '@/components/Animation/FadeInOut.tsx';
import CheckBox from '@/components/CheckBox.tsx';
import Layout from '@/components/Layout/Layout.tsx';
import useMatrixStore from '@/stores/matrix.ts';
import { useMatrixAdd } from '@/stores/matrixAdd.ts';
import { HomeStackParamList } from '@/types/navigation.ts';

type MatrixTodoNavigationProp = NativeStackScreenProps<HomeStackParamList, 'MatrixTodo'>;

const MatrixTodo = ({ route }: MatrixTodoNavigationProp) => {
  const { matrix, checkedTodo, deletedTodo } = useMatrixStore();
  const { setIsVisibleMatrixAdd, setMatrixType, setEditMatrix } = useMatrixAdd();

  const { colorScheme } = useColorScheme();

  const { matrixType } = route.params;

  // 할 일 체크 토글 핸들러
  const onCheckTodoHandler = (categoryId: number, todoId: number) => {
    checkedTodo({
      categoryId,
      todoId,
    });
  };

  const backgroundColor = colorScheme === 'dark' ? '#333333' : '#f1f3f5';
  const color = colorScheme === 'dark' ? '#f1f3f5' : '#333333';

  useEffect(() => {
    // 스크린 진입 시 matrixType 값 설정
    // 해당 스크린에서 매트릭스 등록 시 현재 매트릭스 스크린에 구분하여 default 값으로 설정

    setMatrixType(matrixType);

    return () => {
      // 스크린 벗어날 시 값 비워주기
      setMatrixType('');
    };
  }, []);

  return (
    <Layout>
      <View style={{ gap: 2 }}>
        {matrix?.matrixs.map((item) => {
          if (item.importance !== matrixType) return null;

          return (
            <ContextMenu
              previewBackgroundColor={colorScheme === 'dark' ? '#1E1F23' : '#ffffff'}
              onPress={(e) => {
                if (e.nativeEvent.name === '수정') {
                  setIsVisibleMatrixAdd(true);
                  setEditMatrix({
                    categoryId: matrix.categoryId,
                    todoId: item.todoId,
                    content: item.content,
                    endDate: item.endDate,
                    importance: item.importance,
                    alram: item.alram,
                    alramTime: item.alramTime,
                  });
                } else {
                  deletedTodo({
                    categoryId: matrix.categoryId,
                    todoId: item.todoId,
                  });
                }
              }}
              key={item.todoId}
              actions={[{ title: '수정' }, { title: '삭제' }]}
            >
              <FadeInFadeOut fadeIn style={{ flex: 0 }}>
                <View className="flex-col justify-between p-2" style={{ gap: 10 }}>
                  <View className="flex-row items-center" style={{ gap: 10 }}>
                    <CheckBox
                      onPress={() => onCheckTodoHandler(matrix.categoryId, item.todoId)}
                      backgroundColor={color}
                      checked={item.isChecked}
                    />
                    <Text
                      className="mr-6 text-lg"
                      style={{
                        textDecorationLine: item.isChecked ? 'line-through' : 'none',
                        color,
                      }}
                    >
                      {item.content}
                    </Text>
                  </View>
                  <Pressable onPress={() => {}} key={item.todoId} className="flex-row items-center" style={{ gap: 8 }}>
                    <Text
                      className="px-1 py-0.5 text-xs"
                      style={{
                        borderRadius: 4,
                        overflow: 'hidden',
                        backgroundColor,
                        color,
                      }}
                    >
                      {dayjs(item.endDate).format('MM.DD')}
                    </Text>
                    <Text
                      className="px-1 py-0.5 text-xs"
                      style={{
                        borderRadius: 4,
                        overflow: 'hidden',
                        backgroundColor,
                        color,
                      }}
                    >
                      {dayjs(item.endDate).format('HH:mmA')}
                    </Text>
                  </Pressable>
                </View>
              </FadeInFadeOut>
            </ContextMenu>
          );
        })}
      </View>
    </Layout>
  );
};

export default MatrixTodo;
