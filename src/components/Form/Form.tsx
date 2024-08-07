import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { X } from 'lucide-react-native';

type FormProps = {
  children: React.ReactNode;
  onSubmit: () => void;
  onClose?: () => void;
  onScroll?: () => void;
};

const Form = ({ children, onSubmit, onScroll, onClose }: FormProps) => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <ScrollView onScroll={onScroll} className="flex-1 bg-white px-2 py-2">
          <View className="flex-row items-center justify-between">
            <Pressable className="h-12 items-center justify-center" onPress={onSubmit}>
              <Text className="text-lg font-semibold">완료</Text>
            </Pressable>

            <Pressable className="tems-center h-12 justify-center" onPress={onClose}>
              <X size={27} color="black" />
            </Pressable>
          </View>
          <View style={{ gap: 6 }}>{children}</View>
        </ScrollView>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default Form;
