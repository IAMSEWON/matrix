import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { useColorScheme } from 'nativewind';

import { cn } from '@/utils/tailwind.ts';

const Layout = ({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: StyleProp<ViewStyle>;
}) => {
  const { colorScheme } = useColorScheme();

  return (
    <View
      className={cn('flex-1 px-2 py-2', className)}
      style={[{ backgroundColor: colorScheme === 'light' ? '#fff' : '#1E1F23' }, style]}
    >
      {children}
    </View>
  );
};

export default Layout;
