import React from 'react';
import { Pressable, View } from 'react-native';

import Text from '@/components/Text.tsx';
import { cn } from '@/utils/tailwind.ts';

type HeaderProps = {
  title: string;
  headerClassName?: string;
  icons?: {
    name: string;
    icon: React.ReactNode;
    onPress: () => void;
  }[];
};

const Header = ({ title, icons, headerClassName }: HeaderProps) => {
  return (
    <View className={cn('flex-row items-center justify-between', headerClassName)}>
      <Text className="text-center text-2xl font-bold">{title}</Text>
      <View className="flex-row gap-3">
        {icons?.map(({ name, icon, onPress }) => (
          <Pressable key={name} onPress={onPress}>
            {icon}
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default Header;
