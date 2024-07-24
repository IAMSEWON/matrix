import React, { ForwardedRef, forwardRef, useCallback } from 'react';
import { Pressable, Text } from 'react-native';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
  useBottomSheetModal,
} from '@gorhom/bottom-sheet';
import { X } from 'lucide-react-native';

import { Button } from '@/components/Button';

type BottomSheetModalProps = {
  title: string; // 제목
  snapPoints: string; // 바텀시트 높이
  children?: React.ReactNode; // 바텀시트 Body 컴포넌트
  onCancel?: () => void; // 취소 버튼 클릭 시 실행할 함수
  onCancelText?: string; // 취소 버튼 텍스트
  onConfirm?: () => void; // 확인 버튼 클릭 시 실행할 함수
  onConfirmText?: string; // 확인 버튼 텍스트
};

const BottomSheetModalComponent = forwardRef(
  (
    { snapPoints = '25%', title, onCancel, onCancelText, onConfirm, onConfirmText, children }: BottomSheetModalProps,
    ref?: ForwardedRef<BottomSheetModal>,
  ) => {
    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop {...props} pressBehavior="close" appearsOnIndex={0} disappearsOnIndex={-1} />
      ),
      [],
    );

    const { dismiss } = useBottomSheetModal();

    // renders
    return (
      <BottomSheetModal key={title} backdropComponent={renderBackdrop} ref={ref} snapPoints={[snapPoints]} index={0}>
        <BottomSheetView style={{ alignItems: 'center' }}>
          <Text className="text-xl font-semibold text-black">{title}</Text>
          <Pressable className="absolute right-4 top-0" onPress={() => dismiss()}>
            <X className="text-black" size={30} />
          </Pressable>
        </BottomSheetView>
        <BottomSheetView style={{ flex: 1, marginBottom: 20, marginTop: 10, marginHorizontal: 20, gap: 10 }}>
          <BottomSheetView style={{ flex: 1 }}>{children}</BottomSheetView>
          <BottomSheetView style={{ flexDirection: 'row', gap: 8 }}>
            {onCancel && (
              <Button
                variant="outline"
                onPress={() => {
                  dismiss();
                  onCancel();
                }}
                size="flex"
              >
                <Text className="text-black">{onCancelText || '취소'}</Text>
              </Button>
            )}
            {onConfirm && (
              <Button
                onPress={() => {
                  dismiss();
                  onConfirm();
                }}
                size="flex"
              >
                <Text className="text-black">{onConfirmText || '완료'}</Text>
              </Button>
            )}
          </BottomSheetView>
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);

export default BottomSheetModalComponent;