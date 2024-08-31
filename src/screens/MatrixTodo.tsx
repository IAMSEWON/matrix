import React from 'react';
import { View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import dayjs from 'dayjs';

import CheckBox from '@/components/Check.tsx';
import Text from '@/components/Text.tsx';
import useMatrixStore from '@/stores/matrix.ts';
import { HomeStackParamList } from '@/types/navigation.ts';

type MatrixTodoNavigationProp = NativeStackScreenProps<HomeStackParamList, 'MatrixTodo'>;

const MatrixTodo = ({ route }: MatrixTodoNavigationProp) => {
  const { matrix, toggleTodoChecked } = useMatrixStore();

  const { matrixType } = route.params;

  // 할 일 체크 토글 핸들러
  const onCheckTodoHandler = (matrixId: number, todoId: number) => {
    toggleTodoChecked(matrixId, matrixType, todoId);
  };

  return (
    <View
      className="flex-1"
      style={{
        backgroundColor: matrix?.categoryBackgroundColor,
      }}
    >
      <View className="m-4 flex-1 rounded-2xl bg-white p-4" style={{ gap: 10 }}>
        {matrix?.matrixs[matrixType].contents
          .slice() // Create a shallow copy to avoid mutating the original array
          .sort((a, b) => Number(a.isChecked) - Number(b.isChecked)) // Sort by isChecked
          .map((content) => {
            return (
              <View className="flex-row items-center justify-between" key={content.id}>
                <View className="flex-row items-center" style={{ gap: 10 }}>
                  <CheckBox
                    onPress={() => onCheckTodoHandler(matrix.id, content.id)}
                    backgroundColor={matrix?.categoryBackgroundColor}
                    checked={content.isChecked}
                  />
                  <Text className="text-lg">{content.content}</Text>
                </View>
                <View key={content.id} className="flex-row items-center" style={{ gap: 8 }}>
                  <Text
                    className="px-1 py-0.5 text-xs"
                    style={{
                      borderRadius: 4,
                      overflow: 'hidden',
                      backgroundColor: matrix?.categoryBackgroundColor,
                    }}
                  >
                    {dayjs(content.endDate).format('MM.DD')}
                  </Text>
                  <Text
                    className="px-1 py-0.5 text-xs"
                    style={{
                      borderRadius: 4,
                      overflow: 'hidden',
                      backgroundColor: matrix?.categoryBackgroundColor,
                    }}
                  >
                    {dayjs(content.endDate).format('HH:mmA')}
                  </Text>
                </View>
              </View>
            );
          })}
      </View>
    </View>
  );
};

export default MatrixTodo;