import React, { ForwardedRef, forwardRef, useCallback } from 'react';
import { Pressable, Text } from 'react-native';
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetView } from '@gorhom/bottom-sheet';
import { X } from 'lucide-react-native';

import { Button } from '@/components/Button';

type BottomSheetProps = {
  title: string; // 제목
  snapPoints: string; // 바텀시트 높이
  children?: React.ReactNode; // 바텀시트 Body 컴포넌트
  footer?: React.ReactNode; // 바텀시트 Footer 컴포넌트
  onCancel?: () => void; // 취소 버튼 클릭 시 실행할 함수
  onCancelText?: string; // 취소 버튼 텍스트
  onConfirm?: () => void; // 확인 버튼 클릭 시 실행할 함수
  onConfirmText?: string; // 확인 버튼 텍스트
};

const Sheet = forwardRef(
  (
    { snapPoints = '25%', title, onCancel, onCancelText, onConfirm, onConfirmText, children, footer }: BottomSheetProps,
    ref?: ForwardedRef<BottomSheet>,
  ) => {
    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} />,
      [],
    );

    return (
      <BottomSheet
        backdropComponent={renderBackdrop}
        enableDynamicSizing
        key={title}
        ref={ref}
        snapPoints={[snapPoints]}
        index={-1}
      >
        <BottomSheetView style={{ alignItems: 'center' }}>
          <Text className="text-xl font-semibold text-black">{title}</Text>
          <Pressable className="absolute right-4 top-0" onPress={() => onCancel && onCancel()}>
            <X className="text-black" size={30} />
          </Pressable>
        </BottomSheetView>
        <BottomSheetView style={{ flex: 1, marginBottom: 20, marginTop: 10, marginHorizontal: 20, gap: 10 }}>
          <BottomSheetView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {children}
          </BottomSheetView>
          {footer ? (
            <BottomSheetView style={{ flexDirection: 'row', gap: 8 }}>{footer}</BottomSheetView>
          ) : (
            <BottomSheetView style={{ flexDirection: 'row', gap: 8 }}>
              {onCancel && (
                <Button
                  variant="outline"
                  onPress={() => {
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
                    onConfirm();
                  }}
                  size="flex"
                >
                  <Text className="text-black">{onConfirmText || '완료'}</Text>
                </Button>
              )}
            </BottomSheetView>
          )}
        </BottomSheetView>
      </BottomSheet>
    );
  },
);

export default Sheet;
