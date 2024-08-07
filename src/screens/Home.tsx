import React from 'react';

import Layout from '@/components/Layout/Layout.tsx';
import MatrixLayout from '@/components/MatrixLayout.tsx';
import useMatrixStore from '@/stores/matrix.ts';

// type HomeNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'Home'>;

const Home = () => {
  const { matrix } = useMatrixStore();

  return (
    <Layout>
      <MatrixLayout
        doit={{
          onPress: () => console.log('doit'),
          contents: matrix?.matrixs.doit.contents,
        }}
        schedule={{
          onPress: () => console.log('schedule'),
          contents: matrix?.matrixs.schedule.contents,
        }}
        delegate={{
          onPress: () => console.log('delegate'),
          contents: matrix?.matrixs.delegate.contents,
        }}
        eliminate={{
          onPress: () => console.log('eliminate'),
          contents: matrix?.matrixs.eliminate.contents,
        }}
      />
    </Layout>
  );
};

export default Home;
