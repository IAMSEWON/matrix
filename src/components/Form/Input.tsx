import React from 'react';
import { Control, Controller, FieldError, RegisterOptions } from 'react-hook-form';
import { TextInput, TextInputProps, View } from 'react-native';

import AnimatedBorder from '@/components/Form/AnimatedBorder.tsx';
import ErrorMessage from '@/components/Form/ErrorMessage.tsx';
import Label from '@/components/Form/Label.tsx';
import { TodoAddType } from '@/types/matrix.ts';
import { cn } from '@/utils/tailwind.ts';

type InputProps = {
  control: Control<TodoAddType>;
  name: keyof TodoAddType;
  label: string;
  placeholder: string;
  errors?: FieldError;
  errorMessage?: string;
  rules?: RegisterOptions<TodoAddType>;
  darkMode?: boolean;
} & TextInputProps;

const Input = ({
  control,
  returnKeyType,
  name,
  label,
  placeholder,
  errors,
  errorMessage,
  rules,
  darkMode,
  ...props
}: InputProps) => {
  return (
    <View className="flex-col" style={{ gap: 8, height: 102 }}>
      <Label label={label} />
      <Controller
        control={control}
        rules={rules}
        render={({ field: { onChange, onBlur, value, ref } }) => {
          const castingValue = value as string;

          return (
            <AnimatedBorder value={castingValue} error={!!errorMessage}>
              <TextInput
                placeholder={placeholder}
                onChangeText={onChange}
                value={castingValue}
                onBlur={onBlur}
                ref={ref}
                returnKeyType={returnKeyType}
                placeholderTextColor={darkMode ? '#CBCBCD' : '#7A7A7A'}
                style={{
                  color: darkMode ? '#fff' : '#1E1F23',
                }}
                className={cn('rounded px-2 py-3', props.className)}
                {...props}
              />
            </AnimatedBorder>
          );
        }}
        name={name}
      />
      <ErrorMessage errors={errors} message={errorMessage} />
    </View>
  );
};

export default Input;
