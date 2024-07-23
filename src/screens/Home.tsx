import React, { useRef } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Folder, Settings } from 'lucide-react-native';

import Header from '@/components/Header.tsx';
import Layout from '@/components/Layout.tsx';
import MatrixLayout from '@/components/MatrixLayout.tsx';

const Home = () => {
  const sheetRef = useRef<BottomSheetModal>(null);
  return (
    <Layout className="px-2" containerClassName="flex-1">
      <Header
        title="Home"
        icons={[
          {
            name: '카테고리',
            icon: <Folder size={23} color="black" />,
            onPress: () => sheetRef.current?.present(),
          },
          {
            name: '설정',
            icon: <Settings size={23} color="black" />,
            onPress: () => console.log('Icon pressed'),
          },
        ]}
      />
      <MatrixLayout />
    </Layout>
  );
};

export default Home;
