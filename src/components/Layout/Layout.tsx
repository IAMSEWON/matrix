import React from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

import useMatrixStore from '@/stores/matrix.ts';
import { cn } from '@/utils/tailwind.ts';

const Layout = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const { matrix } = useMatrixStore();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <View
          className={cn('flex-1 px-2 py-2', className)}
          style={{ backgroundColor: matrix?.categoryBackgroundColor || '#fff' }}
        >
          {children}
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default Layout;
