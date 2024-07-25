import React from 'react';
import { View } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Folder, Settings } from 'lucide-react-native';

import Header from '@/components/Header.tsx';
import Layout from '@/components/Layout.tsx';
import MatrixLayout from '@/components/MatrixLayout.tsx';
import { HomeStackParamList } from '@/types/navigation.ts';

type HomeNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'Home'>;

const Home = ({ navigation }: { navigation: HomeNavigationProp }) => {
  return (
    <Layout>
      <Header
        title="Home"
        icons={[
          {
            name: '카테고리',
            icon: <Folder size={23} color="black" />,
            onPress: () => navigation.navigate('Category'),
          },
          {
            name: '설정',
            icon: <Settings size={23} color="black" />,
            onPress: () => console.log('Icon pressed'),
          },
        ]}
      />
      <View className="flex-1 px-0 py-2">
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
      </View>
    </Layout>
  );
};

export default Home;
