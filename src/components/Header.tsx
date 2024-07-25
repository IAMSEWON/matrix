import React from 'react';
import { Pressable, Text, View } from 'react-native';

type HeaderProps = {
  title: string;
  icons?: {
    name: string;
    icon: React.ReactNode;
    onPress: () => void;
  }[];
};

const Header = ({ title, icons }: HeaderProps) => {
  return (
    <View className="flex-row items-center justify-between">
      <Text className="flex-1 text-center text-2xl font-bold">{title}</Text>
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
