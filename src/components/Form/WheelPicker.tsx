import React, { useState } from 'react';
import { Control, Controller, FieldError, RegisterOptions } from 'react-hook-form';
import { Keyboard, Text, TouchableOpacity, View } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import Picker from '@quidone/react-native-wheel-picker';

import AnimatedBorder from '@/components/Form/AnimatedBorder.tsx';
import ErrorMessage from '@/components/Form/ErrorMessage.tsx';
import Label from '@/components/Form/Label.tsx';
import SheetModal from '@/components/Sheet/SheetModal.tsx';
import { MatrixAddType } from '@/types/matrix.ts';

type WheelPickerProps = {
  defaultValue?: string;
  label?: string;
  name: keyof MatrixAddType;
  control: Control<MatrixAddType>;
  options: { label: string; value: string }[];
  errors?: FieldError;
  title?: string;
  placeholder: string;
  errorMessage?: string;
  rules?: RegisterOptions<MatrixAddType>;
  darkMode?: boolean;
};

const WheelPicker = ({
  defaultValue,
  control,
  name,
  label,
  errors,
  errorMessage,
  title,
  options,
  placeholder,
  rules,
  darkMode,
}: WheelPickerProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(
    defaultValue ? options.findIndex((option) => option.value === defaultValue) : 0,
  );

  const sheetRef = React.useRef<BottomSheetModal>(null);

  return (
    <View className="flex-col" style={{ gap: 8, height: label ? 104 : 76 }}>
      {label && <Label label={label} />}

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
                  {options.filter((option) => option.value === value)[0]?.label || placeholder}
                </Text>
              </TouchableOpacity>

              <SheetModal
                ref={sheetRef}
                title={title || ''}
                snapPoints="45%"
                onCancel={() => sheetRef.current?.close()}
                onConfirm={() => {
                  sheetRef.current?.close();
                  const changedValue = options[selectedIndex].value;
                  onChange(changedValue);
                }}
                onConfirmText="선택"
              >
                <Picker
                  data={options}
                  value={value}
                  onValueChanged={({ item }) => {
                    const changedIndex = options.findIndex((option) => option.value === item.value);

                    setSelectedIndex(changedIndex);
                  }}
                  itemTextStyle={{ color: darkMode ? '#fff' : '#1E1F23' }}
                  overlayItemStyle={{
                    backgroundColor: darkMode ? '#fff' : '#1E1F23',
                  }}
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

export default WheelPicker;
