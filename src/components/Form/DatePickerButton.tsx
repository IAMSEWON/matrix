import React, { useState } from 'react';
import { Control, Controller, FieldError, FieldValues, RegisterOptions } from 'react-hook-form';
import { Text, TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import dayjs from 'dayjs';

import Label from '@/components/Form/Label.tsx';
import SheetModal from '@/components/Sheet/SheetModal.tsx';

type DatePickerButtonProps = {
  defaultValue?: string;
  label: string;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  errors?: FieldError;
  placeholder: string;
  errorMessage?: string;
  rules?: RegisterOptions<FieldValues>;
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
}: DatePickerButtonProps) => {
  const [date, setDate] = useState<Date>(dayjs().toDate());

  const sheetRef = React.useRef<BottomSheetModal>(null);

  return (
    <View className="flex-col" style={{ gap: 8 }}>
      <Label label={label} />

      <Controller
        control={control}
        rules={rules}
        render={({ field: { onChange, value } }) => (
          <View className="flex-row gap-2">
            <TouchableOpacity
              onPress={() => sheetRef.current?.present()}
              className="flex-1 items-center justify-center"
              style={{
                paddingHorizontal: 8,
                paddingVertical: 12,
                borderRadius: 8,
                borderWidth: 2,
                borderColor: value ? '#007bff' : 'transparent',
                backgroundColor: 'white',
              }}
            >
              <Text style={{ fontWeight: 'bold', color: value ? '#007bff' : '#CBCBCD' }}>
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
                }}
                locale="ko"
                date={date}
                minimumDate={new Date()}
                onDateChange={setDate}
              />
            </SheetModal>
          </View>
        )}
        name={name}
        defaultValue={defaultValue}
      />
      <View className="h-4">{errors && <Text className="text-red-500">{errorMessage}</Text>}</View>
    </View>
  );
};

export default DatePickerButton;
