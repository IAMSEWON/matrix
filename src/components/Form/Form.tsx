import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { X } from 'lucide-react-native';

type FormProps = {
  children: React.ReactNode;
  onSubmit: () => void;
  onClose?: () => void;
  onScroll?: () => void;
};

const Form = ({ children, onSubmit, onScroll, onClose }: FormProps) => {
  return (
    <ScrollView onScroll={onScroll} style={{ gap: 12 }}>
      <View className="flex-row items-center justify-between">
        <Pressable className="h-12 items-center justify-center" onPress={onSubmit}>
          <Text className="text-lg font-semibold">완료</Text>
        </Pressable>

        <Pressable className="tems-center h-12 justify-center" onPress={onClose}>
          <X size={27} color="black" />
        </Pressable>
      </View>
      {children}
    </ScrollView>
  );
};

export default Form;
