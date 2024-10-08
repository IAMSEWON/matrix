import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import Layout from '@/components/Layout/Layout.tsx';
import MatrixLayout from '@/components/MatrixLayout.tsx';
import useMatrixStore from '@/stores/matrix.ts';
import { HomeStackParamList } from '@/types/navigation.ts';

type HomeNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'Home'>;

const Home = ({ navigation }: { navigation: HomeNavigationProp }) => {
  const { matrix, resetMatrixs } = useMatrixStore();

  return (
    <Layout>
      {matrix?.matrixs ? (
        <MatrixLayout
          doit={{
            onPress: () =>
              navigation.navigate('MatrixTodo', {
                matrixType: 'doit',
              }),
            contents: matrix?.matrixs.filter((item) => item.importance === 'doit'),
          }}
          schedule={{
            onPress: () =>
              navigation.navigate('MatrixTodo', {
                matrixType: 'schedule',
              }),
            contents: matrix?.matrixs.filter((item) => item.importance === 'schedule'),
          }}
          delegate={{
            onPress: () =>
              navigation.navigate('MatrixTodo', {
                matrixType: 'delegate',
              }),
            contents: matrix?.matrixs.filter((item) => item.importance === 'delegate'),
          }}
          eliminate={{
            onPress: () =>
              navigation.navigate('MatrixTodo', {
                matrixType: 'eliminate',
              }),
            contents: matrix?.matrixs.filter((item) => item.importance === 'eliminate'),
          }}
        />
      ) : (
        <MatrixLayout
          doit={{
            onPress: () =>
              navigation.navigate('MatrixTodo', {
                matrixType: 'doit',
              }),
            contents: [],
          }}
          schedule={{
            onPress: () =>
              navigation.navigate('MatrixTodo', {
                matrixType: 'schedule',
              }),
            contents: [],
          }}
          delegate={{
            onPress: () =>
              navigation.navigate('MatrixTodo', {
                matrixType: 'delegate',
              }),
            contents: [],
          }}
          eliminate={{
            onPress: () =>
              navigation.navigate('MatrixTodo', {
                matrixType: 'eliminate',
              }),
            contents: [],
          }}
        />
      )}
    </Layout>
  );
};

export default Home;
