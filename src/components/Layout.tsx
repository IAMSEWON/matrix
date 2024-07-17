import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { cn } from '@/utils/tailwind.ts';

const Layout = ({
  children,
  header,
  className,
  containerClassName,
}: {
  children: React.ReactNode;
  header?: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  const { top } = useSafeAreaInsets();

  const topStyle = { paddingTop: top };

  return (
    <View className={cn(`flex-1`, className)}>
      <View>{header}</View>
      <View className={cn('flex-1 px-2', containerClassName)} style={topStyle}>
        {children}
      </View>
    </View>
  );
};

export default Layout;
