import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import dayjs from 'dayjs';

import FadeInFadeOut from '@/components/Animation/FadeInOut.tsx';
import CheckBox from '@/components/CheckBox.tsx';
import Layout from '@/components/Layout/Layout.tsx';
import useMatrixStore from '@/stores/matrix.ts';
import { useMatrixTypeStore } from '@/stores/matrixType.ts';
import { HomeStackParamList } from '@/types/navigation.ts';

type MatrixTodoNavigationProp = NativeStackScreenProps<HomeStackParamList, 'MatrixTodo'>;

const MatrixTodo = ({ route }: MatrixTodoNavigationProp) => {
  const { matrix, toggleTodoChecked } = useMatrixStore();
  const { setMatrixType } = useMatrixTypeStore();

  const { matrixType } = route.params;

  // 할 일 체크 토글 핸들러
  const onCheckTodoHandler = (matrixId: number, todoId: number) => {
    toggleTodoChecked(matrixId, matrixType, todoId);
  };

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
      <View>
        {matrix?.matrixs[matrixType].contents
          .slice() // Create a shallow copy to avoid mutating the original array
          .sort((a, b) => Number(a.isChecked) - Number(b.isChecked)) // Sort by isChecked
          .map((content) => {
            return (
              <FadeInFadeOut
                fadeIn
                style={{ flex: 0 }}
                className="flex-row items-center justify-between"
                key={content.id}
              >
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
              </FadeInFadeOut>
            );
          })}
      </View>
    </Layout>
  );
};

export default MatrixTodo;
