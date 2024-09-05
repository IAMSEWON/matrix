import React from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Check, ChevronLeft, X } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';

import { Button } from '@/components/Button.tsx';
import Layout from '@/components/Layout/Layout.tsx';

type FormProps = {
  isVisble?: boolean;
  children: React.ReactNode;
  onSubmit: () => void;
  onClose?: () => void;
  modal?: boolean;
};

const Form = ({ isVisble, children, onSubmit, onClose, modal }: FormProps) => {
  const { colorScheme } = useColorScheme();

  if (modal) {
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
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <Layout style={{ gap: 12, flex: 1, marginTop: 40 }}>
          <View className="px-2" style={{ flex: 1, gap: 6 }}>
            {children}
          </View>
        </Layout>

        <View className="mx-2 flex-row items-center justify-between">
          <Button variant="outline" className="border-0" onPress={onClose}>
            <ChevronLeft color="black" />
          </Button>
          <Button variant="outline" className="border-0" onPress={onSubmit}>
            <Check color="#007bff" />
          </Button>
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default Form;
