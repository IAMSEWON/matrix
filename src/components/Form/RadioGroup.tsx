import React from 'react';
import { Control, Controller, FieldError, RegisterOptions } from 'react-hook-form';
import { Pressable, Text, View } from 'react-native';

import AnimatedBorder from '@/components/Form/AnimatedBorder.tsx';
import ErrorMessage from '@/components/Form/ErrorMessage.tsx';
import Label from '@/components/Form/Label.tsx';
import { MatrixAddType } from '@/types/matrix.ts';

type RadioGroupProps = {
  control: Control<MatrixAddType>;
  name: keyof MatrixAddType;
  label: string;
  options: { label: string; value: string }[];
  type?: 'MATRIX' | 'DEFAULT';
  errors?: FieldError;
  errorMessage?: string;
  rules?: RegisterOptions<MatrixAddType>;
  darkMode?: boolean;
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
  darkMode,
}: RadioGroupProps) => {
  return (
    <View className="flex-col" style={{ gap: 8, height: 102 }}>
      <Label label={label} />
      <Controller
        control={control}
        rules={rules}
        render={({ field: { onChange, value } }) => (
          <View className="flex-1 flex-row" style={{ gap: 8 }}>
            {options.map((option) => {
              return (
                <AnimatedBorder key={option.value} value={option.value === value ? value : ''} error={!!errorMessage}>
                  <Pressable
                    onPress={() => onChange(option.value)}
                    className="flex-1 items-center justify-center"
                    style={{
                      paddingHorizontal: 8,
                      paddingVertical: 12,
                      flex: 1,
                    }}
                  >
                    {type === 'MATRIX' ? (
                      <MatrixItem value={option.value} />
                    ) : (
                      <Text
                        style={{
                          fontWeight: 'bold',
                          color: darkMode ? '#fff' : '#1E1F23',
                        }}
                      >
                        {option.label}
                      </Text>
                    )}
                  </Pressable>
                </AnimatedBorder>
              );
            })}
          </View>
        )}
        name={name}
      />
      <ErrorMessage errors={errors} message={errorMessage} />
    </View>
  );
};

export default RadioGroup;
