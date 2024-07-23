import React from 'react';
import { Text, View } from 'react-native';

import { cn } from '@/utils/tailwind.ts';

type LabelProps = {
  label: string;
  className?: string;
  required?: boolean;
};

const Label = ({ label, required, className }: LabelProps) => {
  return (
    <View className="flex-row gap-1">
      <Text className={cn('text-lg font-semibold', className)}>{label}</Text>
      {required && <Text className="text-red-500">*</Text>}
    </View>
  );
};

export default Label;
