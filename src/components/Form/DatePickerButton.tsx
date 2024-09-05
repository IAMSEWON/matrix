import React, { useState } from 'react';
import { Control, Controller, FieldError, RegisterOptions } from 'react-hook-form';
import { Keyboard, Text, TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import dayjs from 'dayjs';

import AnimatedBorder from '@/components/Form/AnimatedBorder.tsx';
import ErrorMessage from '@/components/Form/ErrorMessage.tsx';
import Label from '@/components/Form/Label.tsx';
import SheetModal from '@/components/Sheet/SheetModal.tsx';
import { MatrixAddType } from '@/types/matrix.ts';

type DatePickerButtonProps = {
  defaultValue?: string;
  label: string;
  name: keyof MatrixAddType;
  control: Control<MatrixAddType>;
  errors?: FieldError;
  placeholder: string;
  errorMessage?: string;
  rules?: RegisterOptions<MatrixAddType>;
  darkMode?: boolean;
};

const DatePickerButton = ({
  defaultValue,
  control,
  name,
  label,
  errors,
  errorMessage,
  placeholder,
  rules,
  darkMode,
}: DatePickerButtonProps) => {
  const [date, setDate] = useState<Date>(dayjs().toDate());

  const sheetRef = React.useRef<BottomSheetModal>(null);

  return (
    <View className="flex-col" style={{ gap: 8, height: 104 }}>
      <Label label={label} />

      <Controller
        control={control}
        rules={rules}
        render={({ field: { onChange, value } }) => {
          return (
            <AnimatedBorder value={value} error={!!errorMessage}>
              <TouchableOpacity
                onPress={() => {
                  sheetRef.current?.present();
                  Keyboard.dismiss();
                }}
                className="flex-1 items-center justify-center"
                style={{
                  paddingHorizontal: 8,
                  paddingVertical: 12,
                }}
              >
                <Text style={{ fontWeight: 'bold', color: darkMode ? '#fff' : '#1E1F23' }}>
                  {(value && dayjs(value).format('YYYY년 MM월 DD일 hh시 mm분')) || placeholder}
                </Text>
              </TouchableOpacity>

              <SheetModal
                ref={sheetRef}
                title="마감 날짜/시간 선택"
                snapPoints="45%"
                onCancel={() => sheetRef.current?.close()}
                onConfirm={() => {
                  sheetRef.current?.close();
                  onChange(date);
                }}
                onConfirmText="선택"
              >
                <DatePicker
                  style={{
                    flex: 1,
                    marginLeft: 14,
                  }}
                  theme={darkMode ? 'dark' : 'light'}
                  locale="ko"
                  date={date}
                  minimumDate={new Date()}
                  onDateChange={setDate}
                />
              </SheetModal>
            </AnimatedBorder>
          );
        }}
        name={name}
        defaultValue={defaultValue}
      />
      <ErrorMessage errors={errors} message={errorMessage} />
    </View>
  );
};

export default DatePickerButton;
