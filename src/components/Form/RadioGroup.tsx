import React from 'react';
import { Control, Controller, FieldError, RegisterOptions } from 'react-hook-form';
import { Pressable, Text, View } from 'react-native';

import AnimatedBorder from '@/components/Form/AnimatedBorder.tsx';
import ErrorMessage from '@/components/Form/ErrorMessage.tsx';
import Label from '@/components/Form/Label.tsx';
import { TodoAddType } from '@/types/matrix.ts';

import ImportanceSquare from '../ImportanceSquare';

type RadioGroupProps = {
  control: Control<TodoAddType>;
  name: keyof TodoAddType;
  label: string;
  options: { label: string; value: string }[];
  type?: 'MATRIX' | 'DEFAULT';
  errors?: FieldError;
  errorMessage?: string;
  rules?: RegisterOptions<TodoAddType>;
  darkMode?: boolean;
  defaultValue?: string;
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
  defaultValue,
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
                      <ImportanceSquare value={option.value} />
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
        defaultValue={defaultValue}
      />
      <ErrorMessage errors={errors} message={errorMessage} />
    </View>
  );
};

export default RadioGroup;
