import React from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { X } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';

import Layout from '@/components/Layout/Layout.tsx';

type FormProps = {
  isVisble: boolean;
  children: React.ReactNode;
  onSubmit: () => void;
  onClose?: () => void;
};

const Form = ({ isVisble, children, onSubmit, onClose }: FormProps) => {
  const { colorScheme } = useColorScheme();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Modal
        animationType="slide"
        presentationStyle="pageSheet"
        visible={isVisble}
        style={{ flex: 1 }}
        onRequestClose={() => {
          if (onClose) {
            onClose();
          }
        }}
      >
        <BottomSheetModalProvider>
          <Layout>
            <View className="flex-row items-center justify-between">
              <Pressable className="h-12 w-12 items-center justify-center" onPress={onSubmit}>
                <Text className="text-lg font-semibold dark:text-white">완료</Text>
              </Pressable>
              <Pressable className="h-12 w-8 items-center justify-center" onPress={onClose}>
                <X size={27} color={colorScheme === 'light' ? 'black' : 'white'} />
              </Pressable>
            </View>
            <View className="px-2" style={{ flex: 1, gap: 6 }}>
              {children}
            </View>
          </Layout>
        </BottomSheetModalProvider>
      </Modal>
    </GestureHandlerRootView>
  );
};

export default Form;
