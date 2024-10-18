import React from 'react';
import { Image, Text, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useColorScheme } from 'nativewind';

import Layout from '@/components/Layout/Layout.tsx';
import MatrixLayout from '@/components/MatrixLayout.tsx';
import useMatrixStore from '@/stores/matrix.ts';
import { HomeStackParamList } from '@/types/navigation.ts';

type HomeNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'Home'>;

const Home = ({ navigation }: { navigation: HomeNavigationProp }) => {
  const { matrix } = useMatrixStore();
  const { colorScheme } = useColorScheme();

  return (
    <Layout>
      {matrix ? (
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
        <View className="mb-14 flex-1 items-center justify-center gap-4">
          <Image source={require('@/assets/images/matrix-logo.png')} className="h-24 w-24" />
          <View>
            <Text className="text-2xl font-semibold" style={colorScheme === 'dark' && { color: 'white' }}>
              카테고리 등록하기
            </Text>
            <Text className="text-center text-gray-600" style={colorScheme === 'dark' && { color: '#f0f8ff99' }}>
              더하기 버튼을 탭하여
            </Text>
            <Text className="text-center text-gray-600" style={colorScheme === 'dark' && { color: '#f0f8ff99' }}>
              카테고리를 등록해주세요.
            </Text>
          </View>
        </View>
      )}
    </Layout>
  );
};

export default Home;
