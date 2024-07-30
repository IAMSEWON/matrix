import React, { useRef, useState } from 'react';
import { Alert, Modal, Pressable, Text, TextInput, View } from 'react-native';
import { X } from 'lucide-react-native';

import FadeInFadeOut from '@/components/Animation/FadeInOut.tsx';
import { Button } from '@/components/Button.tsx';
import ColorPicker from '@/components/ColorPicker.tsx';
import useMatrixStore from '@/stores/matrix.ts';

const placeholderData = ['여행', '요리', '쇼핑', '회사', '공부'];

export type Category = { id: number; check: boolean; category: string };

const CategoryForm = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const inputRef = useRef<TextInput>(null);

  const [categoryValue, setCategoryValue] = useState<string>('');

  const [isOpenColorPicker, setIsOpenColorPicker] = useState<boolean>(false);

  const [isSelectedColor, setIsSelectedColor] = useState<string>('#d9d9d9');

  const { addMatrix } = useMatrixStore();

  const onAddCategory = () => {
    // 카테고리 입력이 없을 경우
    if (categoryValue === '') {
      Alert.alert('카테고리를 입력해주세요.');
    } else {
      // 카테고리 zustand store에 추가
      addMatrix({
        category: categoryValue.trim(),
        categoryBackgroundColor: isSelectedColor,
      });

      // 상태 초기화 및 모달 닫기
      onCloseModal();
    }
  };

  // 카테고리 입력
  const onChangeCategoryText = (text: string) => {
    // const replaceText = text.replace(/(\s*)/g, '');
    setCategoryValue(text);
  };

  // 상태 초기화 및 모달 닫기
  const onCloseModal = () => {
    setCategoryValue('');
    setIsSelectedColor('#d9d9d9');
    onClose();
  };

  return (
    <Modal animationType="slide" visible={open} onRequestClose={onCloseModal} presentationStyle="pageSheet">
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        {/* 모달 카테고리 닫기 버튼 */}
        <View className="flex-[0.1] flex-row items-center justify-between px-2 py-2">
          <Pressable className="h-12 w-12 items-center justify-center" onPress={onAddCategory}>
            <Text className="text-lg font-semibold">완료</Text>
          </Pressable>

          <Pressable className="h-12 w-8 items-center justify-center" onPress={onCloseModal}>
            <X size={27} color="black" />
          </Pressable>
        </View>
        <View className="flex-1 items-center justify-center gap-5">
          <Text className="text-3xl font-bold">새로운 카테고리 시작</Text>
          <Text className="text-xl font-semibold text-[#d9d9d9]">명확하고 간단한 단어를 입력하세요.</Text>
          <View className="w-10/12 flex-1 items-center">
            <TextInput
              ref={inputRef}
              className="w-full text-center text-3xl font-bold"
              value={categoryValue}
              onChangeText={onChangeCategoryText}
              placeholder={placeholderData[0]}
              placeholderTextColor="#999999"
              returnKeyType="done"
              autoFocus
              onSubmitEditing={onAddCategory}
            />
            {/* placeholder */}
            {!categoryValue &&
              placeholderData
                .filter((item, index) => index > 0)
                .map((item) => {
                  return (
                    <Text key={item} className="w-full text-center text-3xl font-bold text-[#999999]">
                      {item}
                    </Text>
                  );
                })}
            <FadeInFadeOut style={{ marginTop: 20 }} fadeIn={categoryValue.length > 0}>
              <Button variant="outline" size="icon" onPress={() => setIsOpenColorPicker(true)}>
                <View style={{ width: 24, height: 24, borderRadius: 20, backgroundColor: isSelectedColor }} />
              </Button>
            </FadeInFadeOut>
          </View>
        </View>
      </View>

      <ColorPicker
        open={isOpenColorPicker}
        onClose={() => {
          setIsOpenColorPicker(false);
        }}
        onSelect={(color) => {
          setIsOpenColorPicker(false);
          setIsSelectedColor(color);
        }}
      />
    </Modal>
  );
};

export default CategoryForm;
