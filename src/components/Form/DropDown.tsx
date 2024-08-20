import React from 'react';
import { Control, Controller, FieldError, RegisterOptions } from 'react-hook-form';
import { View } from 'react-native';
import { Dropdown as DropdownComponent } from 'react-native-element-dropdown';

import AnimatedBorder from '@/components/Form/AnimatedBorder.tsx';
import ErrorMessage from '@/components/Form/ErrorMessage.tsx';
import Label from '@/components/Form/Label.tsx';
import { MatrixAddType } from '@/types/matrix.ts';

type DropDownProps = {
  control: Control<MatrixAddType>; // control 타입에 모든 타입 허용
  name: keyof MatrixAddType;
  label: string;
  placeholder: string;
  errors?: FieldError;
  errorMessage?: string;
  rules?: RegisterOptions<MatrixAddType>;
  options: { label: string; value: string }[];
};

const Dropdown = ({ options, control, name, label, placeholder, errors, errorMessage, rules }: DropDownProps) => {
  return (
    <View className="flex-col" style={{ gap: 8, height: 102 }}>
      <Label label={label} />
      <Controller
        control={control}
        rules={rules}
        render={({ field: { onChange, value } }) => (
          <AnimatedBorder value={value} error={!!errorMessage}>
            <DropdownComponent
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 8,
                paddingVertical: 12,
              }}
              data={options}
              placeholderStyle={{ color: '#CBCBCD' }}
              containerStyle={{
                borderRadius: 8,
              }}
              labelField="label"
              valueField="value"
              placeholder={placeholder}
              onChange={onChange}
              value={value}
            />
          </AnimatedBorder>
        )}
        name={name}
      />

      <ErrorMessage errors={errors} message={errorMessage} />
    </View>
  );
};

export default Dropdown;
