import React from 'react';
import { Control, Controller, FieldError, RegisterOptions } from 'react-hook-form';
import { TextInput, TextInputProps, View } from 'react-native';

import AnimatedBorder from '@/components/Form/AnimatedBorder.tsx';
import ErrorMessage from '@/components/Form/ErrorMessage.tsx';
import Label from '@/components/Form/Label.tsx';
import { MatrixAddType } from '@/types/matrix.ts';
import { cn } from '@/utils/tailwind.ts';

type InputProps = {
  control: Control<MatrixAddType>;
  name: keyof MatrixAddType;
  label: string;
  placeholder: string;
  errors?: FieldError;
  errorMessage?: string;
  rules?: RegisterOptions<MatrixAddType>;
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
  ...props
}: InputProps) => {
  return (
    <View className="flex-col" style={{ gap: 8 }}>
      <Label label={label} />
      <Controller
        control={control}
        rules={rules}
        render={({ field: { onChange, onBlur, value, ref } }) => {
          return (
            <AnimatedBorder value={value} error={!!errorMessage}>
              <TextInput
                placeholder={placeholder}
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
                ref={ref}
                returnKeyType={returnKeyType}
                className={cn('h-12 rounded px-2 py-3', props.className)}
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
