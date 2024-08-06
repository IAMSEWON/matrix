import React from 'react';
import { Pressable, View } from 'react-native';

import { cn } from '@/utils/tailwind.ts';

type HeaderRightIconsProps = {
  headerClassName?: string;
  icons?: {
    name: string;
    icon: React.ReactNode;
    onPress: () => void;
  }[];
};

const HeaderRightIcons = ({ icons, headerClassName }: HeaderRightIconsProps) => {
  return (
    <View className={cn('flex-row gap-3', headerClassName)}>
      {icons?.map(({ name, icon, onPress }) => (
        <Pressable key={name} onPress={onPress}>
          {icon}
        </Pressable>
      ))}
    </View>
  );
};

export default HeaderRightIcons;
