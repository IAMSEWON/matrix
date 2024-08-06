import React from 'react';

import Layout from '@/components/Layout/Layout.tsx';
import MatrixLayout from '@/components/MatrixLayout.tsx';

// type HomeNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'Home'>;

const Home = () => {
  return (
    <Layout>
      <MatrixLayout
        doit={{
          onPress: () => console.log('doit'),
        }}
        schedule={{
          onPress: () => console.log('schedule'),
        }}
        delegate={{
          onPress: () => console.log('delegate'),
        }}
        eliminate={{
          onPress: () => console.log('eliminate'),
        }}
      />
    </Layout>
  );
};

export default Home;
