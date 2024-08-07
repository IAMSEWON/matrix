import { Control, Controller, FieldError, FieldValues, RegisterOptions } from 'react-hook-form';
import { Text, View } from 'react-native';
import { Dropdown as DropdownComponent } from 'react-native-element-dropdown';

import Label from '@/components/Form/Label.tsx';

type DropDownProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>; // control 타입에 모든 타입 허용
  name: string;
  label: string;
  placeholder: string;
  errors?: FieldError;
  errorMessage?: string;
  rules?: RegisterOptions<FieldValues>;
  options: { label: string; value: string }[];
};

const Dropdown = ({ options, control, name, label, placeholder, errors, errorMessage, rules }: DropDownProps) => {
  return (
    <View className="flex-col" style={{ gap: 8 }}>
      <Label label={label} />
      <Controller
        control={control}
        rules={rules}
        render={({ field: { onChange, value } }) => (
          <DropdownComponent
            style={{
              paddingHorizontal: 8,
              paddingVertical: 12,
              borderRadius: 8,
              backgroundColor: 'white',
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
        )}
        name={name}
      />
      <View className="h-4">{errors && <Text className="text-red-500">{errorMessage}</Text>}</View>
    </View>
  );
};

export default Dropdown;
