import React from 'react';
import { Control, Controller, FieldError, FieldValues, RegisterOptions } from 'react-hook-form';
import { Text, TouchableOpacity, View } from 'react-native';

import Label from '@/components/Form/Label.tsx';

type RadioGroupProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  name: string;
  label: string;
  options: { label: string; value: string }[];
  type?: 'MATRIX' | 'DEFAULT';
  errors?: FieldError;
  errorMessage?: string;
  rules?: RegisterOptions<FieldValues>;
};

const matrixData = ['doit', 'schedule', 'delegate', 'eliminate'];

const MatrixItem = ({ value }: { value: string }) => {
  return (
    <View className="flex-1 items-center justify-center">
      <View className="flex-row gap-1">
        <View
          className="h-3 w-3 rounded bg-gray-300"
          style={{
            backgroundColor: value === matrixData[0] ? '#007bff' : '#e0f3ff',
          }}
        />
        <View
          className="h-3 w-3 rounded bg-gray-300"
          style={{
            backgroundColor: value === matrixData[1] ? '#007bff' : '#e0f3ff',
          }}
        />
      </View>
      <View className="flex-row gap-1 pt-1">
        <View
          className="h-3 w-3 rounded bg-gray-300"
          style={{
            backgroundColor: value === matrixData[2] ? '#007bff' : '#e0f3ff',
          }}
        />
        <View
          className="h-3 w-3 rounded bg-gray-300"
          style={{
            backgroundColor: value === matrixData[3] ? '#007bff' : '#e0f3ff',
          }}
        />
      </View>
    </View>
  );
};

const RadioGroup = ({
  type = 'DEFAULT',
  options,
  control,
  name,
  label,
  errors,
  errorMessage,
  rules,
}: RadioGroupProps) => {
  return (
    <View className="flex-col" style={{ gap: 8 }}>
      <Label label={label} />
      <Controller
        control={control}
        rules={rules}
        render={({ field: { onChange, value } }) => (
          <View className="flex-row gap-2">
            {options.map((option) => {
              console.log('🔥🔥/ :76 - value = ', value);

              return (
                <TouchableOpacity
                  key={option.value}
                  onPress={() => onChange(option.value)}
                  className="flex-1 items-center justify-center"
                  style={{
                    paddingHorizontal: 8,
                    paddingVertical: 12,
                    borderRadius: 8,
                    borderWidth: 2,
                    borderColor: value === option.value ? '#007bff' : 'transparent',
                    backgroundColor: 'white',
                  }}
                >
                  {type === 'MATRIX' ? (
                    <MatrixItem value={option.value} />
                  ) : (
                    <Text style={{ fontWeight: 'bold', color: value === option.value ? '#007bff' : '#000' }}>
                      {option.label}
                    </Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        )}
        name={name}
      />
      <View className="h-4">{errors && <Text className="text-red-500">{errorMessage}</Text>}</View>
    </View>
  );
};

export default RadioGroup;
