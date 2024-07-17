import React from 'react';
import { Text } from 'react-native';

import Layout from '@/components/Layout.tsx';

const Home = () => {
  return (
    <Layout className="px-2" containerClassName="flex-1">
      <Text className="text-yellow-500">Home</Text>
    </Layout>
  );
};

export default Home;
