import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { cn } from '@/utils/tailwind.ts';

const Layout = ({
  children,
  header,
  className,
  top = true,
  containerClassName,
}: {
  children: React.ReactNode;
  header?: React.ReactNode;
  className?: string;
  top?: boolean;
  containerClassName?: string;
}) => {
  const insets = useSafeAreaInsets();

  const topStyle = { paddingTop: top ? insets.top : 16 };

  return (
    <View className={cn(`flex-1 bg-white`, className)}>
      <View>{header}</View>
      <View className={cn('flex-1 px-2', containerClassName)} style={topStyle}>
        {children}
      </View>
    </View>
  );
};

export default Layout;
