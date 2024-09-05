import React, { useEffect, useRef, useState } from 'react';
import { Alert, Modal, Pressable, Text, TextInput, View } from 'react-native';
import { X } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';

import ColorPicker from '@/components/ColorPicker.tsx';
import Layout from '@/components/Layout/Layout.tsx';
import useMatrixStore from '@/stores/matrix.ts';
import { MatrixType } from '@/types/matrix.ts';

const placeholderData = ['여행', '요리', '쇼핑', '회사', '공부'];

export type Category = { id: number; check: boolean; category: string };

type CategoryFormProps = {
  matrixs: MatrixType[];
  open: boolean;
  onClose: () => void;
  updateId?: number;
};

const CategoryForm = ({ matrixs, open, onClose, updateId }: CategoryFormProps) => {
  const inputRef = useRef<TextInput>(null);

  const [categoryValue, setCategoryValue] = useState<string>('');

  const [isOpenColorPicker, setIsOpenColorPicker] = useState<boolean>(false);

  const [isSelectedColor, setIsSelectedColor] = useState<string>('#ffffff');

  const { addMatrix, updateMatrix } = useMatrixStore();

  const { colorScheme } = useColorScheme();

  const onAddCategory = () => {
    // 카테고리 입력이 없을 경우
    if (categoryValue === '') {
      Alert.alert('카테고리를 입력해주세요.');
    } else if (matrixs.some((matrix) => matrix.category === categoryValue.trim() && matrix.id !== updateId)) {
      // 카테고리 이름이 중복될 경우
      Alert.alert('이미 존재하는 카테고리입니다.');
    } else if (updateId) {
      // 카테고리 zustand store에 업데이트
      updateMatrix(updateId, {
        category: categoryValue.trim(),
        categoryBackgroundColor: isSelectedColor,
      });

      // 상태 초기화 및 모달 닫기
      onCloseModal();
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
    setIsSelectedColor('#ffffff');
    onClose();
  };

  useEffect(() => {
    if (updateId) {
      const isMatchedMatrix = matrixs.find((matrix) => matrix.id === updateId);
      if (isMatchedMatrix) {
        setCategoryValue(isMatchedMatrix.category);
        setIsSelectedColor(isMatchedMatrix.categoryBackgroundColor);
        inputRef.current?.focus();
      }
    }
  }, [updateId]);

  return (
    <Modal animationType="slide" visible={open} onRequestClose={onCloseModal} presentationStyle="pageSheet">
      <Layout>
        {/* 모달 카테고리 닫기 버튼 */}
        <View className="flex-[0.1] flex-row items-center justify-between px-2 py-2">
          <Pressable className="h-12 w-12 items-center justify-center" onPress={onAddCategory}>
            <Text className="text-lg font-semibold dark:text-white">완료</Text>
          </Pressable>

          <Pressable className="h-12 w-8 items-center justify-center" onPress={onCloseModal}>
            <X size={27} color={colorScheme === 'light' ? 'black' : 'white'} />
          </Pressable>
        </View>
        <View className="flex-1 items-center justify-center gap-5">
          <Text className="text-3xl font-bold dark:text-white">새로운 카테고리 시작</Text>
          <Text className="text-xl font-semibold text-[#d9d9d9]">명확하고 간단한 단어를 입력하세요.</Text>
          <View className="w-10/12 flex-1 items-center">
            <TextInput
              ref={inputRef}
              keyboardAppearance={colorScheme}
              className="w-full text-center text-3xl font-bold dark:text-white"
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
            {/* <FadeInFadeOut style={{ marginTop: 20 }} fadeIn={categoryValue.length > 0}> */}
            {/*  <Button variant="outline" onPress={() => setIsOpenColorPicker(true)}> */}
            {/*    <View className="flex flex-row items-center gap-2"> */}
            {/*      <View */}
            {/*        style={{ */}
            {/*          width: 24, */}
            {/*          height: 24, */}
            {/*          borderRadius: 20, */}
            {/*          borderWidth: 1, */}
            {/*          borderColor: '#e4e4e7', */}
            {/*          backgroundColor: isSelectedColor, */}
            {/*        }} */}
            {/*      /> */}
            {/*      <Text className="font-semibold">배경 선택</Text> */}
            {/*    </View> */}
            {/*  </Button> */}
            {/* </FadeInFadeOut> */}
          </View>
        </View>
      </Layout>

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
